import { redirect } from '@sveltejs/kit';
import { MongoClient } from 'mongodb';
import * as dotenv from 'dotenv';
import Razorpay from 'razorpay';
dotenv.config();

const cstring = process.env.MONGO_URL;
const razorpayInstance = new Razorpay({
	//@ts-ignore
	key_id: process.env.RAZORPAY_ID,
	key_secret: process.env.RAZORPAY_SECRET
});
//@ts-ignore
const client = new MongoClient(cstring);
const db = client.db(process.env.MONGO_DB_NAME);
const munUserPayment = db.collection('mun_user_payments');
const munUserInfo = db.collection('mun_user_info');
const munTeams = db.collection('mun_teams');

export const load = async (event) => {
	const params = event.params;
	const session = await event.locals.getSession();
	if (!session?.user) {
		throw redirect(302, '/payment');
	}
	if (!params.slug) {
		throw redirect(302, '/payment');
	}

	let paymentFound = await munUserPayment.findOne({
		reference_id: params.slug,
		user_email: session.user.email,
		status: 'created'
	});
	if (paymentFound == null) {
		throw redirect(302, '/form');
	}

	let getPaymentInfoRazor = await razorpayInstance.paymentLink.fetch(paymentFound['razor_link_id']);
	if (getPaymentInfoRazor == null) {
		throw redirect(302, '/form');
	}

	munUserPayment.findOneAndUpdate(
		{ reference_id: getPaymentInfoRazor.reference_id },
		{ $set: { status: getPaymentInfoRazor.status } }
	);
    console.log(getPaymentInfoRazor);
	if (getPaymentInfoRazor.status != 'paid') {
		return { res: 'Payment unprocessed', redirect: '/' };
	} else {
		const userFound = await munUserInfo.findOne({ user_email: session.user.email });
		//@ts-ignore
		if (userFound['reg_type'] == 'team') {
			munUserInfo.updateOne({ user_email: session.user.email }, { $set: { status: 'confirmed' } });
			//@ts-ignore
			if (userFound['is_team_leader'] == true) {
				munTeams.updateOne(
					//@ts-ignore
					{ team_ref_id: userFound['team_ref_id'] },
					{ $set: { status: 'confirmed' } }
				);
			}
			//@ts-ignore
		} else if (userFound['reg_type'] == 'individual') {
			munUserInfo.updateOne({ user_email: session.user.email }, { $set: { status: 'confirmed' } });
		}
		return { res: 'Payment successfull', redirect: '/dashboard' };
	}
};
