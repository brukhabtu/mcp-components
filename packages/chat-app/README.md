# @mcp/chat-app

A terminal chat app built with the Claude Agent SDK that uses the MCP UI server to generate UI components.

## How it Works

```
┌─────────────────┐     ┌─────────────────┐     ┌─────────────────┐
│   Terminal UI   │────▶│  Claude Agent   │────▶│  MCP UI Server  │
│   (chat-app)    │◀────│      SDK        │◀────│  (mcp-server)   │
└─────────────────┘     └─────────────────┘     └─────────────────┘
        │                       │                       │
   User input            Claude thinks           Generates HTML
   See responses         Uses tools              with components
```

## Prerequisites

1. **Claude Code** must be installed and authenticated (the Agent SDK uses Claude Code under the hood - no separate API key needed)

2. Build the MCP UI server first:
   ```bash
   cd ../mcp-server
   npm install && npm run build
   ```

## Installation

```bash
npm install
npm run build
```

## Usage

```bash
npm start
# or
node dist/index.js
```

## Example Prompts

Once running, try these:

```
> Create a chat interface with bubble messages and avatars

> Generate a login form with email and password fields

> Build a notification system with success and error toasts

> Design a card grid with 3 columns

> Create a dashboard header with search and user avatar
```

## What Happens

1. You type a message
2. Claude Agent SDK sends it to Claude with access to MCP UI tools
3. Claude uses `render_component`, `render_page`, or `render_chat` tools
4. The MCP UI server generates HTML using mcp-components
5. Claude returns the generated UI code

## Architecture

- **chat-app**: Terminal REPL interface using Claude Agent SDK
- **mcp-server**: MCP server with UI generation tools
- **mcp-components**: The underlying web component library

## Development

```bash
# Run in development mode (with hot reload)
npm run dev
```
