<script>
	import '../app.css';
	import Banner from '../components/Banner.svelte';
	import Hero from '../components/Hero.svelte';
	import Navbar from '../components/Navbar.svelte';
	import client from '$lib/sanityclient';
	import { onMount } from 'svelte';
	import { json } from '@sveltejs/kit';


	const getData = async()=>{
	const data =await client.fetch(`*[_type =="homepage"][0]`)
	return data;
	}


	/**
	 * @type {Promise<any> | never[]}
	 */

	let foundData =[];
	onMount(async()=>{
		console.log("inside onmount");
		foundData = await getData();
		console.log(foundData);
	});

	export let data;

	import Letter from '../components/Letter.svelte';
	import Footer from '../components/Footer.svelte';
	import Aboutus from '../components/Aboutus.svelte';
	import Delegate from '../components/Delegate.svelte';
	import ContactUs from '../components/ContactUs.svelte';
</script>

<body class= "bg-gradient-to-b from-[#0E2954] via-[#1F6E8C] to-[#2E8A99] ">
	<Navbar userState="{data}"/>
	<Hero />
	<Aboutus />
	<Delegate />
	<ContactUs/>
	<Footer/>
</body>
