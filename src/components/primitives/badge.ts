import { LitElement, html, css } from 'lit';
import { customElement, property } from 'lit/decorators.js';
import { classMap } from 'lit/directives/class-map.js';
import { baseStyles } from '../../styles/index.js';

export type BadgeVariant = 'default' | 'primary' | 'secondary' | 'success' | 'warning' | 'error' | 'info';

/**
 * A badge component for displaying status, labels, or counts.
 * 
 * @slot - Badge content
 */
@customElement('mcp-badge')
export class McpBadge extends LitElement {
  static styles = [
    baseStyles,
    css`
      :host {
        display: inline-flex;
      }

      .badge {
        display: inline-flex;
        align-items: center;
        gap: var(--mcp-space-1);
        padding: var(--mcp-space-1) var(--mcp-space-2);
        font-size: var(--mcp-font-size-xs);
        font-weight: var(--mcp-font-weight-medium);
        border-radius: var(--mcp-radius-full);
        white-space: nowrap;
      }

      .variant-default {
        background: var(--mcp-color-muted);
        color: var(--mcp-color-muted-foreground);
      }

      .variant-primary {
        background: var(--mcp-color-primary);
        color: var(--mcp-color-primary-foreground);
      }

      .variant-secondary {
        background: var(--mcp-color-secondary);
        color: var(--mcp-color-secondary-foreground);
      }

      .variant-success {
        background: var(--mcp-color-success);
        color: var(--mcp-color-success-foreground);
      }

      .variant-warning {
        background: var(--mcp-color-warning);
        color: var(--mcp-color-warning-foreground);
      }

      .variant-error {
        background: var(--mcp-color-error);
        color: var(--mcp-color-error-foreground);
      }

      .variant-info {
        background: var(--mcp-color-info);
        color: var(--mcp-color-info-foreground);
      }

      /* Outline variants */
      .outline {
        background: transparent;
        border: 1px solid currentColor;
      }

      .outline.variant-default {
        color: var(--mcp-color-muted-foreground);
        border-color: var(--mcp-color-border);
      }

      .outline.variant-primary { color: var(--mcp-color-primary); }
      .outline.variant-success { color: var(--mcp-color-success); }
      .outline.variant-warning { color: var(--mcp-color-warning); }
      .outline.variant-error { color: var(--mcp-color-error); }
      .outline.variant-info { color: var(--mcp-color-info); }

      /* Dot indicator */
      .dot::before {
        content: '';
        width: 0.5rem;
        height: 0.5rem;
        border-radius: 50%;
        background: currentColor;
      }
    `
  ];

  @property({ type: String }) variant: BadgeVariant = 'default';
  @property({ type: Boolean }) outline = false;
  @property({ type: Boolean }) dot = false;

  render() {
    const classes = {
      badge: true,
      [`variant-${this.variant}`]: true,
      outline: this.outline,
      dot: this.dot,
    };

    return html`
      <span class=${classMap(classes)} part="badge">
        <slot></slot>
      </span>
    `;
  }
}

declare global {
  interface HTMLElementTagNameMap {
    'mcp-badge': McpBadge;
  }
}
