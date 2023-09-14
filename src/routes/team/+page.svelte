<script lang="ts">
	import { onMount } from 'svelte';
	import Footer from '../../components/Footer.svelte';
	import Navbar from '../../components/Navbar.svelte';
	import client, { urlfor } from '$lib/sanityclient';
	import type { Team } from '$lib/models';

	let data:Team[];
	onMount(async()=>{
		 const response = await client.fetch(`*[_type =="team"][0]`)
		 data = response.team;
	})
	var i:number =0;
</script>

<body class="bg-gradient-to-b from-[#0E2954] via-[#1F6E8C] to-[#2E8A99]">
	<Navbar />
	<section class="text-black-600 body-font">
		<div class="container px-5 py-24 mx-auto">
			<div class="flex flex-col text-center w-full mb-20">
				<h1 class="text-3xl font-medium title-font mb-4 text-black-900 tracking-widest">
					OUR TEAM
				</h1>
				<p class="lg:w-2/3 mx-auto leading-relaxed font-light text-lg">
				Meet the people who are active on MAHE MUN Slack channel at 3 am having a deep discussion on the font to be used on the website:)
				</p>
			</div>
			<div class="flex flex-wrap justify-center items-center -m-4">
				{#if data}	
				{#each data as member }
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
							<span class="inline-flex">
								<a class="text-black-500">
									<svg
										fill="none"
										stroke="currentColor"
										stroke-linecap="round"
										stroke-linejoin="round"
										stroke-width="2"
										class="w-5 h-5"
										viewBox="0 0 24 24"
									>
										<path d="M18 2h-3a5 5 0 00-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 011-1h3z" />
									</svg>
								</a>
								<a class="ml-2 text-black-500">
									<svg
										fill="none"
										stroke="currentColor"
										stroke-linecap="round"
										stroke-linejoin="round"
										stroke-width="2"
										class="w-5 h-5"
										viewBox="0 0 24 24"
									>
										<path
											d="M23 3a10.9 10.9 0 01-3.14 1.53 4.48 4.48 0 00-7.86 3v1A10.66 10.66 0 013 4s-4 9 5 13a11.64 11.64 0 01-7 2c9 5 20 0 20-11.5a4.5 4.5 0 00-.08-.83A7.72 7.72 0 0023 3z"
										/>
									</svg>
								</a>
								<a class="ml-2 text-black-500">
									<svg
										fill="none"
										stroke="currentColor"
										stroke-linecap="round"
										stroke-linejoin="round"
										stroke-width="2"
										class="w-5 h-5"
										viewBox="0 0 24 24"
									>
										<path
											d="M21 11.5a8.38 8.38 0 01-.9 3.8 8.5 8.5 0 01-7.6 4.7 8.38 8.38 0 01-3.8-.9L3 21l1.9-5.7a8.38 8.38 0 01-.9-3.8 8.5 8.5 0 014.7-7.6 8.38 8.38 0 013.8-.9h.5a8.48 8.48 0 018 8v.5z"
										/>
									</svg>
								</a>
							</span>
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
