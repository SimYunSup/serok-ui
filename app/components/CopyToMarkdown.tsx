import { buttonVariants } from "fumadocs-ui/components/ui/button"
export function CopyToMarkdown() {
  const onClick = async () => {
    const pathname = document.location.pathname;
    const result = await fetch(`/llms.mdx${pathname.slice('/docs'.length)}`);
    if (!result.ok) {
      console.error('Failed to fetch markdown:', result.statusText);
      return;
    }
    const markdown = await result.text();
    await navigator.clipboard.writeText(markdown);
  }

  return (
    <button className={`${buttonVariants({ variant: "outline", size: "sm" })} cursor-pointer`} onClick={onClick}>
      Copy to Markdown
    </button>
  )
}
