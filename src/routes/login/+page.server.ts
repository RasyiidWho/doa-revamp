import { fail, redirect } from "@sveltejs/kit";
import { lucia } from "$lib/server/auth";
import { db } from "$lib/server/db";
import { useraccounts } from "$lib/server/db/schema";
import { eq } from "drizzle-orm";
import crypto from "crypto";

import type { Actions, PageServerLoad } from "./$types";

export const load: PageServerLoad = async ({ locals }) => {
	if (locals.user) {
		redirect(302, "/dash");
	}
	return {};
};
