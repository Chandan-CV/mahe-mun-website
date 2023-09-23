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
		// throw redirect(302, '/join-team?valid=true')
		let foundUser = await munUserInfo.findOne({ user_email: session.user.email, reg_type: 'team' });
		if (foundUser != null) {
			if (foundUser['secondary_form_filled']) {
				throw redirect(302, '/dashboard');
			} else {
				return {
					loggedIn: true,
					session: session,
					link: '/',
					display: 'Hi ' + session.user.name,
					mahe_team: foundTeam['mahe_team']
				};
			}
		}
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
					team_ref_id: foundTeam['team_ref_id'],
					secondary_form_filled: false
				});
				// if (foundTeam['mahe_team'] == true) {
				// 	throw redirect(302, '/form/join-c-form/true');
				// } else {
				// 	throw redirect(302, '/form/join-c-form/false');
				// }
				return {
					loggedIn: true,
					session: session,
					link: '/',
					display: 'Hi ' + session.user.name,
					mahe_team: foundTeam['mahe_team']
				};
				// throw redirect(302, '/dashboard');
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
					team_ref_id: foundTeam['team_ref_id'],
					secondary_form_filled: false
				});
				// if (foundTeam['mahe_team'] == true) {
				// 	throw redirect(302, '/form/join-c-form/true');
				// } else {
				// 	throw redirect(302, '/form/join-c-form/false');
				// }
				return {
					loggedIn: true,
					session: session,
					link: '/',
					display: 'Hi ' + session.user.name,
					mahe_team: foundTeam['mahe_team']
				};
				// throw redirect(302, '/dashboard');
			}
		} else {
			throw redirect(302, '/?teamFull');
		}
	} else {
		throw redirect(302, '/?invalidCode');
	}
};

export const actions = {
	register: async (event) => {
		const session = await event.locals.getSession();
		if (!session?.user) {
			throw redirect(302, '/');
		}
		const formData = await event.request.formData();
		const symbolKey = Reflect.ownKeys(formData).find((key) => key.toString() === 'Symbol(state)');
		//@ts-ignore
		if (formData[symbolKey].length > 0 && formData[symbolKey] != undefined) {
			//@ts-ignore
			const actualData = formData[symbolKey];

			if (typeof actualData[4] != 'undefined') {
				await munUserInfo.findOneAndUpdate(
					{ user_email: session.user.email },
					{
						$set: {
							first_name: actualData[0].value,
							last_name: actualData[1].value,
							user_age: actualData[2].value,
							mobile_number: actualData[3].value,
							secondary_form_filled: true,
							mahe_learner_id: actualData[4]['value']
						}
					}
				);
				throw redirect(302, '/dashboard');
			} else {
				await munUserInfo.findOneAndUpdate(
					{ user_email: session.user.email },
					{
						$set: {
							first_name: actualData[0]['value'],
							last_name: actualData[1]['value'],
							user_age: actualData[2]['value'],
							mobile_number: actualData[3]['value'],
							secondary_form_filled: true
						}
					}
				);
				throw redirect(302, '/dashboard');
			}
		}
	}
};
