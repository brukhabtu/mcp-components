---
paths: src/components/**/*.ts
---

# Components

## Structure
- Extend `LitElement`
- Use `baseStyles` from `../../styles/index.js`
- Declare in `HTMLElementTagNameMap`

## Naming
- Tag: `mcp-{name}`
- Class: `Mcp{Name}`
- Events: `mcp-{action}` (e.g., `mcp-change`, `mcp-dismiss`)

## Variants
Use standardized variant types:
```typescript
type Variant = 'primary' | 'secondary' | 'tertiary' |
               'success' | 'warning' | 'error' | 'info' |
               'muted';
```

## Styles
- Use tokens, never hardcode colors/spacing
- Focus: `box-shadow: 0 0 0 3px var(--mcp-color-{variant}-muted)`
- Disabled: `opacity: var(--mcp-opacity-disabled)`
