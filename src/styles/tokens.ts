import { css } from 'lit';

/**
 * MCP Components Design System Tokens
 *
 * Variants (visual hierarchy): primary, secondary, tertiary, ghost
 * Status (semantic feedback): success, warning, error, info
 */

export const tokens = css`
  :host {
    /* ======================
       COLOR SYSTEM
       ====================== */

    /* Primary - Main actions and emphasis */
    --mcp-color-primary: #6366f1;
    --mcp-color-primary-hover: #4f46e5;
    --mcp-color-primary-active: #4338ca;
    --mcp-color-primary-foreground: #ffffff;
    --mcp-color-primary-muted: rgba(99, 102, 241, 0.1);

    /* Secondary - Reduced emphasis */
    --mcp-color-secondary: #64748b;
    --mcp-color-secondary-hover: #475569;
    --mcp-color-secondary-active: #334155;
    --mcp-color-secondary-foreground: #ffffff;
    --mcp-color-secondary-muted: rgba(100, 116, 139, 0.1);

    /* Tertiary - Minimal emphasis (ghost-like) */
    --mcp-color-tertiary: transparent;
    --mcp-color-tertiary-hover: rgba(0, 0, 0, 0.05);
    --mcp-color-tertiary-active: rgba(0, 0, 0, 0.1);
    --mcp-color-tertiary-foreground: #0f172a;

    /* Success - Positive outcomes */
    --mcp-color-success: #22c55e;
    --mcp-color-success-hover: #16a34a;
    --mcp-color-success-active: #15803d;
    --mcp-color-success-foreground: #ffffff;
    --mcp-color-success-muted: rgba(34, 197, 94, 0.1);

    /* Warning - Caution needed */
    --mcp-color-warning: #f59e0b;
    --mcp-color-warning-hover: #d97706;
    --mcp-color-warning-active: #b45309;
    --mcp-color-warning-foreground: #ffffff;
    --mcp-color-warning-muted: rgba(245, 158, 11, 0.1);

    /* Error - Problems and destructive actions */
    --mcp-color-error: #ef4444;
    --mcp-color-error-hover: #dc2626;
    --mcp-color-error-active: #b91c1c;
    --mcp-color-error-foreground: #ffffff;
    --mcp-color-error-muted: rgba(239, 68, 68, 0.1);

    /* Info - Informational */
    --mcp-color-info: #3b82f6;
    --mcp-color-info-hover: #2563eb;
    --mcp-color-info-active: #1d4ed8;
    --mcp-color-info-foreground: #ffffff;
    --mcp-color-info-muted: rgba(59, 130, 246, 0.1);

    /* Surface colors */
    --mcp-color-background: #ffffff;
    --mcp-color-foreground: #0f172a;
    --mcp-color-ghost: #f1f5f9;
    --mcp-color-ghost-foreground: #64748b;
    --mcp-color-border: #e2e8f0;
    --mcp-color-border-hover: #cbd5e1;
    --mcp-color-backdrop: rgba(0, 0, 0, 0.5);

    /* ======================
       SPACING SCALE
       ====================== */
    --mcp-space-0: 0;
    --mcp-space-1: 0.25rem;   /* 4px */
    --mcp-space-2: 0.5rem;    /* 8px */
    --mcp-space-3: 0.75rem;   /* 12px */
    --mcp-space-4: 1rem;      /* 16px */
    --mcp-space-5: 1.25rem;   /* 20px */
    --mcp-space-6: 1.5rem;    /* 24px */
    --mcp-space-8: 2rem;      /* 32px */
    --mcp-space-10: 2.5rem;   /* 40px */
    --mcp-space-12: 3rem;     /* 48px */

    /* ======================
       TYPOGRAPHY
       ====================== */
    --mcp-font-family: system-ui, -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif;
    --mcp-font-family-mono: ui-monospace, SFMono-Regular, Menlo, Monaco, Consolas, monospace;

    /* Font sizes */
    --mcp-font-size-xs: 0.75rem;    /* 12px */
    --mcp-font-size-sm: 0.875rem;   /* 14px */
    --mcp-font-size-base: 1rem;     /* 16px */
    --mcp-font-size-lg: 1.125rem;   /* 18px */
    --mcp-font-size-xl: 1.25rem;    /* 20px */
    --mcp-font-size-2xl: 1.5rem;    /* 24px */
    --mcp-font-size-3xl: 1.875rem;  /* 30px */

    /* Font weights */
    --mcp-font-weight-normal: 400;
    --mcp-font-weight-medium: 500;
    --mcp-font-weight-semibold: 600;
    --mcp-font-weight-bold: 700;

    /* Line heights */
    --mcp-line-height-tight: 1.25;
    --mcp-line-height-normal: 1.5;
    --mcp-line-height-relaxed: 1.75;

    /* ======================
       BORDERS & RADIUS
       ====================== */
    --mcp-radius-none: 0;
    --mcp-radius-sm: 0.25rem;   /* 4px */
    --mcp-radius-md: 0.375rem;  /* 6px */
    --mcp-radius-lg: 0.5rem;    /* 8px */
    --mcp-radius-xl: 0.75rem;   /* 12px */
    --mcp-radius-full: 9999px;

    --mcp-border-width: 1px;

    /* ======================
       SHADOWS
       ====================== */
    --mcp-shadow-sm: 0 1px 2px 0 rgba(0, 0, 0, 0.05);
    --mcp-shadow-md: 0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -2px rgba(0, 0, 0, 0.1);
    --mcp-shadow-lg: 0 10px 15px -3px rgba(0, 0, 0, 0.1), 0 4px 6px -4px rgba(0, 0, 0, 0.1);
    --mcp-shadow-xl: 0 20px 25px -5px rgba(0, 0, 0, 0.1), 0 8px 10px -6px rgba(0, 0, 0, 0.1);

    /* ======================
       TRANSITIONS
       ====================== */
    --mcp-transition-fast: 150ms ease;
    --mcp-transition-normal: 200ms ease;
    --mcp-transition-slow: 300ms ease;

    /* ======================
       Z-INDEX SCALE
       ====================== */
    --mcp-z-dropdown: 1000;
    --mcp-z-sticky: 1010;
    --mcp-z-modal: 1030;
    --mcp-z-tooltip: 1050;
    --mcp-z-toast: 1060;

    /* ======================
       INTERACTIVE STATES
       ====================== */
    --mcp-opacity-disabled: 0.5;
  }
`;

