# CSS Styling Guide

This guide covers CSS styling conventions and best practices for Serok UI components.

## Core Principles

1. **Use React Spectrum variables first** - Leverage semantic variables like `--spectrum-accent-content-color-default`
2. **Use Provider colors as fallback** - Only when Spectrum variables don't fit
3. **Minimal custom variables** - Only add CSS variables when absolutely necessary
4. **Keep styles simple** - Let React Spectrum handle most styling
5. **Consistent naming** - Use `serok-` prefix with kebab-case

## React Spectrum Variable System

### Semantic Variables (USE THESE FIRST)

React Spectrum provides semantic variables that automatically work with themes:

```css
/* Accent colors (Primary actions, selected states) */
--spectrum-accent-content-color-default
--spectrum-accent-content-color-hover
--spectrum-accent-content-color-down
--spectrum-accent-content-color-key-focus
--spectrum-accent-background-color-default
--spectrum-accent-background-color-hover

/* Gray/Neutral colors */
--spectrum-gray-50 through --spectrum-gray-900
--spectrum-global-color-gray-*

/* Semantic states */
--spectrum-negative-color-*     /* Errors */
--spectrum-positive-color-*     /* Success */
--spectrum-informative-color-*  /* Info */
--spectrum-notice-color-*       /* Warnings */
```

### Using React Spectrum Variables

**DO**: Use Spectrum's semantic variables
```css
.serok-tabs [aria-selected="true"] {
  color: var(--spectrum-accent-content-color-default);
  border-bottom-color: var(--spectrum-accent-content-color-default);
}

.serok-tabs [role="tab"]:hover {
  color: var(--spectrum-accent-content-color-hover);
}
```

**ONLY IF NEEDED**: Fall back to Provider colors
```css
.serok-custom-element {
  /* Use Provider colors only when Spectrum doesn't provide what you need */
  background: var(--serok-purple-100);
}
```

**DON'T**: Hardcode color values
```css
.serok-tabs {
  color: #6c757d;  /* ❌ Bad */
  background: #ffffff;  /* ❌ Bad */
}
```

## Component Styling Pattern

### Basic Structure

```css
/* Use React Spectrum's semantic variables directly */
.serok-component-name [role="element"] {
  color: var(--spectrum-accent-content-color-default);
}

.serok-component-name [role="element"]:hover {
  color: var(--spectrum-accent-content-color-hover);
}

/* Only add component-specific variables if you need to override */
.serok-component-name {
  /* Override only when necessary */
  --custom-spacing: 0.5rem;
}
```

## Real-World Example: Tabs Component

### Preferred Approach (Use Spectrum Variables)

```css
.serok-tabs [aria-selected="true"] {
  color: var(--spectrum-accent-content-color-default);
  border-bottom-color: var(--spectrum-accent-content-color-default);
}

.serok-tabs [role="tab"]:hover {
  color: var(--spectrum-accent-content-color-hover);
  background-color: var(--spectrum-accent-background-color-hover);
}

.serok-tabs [role="tab"] {
  color: var(--spectrum-gray-700);
}

.serok-tabs [role="tab"]:focus-visible {
  outline: 2px solid var(--spectrum-accent-content-color-key-focus);
}
```

### Only When Needed (Provider Colors)

```css
/* Use Provider colors only for custom styling not covered by Spectrum */
.serok-tabs {
  /* Example: Custom background that Spectrum doesn't provide */
  --custom-panel-background: var(--serok-purple-50);
}
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

### Pattern 1: Using Spectrum Semantic Variables

```css
/* ✅ Best - Use Spectrum's semantic variables */
.serok-component [role="element"] {
  color: var(--spectrum-accent-content-color-default);
}

.serok-component [role="element"]:hover {
  color: var(--spectrum-accent-content-color-hover);
}

.serok-component [role="element"]:focus {
  outline-color: var(--spectrum-accent-content-color-key-focus);
}
```

### Pattern 2: State-Based Styling with Spectrum

```css
.serok-component [aria-selected="true"] {
  color: var(--spectrum-accent-content-color-default);
  background-color: var(--spectrum-accent-background-color-default);
}

.serok-component [aria-disabled="true"] {
  opacity: var(--spectrum-global-opacity-disabled, 0.5);
  cursor: not-allowed;
}
```

### Pattern 3: Fallback to Provider Colors

```css
/* Only when Spectrum doesn't provide what you need */
.serok-component-custom-background {
  background: var(--serok-purple-50);  /* Light accent background */
  border: 1px solid var(--serok-purple-200);
}
```

## Color Selection Guide

### Priority Order

1. **React Spectrum Semantic Variables** (FIRST CHOICE)
   ```css
   --spectrum-accent-content-color-*
   --spectrum-gray-*
   --spectrum-negative-color-*
   --spectrum-positive-color-*
   ```

2. **Provider Colors** (SECOND CHOICE - when Spectrum doesn't fit)
   ```css
   --serok-purple-*  /* Accent colors */
   --serok-gray-*    /* Neutral colors */
   --serok-red-*     /* Error states */
   ```

3. **Never Hardcode** (❌ AVOID)
   ```css
   color: #6c757d;  /* ❌ Don't do this */
   ```

### Using Spectrum Variables by Context

**Primary Actions & Selection**
```css
/* ✅ Use Spectrum accent variables */
.serok-button-primary {
  background: var(--spectrum-accent-background-color-default);
  color: var(--spectrum-white);
}

