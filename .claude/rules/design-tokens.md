---
paths: src/styles/**/*.ts
---

# Design Tokens

## Naming Convention
`--mcp-{category}-{name}[-modifier]`

## Color Tokens

### Variants (visual hierarchy)
`primary`, `secondary`, `tertiary`, `ghost`

### Status (semantic feedback)
`success`, `warning`, `error`, `info`

### Suffixes
| Suffix | Purpose |
|--------|---------|
| `-hover` | Hover state |
| `-active` | Pressed state |
| `-foreground` | Text on that background |
| `-muted` | 10-15% alpha for focus rings, selections |

## Interactive States
- Disabled: `opacity: var(--mcp-opacity-disabled)`

## Spacing Scale
`space-{0,1,2,3,4,5,6,8,10,12}` (0.25rem increments)

## Radius Scale
`radius-{none,sm,md,lg,xl,full}`

## Themes
All themes must define complete color overrides:
- Light (default)
- Dark
- Anthropic
