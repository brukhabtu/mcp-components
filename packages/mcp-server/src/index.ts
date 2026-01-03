import { McpServer } from "@modelcontextprotocol/sdk/server/mcp.js";
import { StdioServerTransport } from "@modelcontextprotocol/sdk/server/stdio.js";
import { z } from "zod";
import { componentSchemas, generateComponent } from "./tools/components.js";
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
