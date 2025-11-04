# Development Workflow & Common Tasks

## Essential Commands

### 1. Start Development Server

```bash
pnpm dev
```

- Opens documentation site at localhost:5173
- Automatically refreshes on file changes
- Includes component previews and examples

### 2. Build Documentation

```bash
pnpm build:docs
```

- Compiles MDX documentation into static site
- Required before deployment
- Generates final deployment artifacts

### 3. Type Check

```bash
pnpm typecheck
```

- Runs TypeScript compiler
- Verifies all type definitions
- Must pass before committing

### 4. Linting

```bash
pnpm lint
```

- Checks code style with ESLint
- Detects formatting issues
- Must pass CI/CD checks

### 5. Production Build

```bash
pnpm build:registry
```

- Generates component registry
- Builds deployment artifacts

## Common Workflows

### Adding a New Component

1. Create component file in `lib/ui/[ComponentName]/`
2. Implement using React Spectrum patterns
3. Create example in `content/docs/examples/[ComponentName]/`
4. Document in `content/docs/components/[component-name].md`
5. Run `pnpm typecheck` to verify
6. Test with `pnpm dev` in browser

### Running the Documentation Site Locally

1. `pnpm install` (if dependencies not yet installed)
2. `pnpm dev` (starts development server)
3. Navigate to http://localhost:5173
4. Browser auto-refreshes on file changes

### Testing Changes Before Commit

1. `pnpm typecheck` (verify TypeScript)
2. `pnpm lint` (check code style)
3. `pnpm dev` (visual verification)
4. Open http://localhost:5173 in browser and test manually

## Updating Dependencies

```bash
pnpm update [package-name]
```

**Important Notes:**
- Minor/patch updates are generally safe
- Major version updates may require code changes
- Always test thoroughly after major updates

## Build Process Summary

1. **Local Development**: `pnpm dev` → Hot reload at localhost:5173
2. **Pre-commit Checks**: `pnpm typecheck && pnpm lint`
3. **Documentation Build**: `pnpm build:docs` → Generates static site
4. **Deployment**: GitHub Actions automatically builds and deploys when merged to main

## Performance Tips

- Use `pnpm` instead of `npm` for faster, more consistent installs
- Clear pnpm cache if you encounter issues: `pnpm store prune`
- Use `pnpm --filter [workspace]` for monorepo operations
- Hot reload works best with modern browsers (Chrome, Firefox, Safari)
