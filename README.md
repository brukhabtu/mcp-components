# @mcp/ui-components

A composable web components library for MCP UI built with [Lit](https://lit.dev). Designed for easy composition and integration with MCP (Model Context Protocol) interfaces.

## Features

- 🧩 **Composable** - Components designed to work together seamlessly
- 🎨 **Themeable** - CSS custom properties for easy customization
- 🌙 **Dark Mode** - Built-in dark theme support
- ♿ **Accessible** - ARIA attributes and keyboard navigation
- 📦 **Tree-shakeable** - Import only what you need
- 🔧 **TypeScript** - Full type definitions included

## Installation

```bash
npm install @mcp/ui-components
```

## Quick Start

```typescript
// Import all components
import '@mcp/ui-components';

// Or import specific components
import '@mcp/ui-components/primitives';
import '@mcp/ui-components/layout';
import '@mcp/ui-components/feedback';
import '@mcp/ui-components/data-display';
```

```html
<mcp-button variant="primary">Click Me</mcp-button>
<mcp-card>
  <span slot="header">Card Title</span>
  <p>Card content goes here.</p>
</mcp-card>
```

## Components

### Primitives

| Component | Description |
|-----------|-------------|
| `<mcp-button>` | Button with variants: primary, secondary, outline, ghost, destructive |
| `<mcp-input>` | Text input with label, helper text, and error states |
| `<mcp-textarea>` | Multiline text input with autosize support |
| `<mcp-badge>` | Status badges with multiple variants |
| `<mcp-icon>` | SVG icon component with built-in icons |

### Layout

| Component | Description |
|-----------|-------------|
| `<mcp-stack>` | Flexible stack layout (vertical/horizontal) |
| `<mcp-vstack>` | Vertical stack (shorthand) |
| `<mcp-hstack>` | Horizontal stack (shorthand) |
| `<mcp-card>` | Card container with header/footer slots |
| `<mcp-grid>` | CSS Grid layout component |
| `<mcp-divider>` | Visual separator with optional label |

### Feedback

| Component | Description |
|-----------|-------------|
| `<mcp-alert>` | Alert messages (info, success, warning, error) |
| `<mcp-spinner>` | Loading spinner |
| `<mcp-loading>` | Loading overlay with message |
| `<mcp-progress>` | Progress bar (determinate/indeterminate) |
| `<mcp-skeleton>` | Loading placeholder |

### Data Display

| Component | Description |
|-----------|-------------|
| `<mcp-code>` | Code block with syntax highlighting hints |
| `<mcp-kv>` | Key-value list container |
| `<mcp-kv-item>` | Key-value pair item |
| `<mcp-list>` | List container |
| `<mcp-list-item>` | List item with slots |
| `<mcp-empty>` | Empty state placeholder |

## Examples

### Button Variants

```html
<mcp-button>Primary</mcp-button>
<mcp-button variant="secondary">Secondary</mcp-button>
<mcp-button variant="outline">Outline</mcp-button>
<mcp-button variant="ghost">Ghost</mcp-button>
<mcp-button variant="destructive">Delete</mcp-button>
<mcp-button loading>Loading...</mcp-button>
```

### Form Layout

```html
<mcp-vstack gap="var(--mcp-space-4)">
  <mcp-input 
    label="Email" 
    type="email" 
    placeholder="Enter your email"
    helper="We'll never share your email"
  ></mcp-input>
  
  <mcp-input 
    label="API Key" 
    type="password"
    error="Invalid API key format"
  ></mcp-input>
  
  <mcp-button>Submit</mcp-button>
</mcp-vstack>
```

### Card with Actions

```html
<mcp-card>
  <span slot="header">
    <mcp-hstack justify="between" align="center">
      <strong>MCP Server</strong>
      <mcp-badge variant="success">Connected</mcp-badge>
    </mcp-hstack>
  </span>
  
  <mcp-kv>
    <mcp-kv-item key="Server" value="weather-mcp"></mcp-kv-item>
    <mcp-kv-item key="Tools" value="3 available"></mcp-kv-item>
  </mcp-kv>
  
  <mcp-hstack slot="footer" justify="end" gap="var(--mcp-space-2)">
    <mcp-button variant="ghost">Disconnect</mcp-button>
    <mcp-button>View Tools</mcp-button>
  </mcp-hstack>
</mcp-card>
```

### Loading States

```html
<!-- Spinner -->
<mcp-spinner size="lg"></mcp-spinner>

<!-- Progress bar -->
<mcp-progress value="65" label="Uploading..." show-value></mcp-progress>

<!-- Indeterminate progress -->
<mcp-progress indeterminate label="Processing..."></mcp-progress>

<!-- Skeleton loading -->
<mcp-card>
  <mcp-hstack gap="var(--mcp-space-3)">
    <mcp-skeleton width="3rem" height="3rem" circle></mcp-skeleton>
    <mcp-vstack style="flex: 1;">
      <mcp-skeleton width="60%" height="1rem"></mcp-skeleton>
      <mcp-skeleton-text lines="2"></mcp-skeleton-text>
    </mcp-vstack>
  </mcp-hstack>
</mcp-card>
```

### MCP Tool Response Display

```html
<mcp-card>
  <span slot="header">
    <mcp-hstack justify="between">
      <strong>get_weather</strong>
      <mcp-badge variant="success">Success</mcp-badge>
    </mcp-hstack>
  </span>
  
  <mcp-code language="json">
{
  "location": "San Francisco",
  "temperature": 68,
  "conditions": "Partly Cloudy"
}
  </mcp-code>
</mcp-card>
```

## Theming

Components use CSS custom properties for theming. Override them in your app:

```css
:root {
  /* Primary color */
  --mcp-color-primary: #6366f1;
  --mcp-color-primary-hover: #4f46e5;
  
  /* Spacing */
  --mcp-space-4: 1rem;
  
  /* Border radius */
  --mcp-radius-md: 0.375rem;
  
  /* Typography */
  --mcp-font-family: 'Inter', system-ui, sans-serif;
}

/* Dark mode */
[data-theme="dark"] {
  --mcp-color-background: #0f172a;
  --mcp-color-foreground: #f8fafc;
}
```

## Controllers

Reusable logic for managing component state:

### AsyncController

```typescript
import { AsyncController } from '@mcp/ui-components/controllers';

class MyElement extends LitElement {
  private _async = new AsyncController<Data>(this);

  async fetchData() {
    await this._async.run(async (signal) => {
      const response = await fetch('/api/data', { signal });
      return response.json();
    });
  }

  render() {
    if (this._async.isPending) return html`<mcp-spinner></mcp-spinner>`;
    if (this._async.isError) return html`<mcp-alert variant="error">${this._async.error}</mcp-alert>`;
    return html`<div>${this._async.data}</div>`;
  }
}
```

### FormFieldController

```typescript
import { FormFieldController, validators } from '@mcp/ui-components/controllers';

class MyForm extends LitElement {
  private _email = new FormFieldController(this, [
    validators.required(),
    validators.email(),
  ]);

  render() {
    return html`
      <mcp-input
        label="Email"
        .value=${this._email.value}
        .error=${this._email.showError ? this._email.error : ''}
        @mcp-input=${(e) => this._email.setValue(e.detail.value)}
        @blur=${() => this._email.touch()}
      ></mcp-input>
    `;
  }
}
```

## Development

```bash
# Install dependencies
npm install

# Start dev server
npm run dev

# Build
npm run build

# Type check
npm run build
```

## License

MIT
