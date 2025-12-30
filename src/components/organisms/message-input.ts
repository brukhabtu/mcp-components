import { LitElement, html, css, nothing } from 'lit';
import { customElement, property, query } from 'lit/decorators.js';
import { classMap } from 'lit/directives/class-map.js';
import { baseStyles } from '../../styles/index.js';

/**
 * A message input/composer component for chat interfaces.
 * Includes auto-growing textarea and slots for actions.
 *
 * @slot start - Actions before the input (e.g., attach button)
 * @slot end - Actions after the input (e.g., send button)
 * @slot above - Content above the input (e.g., reply preview, attachments)
 *
 * @fires mcp-submit - When message is submitted (Enter or button)
 * @fires mcp-input - When input value changes
 *
 * @csspart container - The outer container
 * @csspart input-wrapper - The wrapper around textarea and actions
 * @csspart textarea - The textarea element
 */
@customElement('mcp-message-input')
export class McpMessageInput extends LitElement {
  static styles = [
    baseStyles,
    css`
      :host {
        display: block;
      }

      .container {
        display: flex;
        flex-direction: column;
        gap: var(--mcp-space-2);
      }

      /* Above slot (attachments, reply preview) */
      .above {
        display: flex;
        flex-wrap: wrap;
        gap: var(--mcp-space-2);
      }

      .above:empty {
        display: none;
      }

      /* Input wrapper */
      .input-wrapper {
        display: flex;
        align-items: flex-end;
        gap: var(--mcp-space-2);
        padding: var(--mcp-space-2) var(--mcp-space-3);
        background: var(--mcp-color-background);
        border: 1px solid var(--mcp-color-border);
        border-radius: var(--mcp-radius-xl);
        transition: all var(--mcp-transition-fast);
      }

      .input-wrapper:focus-within {
        border-color: var(--mcp-color-primary);
        box-shadow: 0 0 0 3px var(--mcp-color-primary-muted);
      }

      .input-wrapper.disabled {
        opacity: var(--mcp-opacity-disabled);
        background: var(--mcp-color-ghost);
      }

      /* Start/end action slots */
      .actions-start,
      .actions-end {
        display: flex;
        align-items: center;
        gap: var(--mcp-space-1);
        flex-shrink: 0;
      }

      .actions-start:empty,
      .actions-end:empty {
        display: none;
      }

      /* Textarea */
      textarea {
        flex: 1;
        min-width: 0;
        border: none;
        background: transparent;
        font-family: inherit;
        font-size: var(--mcp-font-size-sm);
        line-height: var(--mcp-line-height-normal);
        color: var(--mcp-color-foreground);
        resize: none;
        outline: none;
        padding: var(--mcp-space-1) 0;
        min-height: 1.5rem;
        max-height: 10rem;
        overflow-y: auto;
      }

      textarea::placeholder {
        color: var(--mcp-color-ghost-foreground);
      }

      textarea:disabled {
        cursor: not-allowed;
      }

      /* Character count */
      .char-count {
        font-size: var(--mcp-font-size-xs);
        color: var(--mcp-color-ghost-foreground);
        align-self: flex-end;
        padding-bottom: var(--mcp-space-1);
      }

      .char-count.near-limit {
        color: var(--mcp-color-warning);
      }

      .char-count.at-limit {
        color: var(--mcp-color-error);
      }
    `
  ];

  @property({ type: String }) value = '';
  @property({ type: String }) placeholder = 'Type a message...';
  @property({ type: Boolean }) disabled = false;
  @property({ type: Number }) maxlength?: number;
  @property({ type: Boolean }) showCount = false;
  @property({ type: Boolean }) submitOnEnter = true;

  @query('textarea') private _textarea!: HTMLTextAreaElement;

  focus() {
    this._textarea?.focus();
  }

  clear() {
    this.value = '';
    this._autoResize();
  }

  private _handleInput(e: Event) {
    const target = e.target as HTMLTextAreaElement;
    this.value = target.value;
    this._autoResize();

    this.dispatchEvent(new CustomEvent('mcp-input', {
      detail: { value: this.value },
      bubbles: true,
      composed: true,
    }));
  }

  private _handleKeydown(e: KeyboardEvent) {
    if (this.submitOnEnter && e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      this._submit();
    }
  }

  private _autoResize() {
    if (!this._textarea) return;
    this._textarea.style.height = 'auto';
    this._textarea.style.height = `${this._textarea.scrollHeight}px`;
  }

  private _submit() {
    if (!this.value.trim() || this.disabled) return;

    this.dispatchEvent(new CustomEvent('mcp-submit', {
      detail: { value: this.value.trim() },
      bubbles: true,
      composed: true,
    }));
  }

  /** Public method to trigger submit (for external send buttons) */
  submit() {
    this._submit();
  }

  private get _charCountClass() {
    if (!this.maxlength) return '';
    const ratio = this.value.length / this.maxlength;
    if (ratio >= 1) return 'at-limit';
    if (ratio >= 0.9) return 'near-limit';
    return '';
  }

  render() {
    const wrapperClasses = {
      'input-wrapper': true,
      disabled: this.disabled,
    };

    return html`
      <div class="container" part="container">
        <div class="above">
          <slot name="above"></slot>
        </div>

        <div class=${classMap(wrapperClasses)} part="input-wrapper">
          <div class="actions-start">
            <slot name="start"></slot>
          </div>

          <textarea
            part="textarea"
            .value=${this.value}
            placeholder=${this.placeholder}
            ?disabled=${this.disabled}
            maxlength=${this.maxlength || nothing}
            rows="1"
            @input=${this._handleInput}
            @keydown=${this._handleKeydown}
          ></textarea>

          ${this.showCount && this.maxlength ? html`
            <span class="char-count ${this._charCountClass}">
              ${this.value.length}/${this.maxlength}
            </span>
          ` : nothing}

          <div class="actions-end">
            <slot name="end"></slot>
          </div>
        </div>
      </div>
    `;
  }
}

declare global {
  interface HTMLElementTagNameMap {
    'mcp-message-input': McpMessageInput;
  }
}
