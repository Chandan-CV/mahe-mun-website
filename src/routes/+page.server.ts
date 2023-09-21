//@ts-ignore
import { redirect } from '@sveltejs/kit';
import { MongoClient } from 'mongodb';
import * as dotenv from 'dotenv';
dotenv.config();

const cstring = process.env.MONGO_URL;
//@ts-ignore
const client = new MongoClient(cstring);
const db = client.db(process.env.MONGO_DB_NAME);
const munUserInfo = db.collection('mun_user_info');

export const load = async (event) => {
	const session = await event.locals.getSession();
	if (!session?.user) {
		return { loggedIn: false };
	} else {
		let userFound = await munUserInfo.findOne({ user_email: session.user.email });
		if (userFound != null) {
			if (userFound['status'] === 'confirmed') {
				return { loggedIn: true, session: session, link: '/dashboard', display: 'Dashboard' };
			} else if (userFound['status'] === 'unconfirmed') {
				return { loggedIn: true, session: session, link: '/payment', display: 'Complete Payment' };
			}
		}
		return { loggedIn: true, session: session, link: '/form', display: 'Fill The Form' };
	}
};
