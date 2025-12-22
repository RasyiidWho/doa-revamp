import type { RequestHandler } from './$types';
import { json } from '@sveltejs/kit';
import { db } from '$lib/server/db';
import { standard } from '$lib/server/db/schema';
import { eq } from 'drizzle-orm';
import * as yup from 'yup';
import md5 from 'blueimp-md5';

export const POST: RequestHandler = async ({ request }) => {
	const data = await request.json();
	//     {
	//   e: {
	//     no: 14531,
	//     type: '41C-3',
	//     nmpath: 'WES/PART41/C_PROFILE/M2325_C.pdf',
	//     number: 'M2325',
	//     pdf: '-',
	//     revision: 'C',
	//     date: '2023-11-22',
	//     date2: '0000-00-00',
	//     title: 'T-PROFILE, ALUMINUM ALLOY, EXTRUDED',
	//     category: '',
	//     controlSheet: '',
	//     remark: 'Active',
	//     panel: '',
	//     nik: '',
	//     nama: ''
	//   },
	//   d: false
	// }
	console.log(data);

	// console.log((data.e.date = `${data.e.date.year}-${String(data.e.date.month).padStart(2, '0')}-${String(data.e.date.day).padStart(2, '0')}`));
	// console.log((data.e.date2 = `${data.e.date2.year}-${String(data.e.date2.month).padStart(2, '0')}-${String(data.e.date2.day).padStart(2, '0')}`));

	// return json({ success: true });

	if (data.e) {
		const schema = yup.object({
			no: yup.number().required(),
			type: yup.string().required(),
			number: yup.string().required(),
			revision: yup.string().required(),
			// date: yup.string(),
			// date2: yup.string(),
			title: yup.string().required()
		});

		try {
			await schema.validate(data.e);
		} catch (error: any) {
			return json({ success: false, error: error.message }, { status: 400 });
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
			const updateData = {
				no: data.e.no,
				type: data.e.type,
				number: data.e.number,
				revision: data.e.revision,
				date: data.e.date ? `${data.e.date.year}-${String(data.e.date.month).padStart(2, '0')}-${String(data.e.date.day).padStart(2, '0')}` : '',
				date2: data.e.date2 ? `${data.e.date2.year}-${String(data.e.date2.month).padStart(2, '0')}-${String(data.e.date2.day).padStart(2, '0')}` : '',
				title: data.e.title
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
		}
	}

	return json({ success: true });
};
