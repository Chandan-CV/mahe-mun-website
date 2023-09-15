<script lang="ts">
	import Footer from '../../components/Footer.svelte';
	import Navbar from '../../components/Navbar.svelte';

	export let data;
</script>

<!-- Container for demo purpose -->

<body class="bg-gradient-to-b from-[#0E2954] via-[#1F6E8C] to-[#2E8A99]">
	<Navbar userState={data} />
	<div class="container my-24 mx-auto md:px-3">
		<!-- Section: Design Block -->
		<section class="mb-32">
			<div
				class="relative overflow-hidden bg-cover bg-no-repeat bg-[50%] bg-[#0E2954] h-[500px] bg-banner-bg bg-blend-overlay bg-cover bg-fixed"
			/>
			<div class="container mx-auto px-6 md:px-12 xl:px-32">
				<div class="text-center">
					<div
						class="mt-[-170px] block rounded-lg bg-[hsla(0,0%,100%,0.55)] bg-[hsla(0,0%,100%,0.7)] px-6 py-12 shadow-[0_2px_15px_-3px_rgba(0,0,0,0.07),0_10px_20px_-2px_rgba(0,0,0,0.04)] backdrop-blur-[30px] dark:bg-[hsla(0,0%,5%,0.55)] dark:shadow-black/20 md:py-16 md:px-12"
					>
						<h1 class="mb-16 text-5xl font-bold tracking-tight md:text-6xl xl:text-7xl text-white">
							Which delegation type do<br /><span
								class="text-danger dark:text-danger-400 text-white">you want to register as?</span
							>
						</h1>
						<a
							href="./form/indi-form"
							class="inline-flex items-center justify-center p-5 text-base font-medium text-gray-500 rounded-lg bg-gray-50 hover:text-gray-900 hover:bg-gray-100 dark:text-gray-400 dark:bg-gray-800 dark:hover:bg-gray-700 dark:hover:text-white"
						>
							<span class="w-full">Individual Delegation</span>
							<svg
								class="w-4 h-4 ml-2"
								aria-hidden="true"
								xmlns="http://www.w3.org/2000/svg"
								fill="none"
								viewBox="0 0 14 10"
							>
								<path
									stroke="currentColor"
									stroke-linecap="round"
									stroke-linejoin="round"
									stroke-width="2"
									d="M1 5h12m0 0L9 1m4 4L9 9"
								/>
							</svg>
						</a>
						<a
							href="./form/team-form"
							class="inline-flex items-center justify-center p-5 text-base font-medium text-gray-500 rounded-lg bg-gray-50 hover:text-gray-900 hover:bg-gray-100 dark:text-gray-400 dark:bg-gray-800 dark:hover:bg-gray-700 dark:hover:text-white"
						>
							<span class="w-full">Team Delegation</span>
							<svg
								class="w-4 h-4 ml-2"
								aria-hidden="true"
								xmlns="http://www.w3.org/2000/svg"
								fill="none"
								viewBox="0 0 14 10"
							>
								<path
									stroke="currentColor"
									stroke-linecap="round"
									stroke-linejoin="round"
									stroke-width="2"
									d="M1 5h12m0 0L9 1m4 4L9 9"
								/>
							</svg>
						</a>
					</div>
				</div>
			</div>
		</section>
		<!-- Section: Design Block -->
	</div>
	<!-- Container for demo purpose -->

	<Footer />
</body>
