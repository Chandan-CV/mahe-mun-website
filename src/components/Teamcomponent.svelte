<script lang="ts">
	import type { Team } from '$lib/models';
	import { urlfor } from '$lib/sanityclient';

	
	export let data:Team;
</script>

<div class="p-4 lg:w-1/4 md:w-1/2">
	<div class="h-full flex flex-col items-center text-center">
		<img
			alt="team"
			class="flex-shrink-0 rounded-lg w-full h-56 object-cover object-center mb-4"
			src={urlfor(data.image).toString()}
		/>
		<div class="w-full">
			<h2 class="title-font font-medium text-2xl text-black">{data.name}</h2>
			<h3 class="text-black font-light mb-3 text-xl ">{data.position}</h3>
		</div>
	</div>
</div>
