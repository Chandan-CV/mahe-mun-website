import { redirect } from '@sveltejs/kit';
import * as dotenv from 'dotenv';
dotenv.config();
import { MongoClient } from 'mongodb';
import Razorpay from 'razorpay';

const cstring = process.env.MONGO_URL;
const razorpayInstance = new Razorpay({
	//@ts-ignore
	key_id: process.env.RAZORPAY_ID,
	key_secret: process.env.RAZORPAY_SECRET
});
//@ts-ignore
const client = new MongoClient(cstring);
const db = client.db(process.env.MONGO_DB_NAME);
const munUserInfo = db.collection('mun_user_info');
const munUserPayment = db.collection('mun_user_payments');
const projection = {
	_id: 0
};

//@ts-ignore
export const load = async (event) => {
	const session = await event.locals.getSession();
	if (!session?.user) {
		// check for this path and show an error to the user
		throw redirect(301, '/?auth');
	}

	const paymentFound = await munUserPayment.findOne({ email_id: session.user.email });
	if (paymentFound == null) {
		throw redirect(301, '/?cancelled');
	}
	//@ts-ignore
	let generatedRazorLink = await razorpayInstance.paymentLink
		.create({
			reference_id: paymentFound['reference_id'],
			// amount to be entered in paise
			amount: paymentFound['amount_to_pay'],
			currency: 'INR',
			// no partial payments allowed
			accept_partial: false,
			description: 'MAHE-MUN Registeration Fees',
			customer: {
				name: session.user.name || paymentFound['user_name'],
				email: session.user.email || paymentFound['user_email'],
				contact: paymentFound['mobile_number'] || '+910000000000'
			},
			notify: {
				email: true,
				sms: true
			},
			reminder_enable: false,
			notes: {
				name: session.user.name || paymentFound['user_name'],
				type: paymentFound['pass_type'],
				//@ts-ignore
				sessionemail: session.user.email
			},
			callback_url: process.env.ORIGIN + '/pay/callback/' + paymentFound['reference_id']
		})
		.catch(() => {
			throw redirect(302, '/?cancelled');
		});

	munUserPayment.updateOne(
		{
			user_email: session.user.email,
			user_name: session.user.name,
			status: 'created'
		},
		{
			$set: {
				razor_url: generatedRazorLink.short_url,
				status: generatedRazorLink.status,
				razor_link_id: generatedRazorLink.id
			}
		}
	);

	return { link: generatedRazorLink.short_url };
};
