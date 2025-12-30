---
paths: src/components/molecules/**/*.ts
---

# Molecules

Simple combinations of atoms - compose 2-3 atoms or provide enhanced functionality.

## Criteria
- Combine atoms into reusable patterns
- Single clear purpose
- Slots allow atom customization
- May have basic internal logic

## Examples
`alert` (icon + content + action), `toast`, `search-input`, `popover`

## Composition Pattern
```typescript
// Use slots to accept atoms
render() {
  return html`
    <div class="molecule">
      <slot name="icon"></slot>
      <slot></slot>
      <slot name="action"></slot>
    </div>
  `;
}
```

## Slots
- `icon` - custom icon (replaces default)
- `action` - action button/link
- `default` - main content

## Events
- Emit semantic events: `mcp-dismiss`, `mcp-clear`
- Don't re-emit child events

## Don't
- Hardcode atom implementations (use slots)
- Manage complex state
- Have deeply nested component hierarchies
