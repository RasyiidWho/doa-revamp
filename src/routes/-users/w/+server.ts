import type { RequestHandler } from './$types';
import { json } from '@sveltejs/kit';
import { db } from '$lib/server/db';
import { useraccounts } from '$lib/server/db/schema';
import { eq } from 'drizzle-orm';

export const POST: RequestHandler = async ({ request }) => {
	const data = await request.json();

	if (data.e) {
		const updateData = data.e.password
			? {
					userlevel: data.e.userlevel,
					password: data.e.password,
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

	return json({ success: true });
};
