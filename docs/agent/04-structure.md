# Project Structure & Directory Map

Serok UI follows a clean directory structure. After reading this section, you'll understand the role of each folder and know where to look when adding new features or fixing bugs.

## Directory Overview

```
serok-ui/
├── lib/                    # Component library source code
│   ├── ui/                 # React Spectrum-based UI components
│   └── public/             # Component registry JSON
├── app/                    # Documentation site and example apps
│   ├── components/         # Components for the documentation site
│   ├── docs/               # Documentation page routes
│   ├── routes/             # React Router route definitions
│   └── root.tsx            # Main layout component
├── content/                # Markdown and MDX documentation
│   ├── docs/               # Component guides and tutorials
│   └── llms.mdx/           # Documentation for AI assistants
├── .github/                # GitHub configuration and CI/CD
│   └── workflows/          # GitHub Actions workflows
├── build/                  # Build output and artifacts
├── .specify/               # Project specifications and planning
├── .claude/                # Claude development configuration
├── docs/                   # Developer guides and documentation
│   └── agent/              # Detailed AGENT.md reference files
├── package.json            # Project dependencies
├── pnpm-lock.yaml          # pnpm lock file
├── AGENT.md                # AI assistant and developer quick reference
├── CLAUDE.md               # AI assistant conventions
├── CONTRIBUTING.md         # Component documentation standards
└── README.md               # Project overview
```

## Key Directories Explained

### lib/ui/ - Component Implementations

This is the core of Serok UI. All component code is built on React Spectrum. Each component like Button, Dialog, and Select has its own folder containing:

- TypeScript component implementation
- Tailwind CSS styling
- Component-specific utility functions
- Accessibility (a11y) implementations

When adding a new component, start in the `lib/ui/` directory.

### app/ - Documentation Site

Everything users see at https://serok.ethansup.net originates here. It's a Single Page Application (SPA) built with React Router 7:

- `app/routes/` - Route definitions for each page
- `app/components/` - UI components for the documentation site (header, sidebar, navigation, etc.)
- `app/docs/` - Documentation pages
- `app/root.tsx` - Overall layout and styling

### content/docs/ - Markdown Documentation

All documentation content is stored in Markdown format:

- `content/docs/components/` - Detailed guides for each component
- `content/docs/guides/` - Setup and usage method guides
- `content/llms.mdx/` - Documentation designed for AI assistants like Claude

When adding or modifying documentation, work in this directory.

### .github/workflows/ - CI/CD Automation

GitHub Actions automation pipelines are defined here:

- When a PR is created, automatically run lint, typecheck, and build
- When merged to main branch, documentation site is automatically deployed
- Failed tests automatically trigger PR reviews

## Finding Files

### "I want to modify the Button component code"

→ Look in `lib/ui/Button/` folder. Here you'll find the implementation, styles, and type definitions.

### "I want to see Button component usage examples"

→ Check `content/docs/components/button.md` file for working examples.

### "I need to set up the development environment"

→ See [`03-setup.md`](./03-setup.md) in this directory or check `README.md`.

### "I want to learn how to add a component"

→ Read `CONTRIBUTING.md` file. It explains how to document a new component using a 10-section format.

### "I want to know what pages exist on the documentation site"

→ Check the `app/routes/` directory. Each `.tsx` file represents one page.

## Development Workflow Context

The directory structure supports the following workflow:

1. **Component Development**: `lib/ui/[ComponentName]/`
2. **Create Examples**: `content/docs/examples/[ComponentName]/`
3. **Write Documentation**: `content/docs/components/[component-name].md`
4. **Test Locally**: `pnpm dev` (starts app with hot reload)
5. **Documentation Build**: `pnpm build:docs` (generates static site)
6. **Push to GitHub**: CI/CD automatically handles deployment
