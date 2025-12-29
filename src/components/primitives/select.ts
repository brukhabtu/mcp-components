import { LitElement, html, css, nothing } from 'lit';
import { customElement, property, state, query } from 'lit/decorators.js';
import { classMap } from 'lit/directives/class-map.js';
import { baseStyles } from '../../styles/index.js';

export interface SelectOption {
  value: string;
  label: string;
  disabled?: boolean;
}

@customElement('mcp-select')
export class McpSelect extends LitElement {
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

      .select-wrapper {
        position: relative;
      }

      .trigger {
        display: flex;
        align-items: center;
        justify-content: space-between;
        width: 100%;
        padding: var(--mcp-space-2) var(--mcp-space-3);
        border: 1px solid var(--mcp-color-border);
        border-radius: var(--mcp-radius-md);
        background: var(--mcp-color-background);
        font-family: inherit;
        font-size: var(--mcp-font-size-sm);
        color: var(--mcp-color-foreground);
        cursor: pointer;
        transition: all var(--mcp-transition-fast);
        text-align: left;
      }

      .trigger:focus {
        outline: none;
        border-color: var(--mcp-color-primary);
        box-shadow: 0 0 0 3px var(--mcp-color-primary-muted);
      }

      .trigger.error {
        border-color: var(--mcp-color-error);
      }

      .trigger.error:focus {
        box-shadow: 0 0 0 3px var(--mcp-color-error-muted);
      }

      .trigger.disabled {
        opacity: var(--mcp-opacity-disabled);
        cursor: not-allowed;
        background: var(--mcp-color-muted);
      }

      .trigger.open {
        border-color: var(--mcp-color-primary);
      }

      .placeholder {
        color: var(--mcp-color-muted-foreground);
      }

      .chevron {
        width: 1rem;
        height: 1rem;
        stroke: currentColor;
        stroke-width: 2;
        fill: none;
        transition: transform var(--mcp-transition-fast);
      }

      .trigger.open .chevron {
        transform: rotate(180deg);
      }

      .dropdown {
        position: absolute;
        top: calc(100% + 4px);
        left: 0;
        right: 0;
        background: var(--mcp-color-background);
        border: 1px solid var(--mcp-color-border);
        border-radius: var(--mcp-radius-md);
        box-shadow: var(--mcp-shadow-lg);
        z-index: var(--mcp-z-dropdown);
        max-height: 15rem;
        overflow-y: auto;
        display: none;
      }

      .dropdown.open {
        display: block;
      }

      .option {
        display: flex;
        align-items: center;
        padding: var(--mcp-space-2) var(--mcp-space-3);
        font-size: var(--mcp-font-size-sm);
        cursor: pointer;
        transition: background var(--mcp-transition-fast);
      }

      .option:hover:not(.disabled) {
        background: var(--mcp-color-muted);
      }

      .option.selected {
        background: var(--mcp-color-primary-muted);
        color: var(--mcp-color-primary);
      }

      .option.disabled {
        opacity: var(--mcp-opacity-disabled);
        cursor: not-allowed;
      }

