<script lang="ts">
	import { browser } from '$app/environment';

	export let data;
	if (browser) {
		setTimeout(async () => {
			console.log(data.link);
			window.location = data.link;
		}, 2000);
	}
</script>

<div
	class="absolute z-[100] h-screen w-screen bg-black flex items-center justify-center overflow-hidden top-0 left-0"
>
	<div class="text-center text-3xl font-normal text-white">Redirecting...</div>
</div>
