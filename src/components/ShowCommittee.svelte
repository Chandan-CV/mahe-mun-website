<script>
	/**
	 * @type {{ [x: string]: any; }}
	 */
	export let committee;
</script>

<div class="sm:w-1/2 mb-10 px-4 rounded">
	<div class="rounded-lg h-64 overflow-hidden">
		<img
			alt="content"
			class="object-cover object-center h-full w-full"
			src={committee['imageUrl']}
		/>
	</div>
	<h2 class="title-font text-4xl font-light text-gray-900 mt-6 mb-3">{committee['name']}</h2>
	<button
		class="flex mx-auto mt-6 text-white bg-indigo-500 border-0 py-2 px-5 focus:outline-none hover:bg-indigo-600 rounded"
		on:click={() => {
			window.location.href = `/committees/${committee['name']}`;
		}}>Learn more about {committee['name']}</button
	>
</div>
