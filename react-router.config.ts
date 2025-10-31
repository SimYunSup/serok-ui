import type { Config } from '@react-router/dev/config';
import { glob } from 'node:fs/promises';
import { createGetUrl, getSlugs } from 'fumadocs-core/source';
import path from 'node:path';
import { get } from 'node:http';

const getUrl = createGetUrl('/');

export default {
  // disable SSR
  ssr: false,

  async prerender({ getStaticPaths }) {
    const paths: string[] = [...getStaticPaths()];
    const exclude = [
      '/llms'
    ]
    for await (const entry of glob('**/*.mdx', { cwd: 'content' })) {
      const url = getUrl(getSlugs(entry));
      if (exclude.includes(url)) continue;
      paths.push(url);
    }
    console.log('Pre-render paths:', paths);
    return paths;
  },
} satisfies Config;
