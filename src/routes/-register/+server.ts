import { db } from '$lib/server/db';
import { registers } from '$lib/server/db/schema';
import fs from 'fs';
import PizZip from 'pizzip';
import { json } from '@sveltejs/kit';
import type { RequestHandler } from './$types';
import topdf from 'docx2pdf-converter';

// export function docx() {
// 	const content = fs.readFileSync('template.docx');
// 	const zip = new PizZip(content);
// 	const doc = new Docxtemplater(zip, { paragraphLoop: true, linebreaks: true });

// 	doc.render({
// 		title: 'New Title',
// 		name: 'John Doe',
// 		date: '2025-01-01'
// 	});

// 	const buffer = doc.getZip().generate({ type: 'nodebuffer' });
// 	fs.writeFileSync('result.docx', buffer);
// }

export const POST: RequestHandler = async ({ request, cookies }) => {
	const { register } = await request.json();

	console.log(register);
	console.log(process.cwd());

	const content = fs.readFileSync('static/templatex.docx');
	const zip = new PizZip(content);

	const xmlFile = zip.file('word/document.xml');
	if (xmlFile) {
		let xml = xmlFile.asText();

		const replacements: Record<string, string> = {
			nama: register.nama,
			nik: register.nik,
			org: register.org,
			org_lokasi: register.org_lokasi,
			email: register.email,
			mgr_nama: register.mgr_nama,
			mgr_nik: register.mgr_nik
		};

		// Block-based replacement: finds all {{ ... }} blocks and cleans them to find the key
		xml = xml.replace(/\{\{(?:(?!<w:p).)*?\}\}/g, (match) => {
			// Strip XML tags and curly braces to see the content inside
			const cleanKey = match.replace(/<[^>]+>/g, '').replace(/[\{\}]/g, '').trim();
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
};
