<script lang="ts">
	import { onMount } from 'svelte';
	import Footer from '../../components/Footer.svelte';
	import Navbar from '../../components/Navbar.svelte';
	import client, { urlfor } from '$lib/sanityclient';
	import type { Team } from '$lib/models';

	let teamData: Team[];
	onMount(async () => {
		const response = await client.fetch(`*[_type =="team"][0]`);
		teamData = response.team;
	});
	var i: number = 0;

	export let data;
</script>

<body class="bg-gradient-to-b from-[#0E2954] via-[#1F6E8C] to-[#2E8A99]">
	<Navbar userState={data} />

	<section class="text-black-600 body-font">
		<div class="container px-5 py-24 mx-auto">
			<div class="flex flex-col text-center w-full mb-20">
				<h1 class="text-3xl font-medium title-font mb-4 text-black-900 tracking-widest">
					OUR TEAM
				</h1>
				<p class="lg:w-2/3 mx-auto leading-relaxed font-light text-lg">
					Meet the people who are active on MAHE MUN Slack channel at 3 am having a deep discussion
					on the font to be used on the website:)
				</p>
			</div>
			<div class="flex flex-wrap justify-center items-center -m-4">
				{#if teamData}
					{#each teamData as member}
						<div class="p-4 lg:w-1/2">
							<div
								class="h-full flex sm:flex-row flex-col items-center sm:justify-start justify-center text-center sm:text-left"
							>
								<img
									alt="team"
									class="flex-shrink-0 rounded-lg w-48 h-48 object-cover object-center sm:mb-0 mb-4"
									src={urlfor(member.image).url()}
								/>
								<div class="flex-grow sm:pl-8">
									<h2 class="title-font font-medium text-lg text-black-900">{member.name}</h2>
									<h3 class="text-black-500 mb-3">{member.position}</h3>
									<p class="mb-4">
										{member.description}
									</p>
								</div>
							</div>
						</div>
					{/each}
				{/if}
			</div>
		</div>
	</section>

	<Footer />
</body>
