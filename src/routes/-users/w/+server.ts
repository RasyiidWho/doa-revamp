import type { RequestHandler } from './$types';
import { json } from '@sveltejs/kit';
import { db } from '$lib/server/db';
import { useraccounts } from '$lib/server/db/schema';
import { eq } from 'drizzle-orm';
import * as yup from 'yup';
import md5 from 'blueimp-md5';
import { registers } from '$lib/server/db/schema';
import fs from 'fs';
import PizZip from 'pizzip';
import topdf from 'docx2pdf-converter';

export const POST: RequestHandler = async ({ request, locals }) => {
	const data = await request.json();
	if (data.e) {
		const userlevel = locals.user?.userlevel;
		if (userlevel != -1) return json({ success: false, error: 'Unauthorized' }, { status: 401 });
		const schema = yup.object({
			username: yup.string().required(),
			userlevel: yup.number().required(),
			password: yup.string(),
			activated: yup.string().required()
		});

		try {
			await schema.validate(data.e);
		} catch (error: any) {
			return json({ success: false, error: error.message }, { status: 400 });
		}

		if (data.d) {
			return await db
				.delete(useraccounts)
				.where(eq(useraccounts.username, data.e.username))
				.then(() => json({ success: true }))
				.catch((error) => {
					console.error(error);
					return json({ success: false, error: error.message }, { status: 400 });
				});
		} else {
			const updateData = data.e.password
				? {
						userlevel: data.e.userlevel,
						password: md5(data.e.password),
						activated: (data.e.activated == 'Aktif' ? 'Y' : 'N') as 'Y' | 'N'
					}
				: {
						userlevel: data.e.userlevel,
						activated: (data.e.activated == 'Aktif' ? 'Y' : 'N') as 'Y' | 'N'
					};

			return await db
				.update(useraccounts)
				.set(updateData)
				.where(eq(useraccounts.username, data.e.username))
				.then(() => json({ success: true }))
				.catch((error) => {
					console.error(error);
					return json({ success: false, error: error.message }, { status: 400 });
				});
		}
	}

	if (data.r) {
		const schema = yup.object({
			nama: yup.string().required(),
			nik: yup.string().required(),
			org: yup.string().required(),
			org_lokasi: yup.string().required(),
			email: yup.string().required().email(),
			mgr_nama: yup.string().required(),
			mgr_nik: yup.string().required(),
			mgr_email: yup.string().required().email()
		});

		try {
			await schema.validate(data.r);
		} catch (error: any) {
			return json({ success: false, error: "Mohon periksa kembali form dengan benar." }, { status: 400 });
		}

		const content = fs.readFileSync('static/templatex.docx');
		const zip = new PizZip(content);

		const xmlFile = zip.file('word/document.xml');
		if (xmlFile) {
			let xml = xmlFile.asText();

			const replacements: Record<string, string> = {
				nama: data.r.nama,
				nik: data.r.nik,
				org: data.r.org,
				org_lokasi: data.r.org_lokasi,
				email: data.r.email,
				mgr_nama: data.r.mgr_nama,
				mgr_nik: data.r.mgr_nik
			};

			// Block-based replacement: finds all {{ ... }} blocks and cleans them to find the key
			xml = xml.replace(/\{\{(?:(?!<w:p).)*?\}\}/g, (match) => {
				// Strip XML tags and curly braces to see the content inside
				const cleanKey = match
					.replace(/<[^>]+>/g, '')
					.replace(/[\{\}]/g, '')
					.trim();
				console.log(`Found block: "${match.substring(0, 50)}...", clean key: "${cleanKey}"`);

				if (replacements[cleanKey]) {
					console.log(`  Replacing "${cleanKey}" with "${replacements[cleanKey]}"`);
					return replacements[cleanKey];
				}
				return match; // Keep unchanged if no replacement found
			});

			zip.file('word/document.xml', xml);
		}

		const out = zip.generate({ type: 'nodebuffer' });
		fs.writeFileSync('static/result.docx', out);
		const inputPath = './static/result.docx';
		topdf.convert(inputPath, 'static/result.pdf');

		return await db
			.insert(registers)
			.values({
				email: register.email,
				nama: register.nama,
				nik: register.nik,
				org: register.org,
				orgLokasi: register.org_lokasi,
				mgrEmail: register.mgr_email,
				mgrNama: register.mgr_nama,
				mgrNik: register.mgr_nik
			})
			.then(() => json({ success: true }))
			.catch((error) => {
				console.error(error);
				return json({ success: false, error: error.message }, { status: 400 });
			});
	}

	return json({ success: true });
};
