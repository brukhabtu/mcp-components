/**
 * Component catalog - documentation for all mcp-components
 * Organized by Atomic Design methodology
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

  // Atomic Design Structure
  atoms: {
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

    textarea: {
      tag: "mcp-textarea",
      description: "A multi-line text input",
      props: {
        placeholder: { type: "string" },
        value: { type: "string" },
        disabled: { type: "boolean", default: false },
        rows: { type: "number", default: 3 },
        label: { type: "string" }
      },
      events: ["mcp-input", "mcp-change"],
      example: '<mcp-textarea placeholder="Enter description..." label="Bio"></mcp-textarea>'
    },

    select: {
      tag: "mcp-select",
      description: "A dropdown select input",
      props: {
        value: { type: "string" },
        placeholder: { type: "string" },
        disabled: { type: "boolean", default: false },
        label: { type: "string" }
      },
      slots: {
        default: "mcp-option elements"
      },
      events: ["mcp-change"],
      example: '<mcp-select label="Country"><mcp-option value="us">United States</mcp-option></mcp-select>'
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

    icon: {
      tag: "mcp-icon",
      description: "Icon wrapper component",
      props: {
        name: { type: "string", description: "Icon name from icon set" },
        size: { type: "string", options: ["xs", "sm", "md", "lg"], default: "md" }
      },
      slots: { default: "Custom SVG icon" },
      example: '<mcp-icon name="check"></mcp-icon>'
    },

    spinner: {
      tag: "mcp-spinner",
      description: "Loading spinner indicator",
      props: {
        size: { type: "string", options: ["sm", "md", "lg"], default: "md" }
      },
      example: '<mcp-spinner size="md"></mcp-spinner>'
    },

    progress: {
      tag: "mcp-progress",
      description: "Progress bar indicator",
      props: {
        value: { type: "number", default: 0 },
        max: { type: "number", default: 100 },
        variant: { type: "string", options: ["default", "success", "warning", "error"], default: "default" }
      },
      example: '<mcp-progress value="60" max="100"></mcp-progress>'
    },

    skeleton: {
      tag: "mcp-skeleton",
      description: "Placeholder loading skeleton",
      props: {
        variant: { type: "string", options: ["text", "circle", "rect"], default: "text" },
        width: { type: "string" },
        height: { type: "string" }
      },
      example: '<mcp-skeleton variant="text" width="200px"></mcp-skeleton>'
    },

    divider: {
      tag: "mcp-divider",
      description: "Visual separator",
      props: {
        orientation: { type: "string", options: ["horizontal", "vertical"], default: "horizontal" }
      },
      example: '<mcp-divider></mcp-divider>'
    },

    tooltip: {
      tag: "mcp-tooltip",
      description: "Tooltip on hover",
      props: {
        content: { type: "string" },
        position: { type: "string", options: ["top", "right", "bottom", "left"], default: "top" }
      },
      slots: { default: "Trigger element" },
      example: '<mcp-tooltip content="More info"><mcp-button>Hover me</mcp-button></mcp-tooltip>'
    },

    code: {
      tag: "mcp-code",
      description: "Code display with syntax highlighting",
      props: {
        language: { type: "string" },
        inline: { type: "boolean", default: false }
      },
      slots: { default: "Code content" },
      example: '<mcp-code language="javascript">const x = 1;</mcp-code>'
    }
  },

  molecules: {
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

    "search-input": {
      tag: "mcp-search-input",
      description: "Search input with icon and clear button",
      props: {
        value: { type: "string" },
        placeholder: { type: "string", default: "Search..." },
        disabled: { type: "boolean", default: false }
      },
      slots: {
        icon: "Custom search icon",
        clear: "Custom clear button"
      },
      events: ["mcp-input", "mcp-clear"],
      example: '<mcp-search-input placeholder="Search components..."></mcp-search-input>'
    },

    "drop-zone": {
      tag: "mcp-drop-zone",
      description: "Drag and drop file upload area",
      props: {
        accept: { type: "string", description: "Accepted file types" },
        multiple: { type: "boolean", default: false },
        disabled: { type: "boolean", default: false }
      },
      events: ["mcp-drop", "mcp-files-selected"],
      example: '<mcp-drop-zone accept="image/*" multiple></mcp-drop-zone>'
    },

    popover: {
      tag: "mcp-popover",
      description: "Popover/dropdown content",
      props: {
        open: { type: "boolean", default: false },
        position: { type: "string", options: ["top", "right", "bottom", "left"], default: "bottom" }
      },
      slots: {
        trigger: "Trigger element",
        default: "Popover content"
      },
      example: '<mcp-popover><mcp-button slot="trigger">Open</mcp-button>Content here</mcp-popover>'
    }
  },

  organisms: {
    card: {
      tag: "mcp-card",
      description: "A container card with header/body/footer",
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

    modal: {
      tag: "mcp-modal",
      description: "A modal dialog overlay",
      props: {
        open: { type: "boolean", default: false },
        size: { type: "string", options: ["sm", "md", "lg", "xl"], default: "md" }
      },
      slots: {
        header: "Modal header",
        default: "Modal body",
        footer: "Modal footer"
      },
      events: ["mcp-close"],
      example: '<mcp-modal open><span slot="header">Confirm</span>Are you sure?</mcp-modal>'
    },

    accordion: {
      tag: "mcp-accordion",
      description: "Collapsible accordion container",
      props: {
        multiple: { type: "boolean", default: false }
      },
      slots: { default: "mcp-accordion-item elements" },
      example: '<mcp-accordion><mcp-accordion-item title="Section 1">Content</mcp-accordion-item></mcp-accordion>'
    },

    tabs: {
      tag: "mcp-tabs",
      description: "Tabbed content container",
      props: {
        value: { type: "string", description: "Active tab value" }
      },
      slots: { default: "mcp-tab and mcp-tab-panel elements" },
      events: ["mcp-change"],
      example: '<mcp-tabs><mcp-tab value="1">Tab 1</mcp-tab><mcp-tab-panel value="1">Content</mcp-tab-panel></mcp-tabs>'
    },

    menu: {
      tag: "mcp-menu",
      description: "Dropdown menu with items",
      slots: {
        trigger: "Menu trigger",
        default: "mcp-menu-item, mcp-menu-group, mcp-menu-divider"
      },
      example: '<mcp-menu><mcp-button slot="trigger">Menu</mcp-button><mcp-menu-item>Item 1</mcp-menu-item></mcp-menu>'
    },

    list: {
      tag: "mcp-list",
      description: "List container for list items",
      props: {
        borderless: { type: "boolean", default: false }
      },
      slots: { default: "mcp-list-item elements" },
      example: '<mcp-list><mcp-list-item title="Item 1" description="Description"></mcp-list-item></mcp-list>'
    },

    table: {
      tag: "mcp-table",
      description: "Data table with headers and rows",
      props: {
        striped: { type: "boolean", default: false },
        hoverable: { type: "boolean", default: true }
      },
      slots: { default: "Table content (thead, tbody)" },
      example: '<mcp-table striped><thead>...</thead><tbody>...</tbody></mcp-table>'
    },

    stepper: {
      tag: "mcp-stepper",
      description: "Step-by-step progress indicator",
      props: {
        activeStep: { type: "number", default: 0 },
        orientation: { type: "string", options: ["horizontal", "vertical"], default: "horizontal" }
      },
      slots: { default: "mcp-step elements" },
      example: '<mcp-stepper active-step="1"><mcp-step title="Step 1"></mcp-step></mcp-stepper>'
    },

    breadcrumb: {
      tag: "mcp-breadcrumb",
      description: "Breadcrumb navigation",
      slots: { default: "mcp-breadcrumb-item elements" },
      example: '<mcp-breadcrumb><mcp-breadcrumb-item href="/">Home</mcp-breadcrumb-item></mcp-breadcrumb>'
    },

    pagination: {
      tag: "mcp-pagination",
      description: "Page navigation controls",
      props: {
        total: { type: "number" },
        page: { type: "number", default: 1 },
        pageSize: { type: "number", default: 10 }
      },
      events: ["mcp-page-change"],
      example: '<mcp-pagination total="100" page="1" page-size="10"></mcp-pagination>'
    },

    empty: {
      tag: "mcp-empty",
      description: "Empty state placeholder",
      props: {
        title: { type: "string" },
        description: { type: "string" }
      },
      slots: {
        icon: "Empty state icon",
        action: "Action button"
      },
      example: '<mcp-empty title="No results" description="Try a different search"></mcp-empty>'
    },

    stack: {
      tag: "mcp-stack",
      description: "Flexbox stack layout (also mcp-hstack, mcp-vstack)",
      props: {
        direction: { type: "string", options: ["row", "column", "row-reverse", "column-reverse"], default: "column" },
        gap: { type: "string" },
        align: { type: "string", options: ["start", "center", "end", "stretch", "baseline"] },
        justify: { type: "string", options: ["start", "center", "end", "between", "around", "evenly"] }
      },
      slots: { default: "Stack children" },
      example: '<mcp-vstack gap="var(--mcp-space-4)"><mcp-button>A</mcp-button><mcp-button>B</mcp-button></mcp-vstack>'
    },

    grid: {
      tag: "mcp-grid",
      description: "CSS Grid layout container",
      props: {
        columns: { type: "number", default: 1 },
        gap: { type: "string" }
      },
      slots: { default: "Grid children" },
      example: '<mcp-grid columns="3" gap="var(--mcp-space-4)">...</mcp-grid>'
    },

    "key-value": {
      tag: "mcp-key-value",
      description: "Key-value pairs display",
      slots: { default: "mcp-key-value-item elements" },
      example: '<mcp-key-value><mcp-key-value-item key="Name" value="John"></mcp-key-value-item></mcp-key-value>'
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
    },

    // MCP-specific
    "chat-message": {
      tag: "mcp-chat-message",
      description: "AI assistant chat message with tool calls",
      props: {
        role: { type: "string", options: ["user", "assistant", "system"], default: "assistant" },
        timestamp: { type: "string" }
      },
      slots: {
        avatar: "Assistant avatar",
        default: "Message content",
        tools: "Tool call displays"
      }
    },

    "tool-call": {
      tag: "mcp-tool-call",
      description: "Tool call visualization",
      props: {
        name: { type: "string", description: "Tool name" },
        status: { type: "string", options: ["pending", "running", "success", "error"], default: "pending" },
        duration: { type: "string" }
      },
      slots: {
        input: "Tool input display",
        output: "Tool output display"
      }
    },

    "server-status": {
      tag: "mcp-server-status",
      description: "MCP server connection status",
      props: {
        name: { type: "string" },
        status: { type: "string", options: ["connected", "connecting", "disconnected", "error"], default: "disconnected" },
        tools: { type: "number", default: 0 },
        resources: { type: "number", default: 0 }
      }
    },

    toaster: {
      tag: "mcp-toaster",
      description: "Toast notification container",
      props: {
        position: { type: "string", options: ["top-left", "top-center", "top-right", "bottom-left", "bottom-center", "bottom-right"], default: "bottom-right" }
      },
      methods: ["toast(options)"]
    }
  }
};

/**
 * Get documentation for a specific component
 */
export function getComponentDocs(componentName: string) {
  // Search in all categories
  const categories = ['atoms', 'molecules', 'organisms'] as const;
  for (const category of categories) {
    const components = COMPONENT_CATALOG[category] as Record<string, unknown>;
    if (componentName in components) {
      return {
        ...(components[componentName] as object),
        category
      };
    }
  }
  return undefined;
}

/**
 * Get all components by category
 */
export function getComponentsByCategory(category: 'atoms' | 'molecules' | 'organisms') {
  return COMPONENT_CATALOG[category];
}
