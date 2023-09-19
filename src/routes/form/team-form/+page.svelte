<script lang="ts">
	import Footer from '../../../components/Footer.svelte';
	import Navbar from '../../../components/Navbar.svelte';
	import ErrorBar from '../../../components/ErrorBar.svelte';
	import { enhance } from '$app/forms';

	export let data;
	let firstName: string = '';
	let lastName: string = '';
	//@ts-ignore
	let userAge: string = null;
	let numDelegates: string = '';
	//@ts-ignore
	let mobileNumber: string = null;
	let institutionName: string = '';
	let teamName: string = '';
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
	let formErrors = { nameError: [false, ''], userAgeError: [false, ''] };
	//@ts-ignore
	function submitForm({ formData }) {
		//@ts-ignore
		if (
			firstName &&
			lastName &&
			parseInt(userAge) >= 16 &&
			institutionName &&
			parseInt(numDelegates) >= 10 &&
			teamName &&
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
			additionalQuestions.length > 2
		) {
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
			formData.set('numDelegates', numDelegates);
			formData.set('teamName', teamName);
		} else {
			error = true;
			document.body.scrollIntoView();
			setTimeout(() => {
				error = false;
			}, 5000);
		}
	}

	// function validateUserAge() {
	// 	//@ts-ignore
	// 	console.log(isNaN(userAge));
	// 	//@ts-ignore
	// 	if (!isNaN(userAge)) {
	// 		console.log('error');
	// 	} else {
	// 	}
	// }
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
			<div
				class="w-full p-8 my-4 md:px-12 lg:w-9/12 lg:pl-20 lg:pr-40 mr-auto rounded-2xl shadow-2xl"
			>
				<div class="flex">
					<h1 class="font-bold uppercase text-5xl text-white">Please fill the below <br /> form</h1>
				</div>
				<div class="grid grid-cols-1 gap-5 md:grid-cols-2 mt-5">
					<input
						class="w-full bg-gray-100 text-gray-900 mt-2 p-3 rounded-lg focus:outline-none focus:shadow-outline"
						type="text"
						placeholder="First Name*"
						bind:value={firstName}
					/>
					<input
						class="w-full bg-gray-100 text-gray-900 mt-2 p-3 rounded-lg focus:outline-none focus:shadow-outline"
						type="text"
						placeholder="Last Name*"
						bind:value={lastName}
					/>
					<input
						class="w-full bg-gray-100 text-gray-900 mt-2 p-3 rounded-lg focus:outline-none focus:shadow-outline"
						type="text"
						placeholder="Number of Delegates*"
						bind:value={numDelegates}
					/>
					<input
						class="w-full bg-gray-100 text-gray-900 mt-2 p-3 rounded-lg focus:outline-none focus:shadow-outline"
						type="text"
						placeholder="Team Name(used only on the website)*"
						bind:value={teamName}
					/>
					<!-- <div class="mb-6"> -->
					<input
						class="w-full bg-gray-100 text-gray-900 mt-2 p-3 rounded-lg focus:outline-none focus:shadow-outline"
						type="number"
						placeholder="Age*"
						bind:value={userAge}
					/>
					<!-- {#if formErrors.userAgeError[0]}
						<p class="text-red-500 text-xs italic">{formErrors.userAgeError[1]}</p>
					{/if} -->
					<!-- </div> -->
					<input
						class="w-full bg-gray-100 text-gray-900 mt-2 p-3 rounded-lg focus:outline-none focus:shadow-outline"
						type="number"
						placeholder="Whatsapp Number*"
						bind:value={mobileNumber}
					/>
					<input
						class="w-full bg-gray-100 text-gray-900 mt-2 p-3 rounded-lg focus:outline-none focus:shadow-outline"
						type="text"
						placeholder="Name of your institution*"
						bind:value={institutionName}
					/>
					<select
						name=""
						id=""
						class="form-select w-full bg-gray-100 text-gray-900 mt-2 p-3 border rounded-lg"
						bind:value={firstPref}
					>
						<option value="" selected disabled>Committee Preference</option>
						<option value="WHO">WHO</option>
						<option value="UNGA">UNGA</option>
						<option value="UNSC">UNSC</option>
						<option value="CRISIS">CRISIS</option>
						<option value="IPC">IPC</option>
					</select>
					<select
						name=""
						id=""
						class="form-select w-full bg-gray-100 text-gray-900 mt-2 p-3 border rounded-lg"
						bind:value={secondPref}
					>
						<option value="" selected disabled>Second Committee Preference</option>
						<option value="WHO">WHO</option>
						<option value="UNGA">UNGA</option>
						<option value="UNSC">UNSC</option>
						<option value="CRISIS">CRISIS</option>
						<option value="IPC">IPC</option>
					</select>
					<select
						name=""
						id=""
						class="form-select w-full bg-gray-100 text-gray-900 mt-2 p-3 border rounded-lg"
						bind:value={thirdPref}
					>
						<option value="" selected disabled>Third Committee Preference</option>
						<option value="WHO">WHO</option>
						<option value="UNGA">UNGA</option>
						<option value="UNSC">UNSC</option>
						<option value="CRISIS">CRISIS</option>
						<option value="IPC">IPC</option>
					</select>
					<select
						name=""
						id=""
						class="form-select w-full bg-gray-100 text-gray-900 mt-2 p-3 border rounded-lg"
						bind:value={firstMunAnswer}
					>
						<option value="" selected disabled>Will this be your first MUN?*</option>
						<option value="YES">YES</option>
						<option value="NO">NO</option>
					</select>
					<select
						name=""
						id=""
						class="form-select w-full bg-gray-100 text-gray-900 mt-2 p-3 border rounded-lg"
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
				<div class="my-4">
					<textarea
						placeholder="Please briefly explain the reason for your committee preference*"
						class="w-full h-32 bg-gray-100 text-gray-900 mt-2 p-3 rounded-lg focus:outline-none focus:shadow-outline"
						bind:value={reasonCommitteePref}
					/>
				</div>
				<div class="my-4">
					<textarea
						placeholder="What are your top 3 portfolio preferences?*"
						class="w-full h-32 bg-gray-100 text-gray-900 mt-2 p-3 rounded-lg focus:outline-none focus:shadow-outline"
						bind:value={topPortPref}
					/>
				</div>
				<div class="my-4">
					<textarea
						placeholder="Please explain how you would justify the country allocated to you*"
						class="w-full h-32 bg-gray-100 text-gray-900 mt-2 p-3 rounded-lg focus:outline-none focus:shadow-outline"
						bind:value={justCountry}
					/>
				</div>
				<div class="my-4">
					<textarea
						placeholder="Please list out your past experiences. While listing your experience as a delegate, please follow the format [Conference Name and Place-Year-Committee- Country you Represented-Award Won(if any)]. If this is your first MUN, please write 'NA'*"
						class="w-full h-32 bg-gray-100 text-gray-900 mt-2 p-3 rounded-lg focus:outline-none focus:shadow-outline"
						bind:value={expAsDel}
					/>
				</div>
				<div class="my-4">
					<textarea
						placeholder="Is there any additional information you want us to know or any questions you would like to ask?
                        "
						class="w-full h-32 bg-gray-100 text-gray-900 mt-2 p-3 rounded-lg focus:outline-none focus:shadow-outline"
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

			<div class="w-full lg:-mt-96 lg:w-2/6 px-8 py-12 ml-auto bg-blue-900 rounded-2xl">
				<div class="flex flex-col text-white">
					<h1 class="font-bold uppercase text-4xl my-4">Fees (Minimum of 10 delegates required)</h1>
					<p class="text-gray-400">
						1st round- 1500 Rs. per person
						<br />
						2nd round- 1700 Rs. per person
						<br />
						3rd round- 1900 Rs. per person
						<br />
					</p>

					<div class="flex my-4 w-2/3 lg:w-1/2">
						<div class="flex flex-col">
							<i class="fas fa-map-marker-alt pt-2 pr-2" />
						</div>
						<div class="flex flex-col">
							<h2 class="text-2xl">Dates</h2>
							<p class="text-gray-400">7th and 8th October 2023</p>
						</div>
					</div>

					<div class="flex my-4 w-2/3 lg:w-1/2">
						<div class="flex flex-col">
							<i class="fas fa-phone-alt pt-2 pr-2" />
						</div>
						<div class="flex flex-col">
							<h2 class="text-2xl">Contacts</h2>
							<p class="text-gray-400">
								Deputy Secretary General-
								<br />
								Eshan: +91 6302 504 562
							</p>
							<p class="text-gray-400">
								Under-Secretary General (USG) Delegate Affairs-
								<br />
								Aayush: +91 90990 60271
								<br />
								Divya: +91 6385 129 850
							</p>
						</div>
					</div>
				</div>
			</div>
		</div>
	</form>
	<!-- COMPONENT CODE -->
	<!-- </div> -->
	<Footer />
</body>
