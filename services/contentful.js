import { createClient } from "contentful";

const client = createClient({
  space: process.env.NEXT_PUBLIC_ENV_CONTENTFUL_SPACE,
  accessToken: process.env.NEXT_PUBLIC_ENV_CONTENTFUL_TOKEN,
  host: process.env.NEXT_PUBLIC_ENV_CONTENTFUL_HOST,
});

export default client;
