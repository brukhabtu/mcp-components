import { z } from "zod";

// Component property schemas
export const componentSchemas = {
  button: z.object({
    variant: z.enum(["primary", "secondary", "tertiary", "ghost"]).optional(),
    size: z.enum(["sm", "md", "lg"]).optional(),
    disabled: z.boolean().optional(),
    loading: z.boolean().optional()
  }),
  "icon-button": z.object({
    variant: z.enum(["primary", "secondary", "tertiary", "ghost"]).optional(),
    size: z.enum(["sm", "md", "lg"]).optional(),
    disabled: z.boolean().optional(),
    label: z.string().optional()
  }),
  input: z.object({
    type: z.string().optional(),
    placeholder: z.string().optional(),
    disabled: z.boolean().optional(),
    error: z.string().optional()
  }),
  badge: z.object({
    variant: z.enum(["ghost", "primary", "secondary", "success", "warning", "error", "info"]).optional(),
    size: z.enum(["sm", "md", "lg"]).optional()
  }),
  tag: z.object({
    variant: z.enum(["ghost", "primary", "secondary", "success", "warning", "error", "info"]).optional(),
    size: z.enum(["sm", "md", "lg"]).optional(),
    removable: z.boolean().optional(),
    clickable: z.boolean().optional()
  }),
  avatar: z.object({
    name: z.string().optional(),
    src: z.string().optional(),
    size: z.enum(["xs", "sm", "md", "lg", "xl"]).optional()
  }),
  card: z.object({}),
  alert: z.object({
    variant: z.enum(["info", "success", "warning", "error"]).optional(),
    title: z.string().optional(),
    dismissible: z.boolean().optional()
  }),
  message: z.object({
    align: z.enum(["start", "end"]).optional(),
    variant: z.enum(["default", "ghost", "bubble"]).optional(),
    status: z.enum(["sending", "sent", "delivered", "read", "error"]).optional(),
    timestamp: z.string().optional(),
    continuation: z.boolean().optional()
  }),
  "message-input": z.object({
    placeholder: z.string().optional(),
    disabled: z.boolean().optional(),
    maxlength: z.number().optional(),
    showCount: z.boolean().optional()
  }),
  "message-typing": z.object({
    variant: z.enum(["dots", "pulse", "wave"]).optional()
  })
};

/**
 * Generate HTML for a single component
 */
export function generateComponent(
  component: string,
  props?: Record<string, any>,
  children?: string,
  slots?: Record<string, string>
): string {
  const tagName = `mcp-${component}`;

  // Build attributes from props
  const attrs = props
    ? Object.entries(props)
        .filter(([_, v]) => v !== undefined && v !== null && v !== false)
        .map(([k, v]) => {
          if (v === true) return k;
          return `${k}="${escapeHtml(String(v))}"`;
        })
        .join(' ')
    : '';

  // Build slot content
  const slotContent = slots
    ? Object.entries(slots)
        .map(([name, content]) => {
          // Default slot doesn't need slot attribute
          if (name === 'default' || name === '') {
            return `<div>${content}</div>`;
          }
          return `<div slot="${name}">${content}</div>`;
        })
        .join('\n')
    : '';

  const content = [slotContent, children].filter(Boolean).join('\n');

  if (content) {
    return `<${tagName}${attrs ? ' ' + attrs : ''}>\n  ${content}\n</${tagName}>`;
  }
  return `<${tagName}${attrs ? ' ' + attrs : ''}></${tagName}>`;
}

/**
 * Generate a complete HTML page with components
 */
export function generatePage(
  title: string,
  theme: string,
  components: Array<{
    component: string;
    props?: Record<string, any>;
    children?: string;
    slot?: Record<string, string>;
  }>,
  customBody?: string
): string {
  const componentHtml = components
    .map(c => generateComponent(c.component, c.props, c.children, c.slot))
    .join('\n    ');

  const body = customBody || `
    <div style="padding: 2rem; max-width: 800px; margin: 0 auto;">
      ${componentHtml}
    </div>`;

  return `<!DOCTYPE html>
<html lang="en" data-theme="${theme}">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <base href="/">
  <title>${escapeHtml(title)}</title>
  <link rel="stylesheet" href="/styles/design-tokens.css">
  <script type="module" src="/bundle/mcp-components.esm.js"></script>
  <style>
    * { box-sizing: border-box; margin: 0; padding: 0; }
    body {
      font-family: system-ui, -apple-system, sans-serif;
      background: var(--mcp-color-background, #fff);
      color: var(--mcp-color-foreground, #000);
      min-height: 100vh;
    }
  </style>
</head>
<body>
  ${body}
</body>
</html>`;
}

function escapeHtml(str: string): string {
  return str
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&#039;');
}
