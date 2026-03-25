import { defineConfig } from 'sanity';
import { deskTool } from 'sanity/desk';

export default defineConfig({
  name: 'default',
  title: 'Story Board CMS',

  // Using your specific Project ID
  projectId: '5g6auq7p', 
  dataset: 'production',

  // This ensures the editor loads at /admin
  basePath: '/admin', 

  plugins: [deskTool()],

  schema: {
    types: [
      {
        name: 'storyBoard',
        type: 'document',
        title: 'Home Page Content',
        fields: [
          {
            name: 'heroImage',
            type: 'image',
            title: 'Hero Background Image',
            options: { hotspot: true }, // Allows you to crop perfectly in the CMS
            description: 'The grayscale background image for the top section.'
          },
          {
            name: 'mainHeading',
            type: 'string',
            title: 'Hero Card Heading',
            initialValue: 'THE NARRATIVE ANCHOR'
          },
          {
            name: 'philosophy',
            type: 'text',
            title: 'Professional Philosophy',
            description: 'The right-hand column text in the "Hey" section.'
          },
          {
            name: 'identities',
            type: 'array',
            title: 'Rotating Identities',
            description: 'The handwritten text (e.g., NGO Owner, Author).',
            of: [{ type: 'string' }]
          },
          {
            name: 'services',
            type: 'array',
            title: 'Bento Services',
            description: 'The services that will be filtered by the switcher.',
            of: [
              {
                type: 'object',
                fields: [
                  { name: 'title', type: 'string', title: 'Service Name' },
                  { name: 'description', type: 'text', title: 'Service Description' },
                  { 
                    name: 'category', 
                    type: 'string', 
                    title: 'Category',
                    options: {
                      list: [
                        { title: 'Organization', value: 'Organization' },
                        { title: 'Business', value: 'Business' },
                        { title: 'Individual', value: 'Individual' }
                      ]
                    }
                  }
                ]
              }
            ]
          },
          {
            name: 'comparison',
            type: 'object',
            title: 'Comparison Section',
            fields: [
              { name: 'specialistText', type: 'text', title: 'The Specialist Description' },
              { name: 'agencyText', type: 'text', title: 'The Large Agency Description' }
            ]
          }
        ]
      }
    ],
  },
});
