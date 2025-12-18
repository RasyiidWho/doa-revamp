import { lucia } from "$lib/server/auth";
import type { Handle } from "@sveltejs/kit";

export const handle: Handle = async ({ event, resolve }) => {
	const sessionId = event.cookies.get(lucia.sessionCookieName);
	if (!sessionId) {
		event.locals.user = null;
		event.locals.session = null;
	} else {
		const { session, user } = await lucia.validateSession(sessionId);
		if (session && session.fresh) {
			const sessionCookie = lucia.createSessionCookie(session.id);
			event.cookies.set(sessionCookie.name, sessionCookie.value, {
				path: ".",
				...sessionCookie.attributes
			});
		}
		if (!session) {
			const sessionCookie = lucia.createBlankSessionCookie();
			event.cookies.set(sessionCookie.name, sessionCookie.value, {
				path: ".",
				...sessionCookie.attributes
			});
		}
		event.locals.user = user;
		event.locals.session = session;
	}

    // Auth Guard
	const protectedPaths = ['/dash', '/logout', '/-users', '/-doa', '/-logout'];
	const isProtected = protectedPaths.some((p) => event.url.pathname.startsWith(p));
	
	if (!event.locals.session && isProtected) {
		// Use 303 for 'See Other' to switch to GET for the redirect
        // But 302 Found is also common for temp redirects. User used 303 in example.
        // Importing redirect first.
		return new Response(null, {
            status: 303,
            headers: { location: "/login" }
        });
	}

	return resolve(event);
};