export const darkTokens = css`
  :host([theme="dark"]), :host-context([data-theme="dark"]) {
    /* Primary */
    --mcp-color-primary: #818cf8;
    --mcp-color-primary-hover: #a5b4fc;
    --mcp-color-primary-active: #c7d2fe;
    --mcp-color-primary-muted: rgba(129, 140, 248, 0.15);

    /* Secondary */
    --mcp-color-secondary: #94a3b8;
    --mcp-color-secondary-hover: #cbd5e1;
    --mcp-color-secondary-active: #e2e8f0;
    --mcp-color-secondary-muted: rgba(148, 163, 184, 0.15);

    /* Tertiary */
    --mcp-color-tertiary-hover: rgba(255, 255, 255, 0.05);
    --mcp-color-tertiary-active: rgba(255, 255, 255, 0.1);
    --mcp-color-tertiary-foreground: #f8fafc;

    /* Success */
    --mcp-color-success: #4ade80;
    --mcp-color-success-hover: #86efac;
    --mcp-color-success-active: #bbf7d0;
    --mcp-color-success-muted: rgba(74, 222, 128, 0.15);

    /* Warning */
    --mcp-color-warning: #fbbf24;
    --mcp-color-warning-hover: #fcd34d;
    --mcp-color-warning-active: #fde68a;
    --mcp-color-warning-muted: rgba(251, 191, 36, 0.15);

    /* Error */
    --mcp-color-error: #f87171;
    --mcp-color-error-hover: #fca5a5;
    --mcp-color-error-active: #fecaca;
    --mcp-color-error-muted: rgba(248, 113, 113, 0.15);

    /* Info */
    --mcp-color-info: #60a5fa;
    --mcp-color-info-hover: #93c5fd;
    --mcp-color-info-active: #bfdbfe;
    --mcp-color-info-muted: rgba(96, 165, 250, 0.15);

    /* Surfaces */
    --mcp-color-background: #0f172a;
    --mcp-color-foreground: #f8fafc;
    --mcp-color-ghost: #1e293b;
    --mcp-color-ghost-foreground: #94a3b8;
    --mcp-color-border: #334155;
    --mcp-color-border-hover: #475569;
    --mcp-color-backdrop: rgba(0, 0, 0, 0.7);

  }
`;

