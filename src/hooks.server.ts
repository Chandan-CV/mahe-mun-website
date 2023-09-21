import { SvelteKitAuth } from '@auth/sveltekit';
import Google from '@auth/core/providers/google';

import * as dotenv from 'dotenv';
dotenv.config();

export const handle = SvelteKitAuth(
	
	async (event) => {
		const authOptions = {
			providers: [
				Google({ clientId: process.env.GOOGLE_CLIENT_ID, clientSecret: process.env.GOOGLE_SECRET })
			],
			secret: process.env.SECRET,
			trustHost: true
		};
        return authOptions;
	}
	// //@ts-ignore
	// providers:[ Google({
	//     //@ts-ignore
	//     clientId: process.env.GOOGLE_CLIENT_ID,
	//     //@ts-ignore
	//     clientSecret: process.env.GOOGLE_SECRET,
	//     //@ts-ignore
	//     })],

	// secret: process.env.SECRET,
	// trustHost: true
);
