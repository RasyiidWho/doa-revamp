import type { PageServerLoad } from './$types';
import { db } from '$lib/server/db';
import { users } from '$lib/server/db/schema';

export const load = (async () => {
    const rows = await db.select().from(users);
    return { rows };
}) satisfies PageServerLoad;