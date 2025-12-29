import { LitElement, html, css, nothing } from 'lit';
import { customElement, property } from 'lit/decorators.js';
import { classMap } from 'lit/directives/class-map.js';
import { baseStyles } from '../../styles/index.js';

export type AlertVariant = 'info' | 'success' | 'warning' | 'error';

const iconPaths: Record<AlertVariant, string> = {
  info: 'M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z',
  success: 'M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z',
  warning: 'M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z',
  error: 'M10 14l2-2m0 0l2-2m-2 2l-2-2m2 2l2 2m7-2a9 9 0 11-18 0 9 9 0 0118 0z',
};

/**
 * An alert component for displaying important messages.
 *
 * @slot - Alert content/description
 * @slot title - Alert title
 * @slot action - Optional action button/link
 *
 * @fires mcp-dismiss - When the dismiss button is clicked
 */
@customElement('mcp-alert')
export class McpAlert extends LitElement {
  static styles = [
    baseStyles,
    css`
      :host {
        display: block;
      }

      .alert {
        display: flex;
        gap: var(--mcp-space-3);
        padding: var(--mcp-space-4);
        border-radius: var(--mcp-radius-lg);
        border: var(--mcp-border-width) solid transparent;
      }

      .variant-info {
        background: var(--mcp-color-info-muted);
        border-color: var(--mcp-color-info);
        color: var(--mcp-color-info);
      }

      .variant-success {
        background: var(--mcp-color-success-muted);
        border-color: var(--mcp-color-success);
        color: var(--mcp-color-success);
      }

      .variant-warning {
        background: var(--mcp-color-warning-muted);
        border-color: var(--mcp-color-warning);
        color: var(--mcp-color-warning);
      }

      .variant-error {
        background: var(--mcp-color-error-muted);
        border-color: var(--mcp-color-error);
        color: var(--mcp-color-error);
      }

      .icon {
        flex-shrink: 0;
        width: 1.25rem;
        height: 1.25rem;
      }

      .icon svg {
        width: 100%;
        height: 100%;
        fill: none;
        stroke: currentColor;
        stroke-width: 2;
        stroke-linecap: round;
        stroke-linejoin: round;
      }

      .content {
        flex: 1;
        min-width: 0;
      }

      .title {
        font-weight: var(--mcp-font-weight-semibold);
        margin-bottom: var(--mcp-space-1);
      }

      .description {
        color: var(--mcp-color-foreground);
        font-size: var(--mcp-font-size-sm);
      }

      .actions {
        margin-top: var(--mcp-space-3);
      }

      .dismiss {
        flex-shrink: 0;
        padding: var(--mcp-space-1);
        border: none;
        background: transparent;
        cursor: pointer;
        color: inherit;
        opacity: 0.7;
        transition: opacity var(--mcp-transition-fast);
        border-radius: var(--mcp-radius-sm);
      }

      .dismiss:hover {
        opacity: 1;
      }

      .dismiss:focus-visible {
        outline: none;
        box-shadow: var(--mcp-focus-ring);
      }

      .dismiss svg {
        width: 1rem;
        height: 1rem;
        fill: none;
        stroke: currentColor;
        stroke-width: 2;
      }
    `
  ];

  @property({ type: String }) variant: AlertVariant = 'info';
  @property({ type: String }) title = '';
  @property({ type: Boolean }) dismissible = false;

  private _handleDismiss() {
    this.dispatchEvent(new CustomEvent('mcp-dismiss', {
      bubbles: true,
      composed: true,
    }));
  }

  render() {
    const classes = {
      alert: true,
      [`variant-${this.variant}`]: true,
    };

    return html`
      <div class=${classMap(classes)} role="alert">
        <div class="icon">
          <svg viewBox="0 0 24 24">
            <path d=${iconPaths[this.variant]} />
          </svg>
        </div>

        <div class="content">
          ${this.title ? html`<div class="title">${this.title}</div>` : nothing}
          <div class="description">
            <slot></slot>
          </div>
          <div class="actions">
            <slot name="action"></slot>
          </div>
        </div>

        ${this.dismissible ? html`
          <button class="dismiss" @click=${this._handleDismiss} aria-label="Dismiss">
            <svg viewBox="0 0 24 24">
              <path d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
        ` : nothing}
      </div>
    `;
  }
}

declare global {
  interface HTMLElementTagNameMap {
    'mcp-alert': McpAlert;
  }
}
