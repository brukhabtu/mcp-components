import { LitElement, html, css, nothing } from 'lit';
import { customElement, property } from 'lit/decorators.js';
import { classMap } from 'lit/directives/class-map.js';
import { baseStyles } from '../../styles/index.js';

export type ButtonVariant = 'primary' | 'secondary' | 'outline' | 'ghost' | 'destructive';
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
        border: 1px solid transparent;
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
        outline: 2px solid var(--mcp-color-primary);
        outline-offset: 2px;
      }

      button:disabled {
        opacity: 0.5;
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

      /* Variants */
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

      .variant-secondary {
        background: var(--mcp-color-secondary);
        color: var(--mcp-color-secondary-foreground);
      }
      .variant-secondary:hover:not(:disabled) {
        background: var(--mcp-color-secondary-hover);
      }

      .variant-outline {
        background: transparent;
        border-color: var(--mcp-color-border);
        color: var(--mcp-color-foreground);
      }
      .variant-outline:hover:not(:disabled) {
        background: var(--mcp-color-muted);
        border-color: var(--mcp-color-border-hover);
      }

      .variant-ghost {
        background: transparent;
        color: var(--mcp-color-foreground);
      }
      .variant-ghost:hover:not(:disabled) {
        background: var(--mcp-color-muted);
      }

      .variant-destructive {
        background: var(--mcp-color-error);
        color: var(--mcp-color-error-foreground);
      }
      .variant-destructive:hover:not(:disabled) {
        opacity: 0.9;
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
      .variant-destructive.loading::after {
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
