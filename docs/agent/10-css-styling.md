# CSS Styling Guide

This guide covers CSS styling conventions and best practices for Serok UI components.

## Core Principles

1. **Use Provider colors** - Reference existing color tokens from Provider
2. **Minimal custom variables** - Only add CSS variables when absolutely necessary
3. **Keep styles simple** - Let React Spectrum handle most styling
4. **Consistent naming** - Use `serok-` prefix with kebab-case

## Provider Color System

### Available Color Tokens

Serok UI has a comprehensive color system defined in `lib/ui/Provider/colors.css`:

```css
/* Grayscale */
--serok-gray-0: #ffffff;
--serok-gray-50: #fafafa;
--serok-gray-100: #f5f5f5;
/* ... through gray-900 */

/* Accent Colors (Purple) */
--serok-purple-100: #f5ebff;
--serok-purple-200: #ddb1fe;
/* ... through purple-1400 */

/* Secondary Colors (Yellow) */
--serok-yellow-100: #fdf3e2;
--serok-yellow-200: #fbeacc;
/* ... through yellow-1400 */

/* Additional Color Scales */
--serok-red-*     /* Red scale */
--serok-blue-*    /* Blue scale */
--serok-green-*   /* Green scale */
/* ... and more */
```

### Using Provider Colors

**DO**: Reference Provider color variables
```css
.serok-tabs {
  --serok-tabs-color-default: var(--serok-gray-600);
  --serok-tabs-color-selected: var(--serok-purple-700);
  --serok-tabs-color-hover: var(--serok-purple-800);
}
```

**DON'T**: Hardcode color values
```css
.serok-tabs {
  --serok-tabs-color-default: #6c757d;
  --serok-tabs-color-selected: #007bff;
}
```

## Component Styling Pattern

### Basic Structure

```css
/* Component-level variables (only if needed) */
.serok-component-name {
  /* Reference Provider colors */
  --serok-component-color-primary: var(--serok-purple-700);
  --serok-component-color-hover: var(--serok-purple-800);

  /* Component-specific spacing/sizing */
  --serok-component-padding: 0.5rem;
}

/* Element-level styles */
.serok-component-name [role="element"] {
  color: var(--serok-component-color-primary);
  padding: var(--serok-component-padding);
}

/* State modifiers */
.serok-component-name [aria-selected="true"] {
  color: var(--serok-component-color-selected);
}
```

## Real-World Example: Tabs Component

### Before (Over-Engineered)

```css
:root {
  --serok-tabs-color-default: #6c757d;
  --serok-tabs-color-selected: #007bff;
  --serok-tabs-color-hover: #0056b3;
  --serok-tabs-color-emphasized: #28a745;
  --serok-tabs-color-compact: #6c757d;
  --serok-tabs-border-color: #dee2e6;
  --serok-tabs-background-hover: rgba(0, 123, 255, 0.1);
  --serok-tabs-spacing-compact: 0.5rem;
  --serok-tabs-spacing-regular: 1rem;
  --serok-tabs-font-size: 0.875rem;
  --serok-tabs-font-weight: 500;
  --serok-tabs-font-weight-selected: 600;
}

.serok-tabs--default { /* ... */ }
.serok-tabs--compact { /* ... */ }
.serok-tabs--emphasized { /* ... */ }
```

### After (Simplified)

```css
.serok-tabs {
  /* Only essential overrides using Provider colors */
  --serok-tabs-color-selected: var(--serok-purple-700);
  --serok-tabs-border-color: var(--serok-gray-300);
}

/* Let React Spectrum handle the rest */
```

## CSS Variable Guidelines

### When to Add CSS Variables

**YES**: When you need to override React Spectrum defaults
```css
.serok-button {
  --serok-button-border-radius: 0.375rem; /* Custom radius */
}
```

**NO**: For every possible customization point
```css
/* ❌ Too many variables */
.serok-component {
  --serok-component-color-1: ...;
  --serok-component-color-2: ...;
  --serok-component-spacing-1: ...;
  --serok-component-spacing-2: ...;
  /* etc... */
}
```

### Variable Naming Convention

```
--serok-{component}-{property}-{variant}
```

Examples:
- `--serok-tabs-color-selected`
- `--serok-button-background-hover`
- `--serok-select-border-color`

## Working with React Spectrum

### Understanding Spectrum's Class Structure

React Spectrum uses specific role attributes and data attributes:

```css
/* Target by role */
[role="tab"] { }
[role="tabpanel"] { }
[role="button"] { }

/* Target by state */
[aria-selected="true"] { }
[aria-disabled="true"] { }
[data-focused] { }
```

### Scoping Styles to Serok Components

Always scope styles to prevent conflicts:

```css
/* ✅ Good - Scoped to serok-tabs */
.serok-tabs [role="tab"] {
  color: var(--serok-gray-600);
}

/* ❌ Bad - Affects all tabs globally */
[role="tab"] {
  color: var(--serok-gray-600);
}
```

## Common Patterns

### Pattern 1: Color Overrides

