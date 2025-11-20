import defaultMdxComponents from 'fumadocs-ui/mdx';
import { PreviewWrapper } from '../components/PreviewWrapper';
import { Button } from '@/lib/ui/Button';
import * as Select from '@/lib/ui/Select';
import { Checkbox } from '@/lib/ui/Checkbox';
import { Input } from '@/lib/ui/Input';
import { Switch } from '@/lib/ui/Switch';
import * as Example from '../components/Example';
import * as Tabs from '@/lib/ui/Tabs';
import { CopyToMarkdown } from '~/components/CopyToMarkdown';
import ColorsPage from '~/components/ColorPalette';
import { Steps, Step } from '~/components/steps';

const usingMdxComponents = {
  PreviewWrapper,
  Button,
  Checkbox,
  Input,
  ...Select,
  Switch,
  ...Example,
  ...Tabs,
  CopyToMarkdown,
  ColorsPage,
  Steps,
  Step,
};

export function useMdxComponents() {
  return {
    ...defaultMdxComponents,
    ...usingMdxComponents,
  };
}
