import type { Route } from './+types/page';
import { DocsLayout } from 'fumadocs-ui/layouts/docs';
import {
  DocsBody,
  DocsDescription,
  DocsPage,
  DocsTitle,
} from 'fumadocs-ui/page';
import { source } from '~/lib/source';
import type * as PageTree from 'fumadocs-core/page-tree';
import defaultMdxComponents from 'fumadocs-ui/mdx';
import { docs } from '~/.source';
import { toClientRenderer } from 'fumadocs-mdx/runtime/vite';
import { baseOptions } from '~/lib/layout.shared';
import { PreviewWrapper } from '../components/PreviewWrapper';
import { Button } from '@/lib/ui/Button';
import { Item, Select } from '@/lib/ui/Select';
import { Checkbox } from '@/lib/ui/Checkbox';
import { Input } from '@/lib/ui/Input';
import { Switch } from '@/lib/ui/Switch';
import * as Example from '../components/Example';
import { CopyToMarkdown } from '@/app/components/CopyToMarkdown';

const usingMdxComponents = {
  PreviewWrapper,
  Button,
  Checkbox,
  Input,
  Select,
  Item,
  Switch,
  ...Example,
  CopyToMarkdown,
};

export async function loader({ params }: Route.LoaderArgs) {
  const slugs = params['*'].split('/').filter((v) => v.length > 0);
  const page = source.getPage(slugs);
  if (!page) throw new Response('Not found', { status: 404 });

  return {
    path: page.path,
    tree: source.getPageTree(),
  };
}

const renderer = toClientRenderer(
  docs.doc,
  ({ toc, default: Mdx, frontmatter }) => {
    return (
      <DocsPage toc={toc}>
        <title>{frontmatter.title}</title>
        <meta name="description" content={frontmatter.description} />
        <DocsTitle>{frontmatter.title}</DocsTitle>
        <DocsDescription>{frontmatter.description}</DocsDescription>
        <DocsBody>
          <Mdx components={{ ...defaultMdxComponents, ...usingMdxComponents }} />
        </DocsBody>
      </DocsPage>
    );
  },
);

export default function Page({ loaderData }: Route.ComponentProps) {
  const { tree, path } = loaderData;
  const Content = renderer[path];

  return (
    <DocsLayout
      {...baseOptions()}
      tree={tree as PageTree.Root}
    >
      <Content />
    </DocsLayout>
  );
}
