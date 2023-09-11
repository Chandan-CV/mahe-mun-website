import { createClient } from "@sanity/client";

const client = createClient({
    projectId: "kaabz9y9",
    dataset: "production",
    apiVersion: "2023-09-11", // choose the API version you want
    useCdn: false,
    });
export default client;