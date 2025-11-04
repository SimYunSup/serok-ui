# Development Environment Setup

## System Requirements

Minimum requirements to develop with Serok UI:

- **Node.js 18+**: Check with `node --version`
- **pnpm 10.20.0+**: Check with `pnpm --version` (Recommended install via `corepack`)
- **TypeScript 5.0+** (optional): For optimal IDE experience

## Installation Steps

### Step 1: Clone the Repository

```bash
git clone https://github.com/simyunsup/serok-ui.git
cd serok-ui
```

### Step 2: Verify Versions

Check your system's Node.js and pnpm versions:

```bash
node --version  # Must be v18.0.0 or higher
pnpm --version  # 10.20.0 or higher recommended
```

**Node.js version incorrect?**
- macOS/Linux: Use `nvm use` (if `.nvmrc` file exists, it automatically selects the correct version)
- Windows: Try [nvm-windows](https://github.com/coreybutler/nvm-windows) or [fnm](https://github.com/Schniz/fnm)

### Step 3: Install Dependencies

```bash
pnpm install
```

This command installs all project dependencies. The first run may take several minutes.

## Verify Installation

Confirm everything is properly installed:

```bash
pnpm typecheck
```

If there are no errors, your TypeScript setup is complete.

## Start the Development Server

```bash
pnpm dev
```

You should see a message like this in the terminal:

```
  ➜  Local:   http://localhost:5173/
  ➜  press h + enter to show help
```

Open http://localhost:5173 in your browser to verify the documentation site appears.

## Environment Configuration

No environment variables are required. These files are automatically loaded:
- `.env.local` (if it exists)
- `package.json` (project configuration)
- `tsconfig.json` (TypeScript configuration)

## Troubleshooting

### "pnpm install" fails

```bash
# Clear cache and retry
pnpm store prune
pnpm install
```

### "Port 5173 is already in use" error

```bash
# Start on a different port
pnpm dev -- --port 3000
```

### TypeScript errors appear

```bash
# Recompile TypeScript
pnpm typecheck
```

### "command not found: pnpm"

Make sure pnpm is installed globally:

```bash
npm install -g pnpm
```

### Hot reload not working

- Check browser console for errors
- Try a hard refresh (Cmd+Shift+R or Ctrl+Shift+R)
- Restart the dev server: `pnpm dev`

### Need more help?

- Check the [official documentation](https://serok.ethansup.net)
- Search [GitHub Issues](https://github.com/simyunsup/serok-ui/issues) for similar problems
- Open a new issue with detailed information about your setup
