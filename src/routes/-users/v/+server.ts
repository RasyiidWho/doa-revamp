import type { RequestHandler } from './$types';
import { db } from '$lib/server/db';
import { useraccounts } from '$lib/server/db/schema';

export const GET: RequestHandler = async () => {
    const users = await db.select().from(useraccounts);
    return new Response(JSON.stringify(users));
};