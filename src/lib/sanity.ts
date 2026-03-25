import { createClient } from '@sanity/client';
import imageUrlBuilder from '@sanity/image-url';

export const client = createClient({
  // This line tells the code to use the value you just saved in Vercel!
  projectId: import.meta.env.VITE_SANITY_PROJECT_ID || 'm4hjnbjr', 
  dataset: 'production',
  apiVersion: '2024-03-25',
  useCdn: true,
});

const builder = imageUrlBuilder(client);
export const urlFor = (source: any) => builder.image(source);
