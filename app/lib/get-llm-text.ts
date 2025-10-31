import { llmSource } from '~/lib/source';
import type { InferPageType } from 'fumadocs-core/source';

export async function getLLMText(page: InferPageType<typeof llmSource>) {
  const processed = await page.data.getText('processed');

  return `# ${page.data.title} ${page.data.description} (${page.url})

${processed}`;
}
