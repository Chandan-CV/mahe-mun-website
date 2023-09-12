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

<section class="text-gray-600 body-font bg-[#0E2954] bg-banner-bg bg-blend-overlay bg-cover bg-fixed ">
	<div class="container mx-auto flex items-center justify-center flex-col">
		<div class="container mx-auto flex items-center justify-center flex-col">
		<img
			class="lg:w-2/6 md:w-3/6 w-5/6 object-cover object-center rounded opacity-30 z-1"
			alt="hero"
			src={beafk}
		/>
		<div class=" absolute text-white flex-col justify-center align-middle">
		<h1 class="title-font sm:text-8xl text-4xl mb-4 text-center font-medium text-white-900">
			MAHE-BLR
		</h1>
		<h3 class="title-font sm:text-6xl text-3xl mb-4  font-medium text-white-900">
			MODEL UNITED NATIONS
		</h3>
		</div>
		</div>
		<div class="text-center lg:w-2/3 w-full  text-white font-{Nevis}">
			<p class="mb-8 mt-14 leading-relaxed sm:text-4xl text-2xl">
				Join Us for For 1st Ever Edition of MAHE-BLR MUN
			</p>
			<div id = "countdownbox" class=" z-9 text-center md:w-200px w-auto md:text-6xl text-2xl mb-9 font-semibold font-mono bg-clip-text text-transparent bg-gradient-to-b from-[#0E2954] via-[#1F6E8C]  to-[#2E8A99] backgroundpan countFadeIn ">
				{#if !lessthanzero}
				<div class="flex justify-center align-middle w-auto text-white-100">
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
