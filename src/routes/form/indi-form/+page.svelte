<script lang="ts">
	import Footer from '../../../components/Footer.svelte';
	import Navbar from '../../../components/Navbar.svelte';
	import ErrorBar from '../../../components/ErrorBar.svelte';
	import InputField from '../../../components/InputField.svelte';
	import { enhance } from '$app/forms';
	import RegisterationContact from '../../../components/RegisterationContact.svelte';

	export let data;
	let firstName: string = '';
	let lastName: string = '';
	//@ts-ignore
	let userAge: string = null;
	//@ts-ignore
	let mobileNumber: string = null;
	let institutionName: string = '';
	//@ts-ignore
	let firstPref: string;
	//@ts-ignore
	let secondPref: string;
	//@ts-ignore
	let thirdPref: string;
	//@ts-ignore
	let firstMunAnswer: string;
	//@ts-ignore
	let accomodationRequired: string;
	//@ts-ignore
	let reasonCommitteePref: string = '';
	let topPortPref: string = '';
	let justCountry: string = '';
	let expAsDel: string = '';
	let additionalQuestions: string = '';
	let error: boolean = false;
	let maheStudent: string = '';
	let showLearnerId: boolean = false;
	let manipalLearnerId: string = '';
	let formErrors = {
		nameError: [false, ''],
		userAgeError: [false, ''],
		numDelError: [false, ''],
		mobileNumError: [false, ''],
		selectionError: [false, ''],
		manipalLearnerError: [false, '']
	};
	//@ts-ignore
	function submitForm({ formData }) {
		console.log(!Object.values(formErrors)[0].includes(true));
		//@ts-ignore
		if (
			firstName &&
			lastName &&
			parseInt(userAge) >= 16 &&
			institutionName &&
			//@ts-ignore
			firstPref &&
			//@ts-ignore
			secondPref &&
			//@ts-ignore
			thirdPref &&
			// @ts-ignore
			firstMunAnswer &&
			reasonCommitteePref.length > 2 &&
			topPortPref.length > 2 &&
			justCountry.length > 2 &&
			expAsDel.length > 2 &&
			additionalQuestions.length > 2 &&
			!Object.values(formErrors)[1].includes(true)
		) {
			if (firstPref === secondPref || secondPref === thirdPref || firstPref === thirdPref) {
				formErrors['selectionError'] = [true, ''];
				error = true;
				document.body.scrollIntoView();
				setTimeout(() => {
					error = false;
				}, 5000);
			}
			formData.set('firstName', firstName);
			formData.set('lastName', lastName);
			formData.set('userAge', userAge);
			formData.set('mobileNumber', mobileNumber);
			formData.set('institutionName', institutionName);
			//@ts-ignore
			formData.set('firstPref', firstPref);
			//@ts-ignore
			formData.set('secondPref', secondPref);
			//@ts-ignore
			formData.set('thirdPref', thirdPref);
			//@ts-ignore
			formData.set('firstMunAnswer', firstMunAnswer);
			//@ts-ignore
			formData.set('accomodationRequired', accomodationRequired);
			formData.set('reasonCommitteePref', reasonCommitteePref);
			formData.set('topPortPref', topPortPref);
			formData.set('justCountry', justCountry);
			formData.set('expAsDel', expAsDel);
			formData.set('additionalQuestions', additionalQuestions);
		} else {
			error = true;
			document.body.scrollIntoView();
			setTimeout(() => {
				error = false;
			}, 5000);
		}
	}

	function validateUserAge() {
		//@ts-ignore
		if (!/^\d+$/.test(userAge)) {
			formErrors['userAgeError'] = [true, 'Enter an integer'];
		} else if (Number(userAge) <= 17) {
			formErrors['userAgeError'] = [true, 'Under the age limit for this mun'];
		} else {
			formErrors['userAgeError'] = [false, ''];
		}
	}

	function validateMobileNumber() {
		console.log(Number(mobileNumber).toString().length);
		if (!/^\d+$/.test(mobileNumber)) {
			formErrors['mobileNumError'] = [true, 'Enter an integer'];
		} else if (Number(mobileNumber).toString().length != 10) {
			formErrors['mobileNumError'] = [true, 'Enter a valid mobile number'];
		} else {
			formErrors['mobileNumError'] = [false, ''];
		}
	}

	function validateManipalLearnerId() {
		if (!manipalLearnerId.includes('learner.manipal.edu')) {
			formErrors['manipalLearnerError'] = [true, 'Enter a valid email id'];
		} else {
			formErrors['manipalLearnerError'] = [false, ''];
		}
	}

	$: if (maheStudent === 'YES') {
		showLearnerId = true;
	} else {
		showLearnerId = false;
	}

	$: console.log(firstName);
