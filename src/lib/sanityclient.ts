import { createClient } from '@sanity/client';
import imageUrlBuilder from '@sanity/image-url';
const client = createClient({
	projectId: 'kaabz9y9',
	dataset: 'production',
	apiVersion: '2023-09-11', // choose the API version you want
	useCdn: false
});
const builder = imageUrlBuilder(client);
export function urlfor(source: string) {
	return builder.image(source);
}
export default client;
