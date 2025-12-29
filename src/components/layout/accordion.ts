import { LitElement, html, css } from 'lit';
import { customElement, property, state } from 'lit/decorators.js';
import { classMap } from 'lit/directives/class-map.js';
import { baseStyles } from '../../styles/index.js';

@customElement('mcp-accordion')
export class McpAccordion extends LitElement {
  static styles = [
    baseStyles,
    css`
      :host {
        display: block;
        border: 1px solid var(--mcp-color-border);
        border-radius: var(--mcp-radius-lg);
        overflow: hidden;
      }

      ::slotted(mcp-accordion-item:not(:last-child)) {
        border-bottom: 1px solid var(--mcp-color-border);
      }
    `
  ];

  @property({ type: Boolean }) multiple = false;

  @state() private _openItems: Set<string> = new Set();

  toggleItem(value: string) {
    if (this._openItems.has(value)) {
      this._openItems.delete(value);
    } else {
      if (!this.multiple) {
        this._openItems.clear();
      }
      this._openItems.add(value);
    }
    this._openItems = new Set(this._openItems);
    this.requestUpdate();
  }

  isOpen(value: string) {
    return this._openItems.has(value);
  }

  render() {
    return html`<slot></slot>`;
  }
}

@customElement('mcp-accordion-item')
export class McpAccordionItem extends LitElement {
  static styles = [
    baseStyles,
    css`
      :host {
        display: block;
      }

      .header {
        display: flex;
        align-items: center;
        justify-content: space-between;
        width: 100%;
        padding: var(--mcp-space-4);
        border: none;
        background: var(--mcp-color-background);
        font-family: inherit;
        font-size: var(--mcp-font-size-sm);
        font-weight: var(--mcp-font-weight-medium);
        color: var(--mcp-color-foreground);
        cursor: pointer;
        text-align: left;
        transition: background var(--mcp-transition-fast);
      }

      .header:hover:not(:disabled) {
        background: var(--mcp-color-ghost);
      }

      .header:disabled {
        opacity: 0.5;
        cursor: not-allowed;
      }

      .header:focus {
        outline: none;
        background: var(--mcp-color-ghost);
      }

      .icon {
        width: 1.25rem;
        height: 1.25rem;
        stroke: currentColor;
        stroke-width: 2;
        fill: none;
        transition: transform var(--mcp-transition-fast);
        flex-shrink: 0;
      }

      .icon.open {
        transform: rotate(180deg);
      }

      .content {
        display: grid;
        grid-template-rows: 0fr;
        transition: grid-template-rows var(--mcp-transition-normal);
      }

      .content.open {
        grid-template-rows: 1fr;
      }

      .content-inner {
        overflow: hidden;
      }

      .content-inner > div {
        padding: 0 var(--mcp-space-4) var(--mcp-space-4);
        font-size: var(--mcp-font-size-sm);
        color: var(--mcp-color-ghost-foreground);
      }
    `
  ];

  @property({ type: String }) value = '';
  @property({ type: Boolean }) disabled = false;
  @property({ type: Boolean, attribute: 'default-open' }) defaultOpen = false;

  private get _accordion() {
    return this.closest('mcp-accordion') as McpAccordion;
  }

  private get _isOpen() {
    return this._accordion?.isOpen(this.value) ?? this.defaultOpen;
  }

  connectedCallback() {
    super.connectedCallback();
    if (this.defaultOpen && this._accordion) {
      this._accordion.toggleItem(this.value);
    }
  }

  private _toggle() {
    if (this.disabled) return;
    this._accordion?.toggleItem(this.value);
    this.dispatchEvent(new CustomEvent('mcp-toggle', {
      detail: { value: this.value, open: this._isOpen },
      bubbles: true,
      composed: true,
    }));
  }

  render() {
    return html`
      <button
        class="header"
        @click=${this._toggle}
        ?disabled=${this.disabled}
        aria-expanded=${this._isOpen}
      >
        <slot name="header"></slot>
        <svg class=${classMap({ icon: true, open: this._isOpen })} viewBox="0 0 24 24">
          <path d="M6 9l6 6 6-6"/>
        </svg>
      </button>
      <div class=${classMap({ content: true, open: this._isOpen })}>
        <div class="content-inner">
          <div>
            <slot></slot>
          </div>
        </div>
      </div>
    `;
  }
}

declare global {
  interface HTMLElementTagNameMap {
    'mcp-accordion': McpAccordion;
    'mcp-accordion-item': McpAccordionItem;
  }
}
