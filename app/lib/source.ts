import { loader } from 'fumadocs-core/source';
import { docs, llmDocs } from 'fumadocs-mdx:collections/server';
export const source = loader({
  source: docs.toFumadocsSource(),
  baseUrl: '/docs',
});

export const llmSource = loader({
  source: llmDocs.toFumadocsSource(),
  baseUrl: '/llms.mdx',
});
