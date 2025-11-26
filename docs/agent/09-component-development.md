# Component Development Guide

This guide covers best practices for developing new components in Serok UI based on React Spectrum.

## Component Structure

### File Organization

Each component should have the following structure:

```
lib/ui/ComponentName/
├── index.tsx        # Main component file
└── styles.css       # Component styles
```

### Component Template

```tsx
/* type: registry:ui */
import { ComponentName as SpComponentName } from "@react-spectrum/component";
import type React from "react";
import "./styles.css";

interface ComponentNameProps extends React.ComponentProps<typeof SpComponentName> { }

export function ComponentName({
  children,
  ...props
}: ComponentNameProps) {
  return (
    <SpComponentName
      {...props}
      UNSAFE_className="serok-component-name"
    >
      {children}
    </SpComponentName>
  );
}

// Re-export sub-components with renamed exports
export { SubComponent as ComponentSubComponent } from "@react-spectrum/component";
```

## Naming Conventions

### Component Exports

**DO**: Rename generic exports to be component-specific
```tsx
// ✅ Good - Clear and specific
export { Item as TabItem } from "@react-spectrum/tabs";
export { Item as SelectItem } from "@react-spectrum/picker";
```

**DON'T**: Export generic names that could conflict
```tsx
// ❌ Bad - Ambiguous and conflict-prone
export { Item } from "@react-spectrum/tabs";
```

### Props Interface

**DO**: Extend React Spectrum's component props
```tsx
// ✅ Good - Inherits all React Spectrum functionality
interface TabsProps extends React.ComponentProps<typeof SpTabs> { }
```

**DON'T**: Create custom variant systems
```tsx
// ❌ Bad - Adds unnecessary abstraction
interface TabsProps extends React.ComponentProps<typeof SpTabs> {
  variant?: "default" | "compact" | "emphasized";
}
```

### CSS Class Names

Use kebab-case with `serok-` prefix:
```css
.serok-tabs { }
.serok-button { }
.serok-select { }
```

## Implementation Guidelines

### 1. Keep It Simple

- **Use React Spectrum defaults** - Don't add variant props unless absolutely necessary
- **Minimal abstraction** - Pass through props directly
- **Avoid over-engineering** - Let React Spectrum handle the complexity

Example:
```tsx
// ✅ Simple wrapper
export function Tabs({ children, ...props }: TabsProps) {
  return (
    <SpTabs {...props} UNSAFE_className="serok-tabs">
      {children}
    </SpTabs>
  );
}

// ❌ Over-engineered
export function Tabs({ variant, ...props }: TabsProps) {
  const className = `serok-tabs serok-tabs--${variant}`;
  const mappedProps = mapVariantToSpectrum(variant);
  return <SpTabs {...props} {...mappedProps} UNSAFE_className={className} />;
}
```

### 2. Prop Pass-Through

Always spread React Spectrum props to maintain full API compatibility:

```tsx
export function Button({ children, ...props }: ButtonProps) {
  return (
    <SpButton {...props} UNSAFE_className="serok-button">
      {children}
    </SpButton>
  );
}
```

### 3. Type Safety

Use TypeScript's utility types for clean interfaces:

```tsx
// Extend all props from React Spectrum
interface ComponentProps extends React.ComponentProps<typeof SpComponent> { }

// Omit specific props if needed
interface ComponentProps extends Omit<
  React.ComponentProps<typeof SpComponent>,
  "deprecated" | "internal"
> { }
```

## Documentation Structure

### Korean Documentation (content/docs/components/)

Required sections:
1. **개요** - Component overview
2. **빠른 시작** - Quick start with minimal example
3. **Props** - Props table with descriptions
4. **변형 & 상태** - Variants and states
5. **예제** - Multiple usage examples
6. **접근성** - Accessibility (keyboard support only)
7. **API 참고** - Link to React Spectrum docs
8. **컴포넌트 정보** - Source files and exports

