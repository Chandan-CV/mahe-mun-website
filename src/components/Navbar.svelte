<script>
	import '../app.css';
	import logo from '../lib/images/MAHE-MUN-logo-blue.jpeg';
	import maheLogo from '../lib/images/m-removebg-preview.png';
</script>

<header class="text-white body-font sticky flex justify-center items-center">
	<div class="container flex flex-wrap p-5 flex-col md:flex-row items-center justify-between">
		<a class="flex title-font font-medium items-center text-gray-900 mb-4 md:mb-0" href="/">
			<img src={maheLogo} alt="MAHE-MUN" width="50" height="50" class="brightness-0 invert" />
		</a>
		<nav class="flex flex-wrap items-center text-base justify-center md:justify-between md:w-1/2 w-full ">
			<a class="m-2 hover:text-[#84A7A1] cursor-pointer" href="/">Home</a>
			<a class="m-2 hover:text-[#84A7A1] cursor-pointer" href="/committees">Committees</a>
			<a class="m-2 hover:text-[#84A7A1] cursor-pointer" href="/team">Team</a>
			<a class="m-2 hover:text-[#84A7A1] cursor-pointer"href="/generalresources">General Resources</a>
		</nav>
		<button
			class="inline-flex items-center border-0 p-1 focus:outline-none hover:bg-[#84A7A1] hover:text-black rounded text-base mt-4 md:mt-0 "
			>Register Now!
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
</header>
