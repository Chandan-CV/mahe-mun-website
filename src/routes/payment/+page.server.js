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
	console.log('something here');
	const session = await event.locals.getSession();
	if (!session?.user) {
		// check for this path and show an error to the user
		throw redirect(301, '/?auth');
	}

	const paymentFound = await munUserPayment.findOne({
		user_email: session.user.email,
		status: 'created',
	});
	if (paymentFound == null) {
		console.log('something here no payments found');
		throw redirect(301, '/?hellothere');
	}
	console.log(paymentFound);
	if (
		paymentFound['reference_id'] != undefined &&
		paymentFound['razor_link_id'] != undefined &&
		paymentFound['razor_url'] != undefined
	) {
		console.log('existing payment');
		return { link: paymentFound['razor_url'] };
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
			callback_url: process.env.ORIGIN + '/payment/callback/' + paymentFound['reference_id'],
			callback_method: 'get'
		})
		.catch((error) => {
			console.log(error);
			console.log('something');
			throw redirect(302, '/?error');
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
	console.log('payment created');

	return { link: generatedRazorLink.short_url };
};
