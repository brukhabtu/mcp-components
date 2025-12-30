# @mcp/ui-server

An MCP (Model Context Protocol) server that enables AI models to generate UI using the `@mcp/ui-components` design system.

## Features

### Tools

| Tool | Description |
|------|-------------|
| `render_component` | Render a single UI component with props and slots |
| `render_page` | Generate a complete HTML page with multiple components |
| `render_chat` | Generate a chat interface with messages and input |

### Resources

| Resource | URI | Description |
|----------|-----|-------------|
| Catalog | `mcp-ui://catalog` | Complete component library documentation |
| Component Docs | `mcp-ui://components/{name}` | Individual component documentation |
| Design Tokens | `mcp-ui://tokens` | Color, spacing, and typography tokens |

### Prompts

| Prompt | Description |
|--------|-------------|
| `chat_interface` | Design a chat interface with customizable style |
| `form_layout` | Create forms with various field types |
| `notification_system` | Design alerts and toast notifications |
| `card_grid` | Create responsive card layouts |
| `dashboard_header` | Design navigation headers |
| `empty_state` | Create empty state placeholders |

## Installation

```bash
npm install @mcp/ui-server
```

## Usage

### With Claude Desktop

Add to your `claude_desktop_config.json`:

```json
{
  "mcpServers": {
    "mcp-ui": {
      "command": "node",
      "args": ["/path/to/mcp-server/dist/index.js"]
    }
  }
}
```

### With Claude Code

Add to your `.mcp.json`:

```json
{
  "mcpServers": {
    "mcp-ui": {
      "command": "node",
      "args": ["./packages/mcp-server/dist/index.js"]
    }
  }
}
```

## Example Usage

Once connected, you can ask Claude to:

```
Generate a chat interface with bubble-style messages,
avatars, and a send button using the render_chat tool.
```

Or use the prompts:

```
Use the chat_interface prompt with bubble style and
features: avatars, timestamps, typing indicator.
```

## Development

```bash
# Install dependencies
npm install

# Build
npm run build

# Run in development mode
npm run dev
```

## Component Library

This server uses components from `@mcp/ui-components`:

**Primitives**: button, icon-button, input, textarea, select, checkbox, switch, badge, tag, avatar

**Layout**: card, stack, grid

**Feedback**: alert, toast, spinner, progress

**Messaging**: message, message-input, message-typing

**Themes**: light, dark, anthropic, claude, claude-dark

## License

MIT
