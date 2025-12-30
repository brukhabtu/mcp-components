---
paths: src/components/organisms/**/*.ts
---

# Organisms

Complex UI sections - manage children, have multiple sections, or represent complete features.

## Criteria
- Multi-section layouts (header/body/footer)
- Manage child component state
- Complete UI patterns
- May query/coordinate slotted children

## Examples
`card`, `modal`, `tabs`, `accordion`, `menu`, `message`, `chat-message`

## Child Management
```typescript
// Query slotted children
private _items: McpListItem[] = [];

private _handleSlotChange(e: Event) {
  const slot = e.target as HTMLSlotElement;
  this._items = slot.assignedElements()
    .filter((el): el is McpListItem => el.tagName === 'MCP-LIST-ITEM');
}
```

## Sections
Use named slots for layout sections:
- `header` - title, actions
- `default` - main content
- `footer` - actions, metadata

## State Coordination
- Single source of truth (parent manages)
- Children emit events, parent updates state
- Use properties to push state down

## Accessibility
- Manage focus within component
- Implement keyboard navigation
- ARIA: `role`, `aria-expanded`, `aria-selected`
