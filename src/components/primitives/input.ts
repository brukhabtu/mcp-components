import { LitElement, html, css, nothing } from 'lit';
import { customElement, property, query } from 'lit/decorators.js';
import { classMap } from 'lit/directives/class-map.js';
import { ifDefined } from 'lit/directives/if-defined.js';
import { baseStyles } from '../../styles/index.js';

export type InputType = 'text' | 'email' | 'password' | 'number' | 'search' | 'tel' | 'url';

/**
 * A composable input component with label, error, and helper text support.
 * 
 * @slot prefix - Content before the input (e.g., icon)
 * @slot suffix - Content after the input (e.g., icon or button)
 * 
 * @fires mcp-input - When input value changes
 * @fires mcp-change - When input loses focus after value change
 * 
 * @csspart input - The native input element
 * @csspart label - The label element
 * @csspart error - The error message element
 */
@customElement('mcp-input')
export class McpInput extends LitElement {
  static styles = [
    baseStyles,
    css`
      :host {
        display: block;
      }

      .wrapper {
        display: flex;
        flex-direction: column;
        gap: var(--mcp-space-1);
      }

      label {
        font-size: var(--mcp-font-size-sm);
        font-weight: var(--mcp-font-weight-medium);
        color: var(--mcp-color-foreground);
      }

      .input-wrapper {
        display: flex;
        align-items: center;
        gap: var(--mcp-space-2);
        border: 1px solid var(--mcp-color-border);
        border-radius: var(--mcp-radius-md);
        background: var(--mcp-color-background);
        transition: all var(--mcp-transition-fast);
        padding: 0 var(--mcp-space-3);
      }

      .input-wrapper:focus-within {
        border-color: var(--mcp-color-primary);
        box-shadow: var(--mcp-focus-ring);
      }

      .input-wrapper.error {
        border-color: var(--mcp-color-error);
      }

      .input-wrapper.error:focus-within {
        box-shadow: var(--mcp-focus-ring-error);
      }

      .input-wrapper.disabled {
        opacity: var(--mcp-opacity-disabled);
        cursor: not-allowed;
        background: var(--mcp-color-muted);
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

      input::placeholder {
        color: var(--mcp-color-muted-foreground);
      }

      input:disabled {
        cursor: not-allowed;
      }

      .helper, .error-text {
        font-size: var(--mcp-font-size-xs);
      }

      .helper {
        color: var(--mcp-color-muted-foreground);
      }

      .error-text {
        color: var(--mcp-color-error);
      }

      ::slotted(svg) {
        width: 1rem;
        height: 1rem;
        color: var(--mcp-color-muted-foreground);
      }
    `
  ];

  @property({ type: String }) type: InputType = 'text';
  @property({ type: String }) value = '';
  @property({ type: String }) placeholder = '';
  @property({ type: String }) label = '';
  @property({ type: String }) helper = '';
  @property({ type: String }) error = '';
  @property({ type: Boolean }) disabled = false;
  @property({ type: Boolean }) required = false;
  @property({ type: Boolean }) readonly = false;
  @property({ type: String }) name = '';
  @property({ type: String }) autocomplete = '';
  @property({ type: Number }) minlength?: number;
  @property({ type: Number }) maxlength?: number;

  @query('input') private _input!: HTMLInputElement;

  get inputElement() {
    return this._input;
  }

  focus() {
    this._input?.focus();
  }

  select() {
    this._input?.select();
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

  render() {
    const wrapperClasses = {
      'input-wrapper': true,
      error: !!this.error,
      disabled: this.disabled,
    };

    return html`
      <div class="wrapper">
        ${this.label ? html`<label part="label">${this.label}${this.required ? ' *' : ''}</label>` : nothing}
        
        <div class=${classMap(wrapperClasses)}>
          <slot name="prefix"></slot>
          <input
            part="input"
            type=${this.type}
            .value=${this.value}
            placeholder=${this.placeholder}
            ?disabled=${this.disabled}
            ?required=${this.required}
            ?readonly=${this.readonly}
            name=${ifDefined(this.name || undefined)}
            autocomplete=${ifDefined(this.autocomplete || undefined)}
            minlength=${ifDefined(this.minlength)}
            maxlength=${ifDefined(this.maxlength)}
            aria-invalid=${this.error ? 'true' : 'false'}
            @input=${this._handleInput}
            @change=${this._handleChange}
          />
          <slot name="suffix"></slot>
        </div>

        ${this.error 
          ? html`<span part="error" class="error-text">${this.error}</span>` 
          : this.helper 
            ? html`<span class="helper">${this.helper}</span>`
            : nothing
        }
      </div>
    `;
  }
}

declare global {
  interface HTMLElementTagNameMap {
    'mcp-input': McpInput;
  }
}
