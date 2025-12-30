/**
 * Component catalog - documentation for all mcp-components
 */
export const COMPONENT_CATALOG = {
  name: "@mcp/ui-components",
  version: "0.1.0",
  description: "A composable web component library for building modern UIs",

  themes: ["light", "dark", "anthropic", "claude", "claude-dark"],

  tokens: {
    colors: {
      primary: "var(--mcp-color-primary)",
      secondary: "var(--mcp-color-secondary)",
      background: "var(--mcp-color-background)",
      foreground: "var(--mcp-color-foreground)",
      border: "var(--mcp-color-border)",
      ghost: "var(--mcp-color-ghost)",
      success: "var(--mcp-color-success)",
      warning: "var(--mcp-color-warning)",
      error: "var(--mcp-color-error)",
      info: "var(--mcp-color-info)"
    },
    spacing: {
      1: "var(--mcp-space-1) /* 0.25rem */",
      2: "var(--mcp-space-2) /* 0.5rem */",
      3: "var(--mcp-space-3) /* 0.75rem */",
      4: "var(--mcp-space-4) /* 1rem */",
      6: "var(--mcp-space-6) /* 1.5rem */",
      8: "var(--mcp-space-8) /* 2rem */"
    },
    radii: {
      sm: "var(--mcp-radius-sm)",
      md: "var(--mcp-radius-md)",
      lg: "var(--mcp-radius-lg)",
      xl: "var(--mcp-radius-xl)",
      full: "var(--mcp-radius-full)"
    }
  },

  components: {
    // Primitives
    button: {
      tag: "mcp-button",
      description: "A versatile button component",
      props: {
        variant: { type: "string", options: ["primary", "secondary", "tertiary", "ghost"], default: "primary" },
        size: { type: "string", options: ["sm", "md", "lg"], default: "md" },
        disabled: { type: "boolean", default: false },
        loading: { type: "boolean", default: false }
      },
      slots: {
        default: "Button text content",
        prefix: "Content before text (e.g., icon)",
        suffix: "Content after text (e.g., icon)"
      },
      events: ["click"],
      example: '<mcp-button variant="primary">Click me</mcp-button>'
    },

    "icon-button": {
      tag: "mcp-icon-button",
      description: "A circular icon-only button",
      props: {
        variant: { type: "string", options: ["primary", "secondary", "tertiary", "ghost"], default: "primary" },
        size: { type: "string", options: ["sm", "md", "lg"], default: "md" },
        disabled: { type: "boolean", default: false },
        loading: { type: "boolean", default: false },
        label: { type: "string", description: "Accessible label" }
      },
      slots: {
        default: "Icon SVG or mcp-icon"
      },
      example: '<mcp-icon-button label="Send"><svg>...</svg></mcp-icon-button>'
    },

    input: {
      tag: "mcp-input",
      description: "A text input field",
      props: {
        type: { type: "string", default: "text" },
        placeholder: { type: "string" },
        value: { type: "string" },
        disabled: { type: "boolean", default: false },
        error: { type: "string" },
        label: { type: "string" }
      },
      slots: {
        prefix: "Content before input",
        suffix: "Content after input"
      },
      events: ["mcp-input", "mcp-change"],
      example: '<mcp-input placeholder="Enter text..." label="Name"></mcp-input>'
    },

    badge: {
      tag: "mcp-badge",
      description: "A small status indicator",
      props: {
        variant: { type: "string", options: ["ghost", "primary", "secondary", "success", "warning", "error", "info"], default: "ghost" },
        size: { type: "string", options: ["sm", "md", "lg"], default: "md" }
      },
      slots: { default: "Badge content" },
      example: '<mcp-badge variant="success">Active</mcp-badge>'
    },

    tag: {
      tag: "mcp-tag",
      description: "An interactive chip/tag",
      props: {
        variant: { type: "string", options: ["ghost", "primary", "secondary", "success", "warning", "error", "info"], default: "ghost" },
        size: { type: "string", options: ["sm", "md", "lg"], default: "md" },
        removable: { type: "boolean", default: false },
        clickable: { type: "boolean", default: false }
      },
      slots: {
        default: "Tag content",
        icon: "Icon before content",
        remove: "Custom remove button"
      },
      events: ["mcp-remove", "mcp-click"],
      example: '<mcp-tag variant="primary" removable>React</mcp-tag>'
    },

    avatar: {
      tag: "mcp-avatar",
      description: "User avatar with image or initials",
      props: {
        name: { type: "string", description: "Name for initials fallback" },
        src: { type: "string", description: "Image URL" },
        size: { type: "string", options: ["xs", "sm", "md", "lg", "xl"], default: "md" }
      },
      example: '<mcp-avatar name="John Doe" size="md"></mcp-avatar>'
    },

    checkbox: {
      tag: "mcp-checkbox",
      description: "A checkbox input",
      props: {
        checked: { type: "boolean", default: false },
        disabled: { type: "boolean", default: false },
        label: { type: "string" },
        indeterminate: { type: "boolean", default: false }
      },
      slots: { default: "Custom label content" },
      events: ["mcp-change"],
      example: '<mcp-checkbox label="Accept terms"></mcp-checkbox>'
    },

    switch: {
      tag: "mcp-switch",
      description: "A toggle switch",
      props: {
        checked: { type: "boolean", default: false },
        disabled: { type: "boolean", default: false },
        label: { type: "string" },
        "label-position": { type: "string", options: ["left", "right"], default: "right" }
      },
      slots: { default: "Custom label content" },
      events: ["mcp-change"],
      example: '<mcp-switch label="Dark mode"></mcp-switch>'
    },

    // Layout
    card: {
      tag: "mcp-card",
      description: "A container card",
      slots: {
        header: "Card header content",
        default: "Card body content",
        footer: "Card footer content"
      },
      example: `<mcp-card>
  <span slot="header">Title</span>
  Card content here
</mcp-card>`
    },

    // Feedback
    alert: {
      tag: "mcp-alert",
      description: "An alert/notification banner",
      props: {
        variant: { type: "string", options: ["info", "success", "warning", "error"], default: "info" },
        title: { type: "string" },
        dismissible: { type: "boolean", default: false }
      },
      slots: {
        icon: "Custom icon",
        default: "Alert message",
        action: "Action button"
      },
      events: ["mcp-dismiss"],
      example: '<mcp-alert variant="success" title="Success!">Operation completed.</mcp-alert>'
    },

    toast: {
      tag: "mcp-toast",
      description: "A toast notification",
      props: {
        variant: { type: "string", options: ["info", "success", "warning", "error"], default: "info" },
        title: { type: "string" },
        message: { type: "string" },
        dismissible: { type: "boolean", default: true },
        duration: { type: "number", default: 5000 }
      },
      slots: {
        icon: "Custom icon",
        action: "Action button"
      },
      events: ["mcp-dismiss"]
    },

    // Messaging
    message: {
      tag: "mcp-message",
      description: "A chat message bubble",
      props: {
        align: { type: "string", options: ["start", "end"], default: "start" },
        variant: { type: "string", options: ["default", "ghost", "bubble"], default: "ghost" },
        status: { type: "string", options: ["sending", "sent", "delivered", "read", "error"] },
        timestamp: { type: "string" },
        continuation: { type: "boolean", default: false }
      },
      slots: {
        avatar: "User avatar (mcp-avatar)",
        header: "Message header (sender, time)",
        default: "Message content",
        footer: "Footer content (reactions, etc.)"
      },
      example: `<mcp-message align="start" variant="bubble">
  <mcp-avatar slot="avatar" name="Alice" size="sm"></mcp-avatar>
  Hello! How can I help?
</mcp-message>`
    },

    "message-input": {
      tag: "mcp-message-input",
      description: "A message composer input",
      props: {
        placeholder: { type: "string", default: "Type a message..." },
        disabled: { type: "boolean", default: false },
        maxlength: { type: "number" },
        showCount: { type: "boolean", default: false },
        submitOnEnter: { type: "boolean", default: true }
      },
      slots: {
        above: "Content above input (reply preview, attachments)",
        start: "Actions before input (attach button)",
        end: "Actions after input (send button)"
      },
      events: ["mcp-submit", "mcp-input"],
      methods: ["focus()", "clear()", "submit()"]
    },

    "message-typing": {
      tag: "mcp-message-typing",
      description: "A typing indicator",
      props: {
        variant: { type: "string", options: ["dots", "pulse", "wave"], default: "dots" }
      },
      slots: {
        avatar: "Avatar of person typing",
        label: "Typing label (e.g., 'Alice is typing...')"
      }
    }
  }
};

/**
 * Get documentation for a specific component
 */
export function getComponentDocs(componentName: string) {
  return COMPONENT_CATALOG.components[componentName as keyof typeof COMPONENT_CATALOG.components];
}
