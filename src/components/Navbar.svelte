<script>
	import '../app.css';
	import logo from '../lib/images/MAHE-MUN-logo-blue.jpeg';
	import maheLogo from '../lib/images/MAHE Bengaluru 305x114.svg'
</script>

<!-- 
	<div class="flex flex-row w-full bg-[#0E2954] justify-between text-white items-center">
		<div class="">
			<img src={logo} alt="MAHE-MUN" width="70" height="70" />
		</div>

		<div class="flex flex-row w-full justify-evenly">
			<a href="#home">Home</a>
			<a href="#about">About</a>
			<a href="#register">Register Now</a>
		</div>
		<div />
	</div> -->
<header class="text-white body-font sticky">
	<div class="container mx-auto flex flex-wrap p-5 flex-col md:flex-row items-center">
		<a class="flex title-font font-medium items-center text-gray-900 mb-4 md:mb-0">
			<img src={maheLogo} alt="MAHE-MUN" width="150" height="150"  class="brightness-0 invert "/>
		</a>
		<nav class="md:ml-auto md:mr-auto flex flex-wrap items-center text-base justify-center">
			<a class="mr-5 hover:text-[#84A7A1]">Home</a>
			<a class="mr-5 hover:text-[#84A7A1]">Committees</a>
			<a class="mr-5 hover:text-[#84A7A1]">Team</a>
			<a class="mr-5 hover:text-[#84A7A1]">General Resources</a>
		</nav>
		<button
			class="inline-flex items-center border-0 py-1 px-3 focus:outline-none hover:bg-[#84A7A1] hover:text-black rounded text-base mt-4 md:mt-0"
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
