import { createClient } from '@sanity/client';
import imageUrlBuilder from '@sanity/image-url';

export const client = createClient({
  projectId: '5g6auq7p', // Using your new ID!
  dataset: 'production',
  apiVersion: '2024-03-25',
  useCdn: true,
});

const builder = imageUrlBuilder(client);
export const urlFor = (source: any) => builder.image(source);
