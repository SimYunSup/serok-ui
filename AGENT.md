# AGENT.md - Serok UI Project Guide

This document provides a quick reference for AI agents and developers working with Serok UI. For detailed information, refer to the guides in the `docs/agent/` directory.

## Overview

**Serok UI** is a modern, accessible React component library built on Adobe's React Spectrum. It's designed for rapid development in team projects while maintaining enterprise-grade accessibility (WCAG 2.1 AA) and full customization capabilities through copy-paste component distribution (shadcn/ui style).

- **Repository**: [github.com/SimYunSup/serok-ui](https://github.com/SimYunSup/serok-ui)
- **Documentation**: [serok.ethansup.net](https://serok.ethansup.net)
- **Primary Language**: Korean (문서는 한국어)
- **Tech Stack**: React 19+, React Spectrum, TypeScript 5.0+, pnpm

## Quick Start

See: [`docs/agent/02-quick-start.md`](./docs/agent/02-quick-start.md)

```bash
pnpm install
pnpm dev
# Open http://localhost:5173
```

## Setup & Installation

See: [`docs/agent/03-setup.md`](./docs/agent/03-setup.md)

**Requirements:**
- Node.js 18+
- pnpm 10.20.0+
- TypeScript 5.0+ (recommended)

## Project Structure

See: [`docs/agent/04-structure.md`](./docs/agent/04-structure.md)

**Key Directories:**
- `lib/ui/` - Component implementations (React Spectrum-based)
- `app/` - Documentation site (React Router SPA)
- `content/` - Markdown documentation
- `.github/workflows/` - CI/CD automation
- `docs/agent/` - Developer guides (English)

## Development Workflow

See: [`docs/agent/05-workflow.md`](./docs/agent/05-workflow.md)

**Essential Commands:**
```bash
pnpm dev          # Start development server
pnpm typecheck    # Verify TypeScript
pnpm lint         # Check code style
pnpm build:docs   # Build documentation
```

## Architecture & Philosophy

See: [`docs/agent/01-overview.md`](./docs/agent/01-overview.md)

**Core Principles:**
- Build on proven foundations (React Spectrum) rather than reinventing
- Make accessibility natural, not an afterthought
- Enable copy-paste customization (no bundle bloat)
- Respect limited team resources (club project)

**Design Decisions:**
- ✅ React Spectrum S1: Proven accessibility + design system
- ❌ React Spectrum S2: Parcel style macro learning curve too steep
- ❌ Web Components: SSR support not prioritized yet
- ❌ Radix-UI/Base-UI: Would require building entire design system from scratch

## Contributing

**Branch Naming:** `NNN-feature-name` (e.g., `001-new-button`, `042-fix-colors`)

**Before Committing:**
1. `pnpm typecheck` - Must pass
2. `pnpm lint` - Code style check
3. `pnpm dev` - Visual verification in browser

**PR Process:**
1. Create feature branch
2. Make changes in `lib/ui/` or `content/`
3. Document component following 10-section format (see `CONTRIBUTING.md`)
4. Create PR with clear description
5. Address review feedback
6. Merge when approved - auto-deployed to production

**Component Documentation:** See `CONTRIBUTING.md` for required sections (Props table, examples, accessibility features, React Spectrum reference)

## Common Commands

| Command | Purpose |
|---------|---------|
| `pnpm dev` | Start development server (localhost:5173) |
| `pnpm typecheck` | Run TypeScript compiler |
| `pnpm lint` | Check code style with ESLint |
| `pnpm lint:fix` | Auto-fix linting issues |
| `pnpm build:docs` | Build static documentation |
| `pnpm build:registry` | Build component registry |

## Troubleshooting

**Port 5173 already in use:**
```bash
pnpm dev -- --port 3000
```

**pnpm install fails:**
```bash
pnpm store prune
pnpm install
```

**TypeScript errors:**
```bash
pnpm typecheck
```

**For more help:** See `docs/agent/03-setup.md` or check [GitHub Issues](https://github.com/SimYunSup/serok-ui/issues)

## Key Technologies

| Technology | Version | Purpose |
|-----------|---------|---------|
| React | 19+ | UI library |
| React Spectrum | Latest | Accessible components |
| React Router | 7.9.4+ | Routing |
| TypeScript | 5.0+ | Type safety |
| Tailwind CSS | Latest | Styling |
| pnpm | 10.20.0+ | Package manager |

## File Organization

- **AGENT.md** - This file (AI agent quick reference)
- **CLAUDE.md** - AI-specific conventions
- **CONTRIBUTING.md** - Component documentation standards
- **README.md** - Project overview
- **docs/agent/** - Detailed developer guides (Korean)
  - [`01-overview.md`](./docs/agent/01-overview.md) - Project philosophy and use cases
  - [`02-quick-start.md`](./docs/agent/02-quick-start.md) - 5-minute setup
  - [`03-setup.md`](./docs/agent/03-setup.md) - Environment setup with troubleshooting
  - [`04-structure.md`](./docs/agent/04-structure.md) - Directory map and file discovery
  - [`05-workflow.md`](./docs/agent/05-workflow.md) - Development tasks and workflows

## Resources

- **Official Docs**: [serok.ethansup.net](https://serok.ethansup.net)
- **GitHub Repository**: [github.com/SimYunSup/serok-ui](https://github.com/SimYunSup/serok-ui)
- **React Spectrum**: [react-spectrum.adobe.com](https://react-spectrum.adobe.com)
- **Tailwind CSS**: [tailwindcss.com](https://tailwindcss.com)
- **React Docs**: [react.dev](https://react.dev)

---

**Last Updated**: 2025-11-02
**Status**: Active Development
**Maintainer**: Serok UI Team
