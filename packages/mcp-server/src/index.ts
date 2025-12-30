import { McpServer } from "@modelcontextprotocol/sdk/server/mcp.js";
import { StdioServerTransport } from "@modelcontextprotocol/sdk/server/stdio.js";
import { z } from "zod";
import { componentSchemas, generateComponent, generatePage } from "./tools/components.js";
import { COMPONENT_CATALOG, getComponentDocs } from "./resources/catalog.js";
import { UI_PROMPTS } from "./prompts/ui-patterns.js";

// Create server instance
const server = new McpServer({
  name: "mcp-ui-server",
  version: "0.1.0",
  description: "Generate UI with mcp-components design system"
});

// ============================================
// TOOLS - Generate UI components
// ============================================

// Tool: Render a single component
server.tool(
  "render_component",
  {
    component: z.enum([
      "button", "icon-button", "input", "textarea", "select", "checkbox", "switch",
      "badge", "tag", "avatar", "card", "alert", "toast", "modal",
      "message", "message-input", "message-typing"
    ]).describe("Component to render"),
    props: z.record(z.any()).optional().describe("Component properties"),
    children: z.string().optional().describe("Inner content/children"),
    slot: z.record(z.string()).optional().describe("Named slot content")
  },
  async ({ component, props, children, slot }) => {
    const html = generateComponent(component, props, children, slot);
    return {
      content: [{
        type: "text",
        text: html
      }]
    };
  }
);

// Tool: Render a complete page/layout
server.tool(
  "render_page",
  {
    title: z.string().describe("Page title"),
    theme: z.enum(["light", "dark", "anthropic", "claude", "claude-dark"]).default("light"),
    components: z.array(z.object({
      component: z.string(),
      props: z.record(z.any()).optional(),
      children: z.string().optional(),
      slot: z.record(z.string()).optional()
    })).describe("Array of components to render")
  },
  async ({ title, theme, components }) => {
    const html = generatePage(title, theme, components);
    return {
      content: [{
        type: "text",
        text: html
      }]
    };
  }
);

// Tool: Generate a chat interface
server.tool(
  "render_chat",
  {
    messages: z.array(z.object({
      align: z.enum(["start", "end"]).default("start"),
      variant: z.enum(["default", "ghost", "bubble"]).default("bubble"),
      content: z.string(),
      avatar: z.string().optional(),
      status: z.enum(["sending", "sent", "delivered", "read", "error"]).optional(),
      timestamp: z.string().optional()
    })).describe("Chat messages to render"),
    showInput: z.boolean().default(true).describe("Show message input"),
    showTyping: z.boolean().default(false).describe("Show typing indicator"),
    theme: z.enum(["light", "dark", "claude", "claude-dark"]).default("light")
  },
  async ({ messages, showInput, showTyping, theme }) => {
    const messageHtml = messages.map(msg => {
      const avatar = msg.avatar
        ? `<mcp-avatar slot="avatar" name="${msg.avatar}" size="sm"></mcp-avatar>`
        : '';
      const status = msg.status ? `status="${msg.status}"` : '';
      const timestamp = msg.timestamp ? `timestamp="${msg.timestamp}"` : '';

      return `<mcp-message align="${msg.align}" variant="${msg.variant}" ${status} ${timestamp}>
        ${avatar}
        ${msg.content}
      </mcp-message>`;
    }).join('\n      ');

    const typingHtml = showTyping ? `
      <mcp-message-typing>
        <mcp-avatar slot="avatar" name="AI" size="sm"></mcp-avatar>
      </mcp-message-typing>` : '';

    const inputHtml = showInput ? `
      <mcp-message-input placeholder="Type a message...">
        <mcp-icon-button slot="end" variant="primary" size="sm" label="Send">
          <svg viewBox="0 0 24 24"><line x1="22" y1="2" x2="11" y2="13"/><polygon points="22 2 15 22 11 13 2 9 22 2"/></svg>
        </mcp-icon-button>
      </mcp-message-input>` : '';

    const html = generatePage("Chat", theme, [], `
    <div style="display: flex; flex-direction: column; height: 100vh; max-width: 600px; margin: 0 auto;">
      <div style="flex: 1; overflow-y: auto; padding: 1rem; display: flex; flex-direction: column; gap: 0.5rem;">
        ${messageHtml}
        ${typingHtml}
      </div>
      <div style="padding: 1rem; border-top: 1px solid var(--mcp-color-border);">
        ${inputHtml}
      </div>
    </div>`);

    return {
      content: [{
        type: "text",
        text: html
      }]
    };
  }
);

// ============================================
// RESOURCES - Component documentation
// ============================================

// Resource: Component catalog
server.resource(
  "catalog",
  "mcp-ui://catalog",
  async () => ({
    contents: [{
      uri: "mcp-ui://catalog",
      mimeType: "application/json",
      text: JSON.stringify(COMPONENT_CATALOG, null, 2)
    }]
  })
);

// Resource: Individual component docs (from all Atomic Design levels)
const allComponents = {
  ...COMPONENT_CATALOG.atoms,
  ...COMPONENT_CATALOG.molecules,
  ...COMPONENT_CATALOG.organisms
};

for (const [name, docs] of Object.entries(allComponents)) {
  server.resource(
    `component-${name}`,
    `mcp-ui://components/${name}`,
    async () => ({
      contents: [{
        uri: `mcp-ui://components/${name}`,
        mimeType: "application/json",
        text: JSON.stringify(docs, null, 2)
      }]
    })
  );
}

// Resource: Design tokens
server.resource(
  "tokens",
  "mcp-ui://tokens",
  async () => ({
    contents: [{
      uri: "mcp-ui://tokens",
      mimeType: "application/json",
      text: JSON.stringify(COMPONENT_CATALOG.tokens, null, 2)
    }]
  })
);

// ============================================
// PROMPTS - UI pattern templates
// ============================================

for (const prompt of UI_PROMPTS) {
  server.prompt(
    prompt.name,
    prompt.schema,
    async (args) => prompt.generate(args)
  );
}

// Start server
const transport = new StdioServerTransport();
await server.connect(transport);

console.error("MCP UI Server running on stdio");
