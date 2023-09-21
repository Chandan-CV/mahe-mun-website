import { redirect } from '@sveltejs/kit';
import * as dotenv from 'dotenv';
dotenv.config();
import { MongoClient } from 'mongodb';
import { v4 as uuidv4 } from 'uuid';

const ROUND1_TEAM_MAHE = 105000;
const ROUND1_TEAM_NON_MAHE = 150000;
const ROUND2_TEAM = 170000;
const ROUND3_TEAM = 190000;

const CURRENT_PRICE_MAHE = ROUND1_TEAM_MAHE;
const CURRENT_PRICE_NON_MAHE = ROUND1_TEAM_NON_MAHE;

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
		throw redirect(301, '/?auth');
	} else {
		let foundUser = await munUserInfo.findOne({ user_email: session.user.email });
		if (foundUser != null) {
			throw redirect(302, '/');
		} else {
			return { loggedIn: true, session: session, link: "/", display: "Hi " + session.user.name};
		}
	// return { loggedIn: true, session: {}, link: "/", display: "Hi " + "Return to normal" };
	}
};

export const actions = {
	//@ts-ignore
	register: async (event) => {
		const session = await event.locals.getSession();
		if (!session?.user) {
			//@ts-ignore
			throw redirect(301, process.env.ORIGIN);
		}
		const formData = await event.request.formData();
		const symbolKey = Reflect.ownKeys(formData).find((key) => key.toString() === 'Symbol(state)');
		//@ts-ignore
		if (formData[symbolKey].length > 0 && formData[symbolKey] != undefined) {
			let generatedCode;
			while (true) {
				generatedCode = Math.floor(100000 + Math.random() * 900000);
				const foundCode = await munTeams.findOne({ join_code: generatedCode });
				if (foundCode == null) {
					break;
				} else {
					continue;
				}
			}
			const teamRefId = uuidv4();
			//@ts-ignore
			const actualData = formData[symbolKey];
			if (typeof actualData[17] == 'undefined') {
				munUserInfo.insertOne({
					user_email: session.user.email,
					reg_type: 'team',
					first_name: actualData[0]['value'],
					last_name: actualData[1]['value'],
					user_age: actualData[2]['value'],
					mobile_number: actualData[3]['value'],
					institution_mame: actualData[4]['value'],
					first_pref: actualData[5]['value'],
					second_pref: actualData[6]['value'],
					third_pref: actualData[7]['value'],
					first_mun_answer: actualData[8]['value'],
					accomodation_required: actualData[9]['value'],
					reason_committee_pref: actualData[10]['value'],
					top_port_pref: actualData[11]['value'],
					just_countery: actualData[12]['value'],
					exp_as_del: actualData[13]['value'],
					additional_questions: actualData[14]['value'],
					team_ref_id: teamRefId,
					is_team_leader: true,
					status: 'unconfirmed'
				});
				////////////////////////////////////////////////////converting to integer
				munTeams.insertOne({
					team_name: actualData[16]['value'],
					team_capacity: Number(actualData[15]['value']),
					mahe_team: false,
					current_capacity: 1,
					join_code: generatedCode,
					joinable: true,
					team_ref_id: teamRefId,
					status: 'unconfirmed'
				});
				// understand how fees work
				// if team payment add the following fields
				// team_name, pass_type -> Team, invite_code, team_capacity, current_capacity
				//////////////////////////////////////////////////////converting to integer
				let amountToPay = CURRENT_PRICE_NON_MAHE * Number(actualData[15]['value']);
				munUserPayment.insertOne({
					user_name: session.user.name,
					user_email: session.user.email,
					mobile_number: actualData['mobileNumber'],
					amount_to_pay: amountToPay,
					pass_type: 'Team Pass',
					status: 'created',
					reference_id: uuidv4()
				});
				throw redirect(302, `/payment`);
			} else {
				munUserInfo.insertOne({
					user_email: session.user.email,
					reg_type: 'team',
					first_name: actualData[0]['value'],
					last_name: actualData[1]['value'],
					user_age: actualData[2]['value'],
					mobile_number: actualData[3]['value'],
					institution_mame: actualData[4]['value'],
					first_pref: actualData[5]['value'],
					second_pref: actualData[6]['value'],
					third_pref: actualData[7]['value'],
					first_mun_answer: actualData[8]['value'],
					accomodation_required: actualData[9]['value'],
					reason_committee_pref: actualData[10]['value'],
					top_port_pref: actualData[11]['value'],
					just_countery: actualData[12]['value'],
					exp_as_del: actualData[13]['value'],
					additional_questions: actualData[14]['value'],
					mahe_learner_id: actualData[17]['value'],
					team_ref_id: teamRefId,
					is_team_leader: true,
					status: 'unconfirmed'
				});
				////////////////////////////////////////////////////converting to integer
				munTeams.insertOne({
					team_name: actualData[16]['value'],
					team_capacity: Number(actualData[15]['value']),
					mahe_team: true,
					current_capacity: 1,
					join_code: generatedCode,
					joinable: true,
					team_ref_id: teamRefId,
					status: 'unconfirmed'
				});
				// understand how fees work
				// if team payment add the following fields
				// team_name, pass_type -> Team, invite_code, team_capacity, current_capacity
				//////////////////////////////////////////////////////converting to integer
				let amountToPay = CURRENT_PRICE_MAHE * Number(actualData[15]['value']);
				munUserPayment.insertOne({
					user_name: session.user.name,
					user_email: session.user.email,
					mobile_number: actualData['mobileNumber'],
					amount_to_pay: amountToPay,
					pass_type: 'Team Pass',
					status: 'created',
					reference_id: uuidv4()
				});
				throw redirect(302, `/payment`);
			}
			// console.log(actualData);


		} else {
			console.log('Error occured');
			// make a ? route to display error to the user;
			// frontend
		}
	}
};
