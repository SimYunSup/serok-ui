import { defineConfig } from 'vite';
import { reactRouter } from '@react-router/dev/vite';
import tailwindcss from '@tailwindcss/vite';
import mdx from 'fumadocs-mdx/vite';
import tsconfigPaths from 'vite-tsconfig-paths';
import * as MdxConfig from './source.config';

export default defineConfig({
  plugins: [
    tailwindcss(),
    reactRouter(),
    mdx(MdxConfig),
    tsconfigPaths(),
  ],
  ssr: {
    noExternal: [
      '@adobe/react-spectrum',
      /^@react-spectrum\/.*/,
      /^@spectrum-icons\/.*/,
    ]
  }
});