</script>

<body class="bg-gradient-to-b from-[#0E2954] via-[#1F6E8C] to-[#2E8A99]">
	<Navbar userState={data} />
	{#if error}
		<ErrorBar message="Please fill all the form fields carefully" />
	{/if}
	<!-- <div class="flex justify-center items-center w-screen h-screen bg-white"> -->
	<!-- COMPONENT CODE -->
	<form
		action="?/register"
		method="post"
		use:enhance={(event) => {
			submitForm(event);
			return async ({ update }) => {
				update({ reset: false });
			};
		}}
	>
		<div class="container mx-auto my-4 px-4 lg:px-20">
			<!-- <div class="mb-4 overflow-hidden rounded-lg shadow-lg"> -->
			<div
				class="px-6 py-8 bg-white dark:bg-gray-800 sm:p-10 sm:pb-6 bg-blue-900 md:col-span-4 p-10 text-white w-full p-8 my-4 md:px-12 lg:w-9/12 lg:pl-20 lg:pr-40 mr-auto rounded-2xl shadow-2x"
			>
				<div class="flex justify-center">
					<span
						class="inline-flex px-4 py-1 text-sm font-semibold leading-5 tracking-wide uppercase rounded-full dark:text-white"
					>
						Registeration Fees (MAHE)
					</span>
				</div>
				<div class="flex justify-center mt-4 text-6xl font-extrabold leading-none dark:text-white">
					<span class="ml-1 mr-3 text-xl font-medium leading-8 text-gray-500 dark:text-gray-400">
						Round 1
					</span>
					₹1050
					<span class="pt-8 ml-1 text-2xl font-medium leading-8 text-gray-500 dark:text-gray-400">
						/Delegate
					</span>
				</div>
			</div>
			<div
				class="px-6 py-8 bg-white dark:bg-gray-800 sm:p-10 sm:pb-6 bg-blue-900 md:col-span-4 p-10 text-white w-full p-8 my-4 md:px-12 lg:w-9/12 lg:pl-20 lg:pr-40 mr-auto rounded-2xl shadow-2x"
			>
				<div class="flex justify-center">
					<span
						class="inline-flex px-4 py-1 text-sm font-semibold leading-5 tracking-wide uppercase rounded-full dark:text-white"
					>
						Registeration Fees (NON-MAHE)
					</span>
				</div>
				<div class="flex justify-center mt-4 text-6xl font-extrabold leading-none dark:text-white">
					<span class="ml-1 mr-3 text-xl font-medium leading-8 text-gray-500 dark:text-gray-400">
						Round 1
					</span>
					₹1650
					<span class="pt-8 ml-1 text-2xl font-medium leading-8 text-gray-500 dark:text-gray-400">
						/Delegate
					</span>
				</div>
			</div>

			<!-- </div> -->

			<div
				class="bg-blue-900 md:col-span-4 p-10 text-white w-full p-8 my-4 md:px-12 lg:w-9/12 lg:pl-20 lg:pr-40 mr-auto rounded-2xl shadow-2xl"
			>
				<p class="mt-4 text-sm leading-7 font-regular uppercase">Contact</p>
				<h3 class="text-3xl sm:text-4xl leading-normal font-extrabold tracking-tight">
					Get In <span class="text-indigo-600">Touch</span>
				</h3>
				<div class="flex items-center mt-5">
					<svg
						class="h-6 mr-2 text-indigo-600"
						fill="currentColor"
						version="1.1"
						id="Capa_1"
						xmlns="http://www.w3.org/2000/svg"
						xmlns:xlink="http://www.w3.org/1999/xlink"
						x="0px"
						y="0px"
						viewBox="0 0 60.002 60.002"
						style="enable-background:new 0 0 60.002 60.002;"
						xml:space="preserve"
					>
						<g>
							<path
								d="M59.002,37.992c-3.69,0-6.693-3.003-6.693-6.693c0-0.553-0.447-1-1-1s-1,0.447-1,1c0,4.794,3.899,8.693,8.693,8.693
			c0.553,0,1-0.447,1-1S59.554,37.992,59.002,37.992z"
							/>
							<path
								d="M58.256,35.65c0.553,0,1-0.447,1-1s-0.447-1-1-1c-0.886,0-1.605-0.72-1.605-1.605c0-0.553-0.447-1-1-1s-1,0.447-1,1
			C54.65,34.033,56.267,35.65,58.256,35.65z"
							/>
							<path
								d="M20.002,2.992c3.691,0,6.693,3.003,6.693,6.693c0,0.553,0.448,1,1,1s1-0.447,1-1c0-4.794-3.9-8.693-8.693-8.693
			c-0.552,0-1,0.447-1,1S19.449,2.992,20.002,2.992z"
							/>
							<path
								d="M19.748,6.334c0,0.553,0.448,1,1,1c0.885,0,1.604,0.72,1.604,1.605c0,0.553,0.448,1,1,1s1-0.447,1-1
			c0-1.988-1.617-3.605-3.604-3.605C20.196,5.334,19.748,5.781,19.748,6.334z"
							/>
							<path
								d="M44.076,37.889c-1.276-0.728-2.597-0.958-3.721-0.646c-0.844,0.234-1.532,0.768-1.996,1.546
			c-1.02,1.22-2.286,2.646-2.592,2.867c-2.367,1.604-4.25,1.415-6.294-0.629L17.987,29.542c-2.045-2.045-2.233-3.928-0.631-6.291
			c0.224-0.31,1.65-1.575,2.87-2.596c0.778-0.464,1.312-1.152,1.546-1.996c0.311-1.123,0.082-2.444-0.652-3.731
			c-0.173-0.296-4.291-7.27-8.085-9.277c-1.926-1.019-4.255-0.669-5.796,0.872L4.7,9.059c-4.014,4.014-5.467,8.563-4.321,13.52
			c0.956,4.132,3.742,8.529,8.282,13.068l14.705,14.706c5.762,5.762,11.258,8.656,16.298,8.656c3.701,0,7.157-1.562,10.291-4.695
			l2.537-2.537c1.541-1.541,1.892-3.87,0.872-5.796C51.356,42.186,44.383,38.069,44.076,37.889z M51.078,50.363L48.541,52.9
			c-6.569,6.567-14.563,5.235-23.76-3.961L10.075,34.233c-4.271-4.271-6.877-8.344-7.747-12.104
			c-0.995-4.301,0.244-8.112,3.786-11.655l2.537-2.537c0.567-0.566,1.313-0.862,2.07-0.862c0.467,0,0.939,0.112,1.376,0.344
			c3.293,1.743,7.256,8.454,7.29,8.511c0.449,0.787,0.62,1.608,0.457,2.196c-0.1,0.36-0.324,0.634-0.684,0.836l-0.15,0.104
			c-0.853,0.712-2.883,2.434-3.308,3.061c-0.612,0.904-1.018,1.792-1.231,2.665c-0.711-1.418-1.286-3.06-1.475-4.881
			c-0.057-0.548-0.549-0.935-1.098-0.892c-0.549,0.058-0.949,0.549-0.892,1.099c0.722,6.953,6.129,11.479,6.359,11.668
			c0.025,0.02,0.054,0.028,0.08,0.045l10.613,10.613c0.045,0.045,0.092,0.085,0.137,0.129c0.035,0.051,0.058,0.108,0.104,0.154
			c0.189,0.187,4.704,4.567,11.599,5.283c0.035,0.003,0.07,0.005,0.104,0.005c0.506,0,0.94-0.383,0.994-0.896
			c0.057-0.55-0.342-1.041-0.892-1.099c-2.114-0.219-3.987-0.839-5.548-1.558c0.765-0.23,1.543-0.612,2.332-1.146
			c0.628-0.426,2.35-2.455,3.061-3.308l0.104-0.151c0.202-0.359,0.476-0.583,0.836-0.684c0.588-0.159,1.409,0.008,2.186,0.45
			c0.067,0.04,6.778,4.003,8.521,7.296C52.202,48.062,51.994,49.447,51.078,50.363z"
							/>
						</g>
					</svg>
					<span
						>Deputy Secretary General <span class="text-sm leading-normal font-extrabold tracking-tight">Eshan:</span>&nbsp;</span
					>
					<span class="text-sm">+93 6302 504 562</span>
				</div>
				<div class="flex items-center mt-5">
					<svg
						class="h-6 mr-2 text-indigo-600"
						fill="currentColor"
						version="1.1"
						id="Capa_1"
						xmlns="http://www.w3.org/2000/svg"
						xmlns:xlink="http://www.w3.org/1999/xlink"
						x="0px"
						y="0px"
						viewBox="0 0 60.002 60.002"
						style="enable-background:new 0 0 60.002 60.002;"
						xml:space="preserve"
					>
						<g>
							<path
								d="M59.002,37.992c-3.69,0-6.693-3.003-6.693-6.693c0-0.553-0.447-1-1-1s-1,0.447-1,1c0,4.794,3.899,8.693,8.693,8.693
			c0.553,0,1-0.447,1-1S59.554,37.992,59.002,37.992z"
							/>
							<path
								d="M58.256,35.65c0.553,0,1-0.447,1-1s-0.447-1-1-1c-0.886,0-1.605-0.72-1.605-1.605c0-0.553-0.447-1-1-1s-1,0.447-1,1
			C54.65,34.033,56.267,35.65,58.256,35.65z"
							/>
							<path
								d="M20.002,2.992c3.691,0,6.693,3.003,6.693,6.693c0,0.553,0.448,1,1,1s1-0.447,1-1c0-4.794-3.9-8.693-8.693-8.693
			c-0.552,0-1,0.447-1,1S19.449,2.992,20.002,2.992z"
							/>
							<path
								d="M19.748,6.334c0,0.553,0.448,1,1,1c0.885,0,1.604,0.72,1.604,1.605c0,0.553,0.448,1,1,1s1-0.447,1-1
			c0-1.988-1.617-3.605-3.604-3.605C20.196,5.334,19.748,5.781,19.748,6.334z"
							/>
							<path
								d="M44.076,37.889c-1.276-0.728-2.597-0.958-3.721-0.646c-0.844,0.234-1.532,0.768-1.996,1.546
			c-1.02,1.22-2.286,2.646-2.592,2.867c-2.367,1.604-4.25,1.415-6.294-0.629L17.987,29.542c-2.045-2.045-2.233-3.928-0.631-6.291
			c0.224-0.31,1.65-1.575,2.87-2.596c0.778-0.464,1.312-1.152,1.546-1.996c0.311-1.123,0.082-2.444-0.652-3.731
			c-0.173-0.296-4.291-7.27-8.085-9.277c-1.926-1.019-4.255-0.669-5.796,0.872L4.7,9.059c-4.014,4.014-5.467,8.563-4.321,13.52
			c0.956,4.132,3.742,8.529,8.282,13.068l14.705,14.706c5.762,5.762,11.258,8.656,16.298,8.656c3.701,0,7.157-1.562,10.291-4.695
			l2.537-2.537c1.541-1.541,1.892-3.87,0.872-5.796C51.356,42.186,44.383,38.069,44.076,37.889z M51.078,50.363L48.541,52.9
			c-6.569,6.567-14.563,5.235-23.76-3.961L10.075,34.233c-4.271-4.271-6.877-8.344-7.747-12.104
			c-0.995-4.301,0.244-8.112,3.786-11.655l2.537-2.537c0.567-0.566,1.313-0.862,2.07-0.862c0.467,0,0.939,0.112,1.376,0.344
			c3.293,1.743,7.256,8.454,7.29,8.511c0.449,0.787,0.62,1.608,0.457,2.196c-0.1,0.36-0.324,0.634-0.684,0.836l-0.15,0.104
			c-0.853,0.712-2.883,2.434-3.308,3.061c-0.612,0.904-1.018,1.792-1.231,2.665c-0.711-1.418-1.286-3.06-1.475-4.881
			c-0.057-0.548-0.549-0.935-1.098-0.892c-0.549,0.058-0.949,0.549-0.892,1.099c0.722,6.953,6.129,11.479,6.359,11.668
			c0.025,0.02,0.054,0.028,0.08,0.045l10.613,10.613c0.045,0.045,0.092,0.085,0.137,0.129c0.035,0.051,0.058,0.108,0.104,0.154
			c0.189,0.187,4.704,4.567,11.599,5.283c0.035,0.003,0.07,0.005,0.104,0.005c0.506,0,0.94-0.383,0.994-0.896
			c0.057-0.55-0.342-1.041-0.892-1.099c-2.114-0.219-3.987-0.839-5.548-1.558c0.765-0.23,1.543-0.612,2.332-1.146
			c0.628-0.426,2.35-2.455,3.061-3.308l0.104-0.151c0.202-0.359,0.476-0.583,0.836-0.684c0.588-0.159,1.409,0.008,2.186,0.45
			c0.067,0.04,6.778,4.003,8.521,7.296C52.202,48.062,51.994,49.447,51.078,50.363z"
							/>
						</g>
					</svg>
					<span
						>Under-Secretary General (USG) Delegate Affairs <span class="text-sm leading-normal font-extrabold tracking-tight">Aayush</span>:&nbsp;</span
					>
					<br />
					<span class="text-sm">+93 9099 060 271</span>
				</div>
				<div class="flex items-center mt-5">
					<svg
						class="h-6 mr-2 text-indigo-600"
						fill="currentColor"
						version="1.1"
						id="Capa_1"
						xmlns="http://www.w3.org/2000/svg"
						xmlns:xlink="http://www.w3.org/1999/xlink"
						x="0px"
						y="0px"
						viewBox="0 0 60.002 60.002"
						style="enable-background:new 0 0 60.002 60.002;"
						xml:space="preserve"
					>
						<g>
							<path
								d="M59.002,37.992c-3.69,0-6.693-3.003-6.693-6.693c0-0.553-0.447-1-1-1s-1,0.447-1,1c0,4.794,3.899,8.693,8.693,8.693
			c0.553,0,1-0.447,1-1S59.554,37.992,59.002,37.992z"
							/>
							<path
								d="M58.256,35.65c0.553,0,1-0.447,1-1s-0.447-1-1-1c-0.886,0-1.605-0.72-1.605-1.605c0-0.553-0.447-1-1-1s-1,0.447-1,1
			C54.65,34.033,56.267,35.65,58.256,35.65z"
							/>
							<path
								d="M20.002,2.992c3.691,0,6.693,3.003,6.693,6.693c0,0.553,0.448,1,1,1s1-0.447,1-1c0-4.794-3.9-8.693-8.693-8.693
			c-0.552,0-1,0.447-1,1S19.449,2.992,20.002,2.992z"
							/>
							<path
								d="M19.748,6.334c0,0.553,0.448,1,1,1c0.885,0,1.604,0.72,1.604,1.605c0,0.553,0.448,1,1,1s1-0.447,1-1
			c0-1.988-1.617-3.605-3.604-3.605C20.196,5.334,19.748,5.781,19.748,6.334z"
							/>
							<path
								d="M44.076,37.889c-1.276-0.728-2.597-0.958-3.721-0.646c-0.844,0.234-1.532,0.768-1.996,1.546
			c-1.02,1.22-2.286,2.646-2.592,2.867c-2.367,1.604-4.25,1.415-6.294-0.629L17.987,29.542c-2.045-2.045-2.233-3.928-0.631-6.291
			c0.224-0.31,1.65-1.575,2.87-2.596c0.778-0.464,1.312-1.152,1.546-1.996c0.311-1.123,0.082-2.444-0.652-3.731
			c-0.173-0.296-4.291-7.27-8.085-9.277c-1.926-1.019-4.255-0.669-5.796,0.872L4.7,9.059c-4.014,4.014-5.467,8.563-4.321,13.52
			c0.956,4.132,3.742,8.529,8.282,13.068l14.705,14.706c5.762,5.762,11.258,8.656,16.298,8.656c3.701,0,7.157-1.562,10.291-4.695
			l2.537-2.537c1.541-1.541,1.892-3.87,0.872-5.796C51.356,42.186,44.383,38.069,44.076,37.889z M51.078,50.363L48.541,52.9
			c-6.569,6.567-14.563,5.235-23.76-3.961L10.075,34.233c-4.271-4.271-6.877-8.344-7.747-12.104
			c-0.995-4.301,0.244-8.112,3.786-11.655l2.537-2.537c0.567-0.566,1.313-0.862,2.07-0.862c0.467,0,0.939,0.112,1.376,0.344
			c3.293,1.743,7.256,8.454,7.29,8.511c0.449,0.787,0.62,1.608,0.457,2.196c-0.1,0.36-0.324,0.634-0.684,0.836l-0.15,0.104
			c-0.853,0.712-2.883,2.434-3.308,3.061c-0.612,0.904-1.018,1.792-1.231,2.665c-0.711-1.418-1.286-3.06-1.475-4.881
			c-0.057-0.548-0.549-0.935-1.098-0.892c-0.549,0.058-0.949,0.549-0.892,1.099c0.722,6.953,6.129,11.479,6.359,11.668
			c0.025,0.02,0.054,0.028,0.08,0.045l10.613,10.613c0.045,0.045,0.092,0.085,0.137,0.129c0.035,0.051,0.058,0.108,0.104,0.154
			c0.189,0.187,4.704,4.567,11.599,5.283c0.035,0.003,0.07,0.005,0.104,0.005c0.506,0,0.94-0.383,0.994-0.896
			c0.057-0.55-0.342-1.041-0.892-1.099c-2.114-0.219-3.987-0.839-5.548-1.558c0.765-0.23,1.543-0.612,2.332-1.146
			c0.628-0.426,2.35-2.455,3.061-3.308l0.104-0.151c0.202-0.359,0.476-0.583,0.836-0.684c0.588-0.159,1.409,0.008,2.186,0.45
			c0.067,0.04,6.778,4.003,8.521,7.296C52.202,48.062,51.994,49.447,51.078,50.363z"
							/>
						</g>
					</svg>
					<span
						>Under-Secretary General (USG) Delegate Affairs <span class="text-sm leading-normal font-extrabold tracking-tight">Divya</span>:&nbsp;</span
					>
					<span class="text-sm">+91 6385 129 850</span>
				</div>
			</div>

			<div
				class="w-full p-8 my-4 md:px-12 lg:w-9/12 lg:pl-20 lg:pr-40 mr-auto rounded-2xl shadow-2xl"
			>
				<div class="flex">
					<h1 class="font-bold uppercase text-5xl text-white">Please fill the below <br /> form</h1>
				</div>
				<div class="grid grid-cols-1 gap-5 md:grid-cols-2 mt-5">
					<InputField
						labelName="First Name*"
						placeholderName="First Name"
						errorText=" "
						bind:value={firstName}
					/>
					<InputField
						labelName="Last Name*"
						placeholderName="Last Name"
						errorText=" "
						bind:value={lastName}
					/>
					<div class="mb-2">
						<label
							for="helper-text"
							class="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
							>Are You a MAHE Student ?*</label
						>
						<select
							name=""
							id=""
							class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
							bind:value={maheStudent}
						>
							<option value="" selected disabled>MAHE STUDENT</option>
							<option value="YES">YES</option>
							<option value="NO">NO</option>
						</select>
					</div>
					{#if showLearnerId}
						<InputField
							placeholderName="Manipal Learner ID"
							labelName="Manipal Learner ID"
							errorText={formErrors.manipalLearnerError[1].toString()}
							bind:value={manipalLearnerId}
							on:input={validateManipalLearnerId}
						/>
					{/if}
					<InputField
						placeholderName="Age"
						labelName="Age"
						errorText=" "
						bind:value={userAge}
						on:input={validateUserAge}
					/>
					<!-- <div class="mb-6"> -->

					<!-- {#if formErrors.userAgeError[0]}
						<p class="text-red-500 text-xs italic">{formErrors.userAgeError[1]}</p>
					{/if} -->
					<!-- </div> -->
					<InputField
						placeholderName="Whatsapp Number"
						labelName="Whatsapp Number"
						errorText={formErrors.mobileNumError[1].toString()}
						bind:value={mobileNumber}
						on:input={validateMobileNumber}
					/>
					<InputField
						placeholderName="Institution Name"
						labelName="Institution Name"
						bind:value={institutionName}
						errorText=" "
					/>
					<div class="mb-2">
						<label
							for="helper-text"
							class="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
							>Committee Preference*</label
						>
						<select
							name=""
							id=""
							class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
							bind:value={firstPref}
						>
							<option value="" selected disabled>Committee Preference</option>
							<option value="WHO">WHO</option>
							<option value="UNGA">UNGA</option>
							<option value="UNSC">UNSC</option>
							<option value="CRISIS">CRISIS</option>
							<option value="IPC">IPC</option>
						</select>
					</div>
					<div class="mb-2">
						<label
							for="helper-text"
							class="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
							>Second Committee Preference*</label
						>
						<select
							name=""
							id=""
							class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
							bind:value={secondPref}
						>
							<option value="" selected disabled>Committee Preference</option>
							<option value="WHO">WHO</option>
							<option value="UNGA">UNGA</option>
							<option value="UNSC">UNSC</option>
							<option value="CRISIS">CRISIS</option>
							<option value="IPC">IPC</option>
						</select>
					</div>
					<div class="mb-2">
						<label
							for="helper-text"
							class="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
							>Third Committee Preference*</label
						>
						<select
							name=""
							id=""
							class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
							bind:value={thirdPref}
						>
							<option value="" selected disabled>Committee Preference</option>
							<option value="WHO">WHO</option>
							<option value="UNGA">UNGA</option>
							<option value="UNSC">UNSC</option>
							<option value="CRISIS">CRISIS</option>
							<option value="IPC">IPC</option>
						</select>
					</div>

					<div class="mb-2">
						<label
							for="helper-text"
							class="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
							>Committee Preference*</label
						>
						<select
							name=""
							id=""
							class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
							bind:value={firstMunAnswer}
						>
							<option value="" selected disabled>Will this be your first MUN?*</option>
							<option value="YES">YES</option>
							<option value="NO">NO</option>
						</select>
					</div>
					<div class="mb-2">
						<label
							for="helper-text"
							class="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
							>Is Accomodation Required (Additional Charges)?*</label
						>
						<select
							name=""
							id=""
							class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
							bind:value={accomodationRequired}
						>
							<option value="" selected disabled
								>Do you want accomodation arranged for you? (Please note that additional costs will
								apply)</option
							>
							<option value="YES">YES</option>
							<option value="NO">NO</option>
						</select>
					</div>
				</div>
				<div class="my-4">
					<label
						for="helper-text"
						class="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
						>Please briefly explain the reason for your committee preference*</label
					>
					<textarea
						placeholder="Please briefly explain the reason for your committee preference*"
						class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
						bind:value={reasonCommitteePref}
					/>
				</div>
				<div class="my-4">
					<label
						for="helper-text"
						class="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
						>What are your top 3 portfolio preferences?*</label
					>
					<textarea
						placeholder=" "
						class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
						bind:value={topPortPref}
					/>
				</div>
				<div class="my-4">
					<label
						for="helper-text"
						class="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
						>Please explain how you would justify the country allocated to you*</label
					>
					<textarea
						placeholder=" "
						class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
						bind:value={justCountry}
					/>
				</div>
				<div class="my-4">
					<label
						for="helper-text"
						class="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
						>Please list out your past experiences. While listing your experience as a delegate,
						please follow the format [Conference Name and Place-Year-Committee- Country you
						Represented-Award Won(if any)]. If this is your first MUN, please write 'NA'*</label
					>
					<textarea
						placeholder="eg -> MUN-MAHE: Banglore 2022, Country - Sudan, Award Received - Best Delegate"
						class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
						bind:value={expAsDel}
					/>
				</div>
				<div class="my-4">
					<label
						for="helper-text"
						class="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
						>Is there any additional information you want us to know or any questions you would like
						to ask?</label
					>
					<textarea
						placeholder=" "
						class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
						bind:value={additionalQuestions}
					/>
				</div>

				<div class="my-2 w-1/2 lg:w-1/4">
					<button
						class="uppercase text-sm font-bold tracking-wide bg-blue-900 text-gray-100 p-3 rounded-lg w-full
                      focus:outline-none focus:shadow-outline"
					>
						Submit
					</button>
				</div>
			</div>
		</div>
	</form>
	<Footer />
</body>