.serok-button-primary:hover {
  background: var(--spectrum-accent-background-color-hover);
}
```

**Secondary Actions**
```css
/* ✅ Use Spectrum secondary variables */
.serok-button-secondary {
  background: var(--spectrum-secondary-background-color-default);
  color: var(--spectrum-white);
}
```

**Neutral Elements**
```css
/* ✅ Use Spectrum gray scale */
.serok-tabs [role="tab"] {
  color: var(--spectrum-gray-700);
  border-bottom: 2px solid var(--spectrum-gray-300);
}
```

**Status Colors**
```css
/* ✅ Use Spectrum semantic colors */
.serok-alert-error {
  background: var(--spectrum-negative-background-color-default);
  color: var(--spectrum-negative-color-text-large);
}

.serok-alert-success {
  background: var(--spectrum-positive-background-color-default);
  color: var(--spectrum-positive-color-text-large);
}
```

### When to Use Provider Colors

Only use Provider colors when:
- Spectrum doesn't provide the specific shade you need
- Creating custom design elements outside Spectrum's patterns
- Need specific brand colors for unique components

```css
/* Example: Custom notification badge */
.serok-notification-badge {
  /* Spectrum doesn't have light purple backgrounds, so use Provider */
  background: var(--serok-purple-100);
  border: 1px solid var(--serok-purple-300);
}
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

### ❌ Anti-Pattern: Custom Variables for Everything

```css
/* Bad - Creating custom variables when Spectrum has them */
.serok-tabs {
  --serok-tabs-color-default: var(--serok-gray-700);
  --serok-tabs-color-selected: var(--serok-purple-700);
  --serok-tabs-color-hover: var(--serok-purple-800);
}
```

### ✅ Pattern: Use Spectrum Variables Directly

```css
/* Good - Use Spectrum's variables directly */
.serok-tabs [role="tab"] {
  color: var(--spectrum-gray-700);
}

.serok-tabs [aria-selected="true"] {
  color: var(--spectrum-accent-content-color-default);
}

.serok-tabs [role="tab"]:hover {
  color: var(--spectrum-accent-content-color-hover);
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

- [ ] Uses React Spectrum semantic variables where possible
- [ ] Only uses Provider colors when Spectrum doesn't fit
- [ ] No hardcoded color values
- [ ] Scoped with `.serok-{component}` prefix
- [ ] Minimal CSS variables (only what's needed)
- [ ] Works with keyboard navigation
- [ ] Focus indicators visible
- [ ] No `!important` unless absolutely necessary
- [ ] Tested in `pnpm dev`

## Common Mistakes

### ❌ Not Using Spectrum Variables

```css
/* Bad - Using Provider colors when Spectrum has them */
.serok-button {
  background: var(--serok-purple-700);
  color: var(--serok-gray-0);
}

.serok-button:hover {
  background: var(--serok-purple-800);
}
```

**Fix:**
```css
/* Good - Use Spectrum semantic variables */
.serok-button {
  background: var(--spectrum-accent-background-color-default);
  color: var(--spectrum-white);
}

.serok-button:hover {
  background: var(--spectrum-accent-background-color-hover);
}
```

### ❌ Too Many Custom CSS Variables

```css
/* Bad - Creating variables when Spectrum provides them */
.serok-tabs {
  --serok-tabs-color-default: var(--serok-gray-700);
  --serok-tabs-color-hover: var(--serok-purple-800);
  --serok-tabs-background-hover: var(--serok-purple-100);
}
```

**Fix:**
```css
/* Good - Use Spectrum variables directly */
.serok-tabs [role="tab"] {
  color: var(--spectrum-gray-700);
}

.serok-tabs [role="tab"]:hover {
  color: var(--spectrum-accent-content-color-hover);
  background: var(--spectrum-accent-background-color-hover);
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

- **React Spectrum Styling**: [Adobe Spectrum Styling](https://react-spectrum.adobe.com/react-spectrum/styling.html)
- **Spectrum Variables**: Check browser DevTools to see available `--spectrum-*` variables
- **Serok Color Tokens**: `lib/style/serok.css` - Base color variables (`--serok-*`) defined in `:root`
- **Provider Style Mapping**: `lib/ui/Provider/style.css` - Maps Spectrum variables to Serok variables within `.serok-provider` scope
- **Existing Components**: `lib/ui/*/styles.css` - Reference implementations
