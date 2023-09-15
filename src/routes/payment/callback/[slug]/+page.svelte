<script lang="ts">
	import { goto } from '$app/navigation';
	import ErrorBar from '../../../../components/ErrorBar.svelte';
	import { browser } from '$app/environment';

	export let data;

	if (browser) {
		setTimeout(async () => {
            window.location.replace(data.redirect);
		});
	}
</script>

<ErrorBar message={data.res} />
