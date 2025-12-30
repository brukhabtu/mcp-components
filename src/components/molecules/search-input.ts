import { LitElement, html, css, nothing } from 'lit';
import { customElement, property, query } from 'lit/decorators.js';
import { classMap } from 'lit/directives/class-map.js';
import { baseStyles } from '../../styles/index.js';

/**
 * A search input component with search icon and clear button.
 *
 * @slot icon - Custom search icon (overrides default magnifying glass)
 * @slot clear - Custom clear button (overrides default X button)
 *
 * @fires mcp-input - When input value changes
 * @fires mcp-change - When input loses focus after value change
 * @fires mcp-clear - When clear button is clicked
 * @fires mcp-submit - When Enter is pressed
 *
 * @csspart wrapper - The input wrapper
 * @csspart icon - The search icon container
 * @csspart input - The native input element
 * @csspart clear-button - The clear button container
 */
@customElement('mcp-search-input')
export class McpSearchInput extends LitElement {
  static styles = [
    baseStyles,
    css`
      :host {
        display: block;
      }

      .wrapper {
        display: flex;
        align-items: center;
        gap: var(--mcp-space-2);
        border: 1px solid var(--mcp-color-border);
        border-radius: var(--mcp-radius-md);
        background: var(--mcp-color-background);
        transition: all var(--mcp-transition-fast);
        padding: 0 var(--mcp-space-3);
      }

      .wrapper:focus-within {
        border-color: var(--mcp-color-primary);
        box-shadow: 0 0 0 3px var(--mcp-color-primary-muted);
      }

      .wrapper.disabled {
        opacity: var(--mcp-opacity-disabled);
        cursor: not-allowed;
        background: var(--mcp-color-ghost);
      }

      /* Size variants */
      .wrapper.size-sm {
        padding: 0 var(--mcp-space-2);
      }

      .wrapper.size-lg {
        padding: 0 var(--mcp-space-4);
      }

      .search-icon {
        flex-shrink: 0;
        width: 1rem;
        height: 1rem;
        color: var(--mcp-color-ghost-foreground);
      }

      .search-icon svg,
      .search-icon ::slotted(svg) {
        width: 100%;
        height: 100%;
        stroke: currentColor;
        stroke-width: 2;
        fill: none;
      }

      /* Hide default icon when slot is used */
      .search-icon:has(::slotted(*)) .default-icon {
        display: none;
      }

      input {
        flex: 1;
        border: none;
        background: transparent;
        font-family: inherit;
        font-size: var(--mcp-font-size-sm);
        color: var(--mcp-color-foreground);
        padding: var(--mcp-space-2) 0;
        outline: none;
        min-width: 0;
      }

      .size-sm input {
        padding: var(--mcp-space-1) 0;
        font-size: var(--mcp-font-size-xs);
      }

      .size-lg input {
        padding: var(--mcp-space-3) 0;
        font-size: var(--mcp-font-size-base);
      }

      input::placeholder {
        color: var(--mcp-color-ghost-foreground);
      }

      input:disabled {
        cursor: not-allowed;
      }

      .clear-btn {
        flex-shrink: 0;
        display: flex;
        align-items: center;
        justify-content: center;
        width: 1.25rem;
        height: 1.25rem;
        padding: 0;
        border: none;
        background: var(--mcp-color-ghost);
        border-radius: var(--mcp-radius-full);
        cursor: pointer;
        color: var(--mcp-color-ghost-foreground);
        transition: all var(--mcp-transition-fast);
      }

      .clear-btn:hover {
        background: var(--mcp-color-border);
        color: var(--mcp-color-foreground);
      }

      .clear-btn svg {
        width: 0.75rem;
        height: 0.75rem;
        stroke: currentColor;
        stroke-width: 2;
        fill: none;
      }

      .loading-spinner {
        flex-shrink: 0;
        width: 1rem;
        height: 1rem;
        border: 2px solid var(--mcp-color-border);
        border-top-color: var(--mcp-color-primary);
        border-radius: 50%;
        animation: spin 0.6s linear infinite;
      }

      @keyframes spin {
        to { transform: rotate(360deg); }
      }

      /* Slotted clear button */
      .clear-container ::slotted(*) {
        cursor: pointer;
      }

      /* Hide default when slot is used */
      .clear-container:has(::slotted(*)) .clear-btn {
        display: none;
      }
    `
  ];

  @property({ type: String }) value = '';
  @property({ type: String }) placeholder = 'Search...';
  @property({ type: Boolean }) disabled = false;
  @property({ type: Boolean }) loading = false;
  @property({ type: String }) size: 'sm' | 'md' | 'lg' = 'md';

  @query('input') private _input!: HTMLInputElement;

  focus() {
    this._input?.focus();
  }

  clear() {
    this.value = '';
    this._dispatchClear();
    this.focus();
  }

  private _handleInput(e: Event) {
    const target = e.target as HTMLInputElement;
    this.value = target.value;
    this.dispatchEvent(new CustomEvent('mcp-input', {
      detail: { value: this.value },
      bubbles: true,
      composed: true,
    }));
  }

  private _handleChange(e: Event) {
    const target = e.target as HTMLInputElement;
    this.dispatchEvent(new CustomEvent('mcp-change', {
      detail: { value: target.value },
      bubbles: true,
      composed: true,
    }));
  }

  private _handleKeydown(e: KeyboardEvent) {
    if (e.key === 'Enter') {
      this.dispatchEvent(new CustomEvent('mcp-submit', {
        detail: { value: this.value },
        bubbles: true,
        composed: true,
      }));
    } else if (e.key === 'Escape' && this.value) {
      this.clear();
    }
  }

  private _dispatchClear() {
    this.dispatchEvent(new CustomEvent('mcp-clear', {
      bubbles: true,
      composed: true,
    }));
    this.dispatchEvent(new CustomEvent('mcp-input', {
      detail: { value: '' },
      bubbles: true,
      composed: true,
    }));
  }

  render() {
    const wrapperClasses = {
      wrapper: true,
      disabled: this.disabled,
      [`size-${this.size}`]: true,
    };

    return html`
      <div class=${classMap(wrapperClasses)} part="wrapper">
        <span class="search-icon" part="icon">
          <slot name="icon">
            <svg class="default-icon" viewBox="0 0 24 24">
              <circle cx="11" cy="11" r="8"/>
              <path d="M21 21l-4.35-4.35"/>
            </svg>
          </slot>
        </span>

        <input
          part="input"
          type="search"
          .value=${this.value}
          placeholder=${this.placeholder}
          ?disabled=${this.disabled}
          @input=${this._handleInput}
          @change=${this._handleChange}
          @keydown=${this._handleKeydown}
        />

        ${this.loading
          ? html`<div class="loading-spinner"></div>`
          : this.value
            ? html`
              <span class="clear-container" part="clear-button" @click=${this.clear}>
                <slot name="clear">
                  <button
                    class="clear-btn"
                    type="button"
                    ?disabled=${this.disabled}
                    aria-label="Clear search"
                  >
                    <svg viewBox="0 0 24 24">
                      <path d="M18 6L6 18M6 6l12 12"/>
                    </svg>
                  </button>
                </slot>
              </span>
            `
            : nothing
        }
      </div>
    `;
  }
}

declare global {
  interface HTMLElementTagNameMap {
    'mcp-search-input': McpSearchInput;
  }
}
