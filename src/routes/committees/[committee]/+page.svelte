<script lang="ts">
	import '../../../app.css';
	import client from '$lib/sanityclient';
	import Navbar from '../../../components/Navbar.svelte';
	import { onMount } from 'svelte';
	import { page } from '$app/stores';
	import type { Committee } from '$lib/models';
	import ShowChairs from '../../../components/ShowChairs.svelte';
	import Footer from '../../../components/Footer.svelte';

	let committee: Committee;
	onMount(async () => {
		const res = await client.fetch(`*[_type == "committees" && name == "${$page.params.committee}"]{
  ...,
  "imageUrl": image.asset->url,
  "referenceMaterialUrl": referenceMaterial.asset->url,


}[0]`);
		committee = res;
		console.log(committee);
		console.log(committee.imageUrl);
		
	});
</script>

<body class="bg-gradient-to-b from-[#0E2954] via-[#1F6E8C] to-[#2E8A99] min-h-screen">
	<Navbar />
	{#if committee}
		<div
			id="dynamicBG"
			class={"bg-[url('https://images.unsplash.com/photo-1536181783029-1097aaf179de?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2072&q=80')] h-screen bg-contain bg-fixed flex justify-center items-center bg-[#0E2954] bg-blend-overlay"}
		>
			<p class="text-white text-5xl font-light lg:text-9xl">{committee.name}</p>
		</div>
		<div class="p-20 flex justify-center items-center text-center">
			<p class="whitespace-pre-line text-2xl font-light">{committee.description}</p>
		</div>
		<div class="w-full p-10 flex justify-center items-center">
			<button
				class="inline-flex items-center border-0 py-1 px-3 focus:outline-none hover:bg-[#0E2954] hover:text-white rounded mt-4 md:mt-0 text-2xl"
				on:click={() => {
					window.location.href = `${committee.referenceMaterialUrl}`;
				}}
				>View Resource Material
				<svg
					fill="none"
					stroke="currentColor"
					stroke-linecap="round"
					stroke-linejoin="round"
					stroke-width="2"
					class="w-4 h-4 ml-1"
					viewBox="0 0 24 24"
				>
					<path d="M5 12h14M12 5l7 7-7 7" />
				</svg>
			</button>
		</div>

		<div>
			<p class="text-3xl font-light text-center mb-20">Committee Chairs</p>
			<section class="text-gray-600 body-font">
				<div class="container px-5 py-24 mx-auto ">
					<div class="flex flex-wrap -m-4 justify-center items-center">
						{#each committee.chairs as chair}
							<ShowChairs {chair} />
						{/each}
					</div>
				</div>
			</section>
		</div>
	{/if}
	<Footer/>
</body>