### English Documentation (content/llms.mdx/components/)

Same structure as Korean but optimized for LLMs:
- Concise descriptions
- Clear prop types
- Complete code examples
- No WCAG/Best Practices/Common Issues sections

### Documentation Template

```mdx
---
title: ComponentName
componentName: ComponentName
status: stable
lastUpdated: "YYYY-MM-DD"
spectrumBased: true
spectrumReference: "@react-spectrum/component"
description: "Brief one-line description for LLM optimization"
---

<CopyToMarkdown />

## 개요

[Korean description]

## 빠른 시작

[Minimal working example with PreviewWrapper]

## Props

### ComponentName Props

| Prop | Type | 필수 | 기본값 | 설명 |
|------|------|------|-------|------|
| ... | ... | ... | ... | ... |

## 변형 & 상태

[Document orientations, states, not custom variants]

## 예제

### 기본 사용법
### 제어 컴포넌트
### [Other relevant examples]

## 접근성

### 키보드 지원

| 키 | 동작 |
|----|------|
| ... | ... |

## API 참고

[Link to React Spectrum documentation]

---

## 컴포넌트 정보

- **소스**: `lib/ui/ComponentName/index.tsx`
- **스타일**: `lib/ui/ComponentName/styles.css`
- **내보내기**: `@/components/ui/ComponentName`에서 명명 내보내기
- **React Spectrum 기반**: Yes (@react-spectrum/component)
```

## Common Patterns

### Pattern 1: Simple Wrapper

Most common - just wrap React Spectrum with custom styling:

```tsx
export function Switch({ variant, ...props }: SwitchProps) {
  return (
    <SpSwitch
      {...props}
      isEmphasized={variant !== "default"}
      data-variant={variant}
    />
  );
}
```

### Pattern 2: Sub-Component Re-exports

Components with multiple parts:

```tsx
export function Tabs({ children, ...props }: TabsProps) {
  return <SpTabs {...props} UNSAFE_className="serok-tabs">{children}</SpTabs>;
}

export { TabList, TabPanels, Item as TabItem } from "@react-spectrum/tabs";
```

### Pattern 3: Registry Dependencies

When component depends on others:

```tsx
/* type: registry:ui
 * registryDependencies: ["menu"]
 */
export function Select(props: SelectProps) {
  return <SpPicker {...props} UNSAFE_className="serok-select" />;
}
```

## Testing Checklist

Before committing a new component:

- [ ] `pnpm typecheck` passes
- [ ] `pnpm lint` passes
- [ ] `pnpm dev` - component renders correctly
- [ ] Korean documentation complete
- [ ] English documentation complete
- [ ] All examples work in preview
- [ ] Keyboard navigation tested
- [ ] Named exports are component-specific

## Common Mistakes to Avoid

### ❌ Creating Custom Variants

```tsx
// Bad - adds unnecessary abstraction
interface TabsProps {
  variant?: "default" | "compact" | "emphasized";
}
```

### ❌ Generic Export Names

```tsx
// Bad - causes naming conflicts
export { Item } from "@react-spectrum/tabs";
```

### ❌ Over-Documenting

```tsx
// Bad - unnecessary sections
## WCAG 준수
## 모범 사례
## 일반적인 문제
## CSS 커스터마이징
```

### ❌ Complex CSS Variables

```tsx
// Bad - too many custom variables
:root {
  --serok-tabs-color-default: #...;
  --serok-tabs-color-selected: #...;
  --serok-tabs-color-hover: #...;
  --serok-tabs-background-hover: rgba(...);
}
```

## Resources

- [React Spectrum Documentation](https://react-spectrum.adobe.com/react-spectrum/)
- [Existing Components](../../lib/ui/) - Reference implementations
- [Serok Color Tokens](../../lib/style/serok.css) - Base color variables (`--serok-*`)
- [Provider Style Mapping](../../lib/ui/Provider/style.css) - Spectrum to Serok variable mapping