      .option.focused {
        background: var(--mcp-color-muted);
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

      .search-input {
        width: 100%;
        padding: var(--mcp-space-2) var(--mcp-space-3);
        border: none;
        border-bottom: 1px solid var(--mcp-color-border);
        font-size: var(--mcp-font-size-sm);
        outline: none;
      }
    `
  ];

  @property({ type: Array }) options: SelectOption[] = [];
  @property({ type: String }) value = '';
  @property({ type: String }) placeholder = 'Select an option';
  @property({ type: String }) label = '';
  @property({ type: String }) helper = '';
  @property({ type: String }) error = '';
  @property({ type: Boolean }) disabled = false;
  @property({ type: Boolean }) required = false;
  @property({ type: Boolean }) searchable = false;

  @state() private _open = false;
  @state() private _focusedIndex = -1;
  @state() private _searchQuery = '';

  @query('.trigger') private _trigger!: HTMLButtonElement;

  private get _filteredOptions() {
    if (!this._searchQuery) return this.options;
    return this.options.filter(opt =>
      opt.label.toLowerCase().includes(this._searchQuery.toLowerCase())
    );
  }

  private get _selectedOption() {
    return this.options.find(opt => opt.value === this.value);
  }

  private _toggle() {
    if (this.disabled) return;
    this._open = !this._open;
    this._focusedIndex = -1;
    this._searchQuery = '';
  }

  private _close() {
    this._open = false;
    this._focusedIndex = -1;
    this._searchQuery = '';
  }

  private _selectOption(option: SelectOption) {
    if (option.disabled) return;
    this.value = option.value;
    this._close();
    this.dispatchEvent(new CustomEvent('mcp-change', {
      detail: { value: option.value },
      bubbles: true,
      composed: true,
    }));
  }

  private _handleKeydown = (e: KeyboardEvent) => {
    if (!this._open) {
      if (e.key === 'Enter' || e.key === ' ' || e.key === 'ArrowDown') {
        e.preventDefault();
        this._toggle();
      }
      return;
    }

    const opts = this._filteredOptions;
    switch (e.key) {
      case 'Escape':
        this._close();
        this._trigger.focus();
        break;
      case 'ArrowDown':
        e.preventDefault();
        this._focusedIndex = Math.min(this._focusedIndex + 1, opts.length - 1);
        break;
      case 'ArrowUp':
        e.preventDefault();
        this._focusedIndex = Math.max(this._focusedIndex - 1, 0);
        break;
      case 'Enter':
        e.preventDefault();
        if (this._focusedIndex >= 0 && opts[this._focusedIndex]) {
          this._selectOption(opts[this._focusedIndex]);
        }
        break;
    }
  };

  private _handleClickOutside = (e: MouseEvent) => {
    if (!this.contains(e.target as Node)) {
      this._close();
    }
  };

  connectedCallback() {
    super.connectedCallback();
    document.addEventListener('click', this._handleClickOutside);
  }

  disconnectedCallback() {
    super.disconnectedCallback();
    document.removeEventListener('click', this._handleClickOutside);
  }

  render() {
    const triggerClasses = {
      trigger: true,
      open: this._open,
      error: !!this.error,
      disabled: this.disabled,
    };

    return html`
      <div class="wrapper">
        ${this.label ? html`<label>${this.label}${this.required ? ' *' : ''}</label>` : nothing}

        <div class="select-wrapper">
          <button
            class=${classMap(triggerClasses)}
            @click=${this._toggle}
            @keydown=${this._handleKeydown}
            ?disabled=${this.disabled}
            aria-haspopup="listbox"
            aria-expanded=${this._open}
          >
            ${this._selectedOption
              ? html`<span>${this._selectedOption.label}</span>`
              : html`<span class="placeholder">${this.placeholder}</span>`
            }
            <svg class="chevron" viewBox="0 0 24 24"><path d="M6 9l6 6 6-6"/></svg>
          </button>

          <div class=${classMap({ dropdown: true, open: this._open })} role="listbox">
            ${this.searchable ? html`
              <input
                class="search-input"
                type="text"
                placeholder="Search..."
                .value=${this._searchQuery}
                @input=${(e: Event) => this._searchQuery = (e.target as HTMLInputElement).value}
                @click=${(e: Event) => e.stopPropagation()}
              />
            ` : nothing}
            ${this._filteredOptions.map((option, index) => html`
              <div
                class=${classMap({
                  option: true,
                  selected: option.value === this.value,
                  disabled: !!option.disabled,
                  focused: index === this._focusedIndex,
                })}
                @click=${() => this._selectOption(option)}
                role="option"
                aria-selected=${option.value === this.value}
              >
                ${option.label}
              </div>
            `)}
          </div>
        </div>

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
    'mcp-select': McpSelect;
  }
}
