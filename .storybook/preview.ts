import type { Preview } from '@storybook/web-components-vite'
import '../src/styles/design-tokens.css';

// Global styles for theme support
const style = document.createElement('style');
style.textContent = `
  [data-theme="dark"] {
    --mcp-color-primary: #818cf8;
    --mcp-color-primary-hover: #a5b4fc;
    --mcp-color-primary-active: #c7d2fe;
    --mcp-color-primary-muted: rgba(129, 140, 248, 0.15);
    --mcp-color-secondary: #94a3b8;
    --mcp-color-secondary-hover: #cbd5e1;
    --mcp-color-secondary-active: #e2e8f0;
    --mcp-color-secondary-muted: rgba(148, 163, 184, 0.15);
    --mcp-color-tertiary-hover: rgba(255, 255, 255, 0.05);
    --mcp-color-tertiary-active: rgba(255, 255, 255, 0.1);
    --mcp-color-tertiary-foreground: #f8fafc;
    --mcp-color-success: #4ade80;
    --mcp-color-success-hover: #86efac;
    --mcp-color-success-muted: rgba(74, 222, 128, 0.15);
    --mcp-color-warning: #fbbf24;
    --mcp-color-warning-hover: #fcd34d;
    --mcp-color-warning-muted: rgba(251, 191, 36, 0.15);
    --mcp-color-error: #f87171;
    --mcp-color-error-hover: #fca5a5;
    --mcp-color-error-muted: rgba(248, 113, 113, 0.15);
    --mcp-color-info: #60a5fa;
    --mcp-color-info-hover: #93c5fd;
    --mcp-color-info-muted: rgba(96, 165, 250, 0.15);
    --mcp-color-background: #0f172a;
    --mcp-color-foreground: #f8fafc;
    --mcp-color-ghost: #1e293b;
    --mcp-color-ghost-foreground: #94a3b8;
    --mcp-color-border: #334155;
    --mcp-color-border-hover: #475569;
    --mcp-color-backdrop: rgba(0, 0, 0, 0.7);
  }

  [data-theme="anthropic"] {
    --mcp-color-primary: #D97706;
    --mcp-color-primary-hover: #F59E0B;
    --mcp-color-primary-active: #FBBF24;
    --mcp-color-primary-foreground: #ffffff;
    --mcp-color-primary-muted: rgba(217, 119, 6, 0.15);
    --mcp-color-secondary: #78716c;
    --mcp-color-secondary-hover: #a8a29e;
    --mcp-color-secondary-active: #d6d3d1;
    --mcp-color-secondary-foreground: #ffffff;
    --mcp-color-secondary-muted: rgba(120, 113, 108, 0.15);
    --mcp-color-tertiary-hover: rgba(255, 255, 255, 0.05);
    --mcp-color-tertiary-active: rgba(255, 255, 255, 0.1);
    --mcp-color-tertiary-foreground: #FAFAF9;
    --mcp-color-success: #10b981;
    --mcp-color-success-hover: #34d399;
    --mcp-color-success-muted: rgba(16, 185, 129, 0.15);
    --mcp-color-warning: #F59E0B;
    --mcp-color-warning-hover: #FBBF24;
    --mcp-color-warning-foreground: #1C1917;
    --mcp-color-warning-muted: rgba(245, 158, 11, 0.15);
    --mcp-color-error: #DC2626;
    --mcp-color-error-hover: #EF4444;
    --mcp-color-error-muted: rgba(220, 38, 38, 0.15);
    --mcp-color-info: #D97706;
    --mcp-color-info-hover: #F59E0B;
    --mcp-color-info-muted: rgba(217, 119, 6, 0.15);
    --mcp-color-background: #1C1917;
    --mcp-color-foreground: #FAFAF9;
    --mcp-color-ghost: #292524;
    --mcp-color-ghost-foreground: #A8A29E;
    --mcp-color-border: #44403C;
    --mcp-color-border-hover: #57534E;
    --mcp-color-backdrop: rgba(0, 0, 0, 0.7);
  }

  body {
    font-family: var(--mcp-font-family);
    background: var(--mcp-color-background);
    color: var(--mcp-color-foreground);
  }
`;
document.head.appendChild(style);

const preview: Preview = {
  parameters: {
    controls: {
      matchers: {
       color: /(background|color)$/i,
       date: /Date$/i,
      },
    },
    backgrounds: {
      default: 'light',
      values: [
        { name: 'light', value: '#ffffff' },
        { name: 'dark', value: '#0f172a' },
        { name: 'anthropic', value: '#1C1917' },
      ],
    },
    designToken: {
      files: {
        css: {
          'Design Tokens': '../src/styles/design-tokens.css',
        },
      },
    },
    a11y: {
      test: 'todo'
    }
  },
  globalTypes: {
    theme: {
      description: 'Global theme',
      toolbar: {
        title: 'Theme',
        icon: 'circlehollow',
        items: ['light', 'dark', 'anthropic'],
        dynamicTitle: true,
      },
    },
  },
  decorators: [
    (story, context) => {
      const theme = context.globals.theme || 'light';
      document.documentElement.setAttribute('data-theme', theme);
      return story();
    },
  ],
};

export default preview;
