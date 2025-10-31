import { loader } from 'fumadocs-core/source';
import { create, docs, llmDocs } from '~/.source';

export const source = loader({
  source: await create.sourceAsync(docs.doc, docs.meta),
  baseUrl: '/docs',
});

export const llmSource = loader({
  source: await create.sourceAsync(llmDocs.doc, llmDocs.meta),
  baseUrl: '/llms.mdx',
})
