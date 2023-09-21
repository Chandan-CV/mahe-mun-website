/** @type {import('tailwindcss').Config} */
export default {
	// content: ['./src/**/*.{html,js,svelte,ts}'],
	content: {
		relative: true,
		transform: (content) => content.replace(/taos:/g, ''),
		files: ['./src/**/*.{html,js,svelte,ts}']
	},

	theme: {
		extend: {
			backgroundImage: {
				'banner-bg': "url('lib/images/firstBG.jpg')",
				'committee-bg': "url('https://images.pexels.com/photos/10954065/pexels-photo-10954065.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2')",
			},
			animation: {
				fade: 'fadeOut 5s ease-in-out'
			},

			// that is actual animation
			keyframes: (theme) => ({
				fadeOut: {
					'0%': { opacity: theme('1') },
					'100%': { opacity: theme('0') }
				}
			}),
			fontFamily: {
				Nevis: ['Nevis']
			}
		}
	},
	plugins: [require('taos/plugin')],
	safelist: ['!duration-[0ms]', '!delay-[0ms]', 'html.js :where([class*="taos:"]:not(.taos-init))']
};
