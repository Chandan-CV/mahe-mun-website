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
const munTeams = db.collection('mun_teams');

export const load = async (event) => {
	const session = await event.locals.getSession();
	if (!session?.user) {
		return { loggedIn: false };
	} else {
		let userFound = await munUserInfo.findOne({ user_email: session.user.email });
		if (userFound != null) {
			if (userFound['status'] === 'confirmed') {
				if (userFound['secondary_form_filled'] === false) {
					let foundTeam = await munTeams.findOne({ team_ref_id: userFound['team_ref_id'] });
					if (foundTeam != null) {
						return {
							loggedIn: true,
							session: session,
							link: `/join-team/code/${foundTeam['join_code']}`,
							display: 'Fill The Form',
						};
					}
				}
				return { loggedIn: true, session: session, link: '/dashboard', display: 'Dashboard' };
			} else if (userFound['status'] === 'unconfirmed') {
				return { loggedIn: true, session: session, link: '/payment', display: 'Complete Payment' };
			}
		}
		return { loggedIn: true, session: session, link: '/form', display: 'Fill The Form' };
	}
};
