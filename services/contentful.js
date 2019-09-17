import { createClient } from "contentful";

const client = createClient({
  space: process.env.CONTENTFUL_SPACE,
  accessToken: process.env.CONTENTFUL_TOKEN,
  host: process.env.CONTENT_HOST
});

export default client;
