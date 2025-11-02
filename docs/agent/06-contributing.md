# Contributing Guide

## Code of Conduct

- Treat others with respect and inclusivity
- Focus on constructive feedback
- Follow existing code patterns

## How to Contribute

### 1. Finding Work

- Check GitHub Issues for open tasks
- Look for the "good first issue" label to find beginner-friendly work
- Review specific guidelines in `CONTRIBUTING.md`

### 2. Branch Naming

Format: `NNN-feature-name` (e.g., `001-new-button`, `042-fix-colors`)

- `NNN`: Sequential 3-digit number
- Use kebab-case (hyphens, lowercase)

### 3. Development Process

1. Clone repository: `git clone [url]`
2. Create feature branch: `git checkout -b NNN-feature-name`
3. Make changes in `lib/ui/` or `content/`
4. Run `pnpm typecheck` and `pnpm lint` locally
5. Test with `pnpm dev` in browser

### 4. Component Documentation

Follow the 10-section format outlined in `CONTRIBUTING.md`:

1. **Component Name and Description** - One-line summary
2. **Props Table** - TypeScript types included
3. **Usage Examples** - 3+ working, runnable examples
4. **State Examples** - Demonstrate various states
5. **Event Handling** - How to use handlers
6. **Accessibility Features** - ARIA labels, keyboard navigation
7. **Styling** - CSS customization methods
8. **React Spectrum Reference** - Links to official docs
9. **Related Components** - Frequently used companions
10. **Change History** - Version-specific changes

## Pull Request Process

### Before Submitting

- [ ] `pnpm typecheck` passes
- [ ] `pnpm lint` passes
- [ ] `pnpm dev` runs without errors
- [ ] All examples work in browser

### PR Description

Include:
- Clear title describing the change
- Explanation of what changed and why
- Link to related issues
- Any breaking changes clearly noted

### Code Review

- Minimum 1 maintainer review required
- Address feedback and push changes
- CI/CD checks must pass
- Merged when approved

### Merge & Deployment

- PR merged to main branch
- GitHub Actions automatically deploys
- Live on https://serok.ethansup.net within minutes

## Commit Message Format

```
type(scope): description

- Details about the change
- Why the change was necessary
```

**Example:** `feat(button): Add size prop and update accessibility labels`

**Type Keywords:**
- `feat`: New feature
- `fix`: Bug fix
- `docs`: Documentation change
- `style`: Code formatting change
- `refactor`: Code restructuring
- `test`: Test additions or changes
- `chore`: Build, dependencies, etc.

## Reporting Bugs

Open a GitHub Issue and include:

1. **Reproduction Steps** - How to reproduce the bug
2. **Expected Behavior** - What should happen
3. **Actual Behavior** - What actually happened
4. **Environment Info** - Browser, OS, Node.js version
5. **Related Components** - Links to affected components

## Suggesting Features

Open a GitHub Issue with "enhancement" label and include:

1. **Use Case** - Why this feature is needed
2. **Desired Behavior** - How it should work
3. **References** - Similar patterns in other libraries

## Code of Conduct Violations

Contact a project maintainer. All complaints are reviewed confidentially.

## Getting Help

- Search [GitHub Issues](https://github.com/SimYunSup/serok-ui/issues) first
- Check [official docs](https://serok.ethansup.net)
- Review [React Spectrum docs](https://react-spectrum.adobe.com)
- Open an issue with detailed information

## Review Guidelines

When reviewing PRs:

- Focus on code quality and consistency
- Ensure component documentation is complete
- Verify accessibility standards are met
- Check that examples work correctly
- Ensure tests pass in CI/CD
