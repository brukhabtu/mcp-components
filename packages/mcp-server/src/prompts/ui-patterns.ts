import { z } from "zod";

interface UIPrompt {
  name: string;
  description: string;
  schema: Record<string, z.ZodTypeAny>;
  generate: (args: Record<string, any>) => {
    messages: Array<{
      role: "user" | "assistant";
      content: { type: "text"; text: string };
    }>;
  };
}

export const UI_PROMPTS: UIPrompt[] = [
  {
    name: "chat_interface",
    description: "Design a chat interface with messages and input",
    schema: {
      style: z.enum(["minimal", "bubble", "slack"]).default("bubble").describe("Chat style"),
      features: z.array(z.enum(["avatars", "timestamps", "status", "reactions", "typing"])).optional()
    },
    generate: ({ style, features = [] }) => ({
      messages: [{
        role: "user" as const,
        content: {
          type: "text" as const,
          text: `Create a ${style} style chat interface using mcp-components.

Required features: ${features.length ? features.join(", ") : "basic messages"}

Use these components:
- mcp-message for chat bubbles (align="start" for received, align="end" for sent)
- mcp-message-input with mcp-icon-button for send
- mcp-avatar for user avatars
- mcp-message-typing for typing indicators

The interface should:
1. Have a scrollable message area
2. Fixed input at the bottom
3. Use the "bubble" variant for iMessage-like appearance
4. Include proper spacing between messages

Generate the complete HTML using the render_chat tool or render_page tool.`
        }
      }]
    })
  },

  {
    name: "form_layout",
    description: "Design a form with inputs and validation",
    schema: {
      fields: z.array(z.object({
        name: z.string(),
        type: z.enum(["text", "email", "password", "textarea", "select", "checkbox", "switch"]),
        label: z.string(),
        required: z.boolean().optional()
      })).describe("Form fields to include"),
      style: z.enum(["stacked", "inline", "card"]).default("stacked")
    },
    generate: ({ fields, style }) => ({
      messages: [{
        role: "user" as const,
        content: {
          type: "text" as const,
          text: `Create a ${style} form layout with these fields:
${fields.map((f: any) => `- ${f.label} (${f.type})${f.required ? ' *required' : ''}`).join('\n')}

Use these mcp-components:
- mcp-input for text/email/password
- mcp-textarea for multiline
- mcp-select for dropdowns
- mcp-checkbox / mcp-switch for toggles
- mcp-button variant="primary" for submit
- mcp-card to wrap the form (if card style)
- mcp-alert for error/success messages

Generate the HTML using render_page tool.`
        }
      }]
    })
  },

  {
    name: "notification_system",
    description: "Design alerts and toast notifications",
    schema: {
      types: z.array(z.enum(["info", "success", "warning", "error"])).default(["info", "success", "error"]),
      position: z.enum(["top-right", "top-left", "bottom-right", "bottom-left", "top-center"]).default("top-right")
    },
    generate: ({ types, position }) => ({
      messages: [{
        role: "user" as const,
        content: {
          type: "text" as const,
          text: `Create a notification system with these variants: ${types.join(", ")}

Position: ${position}

Use these components:
- mcp-alert for inline notifications
- mcp-toast for temporary notifications
- mcp-toaster as container (position="${position}")

Show examples of:
1. Inline alerts (dismissible and non-dismissible)
2. Toast notifications with actions
3. Toast with custom icons

Generate using render_page tool.`
        }
      }]
    })
  },

  {
    name: "card_grid",
    description: "Design a grid of cards",
    schema: {
      columns: z.number().min(1).max(4).default(3),
      cardStyle: z.enum(["simple", "with-image", "with-actions"]).default("simple"),
      count: z.number().min(1).max(12).default(6)
    },
    generate: ({ columns, cardStyle, count }) => ({
      messages: [{
        role: "user" as const,
        content: {
          type: "text" as const,
          text: `Create a responsive ${columns}-column grid with ${count} cards.

Card style: ${cardStyle}

Use these components:
- mcp-card with header, content, and footer slots
- mcp-badge for status indicators
- mcp-avatar for user cards
- mcp-button / mcp-icon-button for actions
- CSS Grid for layout

Generate using render_page tool with proper responsive CSS.`
        }
      }]
    })
  },

  {
    name: "dashboard_header",
    description: "Design a dashboard header with navigation",
    schema: {
      title: z.string().default("Dashboard"),
      showSearch: z.boolean().default(true),
      showAvatar: z.boolean().default(true),
      navItems: z.array(z.string()).default(["Home", "Projects", "Settings"])
    },
    generate: ({ title, showSearch, showAvatar, navItems }) => ({
      messages: [{
        role: "user" as const,
        content: {
          type: "text" as const,
          text: `Create a dashboard header with:
- Title: "${title}"
- Navigation: ${navItems.join(", ")}
${showSearch ? "- Search input" : ""}
${showAvatar ? "- User avatar with dropdown" : ""}

Use these components:
- mcp-button variant="ghost" for nav items
- mcp-search-input for search
- mcp-avatar for user
- mcp-icon-button for actions

Generate using render_page tool.`
        }
      }]
    })
  },

  {
    name: "empty_state",
    description: "Design an empty state placeholder",
    schema: {
      type: z.enum(["no-data", "no-results", "error", "welcome"]).default("no-data"),
      showAction: z.boolean().default(true)
    },
    generate: ({ type, showAction }) => ({
      messages: [{
        role: "user" as const,
        content: {
          type: "text" as const,
          text: `Create a ${type} empty state.

${showAction ? "Include a call-to-action button." : ""}

Use mcp-empty component with:
- Appropriate icon in the icon slot
- Descriptive message
- Action button if needed

Generate using render_component tool.`
        }
      }]
    })
  }
];
