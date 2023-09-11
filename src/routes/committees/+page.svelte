<script>
	import Navbar from '../../components/Navbar.svelte';
	import client from '$lib/sanityclient';
	import { onMount } from 'svelte';

    /**
	 * @type {never[]}
	 */
    let committeedata =[]
	onMount(async () => {
        console.log("inside the onmount again");
        const data = await client.fetch(`*[_type =="committees"]{name,   "imageUrl": image.asset->url}`);
        committeedata = data;
    });
</script>

<body class="bg-gradient-to-b from-[#0E2954] via-[#1F6E8C] to-[#2E8A99] h-screen">
	<Navbar />
    <div class="bg-[url('https://images.unsplash.com/photo-1590274853856-f22d5ee3d228?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Mnx8dW5pdGVkJTIwbmF0aW9uc3xlbnwwfHwwfHx8MA%3D%3D&auto=format&fit=crop&w=600&q=60')] w-full h-screen bg-contain bg-fixed bg-blend-overlay bg-[#1F6E8C] flex justify-center items-center">
        <h1 class="text-9xl text-white">COMMITEES</h1>
    </div>
    <h1 class="text-black">{JSON.stringify(committeedata)}</h1>
</body>