```css
.serok-component {
  --serok-component-primary: var(--serok-purple-700);
  --serok-component-hover: var(--serok-purple-800);
  --serok-component-border: var(--serok-gray-300);
}

.serok-component [role="element"] {
  color: var(--serok-component-primary);
  border-color: var(--serok-component-border);
}

.serok-component [role="element"]:hover {
  color: var(--serok-component-hover);
}
```

### Pattern 2: State-Based Styling

```css
.serok-component [aria-selected="true"] {
  color: var(--serok-purple-700);
  font-weight: 600;
}

.serok-component [aria-disabled="true"] {
  opacity: 0.5;
  cursor: not-allowed;
}
```

### Pattern 3: Focus Styles

```css
.serok-component [role="element"]:focus-visible {
  outline: 2px solid var(--serok-purple-700);
  outline-offset: 2px;
}
```

## Choosing Colors from Provider

### Primary Actions & Selection

Use **purple** (accent color):
```css
--serok-purple-700  /* Selected/Active states */
--serok-purple-800  /* Hover states */
```

### Secondary Actions

Use **yellow** (secondary color):
```css
--serok-yellow-700  /* Secondary buttons */
--serok-yellow-800  /* Secondary hover */
```

### Neutral Elements

Use **gray** scale:
```css
--serok-gray-600    /* Default text/borders */
--serok-gray-300    /* Light borders */
--serok-gray-100    /* Backgrounds */
```

### Status Colors

```css
--serok-red-600     /* Errors/Danger */
--serok-green-700   /* Success/Positive */
--serok-blue-700    /* Info/Links */
```

## UNSAFE_className Usage

React Spectrum provides `UNSAFE_className` for custom styling:

```tsx
<SpTabs
  {...props}
  UNSAFE_className="serok-tabs"
>
  {children}
</SpTabs>
```

This allows you to:
1. Add component-specific classes
2. Override Spectrum's default styles
3. Maintain style isolation

## Don't Over-Style

### ❌ Anti-Pattern: Fighting React Spectrum

```css
/* Bad - Trying to completely restyle Spectrum */
.serok-tabs {
  /* 50+ lines of CSS trying to override everything */
  border: none !important;
  background: custom !important;
  padding: custom !important;
  /* ... */
}
```

### ✅ Pattern: Work With React Spectrum

```css
/* Good - Minimal overrides for branding */
.serok-tabs {
  --serok-tabs-color-selected: var(--serok-purple-700);
}

.serok-tabs [aria-selected="true"] {
  color: var(--serok-tabs-color-selected);
}
```

## Documentation in CSS Files

Keep CSS files clean - minimal comments:

```css
/* Component-level variables */
.serok-tabs {
  --serok-tabs-color-selected: var(--serok-purple-700);
}

/* Selected state */
.serok-tabs [aria-selected="true"] {
  color: var(--serok-tabs-color-selected);
  font-weight: 600;
}
```

Don't document in CSS - put it in MDX:
```css
/* ❌ Bad - Don't put usage docs in CSS */
/**
 * Use this for selected tabs
 * Example: <Tab selected>...</Tab>
 * This will make the tab purple
 */
```

## Testing Your Styles

1. **Visual Testing**
   ```bash
   pnpm dev
   ```
   Check component in different states

2. **Accessibility Testing**
   - Test with keyboard navigation
   - Verify focus indicators are visible
   - Check color contrast (use browser DevTools)

3. **Cross-Browser Testing**
   - Chrome (primary)
   - Firefox
   - Safari

## Style Checklist

Before committing CSS:

- [ ] Uses Provider color variables (no hardcoded colors)
- [ ] Scoped with `.serok-{component}` prefix
- [ ] Minimal CSS variables (only what's needed)
- [ ] Works with keyboard navigation
- [ ] Focus indicators visible
- [ ] No `!important` unless absolutely necessary
- [ ] Tested in `pnpm dev`

## Common Mistakes

### ❌ Too Many CSS Variables

```css
/* Bad - Exposing every possible customization */
.serok-tabs {
  --serok-tabs-padding-top: 0.5rem;
  --serok-tabs-padding-right: 0.75rem;
  --serok-tabs-padding-bottom: 0.5rem;
  --serok-tabs-padding-left: 0.75rem;
  --serok-tabs-margin-top: 0;
  /* ... 50+ more variables */
}
```

### ❌ Hardcoded Colors

```css
/* Bad - Not using Provider colors */
.serok-tabs {
  color: #6c757d;
  background: #ffffff;
  border: 1px solid #dee2e6;
}
```

### ❌ Overly Specific Selectors

```css
/* Bad - Too specific */
.serok-tabs > div > [role="tablist"] > [role="tab"][aria-selected="true"] {
  color: purple;
}
```

### ❌ Global Styles

```css
/* Bad - Affects all tabs everywhere */
[role="tab"] {
  color: purple;
}
```

## Resources

- **Provider Colors**: `lib/ui/Provider/colors.css`
- **Provider Styles**: `lib/ui/Provider/serok.css`
- **Existing Components**: `lib/ui/*/styles.css` - Reference implementations
- **React Spectrum Styling**: [Adobe Spectrum Styling](https://react-spectrum.adobe.com/react-spectrum/styling.html)
