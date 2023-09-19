<script lang="ts">
	import Footer from '../../components/Footer.svelte';
	import Navbar from '../../components/Navbar.svelte';
	import ErrorBar from '../../components/ErrorBar.svelte';
	import { enhance } from '$app/forms';

	export let data;
	//@ts-ignore
	let toDelete;
	let error = false;
	// console.log(data);

	//@ts-ignore
	function requestDeletion({ formData }) {
		//@ts-ignore
		// alert(toDelete['user_email']);
		console.log(toDelete);
		//@ts-ignore
		if (toDelete.is_team_leader == true) {
			error = true;
			document.body.scrollIntoView();
			setTimeout(() => {
				error = false;
			}, 5000);
		} else {
			//@ts-ignore
			formData.set('userToRemove', toDelete.user_email);
			//@ts-ignore
			formData.set('teamRefId', data.teamInfo.team_ref_id);
			//@ts-ignore
			formData.set('teamCurrentCapacity', data.teamInfo.current_capacity);
		}
	}
</script>

<body class="bg-gradient-to-b from-[#0E2954] via-[#1F6E8C] to-[#2E8A99]">
	<div class="h-screen">
		<Navbar userState={data.userState} />
		{#if error}
			<ErrorBar message="Can't remove the team leader" />
		{/if}
		{#if data.type === 'team' && data.teamInfo != undefined}
			<div style="display:flex; justify-content:center; align-items:center; flex-wrap: wrap;">
				<h1
					class="mb-4 text-4xl font-extrabold leading-none tracking-tight text-gray-900 md:text-5xl lg:text-6xl dark:text-white"
					style="flex: 0 0 100%; justify-content: center; text-align:center;"
				>
					Welcome Team <span class="text-blue-600 dark:text-blue-500"
						>{data.teamInfo.team_name}</span
					>
				</h1>
				<h1
					class="mb-4 text-4xl font-extrabold leading-none tracking-tight text-gray-900 md:text-5xl lg:text-6xl dark:text-white"
					style="justify-self: center; flex: 0 0 100%; text-align:center;"
				>
					Invite Code <span class="text-blue-600 dark:text-blue-500">{data.teamInfo.join_code}</span
					>
				</h1>
			</div>
		{/if}
		{#if data.type === 'individual'}
			<div class="flex flex-wrap h-screen justify-center mt-40">
				<div class="w-full md:w-2/2 xl:w-1/3 p-3">
					<div class="bg-gray-900 border border-gray-800 rounded shadow p-2">
						<div class="flex flex-row items-center">
							<div class="flex-shrink pr-4">
								<div class="rounded p-3 bg-green-600">
									<i class="fa fa-wallet fa-2x fa-fw fa-inverse" />
								</div>
							</div>
							<div class="flex-1 text-right md:text-center">
								<h5 class="font-bold uppercase text-gray-400">
									{data.userInfo.first_name + ' ' + data.userInfo.last_name}
								</h5>
								<h3 class="font-bold text-3xl text-gray-600">
									{data.userInfo.status.toUpperCase()}
									<span class="text-green-500"><i class="fas fa-caret-up" /></span>
								</h3>
							</div>
						</div>
					</div>
				</div>
				<!-- <div class="w-full md:w-1/2 xl:w-1/3 p-3">
			<div class="bg-gray-900 border border-gray-800 rounded shadow p-2">
				<div class="flex flex-row items-center">
					<div class="flex-shrink pr-4">
						<div class="rounded p-3 bg-pink-600">
							<i class="fas fa-users fa-2x fa-fw fa-inverse" />
						</div>
					</div>
					<div class="flex-1 text-right md:text-center">
						<h5 class="font-bold uppercase text-gray-400">Total Users</h5>
						<h3 class="font-bold text-3xl text-gray-600">
							249 <span class="text-pink-500"><i class="fas fa-exchange-alt" /></span>
						</h3>
					</div>
				</div>
			</div>
		</div>
		<div class="w-full md:w-1/2 xl:w-1/3 p-3">
			<div class="bg-gray-900 border border-gray-800 rounded shadow p-2">
				<div class="flex flex-row items-center">
					<div class="flex-shrink pr-4">
						<div class="rounded p-3 bg-yellow-600">
							<i class="fas fa-user-plus fa-2x fa-fw fa-inverse" />
						</div>
					</div>
					<div class="flex-1 text-right md:text-center">
						<h5 class="font-bold uppercase text-gray-400">New Users</h5>
						<h3 class="font-bold text-3xl text-gray-600">
							2 <span class="text-yellow-600"><i class="fas fa-caret-up" /></span>
						</h3>
					</div>
				</div>
			</div>
		</div>
		<div class="w-full md:w-1/2 xl:w-1/3 p-3">
			<div class="bg-gray-900 border border-gray-800 rounded shadow p-2">
				<div class="flex flex-row items-center">
					<div class="flex-shrink pr-4">
						<div class="rounded p-3 bg-blue-600">
							<i class="fas fa-server fa-2x fa-fw fa-inverse" />
						</div>
					</div>
					<div class="flex-1 text-right md:text-center">
						<h5 class="font-bold uppercase text-gray-400">Server Uptime</h5>
						<h3 class="font-bold text-3xl text-gray-600">152 days</h3>
					</div>
				</div>
			</div>
		</div>
		<div class="w-full md:w-1/2 xl:w-1/3 p-3">
			<div class="bg-gray-900 border border-gray-800 rounded shadow p-2">
				<div class="flex flex-row items-center">
					<div class="flex-shrink pr-4">
						<div class="rounded p-3 bg-indigo-600">
							<i class="fas fa-tasks fa-2x fa-fw fa-inverse" />
						</div>
					</div>
					<div class="flex-1 text-right md:text-center">
						<h5 class="font-bold uppercase text-gray-400">To Do List</h5>
						<h3 class="font-bold text-3xl text-gray-600">7 tasks</h3>
					</div>
				</div>
			</div>
		</div>
		<div class="w-full md:w-1/2 xl:w-1/3 p-3">
			<div class="bg-gray-900 border border-gray-800 rounded shadow p-2">
				<div class="flex flex-row items-center">
					<div class="flex-shrink pr-4">
						<div class="rounded p-3 bg-red-400">
							<i class="fas fa-inbox fa-2x fa-fw fa-inverse" />
						</div>
					</div>
					<div class="flex-1 text-right md:text-center">
						<h5 class="font-bold uppercase text-gray-400">Issues</h5>
						<h3 class="font-bold text-3xl text-gray-600">
							3 <span class="text-red-500"><i class="fas fa-caret-up" /></span>
						</h3>
					</div>
				</div>
			</div>
		</div> -->
			</div>
		{:else if data.type == 'team' && data.teamMembers != undefined}
			<div class="flex flex-wrap">
				{#each { length: data.teamMembers.length } as _, i}
					<div class="w-full md:w-2/2 xl:w-1/3 p-3">
						<div class="bg-gray-900 border border-gray-800 rounded shadow p-2">
							<div class="flex flex-row items-center">
								<div class="flex-shrink pr-4">
									<div class="rounded p-3 bg-green-600">
										<i class="fa fa-wallet fa-2x fa-fw fa-inverse" />
									</div>
								</div>
								<div class="flex-1 text-right md:text-center">
									<h5 class="font-bold uppercase text-gray-400">
										{data.teamMembers[i].user_email}
									</h5>
									<h3 class="font-bold text-3xl text-gray-600">
										{data.teamMembers[i].status.toUpperCase()}
										<span class="text-green-500"><i class="fas fa-caret-up" /></span>
									</h3>
								</div>
								{#if data.userInfo.is_team_leader}
									{#if data.teamMembers[i].is_team_leader != true}
										<form
											action="?/deleteTeammate"
											method="post"
											use:enhance={(event) => {
												requestDeletion(event);
											}}
										>
											<div class="flex-shrink pr-4">
												<div>
													<button
														class="rounded p-3 bg-red-600 text-white cursor-pointer"
														on:click={() => {
															if (data.teamMembers != undefined) {
																toDelete = data.teamMembers[i];
															}
														}}
														type="submit">X</button
													>
												</div>
											</div>
										</form>
									{/if}
								{/if}
							</div>
						</div>
					</div>
				{/each}
			</div>
		{/if}
	</div>
	<Footer />
</body>

<style></style>
