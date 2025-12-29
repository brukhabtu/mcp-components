import { LitElement, html, css, nothing } from 'lit';
import { customElement, property } from 'lit/decorators.js';
import { classMap } from 'lit/directives/class-map.js';
import { baseStyles } from '../../styles/index.js';

export type ButtonVariant = 'primary' | 'secondary' | 'tertiary' | 'success' | 'warning' | 'error' | 'info';
export type ButtonSize = 'sm' | 'md' | 'lg';

/**
 * A composable button component with multiple variants and sizes.
 *
 * @slot - Button content
 * @slot prefix - Content before the main slot (e.g., icon)
 * @slot suffix - Content after the main slot (e.g., icon)
 *
 * @fires click - When button is clicked
 *
 * @csspart button - The native button element
 */
@customElement('mcp-button')
export class McpButton extends LitElement {
  static styles = [
    baseStyles,
    css`
      :host {
        display: inline-block;
      }

      button {
        display: inline-flex;
        align-items: center;
        justify-content: center;
        gap: var(--mcp-space-2);
        border: var(--mcp-border-width) solid transparent;
        border-radius: var(--mcp-radius-md);
        font-family: inherit;
        font-weight: var(--mcp-font-weight-medium);
        cursor: pointer;
        transition: all var(--mcp-transition-fast);
        white-space: nowrap;
        text-decoration: none;
        width: 100%;
      }

      button:focus-visible {
        outline: none;
        box-shadow: 0 0 0 3px var(--mcp-color-primary-muted);
      }

      button:disabled {
        opacity: var(--mcp-opacity-disabled);
        cursor: not-allowed;
        pointer-events: none;
      }

      /* Sizes */
      .size-sm {
        height: 2rem;
        padding: 0 var(--mcp-space-3);
        font-size: var(--mcp-font-size-sm);
      }

      .size-md {
        height: 2.5rem;
        padding: 0 var(--mcp-space-4);
        font-size: var(--mcp-font-size-sm);
      }

      .size-lg {
        height: 3rem;
        padding: 0 var(--mcp-space-6);
        font-size: var(--mcp-font-size-base);
      }

      /* Primary variant */
      .variant-primary {
        background: var(--mcp-color-primary);
        color: var(--mcp-color-primary-foreground);
      }
      .variant-primary:hover:not(:disabled) {
        background: var(--mcp-color-primary-hover);
      }
      .variant-primary:active:not(:disabled) {
        background: var(--mcp-color-primary-active);
      }

      /* Secondary variant */
      .variant-secondary {
        background: var(--mcp-color-secondary);
        color: var(--mcp-color-secondary-foreground);
      }
      .variant-secondary:hover:not(:disabled) {
        background: var(--mcp-color-secondary-hover);
      }
      .variant-secondary:active:not(:disabled) {
        background: var(--mcp-color-secondary-active);
      }

      /* Tertiary variant (ghost-like) */
      .variant-tertiary {
        background: var(--mcp-color-tertiary);
        color: var(--mcp-color-tertiary-foreground);
        border-color: var(--mcp-color-border);
      }
      .variant-tertiary:hover:not(:disabled) {
        background: var(--mcp-color-tertiary-hover);
        border-color: var(--mcp-color-border-hover);
      }
      .variant-tertiary:active:not(:disabled) {
        background: var(--mcp-color-tertiary-active);
      }

      /* Success variant */
      .variant-success {
        background: var(--mcp-color-success);
        color: var(--mcp-color-success-foreground);
      }
      .variant-success:hover:not(:disabled) {
        background: var(--mcp-color-success-hover);
      }
      .variant-success:active:not(:disabled) {
        background: var(--mcp-color-success-active);
      }

      /* Warning variant */
      .variant-warning {
        background: var(--mcp-color-warning);
        color: var(--mcp-color-warning-foreground);
      }
      .variant-warning:hover:not(:disabled) {
        background: var(--mcp-color-warning-hover);
      }
      .variant-warning:active:not(:disabled) {
        background: var(--mcp-color-warning-active);
      }

      /* Error variant */
      .variant-error {
        background: var(--mcp-color-error);
        color: var(--mcp-color-error-foreground);
      }
      .variant-error:hover:not(:disabled) {
        background: var(--mcp-color-error-hover);
      }
      .variant-error:active:not(:disabled) {
        background: var(--mcp-color-error-active);
      }

      /* Info variant */
      .variant-info {
        background: var(--mcp-color-info);
        color: var(--mcp-color-info-foreground);
      }
      .variant-info:hover:not(:disabled) {
        background: var(--mcp-color-info-hover);
      }
      .variant-info:active:not(:disabled) {
        background: var(--mcp-color-info-active);
      }

      /* Loading state */
      .loading {
        position: relative;
        color: transparent !important;
      }
      .loading::after {
        content: '';
        position: absolute;
        width: 1em;
        height: 1em;
        border: 2px solid currentColor;
        border-right-color: transparent;
        border-radius: 50%;
        animation: spin 0.6s linear infinite;
      }
      .variant-primary.loading::after,
      .variant-success.loading::after,
      .variant-error.loading::after,
      .variant-warning.loading::after,
      .variant-info.loading::after {
        border-color: var(--mcp-color-primary-foreground);
        border-right-color: transparent;
      }

      @keyframes spin {
        to { transform: rotate(360deg); }
      }

      /* Full width */
      :host([fullwidth]) {
        display: block;
      }

      ::slotted(svg) {
        width: 1em;
        height: 1em;
      }
    `
  ];

  @property({ type: String }) variant: ButtonVariant = 'primary';
  @property({ type: String }) size: ButtonSize = 'md';
  @property({ type: Boolean }) disabled = false;
  @property({ type: Boolean }) loading = false;
  @property({ type: String }) type: 'button' | 'submit' | 'reset' = 'button';

  render() {
    const classes = {
      [`variant-${this.variant}`]: true,
      [`size-${this.size}`]: true,
      loading: this.loading,
    };

    return html`
      <button
        part="button"
        class=${classMap(classes)}
        type=${this.type}
        ?disabled=${this.disabled || this.loading}
        aria-busy=${this.loading ? 'true' : nothing}
      >
        <slot name="prefix"></slot>
        <slot></slot>
        <slot name="suffix"></slot>
      </button>
    `;
  }
}

declare global {
  interface HTMLElementTagNameMap {
    'mcp-button': McpButton;
  }
}
