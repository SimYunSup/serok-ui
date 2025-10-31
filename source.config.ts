import { fileGenerator, remarkDocGen } from 'fumadocs-docgen';
import { frontmatterSchema, defineConfig, defineDocs } from 'fumadocs-mdx/config';

export const docs = defineDocs({
  dir: 'content/docs/',
  docs: {
    schema: frontmatterSchema,
  },
});

export const llmDocs = defineDocs({
  dir: 'content/llms.mdx',
  docs: {
    schema: frontmatterSchema,
    postprocess: {
      includeProcessedMarkdown: true,
    },
  },
});


export default defineConfig({
  mdxOptions: {
    remarkImageOptions: {
      useImport: true,
    },
    remarkNpmOptions: {
      persist: {
        id: 'package-manager',
      },
    },
    remarkPlugins: [[remarkDocGen, { generators: [fileGenerator({})] }]],
    rehypeCodeOptions: {
      lazy: true,
      langs: ['ts', 'js', 'html', 'tsx', 'mdx'],
      inline: 'tailing-curly-colon',
      themes: {
        light: 'github-light',
        dark: 'github-dark',
      },
    },
  },
});
