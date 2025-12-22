import type { RequestHandler } from './$types';
import { json } from '@sveltejs/kit';

export const POST: RequestHandler = async ({ request }) => {
	const data = await request.json();

	console.log(data);

	return json({ success: true });
};