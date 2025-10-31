# Contributing to Serok UI

Thank you for your interest in contributing to Serok UI! This guide explains how to document components and contribute to the project.

## Component Documentation

All Serok UI components must be documented in an LLM-friendly format to ensure both humans and AI can understand the API.

### Getting Started with Component Documentation

1. **Review Examples**: Look at existing component documentation in `content/en/docs/components/` for reference
2. **Follow the Standards**: Ensure all 10 required sections are included
3. **Review Examples**: Check `content/en/docs/examples/` for example patterns

### Documentation Requirements

Every component must include:

- ✅ 10 required sections (Overview, Props, Examples, Accessibility, etc.)
- ✅ Props table with TypeScript types in backticks
- ✅ Minimum 3 working code examples
- ✅ Accessibility documentation (keyboard, ARIA, WCAG)
- ✅ TypeScript API reference
- ✅ Best practices and common issues

### Quick Start: Document a Component

```bash
# 1. Create the documentation file
touch content/en/docs/components/[component-name].mdx

# 2. Review existing component documentation for reference
# Check content/en/docs/components/ for examples

# 3. Validate your work
pnpm docs:validate [component-name]
pnpm docs:lint
pnpm docs:test [component-name]

# 4. Submit PR with checklist completed
```

### Available Tools

```bash
# Validate documentation structure
pnpm docs:validate [component-name]

# Check markdown linting
pnpm docs:lint

# Verify code examples compile
pnpm docs:test [component-name]

# Extract metadata from documentation
tsx scripts/extract-component-metadata.ts [component-name]
```

### Documentation Standards

#### Props Table

```markdown
| Prop | Type | Required | Default | Description |
|------|------|----------|---------|-------------|
| `propName` | `type` | Yes/No | `value` | What it does |
```

**Rules**:
- Types in backticks: `` `boolean` ``, `` `"option1" | "option2"` ``
- All Spectrum props use Spectrum naming: `isDisabled`, not `disabled`
- Required column: "Yes" or "No"
- Descriptions: under 100 characters

#### Code Examples

```tsx
import { ComponentName } from '@serok-ui/component-name';

export function ExampleName() {
  // Complete, working code
  return <ComponentName prop="value" />;
}
```

**Rules**:
- Language identifier must be `tsx`
- ALL imports visible in code block
- Code must compile without errors
- Minimum 3 examples per component

#### API Reference

Include TypeScript interface:

```typescript
export interface ComponentNameProps {
  /** Description of prop */
  propName: string;

  /** Optional prop */
  optionalProp?: boolean;
}
```

### React Spectrum Base Components

Many Serok UI components are based on [React Spectrum](https://react-spectrum.adobe.com). When documenting:

1. Include reference to the base component:
   > See [React Spectrum {ComponentName}](https://react-spectrum.adobe.com/react-spectrum/{ComponentName}.html) for additional information.

2. Document Serok-specific customizations
3. Note inherited props from React Spectrum
4. Link to React Spectrum props documentation when relevant

### Pull Request Process

1. **Complete Documentation**
   - Fill in all 10 required sections
   - Complete the LLM Documentation Checklist
   - Ensure all validation tests pass

2. **Validate Locally**
   ```bash
   pnpm docs:validate [component-name]
   pnpm docs:lint
   pnpm docs:test [component-name]
   ```

3. **Submit PR**
   - Include completed checklist
   - Reference any related issues
   - Provide clear description of changes

4. **Review Process**
   - Reviewer uses [docs/REVIEW_CHECKLIST.md](docs/REVIEW_CHECKLIST.md)
   - Automated validation runs in CI/CD
   - LLM accuracy testing may be requested
   - Reviewer may request revisions

5. **Merge and Deploy**
   - Once approved, PR is merged to `main`
   - GitHub Actions automatically builds and deploys
   - Documentation available at https://serok.ethansup.net

### Documentation Checklist for PRs

Copy this checklist to your PR description:

```markdown
## Component Documentation Checklist

- [ ] All 10 required sections present
- [ ] Props table has all props with correct types
- [ ] 3+ code examples included
- [ ] All examples compile (no TypeScript errors)
- [ ] Accessibility section complete
- [ ] Best practices and common issues documented
- [ ] TypeScript API reference included
- [ ] React Spectrum reference included (if applicable)
- [ ] Local validation passes: `pnpm docs:validate [component]`
- [ ] Linting passes: `pnpm docs:lint`
- [ ] Examples compile: `pnpm docs:test [component]`
```

## Related Resources

- **Review Guide**: [docs/REVIEW_CHECKLIST.md](docs/REVIEW_CHECKLIST.md)
- **Deployment**: [docs/deployment.md](docs/deployment.md)
- **Component Index**: [docs/components/index.md](docs/components/index.md)
- **Component Examples**: [content/en/docs/examples/](content/en/docs/examples/)

## Questions?

If you have questions about documentation:

1. Review existing component documentation in `content/en/docs/components/`
2. Check the examples in `content/en/docs/examples/`
3. Open an issue with your question
4. Contact the documentation maintainers

---

**Last Updated**: 2025-10-31
