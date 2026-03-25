import { defineConfig } from 'sanity';
import { deskTool } from 'sanity/desk';

export default defineConfig({
  name: 'default',
  title: 'Story Board CMS',

  projectId: 'm4hjnbjr', 
  dataset: 'production',
  
  // This is the "Magic Key" you were missing!
  basePath: '/admin', 

  plugins: [deskTool()],

  schema: {
    types: [
      {
        name: 'storyBoard',
        type: 'document',
        title: 'Story Board Content',
        fields: [
          { name: 'title', type: 'string', title: 'Main Heading' },
          { name: 'description', type: 'text', title: 'Brand Story' },
          {
            name: 'identities',
            type: 'array',
            title: 'Rotating Identities',
            of: [{ type: 'string' }]
          }
        ]
      }
    ],
  },
});
