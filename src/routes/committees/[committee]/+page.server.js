//@ts-ignore
export const load = async (event) => {
	const session = await event.locals.getSession();
	if (!session?.user) {
		return { loggedIn: false };
	} else {
		return { loggedIn: true, session: session, link: "/", display: "Hi " + session.user.name};
	}
};