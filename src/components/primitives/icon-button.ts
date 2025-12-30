import { LitElement, html, css, nothing } from 'lit';
import { customElement, property } from 'lit/decorators.js';
import { classMap } from 'lit/directives/class-map.js';
import { baseStyles } from '../../styles/index.js';

export type IconButtonVariant = 'primary' | 'secondary' | 'tertiary' | 'ghost';
export type IconButtonSize = 'sm' | 'md' | 'lg';

/**
 * A circular/square icon-only button.
 *
 * @slot - Icon content (SVG or mcp-icon)
 *
 * @fires click - When button is clicked
 *
 * @csspart button - The native button element
 */
@customElement('mcp-icon-button')
export class McpIconButton extends LitElement {
  static styles = [
    baseStyles,
    css`
      :host {
        display: inline-flex;
      }

      button {
        display: inline-flex;
        align-items: center;
        justify-content: center;
        border: none;
        border-radius: var(--mcp-radius-full);
        cursor: pointer;
        transition: all var(--mcp-transition-fast);
        padding: 0;
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

      button:active:not(:disabled) {
        transform: scale(0.95);
      }

      /* Sizes */
      .size-sm {
        width: 1.75rem;
        height: 1.75rem;
      }
      .size-sm ::slotted(svg) {
        width: 0.875rem;
        height: 0.875rem;
      }

      .size-md {
        width: 2.25rem;
        height: 2.25rem;
      }
      .size-md ::slotted(svg) {
        width: 1rem;
        height: 1rem;
      }

      .size-lg {
        width: 2.75rem;
        height: 2.75rem;
      }
      .size-lg ::slotted(svg) {
        width: 1.25rem;
        height: 1.25rem;
      }

      /* Primary variant */
      .variant-primary {
        background: var(--mcp-color-primary);
        color: var(--mcp-color-primary-foreground);
      }
      .variant-primary:hover:not(:disabled) {
        background: var(--mcp-color-primary-hover);
      }

      /* Secondary variant */
      .variant-secondary {
        background: var(--mcp-color-secondary);
        color: var(--mcp-color-secondary-foreground);
      }
      .variant-secondary:hover:not(:disabled) {
        background: var(--mcp-color-secondary-hover);
      }

      /* Tertiary variant */
      .variant-tertiary {
        background: var(--mcp-color-ghost);
        color: var(--mcp-color-foreground);
      }
      .variant-tertiary:hover:not(:disabled) {
        background: var(--mcp-color-border);
      }

      /* Ghost variant */
      .variant-ghost {
        background: transparent;
        color: var(--mcp-color-ghost-foreground);
      }
      .variant-ghost:hover:not(:disabled) {
        background: var(--mcp-color-ghost);
        color: var(--mcp-color-foreground);
      }

      /* Loading state */
      .loading {
        position: relative;
        color: transparent !important;
      }
      .loading::after {
        content: '';
        position: absolute;
        width: 1rem;
        height: 1rem;
        border: 2px solid currentColor;
        border-right-color: transparent;
        border-radius: 50%;
        animation: spin 0.6s linear infinite;
      }
      .variant-primary.loading::after {
        border-color: var(--mcp-color-primary-foreground);
        border-right-color: transparent;
      }

      @keyframes spin {
        to { transform: rotate(360deg); }
      }

      /* Square modifier */
      :host([square]) button {
        border-radius: var(--mcp-radius-md);
      }

      /* Slot styling */
      ::slotted(svg) {
        stroke: currentColor;
        stroke-width: 2;
        fill: none;
      }
    `
  ];

  @property({ type: String }) variant: IconButtonVariant = 'primary';
  @property({ type: String }) size: IconButtonSize = 'md';
  @property({ type: Boolean }) disabled = false;
  @property({ type: Boolean }) loading = false;
  @property({ type: String }) label = '';
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
        aria-label=${this.label || nothing}
        aria-busy=${this.loading ? 'true' : nothing}
      >
        <slot></slot>
      </button>
    `;
  }
}

declare global {
  interface HTMLElementTagNameMap {
    'mcp-icon-button': McpIconButton;
  }
}
