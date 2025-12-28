import { css } from 'lit';

export const tokens = css`
  :host {
    --mcp-color-primary: #6366f1;
    --mcp-color-primary-hover: #4f46e5;
    --mcp-color-primary-active: #4338ca;
    --mcp-color-primary-foreground: #ffffff;
    --mcp-color-secondary: #64748b;
    --mcp-color-secondary-hover: #475569;
    --mcp-color-secondary-foreground: #ffffff;
    --mcp-color-success: #22c55e;
    --mcp-color-success-foreground: #ffffff;
    --mcp-color-warning: #f59e0b;
    --mcp-color-warning-foreground: #ffffff;
    --mcp-color-error: #ef4444;
    --mcp-color-error-foreground: #ffffff;
    --mcp-color-info: #3b82f6;
    --mcp-color-info-foreground: #ffffff;
    --mcp-color-background: #ffffff;
    --mcp-color-foreground: #0f172a;
    --mcp-color-muted: #f1f5f9;
    --mcp-color-muted-foreground: #64748b;
    --mcp-color-border: #e2e8f0;
    --mcp-color-border-hover: #cbd5e1;
    --mcp-space-1: 0.25rem;
    --mcp-space-2: 0.5rem;
    --mcp-space-3: 0.75rem;
    --mcp-space-4: 1rem;
    --mcp-space-6: 1.5rem;
    --mcp-space-8: 2rem;
    --mcp-font-family: system-ui, -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif;
    --mcp-font-family-mono: ui-monospace, SFMono-Regular, Menlo, monospace;
    --mcp-font-size-xs: 0.75rem;
    --mcp-font-size-sm: 0.875rem;
    --mcp-font-size-base: 1rem;
    --mcp-font-size-lg: 1.125rem;
    --mcp-font-size-xl: 1.25rem;
    --mcp-font-size-2xl: 1.5rem;
    --mcp-line-height-tight: 1.25;
    --mcp-line-height-normal: 1.5;
    --mcp-font-weight-medium: 500;
    --mcp-font-weight-semibold: 600;
    --mcp-radius-sm: 0.25rem;
    --mcp-radius-md: 0.375rem;
    --mcp-radius-lg: 0.5rem;
    --mcp-radius-full: 9999px;
    --mcp-shadow-sm: 0 1px 2px 0 rgb(0 0 0 / 0.05);
    --mcp-shadow-md: 0 4px 6px -1px rgb(0 0 0 / 0.1);
    --mcp-shadow-lg: 0 10px 15px -3px rgb(0 0 0 / 0.1);
    --mcp-transition-fast: 150ms ease;
    --mcp-transition-normal: 200ms ease;
    --mcp-z-dropdown: 1000;
    --mcp-z-modal: 1030;
    --mcp-z-tooltip: 1050;
  }
`;

export const darkTokens = css`
  :host([theme="dark"]), :host-context([data-theme="dark"]) {
    --mcp-color-primary: #818cf8;
    --mcp-color-primary-hover: #a5b4fc;
    --mcp-color-background: #0f172a;
    --mcp-color-foreground: #f8fafc;
    --mcp-color-muted: #1e293b;
    --mcp-color-muted-foreground: #94a3b8;
    --mcp-color-border: #334155;
  }
`;

export const resetStyles = css`
  *, *::before, *::after { box-sizing: border-box; }
  :host {
    font-family: var(--mcp-font-family);
    font-size: var(--mcp-font-size-base);
    line-height: var(--mcp-line-height-normal);
    color: var(--mcp-color-foreground);
  }
  :host([hidden]) { display: none !important; }
`;

export const baseStyles = [tokens, darkTokens, resetStyles];
