# CLAUDE.md - AI Assistant Conventions

> **Start here**: For general project information, development setup, and contribution guidelines, see [`AGENT.md`](./AGENT.md). This document focuses on AI-specific conventions and patterns.

## Overview

This file provides guidance for AI assistants (particularly Claude) when working with the Serok UI codebase. It complements the general developer guide in [`AGENT.md`](./AGENT.md).

- **General Project Info**: See [`AGENT.md`](./AGENT.md) for overview, setup, structure, and contribution processes
- **AI Conventions**: This file (CLAUDE.md) for AI-specific development patterns
- **Component Standards**: See `CONTRIBUTING.md` for component documentation format

## Project Context

**Serok UI** is a React component library built on Adobe's React Spectrum. It uses the shadcn/ui copy-paste distribution model, enabling full customization without npm versioning constraints.

**Key principle**: Don't reinvent the wheel. Leverage React Spectrum's proven accessibility and design system.

## Code Organization

### Component Library: `lib/ui/`
- Each component in its own folder (e.g., `lib/ui/Button/`)
- Implements React Spectrum patterns with Tailwind CSS styling
- Fully typed with TypeScript
- Includes accessibility features (ARIA, keyboard navigation)

### Documentation Site: `app/`
- React Router 7 SPA at https://serok.ethansup.net
- Source code in `app/routes/`, `app/components/`
- Markdown content in `content/docs/`
- MDX support for interactive examples

### Developer Guides: `docs/agent/`
- 8 markdown files providing detailed guidance
- Covers setup, workflows, contributing, troubleshooting
- Cross-linked and referenced from AGENT.md

## Development Patterns

### TypeScript Usage
- Strict mode enabled in `tsconfig.json`
- All components fully typed
- Avoid `any` type - use proper type definitions
- Leverage React Spectrum's types

### Component Composition
- Build on React Spectrum components (never reinvent from scratch)
- Use Tailwind CSS for styling (no custom CSS where possible)
- Follow React hooks patterns (useState, useEffect, useCallback)
- Keep components composable and reusable

### Styling Approach
- **Tailwind CSS**: Utility-first, configured in `tailwind.config.js`
- **CSS Variables**: For theme customization (in `tokens/`)
- **No inline styles**: Use classes instead
- **Dark mode**: Supported through CSS variables

### Accessibility Standards
- WCAG 2.1 AA compliance required
- React Spectrum handles most accessibility automatically
- Always include proper ARIA labels
- Test keyboard navigation (Tab, Enter, Escape, Arrow keys)
- Verify screen reader compatibility

## Git & Version Control

### Branch Naming Convention
- Format: `NNN-feature-name` (e.g., `001-button-component`, `042-fix-colors`)
- Use kebab-case (lowercase, hyphens)
- Sequential 3-digit numbers

### Commit Messages
- Format: `type(scope): description`
- Types: `feat`, `fix`, `docs`, `style`, `refactor`, `test`, `chore`
- Example: `feat(button): Add size prop and update accessibility`

### Pull Request Process
1. **Before submitting**: Run `pnpm typecheck && pnpm lint && pnpm dev`
2. **Description**: Explain what changed and why
3. **Testing**: Verify component works in browser
4. **Review**: At least 1 maintainer review required
5. **Documentation**: Follow 10-section format in CONTRIBUTING.md

## Documentation Format for Components

When documenting components, follow this 10-section format:

1. **Component Name & Description** (1-line summary)
2. **Props Table** (TypeScript types, descriptions, defaults)
3. **Usage Examples** (3+ runnable examples)
4. **State Examples** (different states: disabled, loading, etc.)
5. **Event Handling** (callback patterns)
6. **Accessibility Features** (ARIA labels, keyboard navigation)
7. **Styling** (CSS customization guide)
8. **React Spectrum Reference** (link to official docs)
9. **Related Components** (commonly used together)
10. **Change History** (version-specific updates)

## Command Reference

| Command | Purpose |
|---------|---------|
| `pnpm install` | Install dependencies |
| `pnpm dev` | Start development server (http://localhost:5173) |
| `pnpm typecheck` | Run TypeScript compiler |
| `pnpm lint` | Check code style with ESLint |
| `pnpm lint:fix` | Auto-fix linting issues |
| `pnpm build:docs` | Build static documentation |
| `pnpm build:registry` | Build component registry |

## Key Technologies

- **React 19+**: Component library (hooks, concurrent features)
- **React Spectrum**: Accessible component base library
- **React Router 7**: Client-side routing
- **TypeScript 5.0+**: Type safety and IDE support
- **Tailwind CSS**: Utility-first styling
- **pnpm 10.20.0+**: Package manager (faster than npm)

## File Structure Quick Reference

```
serok-ui/
├── AGENT.md           # General project guide (start here!)
├── CLAUDE.md          # This file (AI conventions)
├── CONTRIBUTING.md    # Component documentation standards
├── README.md          # Project overview
├── lib/ui/            # Component implementations
├── app/               # Documentation site (React Router)
├── content/           # Markdown documentation
├── docs/agent/        # Detailed developer guides
├── .github/workflows/ # CI/CD automation
└── package.json       # Dependencies & scripts
```

## Important Notes for AI Assistants

### When Analyzing Code
- Understand React Spectrum first - much of the foundation comes from it
- Check existing components before suggesting new implementations
- Use TypeScript types to understand component contracts
- Review accessibility requirements carefully

### When Making Suggestions
- Prefer React Spectrum patterns over custom solutions
- Ensure all changes maintain TypeScript strict mode
- Verify accessibility implications (WCAG 2.1 AA)
- Consider copy-paste customization (components belong in user projects)

### When Writing Code
- Follow established TypeScript patterns (strict types, no `any`)
- Use existing Tailwind utility classes (don't write custom CSS)
- Include comprehensive JSDoc comments
- Ensure components are tested with `pnpm dev` and `pnpm typecheck`

## Error Handling

When encountering errors or uncertainties:

1. **Check AGENT.md**: General troubleshooting and setup issues
2. **See docs/agent/**: Detailed guides for specific topics
3. **Review CONTRIBUTING.md**: Component documentation standards
4. **Check React Spectrum docs**: For component API questions
5. **Search GitHub Issues**: Community solutions may exist

## Related Documentation

- **AGENT.md**: General project guide, setup, and contribution workflow
- **docs/agent/01-overview.md**: Project philosophy and design decisions
- **docs/agent/03-setup.md**: Detailed environment setup and troubleshooting
- **docs/agent/04-structure.md**: Complete directory map and file discovery
- **docs/agent/06-contributing.md**: Contribution process and guidelines
- **CONTRIBUTING.md**: Component documentation standards (10-section format)
- **React Spectrum**: [react-spectrum.adobe.com](https://react-spectrum.adobe.com)
- **Tailwind CSS**: [tailwindcss.com](https://tailwindcss.com)

## Summary

- Start with [`AGENT.md`](./AGENT.md) for project overview
- Refer to `docs/agent/` for detailed guidance by topic
- Follow established patterns from React Spectrum and existing components
- Maintain TypeScript strict mode and accessibility standards
- Verify changes with `pnpm typecheck`, `pnpm lint`, and `pnpm dev`

---

**Last Updated**: 2025-11-02
**For**: Claude and other AI assistants
**See also**: [`AGENT.md`](./AGENT.md) for general project information
