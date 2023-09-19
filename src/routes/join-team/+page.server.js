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
		throw redirect(302, '/');
	}
	return { loggedIn: true, session: session, link: '/', display: 'Hi ' + session.user.name };
};
//@ts-ignore
export const actions = {
	checkCode: async (event) => {
		const session = await event.locals.getSession();
		if (!session?.user) {
			throw redirect(302, '/');
		}
		let foundUser = await munUserInfo.findOne({ user_email: session.user.email });
		if (foundUser != null) {
			// can also redirect to dashboard
			throw redirect(302, '/dashboard');
		} else {
			const formData = await event.request.formData();
			const symbolKey = Reflect.ownKeys(formData).find((key) => key.toString() === 'Symbol(state)');
			//@ts-ignore
			if (formData[symbolKey].length > 0 && formData[symbolKey] != undefined) {
				//@ts-ignore
				throw redirect(302, `/join-team/code/${formData[symbolKey][0]['value']}`);
			} else {
				throw redirect(302, '/?auth');
			}
		}
	}
};
