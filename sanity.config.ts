import { defineConfig } from 'sanity';
import { deskTool } from 'sanity/desk';

export default defineConfig({
  name: 'default',
  title: 'Story Board CMS',
  projectId: '5g6auq7p', 
  dataset: 'production',
  basePath: '/admin', 

  plugins: [deskTool()],

  schema: {
    types: [
      {
        name: 'storyBoard',
        type: 'document',
        title: 'Home Page Content',
        fields: [
          { name: 'heroImage', type: 'image', title: 'Hero Background', options: { hotspot: true }},
          { name: 'mainHeading', type: 'string', title: 'Hero Card Title', initialValue: 'The Narrative Anchor' },
          { name: 'philosophy', type: 'text', title: 'Philosophy Text' },
          {
            name: 'identities',
            type: 'array',
            title: 'Rotating Identities',
            of: [{ type: 'string' }]
          },
          {
            name: 'services',
            type: 'array',
            title: 'Bento Services',
            of: [{
              type: 'object',
              fields: [
                { name: 'title', type: 'string', title: 'Service Name' },
                { name: 'category', type: 'string', title: 'Category', options: { list: ['Organization', 'Business', 'Individual'] }},
                { 
                  name: 'accordions', 
                  type: 'array', 
                  title: 'Service Accordion List',
                  of: [{
                    type: 'object',
                    fields: [
                      { name: 'label', type: 'string', title: 'Label' },
                      { name: 'content', type: 'text', title: 'Detailed Content' }
                    ]
                  }]
                }
              ]
            }]
          }
        ]
      }
    ],
  },
});
