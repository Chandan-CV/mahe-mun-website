import { redirect } from '@sveltejs/kit';
import * as dotenv from 'dotenv';
dotenv.config();
import { MongoClient } from 'mongodb';

const cstring = process.env.MONGO_URL;
//@ts-ignore
const client = new MongoClient(cstring);
const db = client.db(process.env.MONGO_DB_NAME);
const munUserInfo = db.collection('mun_user_info');
const munUserPayment = db.collection('mun_user_payments');
const munTeams = db.collection('mun_teams');

//@ts-ignore
export const load = async (event) => {
	const session = await event.locals.getSession();
	if (!session?.user) {
		throw redirect(302, '/');
	}
	const params = event.params;
	if (!params.slug) {
		throw redirect(302, '/');
	}
	let foundTeam;
	try {
		foundTeam = await munTeams.findOne({
			join_code: parseInt(params.slug),
			joinable: true,
			status: 'confirmed'
		});
	} catch (err) {
		throw redirect(302, '/?invalidCode');
	}
	if (foundTeam != null) {
		if (foundTeam['current_capacity'] < foundTeam['team_capacity']) {
			if (foundTeam['current_capacity'] + 1 == foundTeam['team_capacity']) {
				await munTeams.updateOne(
					//////////////////////////////////////converting to integer
					{ join_code: Number(params.slug), joinable: false },
					{ $set: { current_capacity: foundTeam['current_capacity'] + 1, joinable: false } }
				);
				await munUserInfo.insertOne({
					user_email: session.user.email,
					name: session.user.name,
					reg_type: 'team',
					status: 'confirmed',
					is_team_leader: false,
					team_ref_id: foundTeam['team_ref_id']
				});
				throw redirect(302, '/dashboard');
			} else {
				let newCapacity = foundTeam['current_capacity'] + 1;
				await munTeams.updateOne(
					////////////////////////////////////converting to integer
					{ join_code: Number(params.slug), joinable: true },
					{ $set: { current_capacity: newCapacity } }
				);
				munUserInfo.insertOne({
					user_email: session.user.email,
					name: session.user.name,
					reg_type: 'team',
					status: 'confirmed',
					is_team_leader: false,
					team_ref_id: foundTeam['team_ref_id']
				});
				throw redirect(302, '/dashboard');
			}
		} else {
			throw redirect(302, '/?teamFull');
		}
	} else {
		throw redirect(302, '/?invalidCode');
	}
};
