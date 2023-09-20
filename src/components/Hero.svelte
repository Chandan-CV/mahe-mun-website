<script>
import beafk from '../lib/images/WhatsApp_Image_2023-09-09_at_12.24.08-removebg-preview.png';
import Nevis from '../lib/fonts/NevisBold-KGwl.ttf';
import { browser } from "$app/environment";

const endTime = 1696649400000
    let dLeft = "-", hLeft = "-", mLeft = "-", sLeft = "-"
    let particles = 40
    let delay = 2

    let lessthanzero = false

if(browser){
        
        setInterval( () => {
            let Ctime = new Date().getTime()

            let lessthanzero = (endTime - Ctime) <= 0


            //Get Days, Hours, Minutes, Seconds
            dLeft = Math.floor((endTime - Ctime) / 86400000)
            hLeft = Math.floor(((endTime - Ctime) - (dLeft*86400000)) / 3600000)
            mLeft = Math.floor(((endTime - Ctime) - (dLeft*86400000) - (hLeft*3600000)) / 60000) 
            sLeft = Math.floor(((endTime - Ctime) - (dLeft*86400000) - (hLeft*3600000) - (mLeft*60000)) / 1000)

            //Single digits are padded with a 0 to the left (XX:9 -> XX:09)
            dLeft = (dLeft < 10)? `0${dLeft}` : dLeft
            hLeft = (hLeft < 10)? `0${hLeft}` : hLeft
            mLeft = (mLeft < 10)? `0${mLeft}` : mLeft
            sLeft = (sLeft < 10)? `0${sLeft}` : sLeft



        }, 1000)
        
       


    }
</script>

<section class=" body-font md:h-[100vh] bg-[#0E2954] bg-banner-bg bg-blend-overlay bg-cover bg-fixed  "> <!--bg-[#0E2954] bg-banner-bg bg-blend-overlay bg-cover bg-fixed -->
	<div class="container mx-auto flex flex-1 items-center justify-center flex-col">
		<div class="container mx-auto flex items-center justify-center flex-col text-white gap-4">
		
			<p class="mb-4 Lemonmilk mt-4 align-middle text-center leading-relaxed sm:text-[32px] text-2xl">
				Welcome To First Edition of
			</p>
		<div class="MUNbgHero flex flex-col " >
			<!-- <img
			class="lg:w-2/6 md:w-3/6 w-5/6 object-cover object-center rounded opacity-30 -z-1"
			alt="hero"
			src={beafk}
		/> -->
		<h1 class="title-font Nevis sm:text-9xl text-4xl mb-4 text-center font-medium text-white-900">
			MAHE - BLR
		</h1>
		
		<h3 class="title-font Nevis sm:text-[84px] text-2xl text-center align-middle mb-4 font-medium text-white-900 m-2">
			MODEL UNITED NATIONS
		</h3>
		</div>
		<h3 class="title-font Lemonmilk2 sm:text-[64px] text-2xl text-center align-middle mb-8 font-medium text-white-900 m-2">
			PEACE POWER PROGRESS
		</h3>
		<h3 class="title-font Lemonmilk2 sm:text-[48px] text-2xl text-center align-middle mb-4 font-medium text-white-900 m-2">
			7<sup>th</sup> and 8<sup>th</sup> October 2022
		</h3>

		</div>
		<div class="text-center lg:w-2/3 w-full my-1 mt-8  text-white font-{Nevis}">
			
			<div id = "countdownbox" class=" text-center md:w-200px w-auto md:text-6xl text-2xl mb-9 font-semibold font-mono bg-clip-text text-transparent bg-gradient-to-b from-[#0E2954] via-[#1F6E8C]  to-[#2E8A99] backgroundpan countFadeIn ">
				{#if !lessthanzero}
				<div class="px-4 flex justify-center align-middle w-auto text-white-100">
					<div class="flex-col flex-1 mt-auto mb-auto bg-[#0E2954]  text-white md:px-5 px-2 md:py-5 py-2">
						{dLeft}
						<p class="md:text-2xl text-xl font-semibold">Days</p>
					</div>
					<!-- <div class="flex align-middle justify-center mt-auto mb-auto">:</div> -->
					<div class="flex-col flex-1 mt-auto mb-auto bg-[#1F6E8C] text-white md:px-5 px-2 md:py-5 py-2">
						{hLeft}
						<p class="md:text-2xl text-xl font-semibold">Hours</p>
					</div>
					<!-- <div class="flex align-middle justify-center mt-auto mb-auto">:</div> -->
					<div class="flex-col flex-1 mt-auto mb-auto bg-[#2E8A99] text-white md:px-5 px-2 md:py-5 py-2">
						{mLeft}
						<p class="md:text-2xl text-xl font-semibold">Minutes</p>
					</div>
					<!-- <div class="flex align-middle justify-center mt-auto mb-auto">:</div> -->
					<div class="flex-col flex-1 mt-auto mb-auto bg-[#84A7A1]  text-white md:px-5 px-2 md:py-5 py-2">
						{sLeft}
						<p class="md:text-2xl text-xl font-semibold">Seconds</p>
					</div>
				</div>
				{:else}
				Thanks for two amazing days!
				{/if}
			</div>
			<!-- <div class="flex justify-center">
				<button
					class="inline-flex text-white bg-indigo-500 border-0 py-2 px-6 focus:outline-none hover:bg-indigo-600 rounded text-lg"
					>Button</button
				>
				<button
					class="ml-4 inline-flex text-gray-700 bg-gray-100 border-0 py-2 px-6 focus:outline-none hover:bg-gray-200 rounded text-lg"
					>Button</button
				>
			</div> -->
		</div>
	</div>
</section>
