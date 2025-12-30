---
paths: src/components/atoms/**/*.ts
---

# Atoms

Basic building blocks - single-purpose, no composition of other `mcp-*` components.

## Criteria
- Self-contained, single responsibility
- No internal use of other `mcp-*` components
- Can use native HTML elements and slots
- Should be highly reusable

## Examples
`button`, `input`, `checkbox`, `switch`, `badge`, `avatar`, `spinner`, `icon`

## Slots
- Use slots for customization (icons, labels)
- Default slot for primary content
- Named slots: `prefix`, `suffix`, `icon`, `label`

## CSS Parts
Expose `::part()` for styling:
```css
:host::part(control) { }
:host::part(label) { }
```

## Don't
- Import other `mcp-*` components
- Manage child components
- Have complex multi-section layouts
