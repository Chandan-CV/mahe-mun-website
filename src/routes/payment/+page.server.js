import { redirect } from '@sveltejs/kit';
import * as dotenv from 'dotenv';
dotenv.config();
import { MongoClient } from 'mongodb';
import Razorpay from 'razorpay';
import { v4 as uuidv4 } from 'uuid';

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
const munTeams = db.collection('mun_teams');
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

	// find the latest payment created by the user
	const latestCreatedPayment = await munUserPayment.findOne(
		{
			user_email: session.user.email
		},
		{ sort: { $natural: -1 } }
	);

	if (latestCreatedPayment != null) {
		// console.log(latestCreatedPayment);
		// check the current status
		if (latestCreatedPayment['status'] == 'created') {
			// check if the payment link is already created or not
			if (typeof latestCreatedPayment['razor_link_id'] == 'undefined') {
				// if no existing payment link is found
				// create a new payment link using the reference_id present in the db
				// reference_id is very important for confirming and fetching paymentInformation
				let generatedRazorLink = await generatePaymentLink(
					session,
					latestCreatedPayment,
					latestCreatedPayment['reference_id']
				);
				updatePaymentsRecord(session, generatedRazorLink, latestCreatedPayment['reference_id']);
				return { link: generatedRazorLink.short_url };
			} else if (typeof latestCreatedPayment['razor_link_id'] != 'undefined') {
				// if existing payment link is found,
				// fetch the current status of the payment
				let getPaymentInfoRazor = await razorpayInstance.paymentLink.fetch(
					latestCreatedPayment['razor_link_id']
				);
				// console.log(getPaymentInfoRazor);
				// if the current status is created => not paid
				if (getPaymentInfoRazor.status == 'created') {
					console.log('Already Created Payment is VALID');
					// redirect to the razor pay link already created
					return { link: latestCreatedPayment['razor_url'] };
				// if the current status is either cancelled or created => payment link no longer valid
				} else if (
					getPaymentInfoRazor.status == 'cancelled' ||
					getPaymentInfoRazor.status == 'expired'
				) {
					console.log('Already Created Payment is CANCELLED');
					// reference id for each payment must be unique
					// for new payment new uuidv4 is generated
					let newReferenceId = uuidv4();
					// new payment link generation
					let generatedRazorLink = await generatePaymentLink(
						session,
						latestCreatedPayment,
						newReferenceId
					);
					// update the same in the db
					await updatePaymentsRecord(session, generatedRazorLink, getPaymentInfoRazor.reference_id);
					return { link: generatedRazorLink.short_url };
				// this case can happen when redirect doesn't work -> Could be due to poor internet or the user closed the tab
				} else if (getPaymentInfoRazor.status == 'paid') {
					// update the payments record with the new status
					await updatePaymentsRecord(
						session,
						getPaymentInfoRazor,
						getPaymentInfoRazor.reference_id
					);
					// find out the user type
					let foundUser = await munUserInfo.findOne({ user_email: session.user.email });
					if (foundUser != null) {
						// confirm the user
						await munUserInfo.updateOne(
							{ user_email: session.user.email },
							{ $set: { status: 'confirmed' } }
						);
						// if reg type is team then confirm the team as well
						// since only the team leader will access the payments page
						if (foundUser['reg_type'] == 'team') {
							await munTeams.updateOne(
								{ team_ref_id: foundUser['team_ref_id'] },
								{ $set: { status: 'confirmed' } }
							);
						}
						throw redirect(302, '/dashboard');
					}
				// just in case, but we will never reach this block -> look at razorpays payment link statuses
				} else {
					throw redirect(302, '/?unhandelledPaymentStatus');
				}
			}
		// if the status of the payment is already set as cancelled or expired then generate a new link and redirect the user
		} else if (
			latestCreatedPayment['status'] == 'cancelled' ||
			latestCreatedPayment['status'] == 'expired'
		) {
			console.log('Already Cancelled Payment => Regenerating');
			let newReferenceId = uuidv4();
			let generatedRazorLink = await generatePaymentLink(
				session,
				latestCreatedPayment,
				newReferenceId
			);
			updatePaymentsRecord(session, generatedRazorLink, latestCreatedPayment['reference_id']);
			return { link: generatedRazorLink.short_url };
		}
	// if no payment exists return to homepage
	} else {
		throw redirect(302, '/');
	}

	// const paymentFound = await munUserPayment.findOne(
	// 	{
	// 		user_email: session.user.email,
	// 		status: 'created'
	// 	},
	// 	{ sort: { $natural: -1 } }
	// );
	// if (paymentFound == null) {
	// 	// console.log('something here no payments found');
	// 	const userFound = await munUserInfo.findOne({
	// 		user_email: session.user.email,
	// 		status: 'unconfirmed'
	// 	});
	// 	if (userFound != null) {
	// 		const paymentFound = await munUserPayment.findOne(
	// 			{
	// 				user_email: session.user.email
	// 			},
	// 			{ sort: { $natural: -1 } }
	// 		);
	// 		if (paymentFound != null) {
	// 			console.log(paymentFound);
	// 			console.log('No Existing payment, but status unconfirmed => Create new payment');
	// 			let generatedRazorLink = await generatePaymentLink(session, paymentFound);
	// 			updatePaymentsRecord(session, paymentFound['status'], generatedRazorLink, 'created');

	// 			//@ts-ignore
	// 			return { link: generatedRazorLink.short_url };
	// 		}
	// 	}
	// 	throw redirect(301, '/?hellothere');
	// }
	// console.log(paymentFound);
	// if (
	// 	paymentFound['reference_id'] != undefined &&
	// 	paymentFound['razor_link_id'] != undefined &&
	// 	paymentFound['razor_url'] != undefined
	// ) {
	// 	console.log('existing payment');
	// 	let getPaymentInfoRazor = await razorpayInstance.paymentLink.fetch(
	// 		paymentFound['razor_link_id']
	// 	);
	// 	if (getPaymentInfoRazor.status === 'paid') {
	// 		await munUserPayment.updateOne(
	// 			{
	// 				user_email: session.user.email,
	// 				reference_id: paymentFound['reference_id'],
	// 				razor_link_id: paymentFound['razor_link_id'],
	// 				razor_url: paymentFound['razor_url']
	// 			},
	// 			{ $set: { status: getPaymentInfoRazor.status } }
	// 		);
	// 		let foundUser = await munUserInfo.findOne({
	// 			user_email: session.user.email
	// 		});
	// 		if (foundUser == null) {
	// 			throw redirect(302, '/?cancelled');
	// 		} else {
	// 			if (foundUser['reg_type'] == 'team') {
	// 				await munUserInfo.updateOne(
	// 					{ user_email: session.user.email },
	// 					{ $set: { status: 'confirmed' } }
	// 				);
	// 				if (foundUser['is_team_leader'] == true) {
	// 					await munTeams.updateOne(
	// 						{
	// 							team_ref_id: foundUser['team_ref_id']
	// 						},
	// 						{ $set: { status: 'confirmed' } }
	// 					);
	// 				}
	// 			} else if (foundUser['reg_type'] == 'individual') {
	// 				await munUserInfo.updateOne(
	// 					{ user_email: session.user.email },
	// 					{ $set: { status: 'confirmed' } }
	// 				);
	// 			}
	// 		}
	// 		throw redirect(302, '/dashboard');
	// 	} else if (
	// 		getPaymentInfoRazor.status == 'expired' ||
	// 		getPaymentInfoRazor.status == 'cancelled'
	// 	) {
	// 		// await munUserPayment.updateOne(
	// 		// 	{
	// 		// 		user_email: session.user.email,
	// 		// 		reference_id: paymentFound['reference_id'],
	// 		// 		razor_link_id: paymentFound['razor_link_id'],
	// 		// 		razor_url: paymentFound['razor_url']
	// 		// 	},
	// 		// 	{ $set: { status: getPaymentInfoRazor.status } }
	// 		// );

	// 		let generatedRazorLink = await generatePaymentLink(session, paymentFound);
	// 		updatePaymentsRecord(session, paymentFound['status'], generatedRazorLink, 'created');

	// 		//@ts-ignore
	// 		return { link: generatedRazorLink.short_url };
	// 	} else {
	// 		return { link: getPaymentInfoRazor.short_url };
	// 	}
	// }
	// //@ts-ignore
	// let generatedRazorLink = await generatePaymentLink(session, paymentFound);
	// updatePaymentsRecord(session, 'created', generatedRazorLink, 'created');

	// console.log('payment created');

	// //@ts-ignore
	// return { link: generatedRazorLink.short_url };
};

//@ts-ignore
async function generatePaymentLink(session, paymentFound, newReferenceId) {
	let generatedRazorLink = await razorpayInstance.paymentLink
		.create({
			reference_id: newReferenceId,
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
				email: false,
				sms: false
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

	return generatedRazorLink;
}
//@ts-ignore
async function updatePaymentsRecord(session, generatedRazorLink, oldReferenceId) {
	await munUserPayment.updateOne(
		{
			user_email: session.user.email,
			user_name: session.user.name,
			reference_id: oldReferenceId
		},
		{
			$set: {
				reference_id: generatedRazorLink.reference_id,
				razor_url: generatedRazorLink.short_url,
				status: generatedRazorLink.status,
				razor_link_id: generatedRazorLink.id
			}
		}
	);
}
