import { redirect } from '@sveltejs/kit';
import { MongoClient } from 'mongodb';
import * as dotenv from 'dotenv';
dotenv.config();

const cstring = process.env.MONGO_URL;
//@ts-ignore
const client = new MongoClient(cstring);
const db = client.db(process.env.MONGO_DB_NAME);
const munUserInfo = db.collection('mun_user_info');

//@ts-ignore
export const load = async (event) => {
	const session = await event.locals.getSession();
	if (!session?.user) {
		return { loggedIn: false };
	} else {
		let foundUser = await munUserInfo.findOne({ user_email: session.user.email });
		if (foundUser != null) {
			// can also redirect to dashboard
			throw redirect(302, '/');
		} else {
			return { loggedIn: true, session: session };
		}
	}
};
