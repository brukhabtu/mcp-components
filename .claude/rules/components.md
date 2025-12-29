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

## Properties
- `variant` - visual hierarchy: `primary`, `secondary`, `tertiary`, `ghost`
- `status` - semantic feedback: `info`, `warning`, `error`, `success`

## Styles
- Use tokens, never hardcode colors/spacing
- Focus: `box-shadow: 0 0 0 3px var(--mcp-color-primary-muted)`
- Disabled: `opacity: var(--mcp-opacity-disabled)`
