import { LitElement, html, css } from 'lit';
import { customElement, property } from 'lit/decorators.js';
import { classMap } from 'lit/directives/class-map.js';
import { baseStyles } from '../../styles/index.js';

export type BadgeVariant = 'ghost' | 'primary' | 'secondary' | 'tertiary' | 'success' | 'warning' | 'error' | 'info';

/**
 * A badge component for displaying status, labels, or counts.
 *
 * @slot - Badge content
 *
 * @csspart badge - The badge element
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

      /* Ghost/default variant */
      .variant-ghost {
        background: var(--mcp-color-ghost);
        color: var(--mcp-color-ghost-foreground);
      }

      /* Primary variant */
      .variant-primary {
        background: var(--mcp-color-primary);
        color: var(--mcp-color-primary-foreground);
      }

      /* Secondary variant */
      .variant-secondary {
        background: var(--mcp-color-secondary);
        color: var(--mcp-color-secondary-foreground);
      }

      /* Tertiary variant */
      .variant-tertiary {
        background: var(--mcp-color-tertiary-hover);
        color: var(--mcp-color-tertiary-foreground);
        border: var(--mcp-border-width) solid var(--mcp-color-border);
      }

      /* Success variant */
      .variant-success {
        background: var(--mcp-color-success);
        color: var(--mcp-color-success-foreground);
      }

      /* Warning variant */
      .variant-warning {
        background: var(--mcp-color-warning);
        color: var(--mcp-color-warning-foreground);
      }

      /* Error variant */
      .variant-error {
        background: var(--mcp-color-error);
        color: var(--mcp-color-error-foreground);
      }

      /* Info variant */
      .variant-info {
        background: var(--mcp-color-info);
        color: var(--mcp-color-info-foreground);
      }

      /* Outline modifier - uses muted backgrounds */
      .outline {
        background: transparent;
        border: var(--mcp-border-width) solid currentColor;
      }

      .outline.variant-ghost {
        color: var(--mcp-color-ghost-foreground);
        border-color: var(--mcp-color-border);
      }
      .outline.variant-primary { color: var(--mcp-color-primary); }
      .outline.variant-secondary { color: var(--mcp-color-secondary); }
      .outline.variant-tertiary {
        color: var(--mcp-color-ghost-foreground);
        border-color: var(--mcp-color-border);
      }
      .outline.variant-success { color: var(--mcp-color-success); }
      .outline.variant-warning { color: var(--mcp-color-warning); }
      .outline.variant-error { color: var(--mcp-color-error); }
      .outline.variant-info { color: var(--mcp-color-info); }

      /* Soft modifier - uses muted backgrounds */
      .soft.variant-primary {
        background: var(--mcp-color-primary-muted);
        color: var(--mcp-color-primary);
      }
      .soft.variant-secondary {
        background: var(--mcp-color-secondary-muted);
        color: var(--mcp-color-secondary);
      }
      .soft.variant-success {
        background: var(--mcp-color-success-muted);
        color: var(--mcp-color-success);
      }
      .soft.variant-warning {
        background: var(--mcp-color-warning-muted);
        color: var(--mcp-color-warning);
      }
      .soft.variant-error {
        background: var(--mcp-color-error-muted);
        color: var(--mcp-color-error);
      }
      .soft.variant-info {
        background: var(--mcp-color-info-muted);
        color: var(--mcp-color-info);
      }

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

  @property({ type: String }) variant: BadgeVariant = 'ghost';
  @property({ type: Boolean }) outline = false;
  @property({ type: Boolean }) soft = false;
  @property({ type: Boolean }) dot = false;

  render() {
    const classes = {
      badge: true,
      [`variant-${this.variant}`]: true,
      outline: this.outline,
      soft: this.soft && !this.outline,
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
