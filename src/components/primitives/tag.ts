import { LitElement, html, css, nothing } from 'lit';
import { customElement, property } from 'lit/decorators.js';
import { classMap } from 'lit/directives/class-map.js';
import { baseStyles } from '../../styles/index.js';

export type TagVariant = 'ghost' | 'primary' | 'secondary' | 'success' | 'warning' | 'error' | 'info';
export type TagSize = 'sm' | 'md' | 'lg';

/**
 * A tag/chip component for displaying labels with optional remove functionality.
 * Unlike badges, tags are interactive and can be removed.
 *
 * @slot - Tag content
 * @slot icon - Optional icon before the label
 *
 * @fires mcp-remove - When the remove button is clicked
 * @fires mcp-click - When the tag itself is clicked (if clickable)
 *
 * @csspart tag - The tag container
 * @csspart remove-button - The remove button
 */
@customElement('mcp-tag')
export class McpTag extends LitElement {
  static styles = [
    baseStyles,
    css`
      :host {
        display: inline-flex;
      }

      .tag {
        display: inline-flex;
        align-items: center;
        gap: var(--mcp-space-1);
        padding: var(--mcp-space-1) var(--mcp-space-2);
        font-size: var(--mcp-font-size-xs);
        font-weight: var(--mcp-font-weight-medium);
        border-radius: var(--mcp-radius-md);
        white-space: nowrap;
        transition: all var(--mcp-transition-fast);
        border: 1px solid transparent;
      }

      /* Sizes */
      .size-sm {
        padding: 0 var(--mcp-space-1);
        font-size: 0.625rem;
        gap: var(--mcp-space-1);
      }

      .size-lg {
        padding: var(--mcp-space-2) var(--mcp-space-3);
        font-size: var(--mcp-font-size-sm);
        gap: var(--mcp-space-2);
      }

      /* Variants */
      .variant-ghost {
        background: var(--mcp-color-ghost);
        color: var(--mcp-color-ghost-foreground);
        border-color: var(--mcp-color-border);
      }

      .variant-primary {
        background: var(--mcp-color-primary-muted);
        color: var(--mcp-color-primary);
        border-color: var(--mcp-color-primary);
      }

      .variant-secondary {
        background: var(--mcp-color-secondary-muted);
        color: var(--mcp-color-secondary);
        border-color: var(--mcp-color-secondary);
      }

      .variant-success {
        background: var(--mcp-color-success-muted);
        color: var(--mcp-color-success);
        border-color: var(--mcp-color-success);
      }

      .variant-warning {
        background: var(--mcp-color-warning-muted);
        color: var(--mcp-color-warning);
        border-color: var(--mcp-color-warning);
      }

      .variant-error {
        background: var(--mcp-color-error-muted);
        color: var(--mcp-color-error);
        border-color: var(--mcp-color-error);
      }

      .variant-info {
        background: var(--mcp-color-info-muted);
        color: var(--mcp-color-info);
        border-color: var(--mcp-color-info);
      }

      /* Clickable */
      .clickable {
        cursor: pointer;
      }

      .clickable:hover {
        filter: brightness(0.95);
      }

      .clickable:active {
        transform: scale(0.98);
      }

      /* Disabled */
      .disabled {
        opacity: var(--mcp-opacity-disabled);
        cursor: not-allowed;
        pointer-events: none;
      }

      /* Icon slot */
      ::slotted([slot="icon"]) {
        width: 0.875rem;
        height: 0.875rem;
      }

      .size-sm ::slotted([slot="icon"]) {
        width: 0.75rem;
        height: 0.75rem;
      }

      .size-lg ::slotted([slot="icon"]) {
        width: 1rem;
        height: 1rem;
      }

      /* Remove button */
      .remove-btn {
        display: flex;
        align-items: center;
        justify-content: center;
        width: 1rem;
        height: 1rem;
        padding: 0;
        margin-left: var(--mcp-space-1);
        margin-right: calc(-1 * var(--mcp-space-1));
        border: none;
        background: transparent;
        border-radius: var(--mcp-radius-full);
        cursor: pointer;
        color: inherit;
        opacity: 0.6;
        transition: all var(--mcp-transition-fast);
      }

      .remove-btn:hover {
        opacity: 1;
        background: rgba(0, 0, 0, 0.1);
      }

      .remove-btn svg {
        width: 0.625rem;
        height: 0.625rem;
        stroke: currentColor;
        stroke-width: 2.5;
        fill: none;
      }

      .size-sm .remove-btn {
        width: 0.75rem;
        height: 0.75rem;
      }

      .size-sm .remove-btn svg {
        width: 0.5rem;
        height: 0.5rem;
      }

      .size-lg .remove-btn {
        width: 1.25rem;
        height: 1.25rem;
      }

      .size-lg .remove-btn svg {
        width: 0.75rem;
        height: 0.75rem;
      }
    `
  ];

  @property({ type: String }) variant: TagVariant = 'ghost';
  @property({ type: String }) size: TagSize = 'md';
  @property({ type: Boolean }) removable = false;
  @property({ type: Boolean }) clickable = false;
  @property({ type: Boolean }) disabled = false;

  private _handleClick() {
    if (this.disabled || !this.clickable) return;
    this.dispatchEvent(new CustomEvent('mcp-click', {
      bubbles: true,
      composed: true,
    }));
  }

  private _handleRemove(e: Event) {
    e.stopPropagation();
    if (this.disabled) return;
    this.dispatchEvent(new CustomEvent('mcp-remove', {
      bubbles: true,
      composed: true,
    }));
  }

  render() {
    const classes = {
      tag: true,
      [`variant-${this.variant}`]: true,
      [`size-${this.size}`]: true,
      clickable: this.clickable && !this.disabled,
      disabled: this.disabled,
    };

    return html`
      <span
        class=${classMap(classes)}
        part="tag"
        role=${this.clickable ? 'button' : 'status'}
        tabindex=${this.clickable && !this.disabled ? '0' : '-1'}
        @click=${this._handleClick}
        @keydown=${(e: KeyboardEvent) => e.key === 'Enter' && this._handleClick()}
      >
        <slot name="icon"></slot>
        <slot></slot>
        ${this.removable && !this.disabled
          ? html`
            <button
              part="remove-button"
              class="remove-btn"
              type="button"
              @click=${this._handleRemove}
              aria-label="Remove"
            >
              <svg viewBox="0 0 24 24">
                <path d="M18 6L6 18M6 6l12 12"/>
              </svg>
            </button>
          `
          : nothing
        }
      </span>
    `;
  }
}

declare global {
  interface HTMLElementTagNameMap {
    'mcp-tag': McpTag;
  }
}
