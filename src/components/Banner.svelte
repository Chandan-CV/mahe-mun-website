<script>
	import { onMount } from 'svelte';
	import ManipalLogo from '../lib/images/m-removebg-preview.png';
	import { fade, fly } from 'svelte/transition';
	import MAHEMUNLogo from '../lib/images/MAHE-MUN-logo-blue.jpeg' 
	let show = {
		MaheLogo: false,
		banner2: false,
		banner3: false,
	};
	
	onMount(() => {
		console.log('mounted');
		const observer = new IntersectionObserver((entries) => {
			entries.forEach((entry) => {
				if (entry.isIntersecting) {
					console.log(entry.target);
					entry.target.classList.remove('opacity-0');
					entry.target.classList.add('opacity-100');

				} else {					
					entry.target.classList.remove('opacity-100');
					entry.target.classList.add('opacity-0');
				}
			});
		});
		const targets = document.querySelectorAll('.banner1');
		targets.forEach((target) => {
			observer.observe(target);
		});
	});
</script>

	<div class="bg-[#0E2954] bg-banner-bg bg-contain bg-blend-overlay flex flex-col justify-center bg-fixed">
        <div class="h-screen flex flex-col justify-center items-center mt-[300px]">
			<div class="flex flex-col justify-center items-center">
				<img src={MAHEMUNLogo} alt="MAHE-MUN logo"/>
				<h1 class="text-white text-4xl font-bold">Lorem ipsum Some random moto</h1>
				<h1 class="text-white text-4xl font-bold">DATES</h1>
			</div>
			<div class="flex justify-center items-center w-full">
				<h1>Preseted by</h1>
                <img
				src={ManipalLogo}
				alt="MAHE Logo"
				class="max-w-[70%] brightness-0 invert rounded-sm self-center transition-opacity ease-in-out duration-300 opacity-0 banner1"
                />
			</div>
		</div>
	</div>

<style>
	
</style>
