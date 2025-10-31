import { index, route, type RouteConfig } from '@react-router/dev/routes';

export default [
  index('routes/home.tsx'),
  route('docs/*', 'docs/page.tsx'),
  route('llms-full.txt', 'routes/llms-full.ts'),
  route('llms.mdx/*', 'routes/llms-mdx.ts'),
] satisfies RouteConfig;
