# Troubleshooting & Common Issues

## Setup Issues

### "pnpm install" command fails

**Error message:** `ERR! ...`

**Solutions:**
```bash
# Clear pnpm cache and retry
pnpm store prune
pnpm install

# If still failing, remove node_modules and lock file
rm -rf node_modules pnpm-lock.yaml
pnpm install
```

### Port 5173 is already in use

**Error message:** `Port 5173 is in use...`

**Solutions:**
```bash
# Use a different port
pnpm dev -- --port 3000

# Or find and kill process using port 5173
# macOS/Linux:
lsof -i :5173
kill -9 [PID]

# Windows:
netstat -ano | findstr :5173
taskkill /PID [PID] /F
```

### Node.js version mismatch

**Error message:** `Node version 16.x is not supported. Requires 18+`

**Solutions:**
- Check version: `node --version`
- Use nvm (macOS/Linux): `nvm use` (reads `.nvmrc`)
- Use fnm: `fnm use`
- Or download from [nodejs.org](https://nodejs.org/)

### TypeScript compilation errors

**Error message:** `error TS2304: Cannot find name...`

**Solutions:**
```bash
# Run full type check
pnpm typecheck

# Verify node_modules exists
ls node_modules

# Restart IDE/Editor after clean install
rm -rf node_modules pnpm-lock.yaml
pnpm install
```

## Development Issues

### Hot reload not working

**Symptoms:** Changes don't appear when you save files

**Solutions:**
- Check browser console for errors (F12)
- Hard refresh browser (Cmd+Shift+R or Ctrl+Shift+R)
- Restart dev server: `pnpm dev`
- Check that files are being saved (editor indicator)
- Verify dev server is running on correct port

### Type errors in IDE (VSCode, WebStorm, etc.)

**Symptoms:** Red squiggly lines but `pnpm typecheck` passes

**Solutions:**
```bash
# Ensure TypeScript is installed
pnpm install

# Verify TypeScript version
pnpm list typescript

# Restart IDE's TypeScript server
# In VSCode: Cmd+Shift+P → "TypeScript: Restart TS Server"

# Check IDE is using workspace TypeScript
# Not global TypeScript installation
```

### Build or development server fails to start

**Error message:** Various build-related errors

**Solutions:**
```bash
# Clear all build artifacts
rm -rf build dist .next .react-router

# Verify dependencies
pnpm install

# Check for syntax errors
pnpm lint

# Start fresh
pnpm dev
```

### ESLint errors or formatting issues

**Error message:** `Error: Plugin "@typescript-eslint" was not found...`

**Solutions:**
```bash
# Check linting rules
pnpm lint

# Auto-fix fixable issues
pnpm lint:fix

# Reinstall dependencies if plugin not found
pnpm install
```

## Component Development Issues

### React Spectrum prop not working

**Problem:** Props like `isDisabled` not recognized

**Solutions:**
- Check [React Spectrum docs](https://react-spectrum.adobe.com)
- Verify correct prop name (e.g., `isDisabled`, not `disabled`)
- Check browser console for warnings/errors
- Ensure you're importing from correct component file

### Component styling not applying

**Problem:** Tailwind CSS classes not visible on component

**Solutions:**
- Verify class names are correct Tailwind utilities
- Check CSS variable overrides in `tokens/`
- Inspect element in browser DevTools
- Clear browser cache (hard refresh)
- Ensure parent components aren't overriding styles

### Accessibility warnings in browser console

**Problem:** Console shows accessibility or ARIA warnings

**Solutions:**
- Verify all interactive elements have ARIA labels
- Check keyboard navigation (Tab through component)
- Test with screen readers (NVDA, JAWS, VoiceOver)
- Review React Spectrum accessibility docs
- Use browser accessibility inspector

### Example code has errors

**Problem:** Code example throws TypeScript or runtime error

**Solutions:**
- Verify all imports are correct
- Check component names match exports
- Run through TypeScript checker: `pnpm typecheck`
- Test in browser with `pnpm dev`
- Review component documentation

## Documentation Build Issues

### Documentation fails to build

**Error message:** `Build failed: ...`

**Solutions:**
```bash
# Verify all files exist
ls -la content/docs/

# Check for syntax errors in Markdown/MDX
pnpm lint

# Build with verbose output
pnpm build:docs -- --verbose

# Clear build cache
rm -rf build .next
pnpm build:docs
```

### Links broken in documentation site

**Problem:** Internal or external links don't work

**Solutions:**
- Verify file exists at referenced path
- Check file extension (`.md` not `.mdx` for basic Markdown)
- Ensure relative paths are correct
- Test external links in browser
- Run link checker: Some CI tools can catch broken links

## General Troubleshooting Steps

When encountering issues, try these steps in order:

1. **Read the error message carefully** - Usually indicates the problem
2. **Check the docs** - Solution may be in docs/agent/ or CONTRIBUTING.md
3. **Search GitHub Issues** - Someone may have solved it
4. **Clear cache and reinstall**:
   ```bash
   pnpm store prune
   rm -rf node_modules pnpm-lock.yaml
   pnpm install
   ```
5. **Restart everything** - Terminal, IDE, browser
6. **Check system requirements**:
   ```bash
   node --version   # Should be 18+
   pnpm --version   # Should be 10.20.0+
   ```
7. **Open an issue** - If stuck, provide:
   - Error message (full text, not screenshot)
   - Steps to reproduce
   - Your environment (Node version, OS, etc.)
   - What you've already tried

## Getting Help

- **Documentation**: [serok.ethansup.net](https://serok.ethansup.net)
- **GitHub Issues**: [github.com/SimYunSup/serok-ui/issues](https://github.com/SimYunSup/serok-ui/issues)
- **React Spectrum Docs**: [react-spectrum.adobe.com](https://react-spectrum.adobe.com)
- **GitHub Discussions**: [github.com/SimYunSup/serok-ui/discussions](https://github.com/SimYunSup/serok-ui/discussions)
