import * as dotenv from 'dotenv';

export const load = async (event) => {
	const session = await event.locals.getSession();
	if (!session?.user) {
		return { loggedIn: false };
	} else {
		return { loggedIn: true, session: session };
	}
};
