import { redirect } from '@sveltejs/kit';
import { MongoClient } from 'mongodb';
import { json } from '@sveltejs/kit';
import * as dotenv from 'dotenv';
dotenv.config();

const cstring = process.env.MONGO_URL;
//@ts-ignore
const client = new MongoClient(cstring);
const db = client.db(process.env.MONGO_DB_NAME);
const munUserPayment = db.collection('mun_user_payments');
const munUserInfo = db.collection('mun_user_info');
const munTeams = db.collection('mun_teams');
const projection = {
	_id: 0
};
const projectionType = {
	projection: projection
};

//@ts-ignore
export const load = async (event) => {
	const session = await event.locals.getSession();
	if (!session?.user) {
		console.log('no session');
		throw redirect(302, '/');
	}

	const paymentFound = await munUserPayment.findOne(
		{
			user_email: session.user.email,
			status: 'paid'
		},
		projectionType
	);
	if (paymentFound == null) {
		console.log('no payment');
		const userFound = await munUserInfo.findOne(
			{
				user_email: session.user.email,
				status: 'confirmed',
				reg_type: 'team'
			},
			projectionType
		);
		if (userFound == null) {
			console.log('going to home');
			throw redirect(302, '/');
		}
		const teamFound = await munTeams.findOne(
			{ team_ref_id: userFound['team_ref_id'] },
			projectionType
		);
		if (teamFound != null && teamFound['status'] == 'confirmed') {
			const allTeamMembers = munUserInfo.find(
				{
					team_ref_id: userFound['team_ref_id'],
					reg_type: 'team'
				},
				projectionType
			);
			const allTeamMembersArray = await allTeamMembers.toArray();
			return {
				type: 'team',
				userInfo: userFound,
				teamMembers: allTeamMembersArray,
				teamInfo: teamFound,
				userState: {
					loggedIn: true,
					session: session,
					link: '/',
					display: 'Hi ' + session.user.name
				}
			};
		} else {
			throw redirect(302, '/');
		}
	}

	const userFound = await munUserInfo.findOne(
		{
			user_email: session.user.email,
			status: 'confirmed'
		},
		projectionType
	);
	if (userFound == null) {
		console.log('no user');
		throw redirect(302, '/');
	}

	// console.log(userFound);
	//@ts-ignore
	if (userFound['reg_type'] == 'individual') {
		return {
			type: 'individual',
			userInfo: userFound,
			userState: { loggedIn: true, session: session, link: '/', display: 'Hi ' + session.user.name }
		};
		//@ts-ignore
	} else if (userFound['reg_type'] == 'team') {
		const teamFound = await munTeams.findOne(
			{ team_ref_id: userFound['team_ref_id'] },
			projectionType
		);
		if (teamFound != null && teamFound['status'] == 'confirmed') {
			const allTeamMembers = munUserInfo.find(
				{
					team_ref_id: userFound['team_ref_id'],
					reg_type: 'team'
				},
				projectionType
			);
			const allTeamMembersArray = await allTeamMembers.toArray();
			return {
				type: 'team',
				userInfo: userFound,
				teamMembers: allTeamMembersArray,
				teamInfo: teamFound,
				userState: {
					loggedIn: true,
					session: session,
					link: '/',
					display: 'Hi ' + session.user.name
				}
			};
		} else {
			throw redirect(302, '/');
		}
	}
	// throw redirect(302, '/');
};

export const actions = {
	deleteTeammate: async (event) => {
		const session = await event.locals.getSession();
		if (!session?.user) {
			throw redirect(302, '/');
		}
		const formData = await event.request.formData();
		//@ts-ignore
		const symbolKey = Reflect.ownKeys(formData).find((key) => key.toString() === 'Symbol(state)');
		//@ts-ignore
		if (formData[symbolKey].length > 0 && formData[symbolKey] != undefined) {
			//@ts-ignore
			let userToDeleteEmail = formData[symbolKey][0].value;
			//@ts-ignore
			let teamCurrentCapacity = Number(formData[symbolKey][2].value);
			//@ts-ignore
			let teamRefId = formData[symbolKey][1].value;
			console.log(teamRefId);
			console.log(teamCurrentCapacity);
			munTeams.updateOne(
				{ team_ref_id: teamRefId },
				{ $set: { current_capacity: teamCurrentCapacity - 1 } }
			);
			munUserInfo.deleteOne({ user_email: userToDeleteEmail });
		}
	}
};