export const anthropicTokens = css`
  :host([theme="anthropic"]), :host-context([data-theme="anthropic"]) {
    /* Official Anthropic Brand Colors
       Source: https://github.com/anthropics/skills/tree/main/skills/brand-guidelines
       Core: Dark #141413, Light #faf9f5, Mid Gray #b0aea5, Light Gray #e8e6dc
       Accent: Orange #d97757, Blue #6a9bcc, Green #788c5d
    */

    /* Primary - Anthropic Orange */
    --mcp-color-primary: #d97757;
    --mcp-color-primary-hover: #c4684a;
    --mcp-color-primary-active: #b05a3e;
    --mcp-color-primary-foreground: #faf9f5;
    --mcp-color-primary-muted: rgba(217, 119, 87, 0.15);

    /* Secondary - Anthropic Blue */
    --mcp-color-secondary: #6a9bcc;
    --mcp-color-secondary-hover: #5a8bbc;
    --mcp-color-secondary-active: #4a7bac;
    --mcp-color-secondary-foreground: #faf9f5;
    --mcp-color-secondary-muted: rgba(106, 155, 204, 0.15);

    /* Tertiary */
    --mcp-color-tertiary-hover: rgba(250, 249, 245, 0.08);
    --mcp-color-tertiary-active: rgba(250, 249, 245, 0.12);
    --mcp-color-tertiary-foreground: #faf9f5;

    /* Success - Anthropic Green */
    --mcp-color-success: #788c5d;
    --mcp-color-success-hover: #697a51;
    --mcp-color-success-active: #5a6946;
    --mcp-color-success-foreground: #faf9f5;
    --mcp-color-success-muted: rgba(120, 140, 93, 0.15);

    /* Warning - Warm variant of orange */
    --mcp-color-warning: #e8a84c;
    --mcp-color-warning-hover: #d99a40;
    --mcp-color-warning-active: #ca8c35;
    --mcp-color-warning-foreground: #141413;
    --mcp-color-warning-muted: rgba(232, 168, 76, 0.15);

    /* Error - Red that complements the palette */
    --mcp-color-error: #c45c5c;
    --mcp-color-error-hover: #b34d4d;
    --mcp-color-error-active: #a23f3f;
    --mcp-color-error-foreground: #faf9f5;
    --mcp-color-error-muted: rgba(196, 92, 92, 0.15);

    /* Info - Anthropic Blue */
    --mcp-color-info: #6a9bcc;
    --mcp-color-info-hover: #5a8bbc;
    --mcp-color-info-active: #4a7bac;
    --mcp-color-info-foreground: #faf9f5;
    --mcp-color-info-muted: rgba(106, 155, 204, 0.15);

    /* Surfaces - Official brand colors */
    --mcp-color-background: #141413;
    --mcp-color-foreground: #faf9f5;
    --mcp-color-ghost: #1f1f1e;
    --mcp-color-ghost-foreground: #b0aea5;
    --mcp-color-border: #3a3a38;
    --mcp-color-border-hover: #4a4a47;
    --mcp-color-backdrop: rgba(20, 20, 19, 0.8);

    /* Typography - Poppins for headings, Lora for body */
    --mcp-font-family: 'Lora', Georgia, serif;
    --mcp-font-family-heading: 'Poppins', Arial, sans-serif;
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

export const baseStyles = [tokens, darkTokens, anthropicTokens, resetStyles];
