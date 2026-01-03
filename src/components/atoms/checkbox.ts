import { LitElement, html, css, nothing } from 'lit';
import { customElement, property } from 'lit/decorators.js';
import { classMap } from 'lit/directives/class-map.js';
import { baseStyles } from '../../styles/index.js';

export type CheckboxSize = 'sm' | 'md' | 'lg';

/**
 * A checkbox input component.
 *
 * @slot - Label content (use for custom label with icons/badges)
 *
 * @fires mcp-change - When checkbox state changes
 *
 * @csspart checkbox - The checkbox visual element
 * @csspart label - The label text container
 */
@customElement('mcp-checkbox')
export class McpCheckbox extends LitElement {
  static styles = [
    baseStyles,
    css`
      :host {
        display: inline-flex;
      }

      label {
        display: inline-flex;
        align-items: center;
        gap: var(--mcp-space-2);
        cursor: pointer;
        font-size: var(--mcp-font-size-sm);
        color: var(--mcp-color-foreground);
      }

      label.disabled {
        opacity: var(--mcp-opacity-disabled);
        cursor: not-allowed;
      }

      .checkbox {
        display: flex;
        align-items: center;
        justify-content: center;
        border: 2px solid var(--mcp-color-border);
        border-radius: var(--mcp-radius-sm);
        background: var(--mcp-color-background);
        transition: all var(--mcp-transition-fast);
        flex-shrink: 0;
      }

      .size-sm .checkbox { width: 1rem; height: 1rem; }
      .size-md .checkbox { width: 1.25rem; height: 1.25rem; }
      .size-lg .checkbox { width: 1.5rem; height: 1.5rem; }

      .checkbox.checked, .checkbox.indeterminate {
        background: var(--mcp-color-primary);
        border-color: var(--mcp-color-primary);
      }

      .checkbox.error {
        border-color: var(--mcp-color-error);
      }

      .checkbox svg {
        width: 100%;
        height: 100%;
        stroke: var(--mcp-color-primary-foreground);
        stroke-width: 3;
        fill: none;
        opacity: 0;
        transform: scale(0.5);
        transition: all var(--mcp-transition-fast);
      }

      .checkbox.checked svg, .checkbox.indeterminate svg {
        opacity: 1;
        transform: scale(1);
      }

      input {
        position: absolute;
        opacity: 0;
        pointer-events: none;
      }

      label:focus-within .checkbox {
        box-shadow: 0 0 0 3px var(--mcp-color-primary-muted);
      }

      .error-text {
        display: block;
        font-size: var(--mcp-font-size-xs);
        color: var(--mcp-color-error);
        margin-top: var(--mcp-space-1);
        margin-left: calc(1.25rem + var(--mcp-space-2));
      }
    `
  ];

  @property({ type: Boolean }) checked = false;
  @property({ type: Boolean }) indeterminate = false;
  @property({ type: Boolean }) disabled = false;
  @property({ type: String }) size: CheckboxSize = 'md';
  @property({ type: String }) label = '';
  @property({ type: String }) error = '';
  @property({ type: String }) name = '';
  @property({ type: String }) value = '';

  private _handleChange(e: Event) {
    const input = e.target as HTMLInputElement;
    this.checked = input.checked;
    this.indeterminate = false;
    this.dispatchEvent(new CustomEvent('mcp-change', {
      detail: { checked: this.checked, value: this.value },
      bubbles: true,
      composed: true,
    }));
  }

  render() {
    const labelClasses = {
      disabled: this.disabled,
      [`size-${this.size}`]: true,
    };

    const checkboxClasses = {
      checkbox: true,
      checked: this.checked,
      indeterminate: this.indeterminate,
      error: !!this.error,
    };

    return html`
      <div>
        <label class=${classMap(labelClasses)}>
          <input
            type="checkbox"
            .checked=${this.checked}
            .indeterminate=${this.indeterminate}
            ?disabled=${this.disabled}
            name=${this.name}
            value=${this.value}
            @change=${this._handleChange}
          />
          <span class=${classMap(checkboxClasses)} part="checkbox">
            ${this.indeterminate
              ? html`<svg viewBox="0 0 24 24"><path d="M5 12h14"/></svg>`
              : html`<svg viewBox="0 0 24 24"><path d="M5 13l4 4L19 7"/></svg>`
            }
          </span>
          <span part="label">
            ${this.label ? this.label : html`<slot></slot>`}
          </span>
        </label>
        ${this.error ? html`<span class="error-text">${this.error}</span>` : nothing}
      </div>
    `;
  }
}

declare global {
  interface HTMLElementTagNameMap {
    'mcp-checkbox': McpCheckbox;
  }
}
