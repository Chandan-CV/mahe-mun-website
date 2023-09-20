<script lang="ts">
	import Footer from '../../../../components/Footer.svelte';
	import Navbar from '../../../../components/Navbar.svelte';
	import ErrorBar from '../../../../components/ErrorBar.svelte';
	import InputField from '../../../../components/InputField.svelte';
	import { enhance } from '$app/forms';

	export let data;

	let firstName: string = '';
	let lastName: string = '';
	//@ts-ignore
	let userAge: string = null;
	let error: boolean = false;
	let manipalLearnerId: string = '';
	let mobileNumber: string = '';
	let institutionName: string = '';

	let formErrors = {
		nameError: [false, ''],
		userAgeError: [false, ''],
		mobileNumError: [false, ''],
		manipalLearnerError: [false, '']
	};
	//@ts-ignore
	function submitForm({ formData }) {
		if (
			firstName &&
			lastName &&
			parseInt(userAge) >= 16 &&
			institutionName &&
			!Object.values(formErrors)[1].includes(true)
		) {
			formData.set('firstName', firstName);
			formData.set('lastName', lastName);
			formData.set('userAge', userAge);
			formData.set('mobileNumber', mobileNumber);
			formData.set('institutionName', institutionName);
			formData.set('learnerId', manipalLearnerId);
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

	function validateManipalLearnerId() {
		if (!manipalLearnerId.includes('learner.manipal.edu')) {
			formErrors['manipalLearnerError'] = [true, 'Enter a valid email id'];
		} else {
			formErrors['manipalLearnerError'] = [false, ''];
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
		<div
			class="w-full p-8 my-4 md:px-12 lg:w-9/12 lg:pl-20 lg:pr-40 mr-auto rounded-2xl shadow-2xl"
		>
			<div class="flex">
				<h1 class="font-bold uppercase text-5xl text-white">Please fill the below <br /> form</h1>
			</div>
			<div class="grid grid-cols-1 gap-5 md:grid-cols-2 mt-5">
				<InputField
					labelName="First Name"
					placeholderName="First Name"
					errorText=" "
					bind:value={firstName}
				/>
				<InputField
					labelName="Last Name"
					placeholderName="Last Name"
					errorText=" "
					bind:value={lastName}
				/>
				<InputField
					labelName="Age"
					placeholderName="Age"
					errorText=" "
					bind:value={userAge}
					on:input={validateUserAge}
				/>
				<InputField
					labelName="Manipal Learner ID"
					placeholderName="Manipal Learner ID"
					errorText=" "
					bind:value={manipalLearnerId}
					on:input={validateManipalLearnerId}
				/>
				<InputField
					labelName="Whatsapp Number"
					placeholderName="Whatsapp Number"
					errorText=" "
					bind:value={mobileNumber}
					on:input={validateMobileNumber}
				/>

				<InputField
					placeholderName="Institution Name"
					labelName="Institution Name"
					bind:value={institutionName}
					errorText=" "
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
	</form>
	<Footer />
</body>
