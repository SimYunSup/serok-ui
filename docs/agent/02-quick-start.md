# Quick Start

Get started with Serok UI in 5 minutes.

## Step 1: Install Dependencies (1 minute)

```bash
pnpm install
```

## Step 2: Start the Development Server (1 minute)

```bash
pnpm dev
```

Open http://localhost:5173 to see the documentation site. You can explore all available components here.

## Step 3: Use Your First Component (3 minutes)

Try using the Button component in your project:

```tsx
import { Button } from '@/lib/ui/Button';

export default function MyApp() {
  return (
    <Button variant="accent" size="L">
      Click me
    </Button>
  );
}
```

Components are located in the `lib/ui/` directory. You can copy and paste them into your project and customize them to match your needs.

## Learn More

- View all components: [Component Guide](https://serok.ethansup.net/docs/components)
- Detailed setup: See [`03-setup.md`](./03-setup.md)
- Development workflows: Learn more in [`05-workflow.md`](./05-workflow.md)
