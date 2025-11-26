'use client';

import React from 'react';
import { buttonVariants } from 'fumadocs-ui/components/ui/button';
import {
  CopyCheckIcon,
  CopyIcon,
  FileWarningIcon,
} from 'lucide-react';
export function CopyToMarkdown() {
  const [status, setStatus] = React.useState<'idle' | 'pending' | 'success' | 'error'>('idle');
  const onClick = async () => {
    const pathname = document.location.pathname;
    setStatus('pending');
    const result = await fetch(`/llms.mdx${pathname.slice('/docs'.length)}`);
    if (!result.ok) {
      setStatus('error');
      setTimeout(() => setStatus('idle'), 2000);
      console.error('Failed to fetch markdown:', result.statusText);
      return;
    }
    const markdown = await result.text();
    await navigator.clipboard.writeText(markdown);
    setStatus('success');
    setTimeout(() => setStatus('idle'), 2000);
  };

  return (
    <button className={`${buttonVariants({ variant: status === 'pending' ? 'secondary' : 'outline', size: 'sm' })} cursor-pointer`} onClick={onClick}>
      {(status === 'idle' || status === 'pending') && <CopyIcon className="inline mr-2" size={16} />}
      {status === 'success' && <CopyCheckIcon className="inline mr-2 text-green-500" size={16} />}
      {status === 'error' && <FileWarningIcon className="inline mr-2 text-red-500" size={16} />}
      Copy to Markdown
    </button>
  );
}
