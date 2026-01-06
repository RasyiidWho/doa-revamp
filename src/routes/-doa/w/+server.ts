import type { RequestHandler } from './$types';
import { json } from '@sveltejs/kit';
import { db } from '$lib/server/db';
import { standard } from '$lib/server/db/schema';
import { eq } from 'drizzle-orm';
import * as yup from 'yup';
import md5 from 'blueimp-md5';

export const POST: RequestHandler = async ({ request }) => {
	let data: any;
	let file: File | null = null;

	const contentType = request.headers.get('content-type');
	if (contentType?.includes('multipart/form-data')) {
		const formData = await request.formData();
		data = JSON.parse(formData.get('data') as string);
		file = formData.get('file') as File;
	} else {
		data = await request.json();
	}

	console.log(data);

	if (data.e) {
		const schema = yup.object({
			no: yup.number().required(),
			type: yup.string().required(),
			number: yup.string().required(),
			revision: yup.string().required(),
			title: yup.string().required()
		});

		try {
			await schema.validate(data.e);
		} catch (error: any) {
			return json({ success: false, error: error.message }, { status: 400 });
		}

		let nmpath = data.e.nmpath;
		let pdf = data.e.pdf;

		if (file) {
			try {
				const uploadFormData = new FormData();
				uploadFormData.append('file', file);
				uploadFormData.append('type', data.e.type);
				uploadFormData.append('number', data.e.number);
				uploadFormData.append('revision', data.e.revision);

				const uploadRes = await fetch('http://10.1.95.76/webdoa/up.php', {
					method: 'POST',
					body: uploadFormData
				});

				const rawResponse = await uploadRes.clone().text();
				let uploadResult: any;
				try {
					uploadResult = await uploadRes.json();
				} catch (e) {
					return json({ 
						success: false, 
						error: 'Upload server returned invalid JSON. Raw response: ' + rawResponse 
					}, { status: 500 });
				}

				if (uploadResult.success) {
					nmpath = uploadResult.path;
					if (uploadResult.is_pdf) {
						pdf = nmpath;
					}
				} else {
					return json({ success: false, error: 'File upload failed: ' + uploadResult.error }, { status: 500 });
				}
			} catch (error: any) {
				return json({ success: false, error: 'Upload server connection error: ' + error.message }, { status: 500 });
			}
		}


		if (data.d) {
			const updateData = {
				remark: 'D',
			};

			return await db
				.update(standard)
				.set(updateData)
				.where(eq(standard.no, data.e.no))
				.then(() => json({ success: true }))
				.catch((error) => {
					console.error(error);
					return json({ success: false, error: error.message }, { status: 400 });
				});
		} else {
			const updateData: any = {
				no: data.e.no,
				type: data.e.type,
				number: data.e.number,
				revision: data.e.revision,
				title: data.e.title,
				nmpath: nmpath,
				pdf: pdf
			};

			if (data.e.date) {
				updateData.date = `${data.e.date.year}-${String(data.e.date.month).padStart(2, '0')}-${String(data.e.date.day).padStart(2, '0')}`;
			} else {
				updateData.date = null;
			}

			if (data.e.date2) {
				updateData.date2 = `${data.e.date2.year}-${String(data.e.date2.month).padStart(2, '0')}-${String(data.e.date2.day).padStart(2, '0')}`;
			}


			return await db
				.update(standard)
				.set(updateData)
				.where(eq(standard.no, data.e.no))
				.then(() => json({ success: true }))
				.catch((error) => {
					console.error(error);
					return json({ success: false, error: error.message }, { status: 400 });
				});
		}
	}

	return json({ success: true });
};

