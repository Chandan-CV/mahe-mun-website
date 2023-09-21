<script>
	import Navbar from '../../components/Navbar.svelte';
	import client from '$lib/sanityclient';
	import { onMount } from 'svelte';
	import ShowCommittee from '../../components/ShowCommittee.svelte';
	import Footer from '../../components/Footer.svelte';
	/**
	 * @type {never[]}
	 */
	let committeedata = [];
	onMount(async () => {
		console.log('inside the onmount again');
		const data = await client.fetch(
			`*[_type =="committees"]{name,   "imageUrl": image.asset->url}`
		);
		committeedata = data;
	});
	export let data;
</script>

<body class="bg-gradient-to-b from-[#0E2954] via-[#1F6E8C] to-[#2E8A99] min-h-screen">
	<Navbar userState="{data}"/>
	<div
		class="bg-[url('https://images.unsplash.com/photo-1590274853856-f22d5ee3d228?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Mnx8dW5pdGVkJTIwbmF0aW9uc3xlbnwwfHwwfHx8MA%3D%3D&auto=format&fit=crop&w=600&q=60')] w-full h-screen bg-contain bg-fixed bg-blend-overlay bg-[#1F6E8C] flex justify-center items-center"
	>
		<h1 class="md:text-9xl text-5xl text-white font-bold">COMMITEES</h1>
	</div>
	<div class="w-full">
		<section class=" bg-[#1F6E8C] text-gray-600 body-font bg-committee-bg bg-fixed bg-contain bg-blend-overlay">
			<div class="container px-5 py-24 mx-auto">
				<div class="flex flex-wrap -mx-4 -mb-10 text-center">
					{#each committeedata as committee}
						<ShowCommittee {committee} />
					{/each}
				</div>
			</div>
		</section>
	</div>
	<Footer/>
</body>
