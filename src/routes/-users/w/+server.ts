import type { RequestHandler } from './$types';
import { json } from '@sveltejs/kit';
import { db } from '$lib/server/db';
import { useraccounts } from '$lib/server/db/schema';
import { eq } from 'drizzle-orm';
import * as yup from 'yup';
import md5 from 'blueimp-md5';

export const POST: RequestHandler = async ({ request }) => {
	const data = await request.json();
	if (data.e) {
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

	return json({ success: true });
};
