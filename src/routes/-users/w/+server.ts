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

	try {
		if (data.e) {
			const userlevel = locals.user?.userlevel;
			if (userlevel != -1) return json({ success: false, error: 'Unauthorized' }, { status: 401 });

			const schema = yup.object({
				username: yup.string().required(),
				userlevel: yup.number().required(),
				password: yup.string(),
				activated: yup.string().required()
			});

			await schema.validate(data.e);

			if (data.d) {
				await db.delete(useraccounts).where(eq(useraccounts.username, data.e.username));
				return json({ success: true });
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

				await db.update(useraccounts).set(updateData).where(eq(useraccounts.username, data.e.username));
				return json({ success: true });
			}
		}

		if (data.r) {
			const schema = yup.object({
				nama: yup.string().required(),
				nik: yup.string().required(),
				org: yup.string().required(),
				org_lokasi: yup.string().required(),
				email: yup.string().required().email(),
				password: yup.string().required(),
				mgr_nama: yup.string().required(),
				mgr_nik: yup.string().required(),
				mgr_email: yup.string().required().email()
			});

			await schema.validate(data.r);

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
					mgr_nik: data.r.mgr_nik,
					tanggal: new Intl.DateTimeFormat('id-ID', {
						weekday: 'long',
						day: 'numeric',
						month: 'long',
						year: 'numeric'
					}).format(new Date())
				};

				xml = xml.replace(/\{\{(?:(?!<w:p).)*?\}\}/g, (match) => {
					const cleanKey = match
						.replace(/<[^>]+>/g, '')
						.replace(/[\{\}]/g, '')
						.trim();
					if (replacements[cleanKey]) {
						return replacements[cleanKey];
					}
					return match;
				});

				zip.file('word/document.xml', xml);
			}

			const out = zip.generate({ type: 'nodebuffer' });
			fs.writeFileSync('static/result.docx', out);
			const inputPath = './static/result.docx';
			topdf.convert(inputPath, 'static/result.pdf');

			await db
				.insert(registers)
				.values({
					email: data.r.email,
					nama: data.r.nama,
					nik: data.r.nik,
					org: data.r.org,
					orgLokasi: data.r.org_lokasi,
					mgrEmail: data.r.mgr_email,
					mgrNama: data.r.mgr_nama,
					mgrNik: data.r.mgr_nik
				})
				// .onDuplicateKeyUpdate({
				// 	set: {
				// 		email: data.r.email,
				// 		nama: data.r.nama,
				// 		org: data.r.org,
				// 		orgLokasi: data.r.org_lokasi,
				// 		mgrEmail: data.r.mgr_email,
				// 		mgrNama: data.r.mgr_nama,
				// 		mgrNik: data.r.mgr_nik
				// 	}
				// });

			await db
				.insert(useraccounts)
				.values({
					username: data.r.nik,
					kuid: md5(data.r.nik),
					password: md5(data.r.password),
					userlevel: 0,
					configPenghasil: data.r.nama,
					activated: 'N',
					provinsi: ''
				})
				// .onDuplicateKeyUpdate({
				// 	set: {
				// 		kuid: md5(data.r.nik),
				// 		password: md5(data.r.password),
				// 		configPenghasil: data.r.nama
				// 	}
				// });

			return json({ success: true });
		}

		return json({ success: false, error: 'Invalid request' }, { status: 400 });
	} catch (error: any) {
		console.error(error);
		return json({ success: false, error: error.message }, { status: 400 });
	}
};

