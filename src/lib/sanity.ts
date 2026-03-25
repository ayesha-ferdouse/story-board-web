import { createClient } from '@sanity/client';
import imageUrlBuilder from '@sanity/image-url';

export const client = createClient({
  projectId: 'm4hjnbjr', // Replace with your new 8-char ID
  dataset: 'production',
  apiVersion: '2024-03-25',
  useCdn: true,
});

const builder = imageUrlBuilder(client);
export const urlFor = (source: any) => builder.image(source);
