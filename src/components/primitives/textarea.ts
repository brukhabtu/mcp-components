import { LitElement, html, css, nothing } from 'lit';
import { customElement, property, query } from 'lit/decorators.js';
import { classMap } from 'lit/directives/class-map.js';
import { ifDefined } from 'lit/directives/if-defined.js';
import { baseStyles } from '../../styles/index.js';

/**
 * A multiline text input component.
 * 
 * @fires mcp-input - When textarea value changes
 * @fires mcp-change - When textarea loses focus after value change
 * 
 * @csspart textarea - The native textarea element
 * @csspart label - The label element
 */
@customElement('mcp-textarea')
export class McpTextarea extends LitElement {
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

      textarea {
        width: 100%;
        min-height: 5rem;
        padding: var(--mcp-space-2) var(--mcp-space-3);
        border: 1px solid var(--mcp-color-border);
        border-radius: var(--mcp-radius-md);
        background: var(--mcp-color-background);
        font-family: inherit;
        font-size: var(--mcp-font-size-sm);
        color: var(--mcp-color-foreground);
        resize: vertical;
        transition: all var(--mcp-transition-fast);
      }

      textarea::placeholder {
        color: var(--mcp-color-muted-foreground);
      }

      textarea:focus {
        outline: none;
        border-color: var(--mcp-color-primary);
        box-shadow: 0 0 0 3px rgb(99 102 241 / 0.1);
      }

      textarea.error {
        border-color: var(--mcp-color-error);
      }

      textarea.error:focus {
        box-shadow: 0 0 0 3px rgb(239 68 68 / 0.1);
      }

      textarea:disabled {
        opacity: 0.5;
        cursor: not-allowed;
        background: var(--mcp-color-muted);
      }

      textarea.autosize {
        resize: none;
        overflow: hidden;
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

      .char-count {
        font-size: var(--mcp-font-size-xs);
        color: var(--mcp-color-muted-foreground);
        text-align: right;
      }
    `
  ];

  @property({ type: String }) value = '';
  @property({ type: String }) placeholder = '';
  @property({ type: String }) label = '';
  @property({ type: String }) helper = '';
  @property({ type: String }) error = '';
  @property({ type: Boolean }) disabled = false;
  @property({ type: Boolean }) required = false;
  @property({ type: Boolean }) readonly = false;
  @property({ type: Boolean }) autosize = false;
  @property({ type: Boolean }) showCount = false;
  @property({ type: Number }) rows = 3;
  @property({ type: Number }) minlength?: number;
  @property({ type: Number }) maxlength?: number;
  @property({ type: String }) name = '';

  @query('textarea') private _textarea!: HTMLTextAreaElement;

  focus() {
    this._textarea?.focus();
  }

  private _handleInput(e: Event) {
    const target = e.target as HTMLTextAreaElement;
    this.value = target.value;

    if (this.autosize) {
      target.style.height = 'auto';
      target.style.height = `${target.scrollHeight}px`;
    }

    this.dispatchEvent(new CustomEvent('mcp-input', {
      detail: { value: this.value },
      bubbles: true,
      composed: true,
    }));
  }

  private _handleChange(e: Event) {
    const target = e.target as HTMLTextAreaElement;
    this.dispatchEvent(new CustomEvent('mcp-change', {
      detail: { value: target.value },
      bubbles: true,
      composed: true,
    }));
  }

  render() {
    const classes = {
      error: !!this.error,
      autosize: this.autosize,
    };

    return html`
      <div class="wrapper">
        ${this.label ? html`<label part="label">${this.label}${this.required ? ' *' : ''}</label>` : nothing}
        
        <textarea
          part="textarea"
          class=${classMap(classes)}
          .value=${this.value}
          placeholder=${this.placeholder}
          rows=${this.rows}
          ?disabled=${this.disabled}
          ?required=${this.required}
          ?readonly=${this.readonly}
          name=${ifDefined(this.name || undefined)}
          minlength=${ifDefined(this.minlength)}
          maxlength=${ifDefined(this.maxlength)}
          aria-invalid=${this.error ? 'true' : 'false'}
          @input=${this._handleInput}
          @change=${this._handleChange}
        ></textarea>

        ${this.showCount && this.maxlength 
          ? html`<span class="char-count">${this.value.length}/${this.maxlength}</span>` 
          : nothing}

        ${this.error 
          ? html`<span class="error-text">${this.error}</span>` 
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
    'mcp-textarea': McpTextarea;
  }
}
