import { LitElement, html, css } from 'lit';
import { customElement, property, state } from 'lit/decorators.js';
import { classMap } from 'lit/directives/class-map.js';
import { baseStyles } from '../../styles/index.js';

export type TabsVariant = 'default' | 'pills' | 'underline';
export type TabsSize = 'sm' | 'md' | 'lg';

@customElement('mcp-tabs')
export class McpTabs extends LitElement {
  static styles = [
    baseStyles,
    css`
      :host {
        display: block;
      }

      .tabs-list {
        display: flex;
        gap: var(--mcp-space-1);
        border-bottom: 1px solid var(--mcp-color-border);
        margin-bottom: var(--mcp-space-4);
      }

      .tabs-list.variant-pills {
        border-bottom: none;
        background: var(--mcp-color-muted);
        padding: var(--mcp-space-1);
        border-radius: var(--mcp-radius-lg);
      }

      .tabs-list.variant-underline {
        gap: var(--mcp-space-4);
      }
    `
  ];

  @property({ type: String }) variant: TabsVariant = 'default';
  @property({ type: String }) size: TabsSize = 'md';
  @property({ type: String }) value = '';

  @state() private _tabs: McpTab[] = [];

  connectedCallback() {
    super.connectedCallback();
    this._updateTabs();
  }

  private _updateTabs() {
    const slot = this.shadowRoot?.querySelector('slot');
    if (slot) {
      this._tabs = slot.assignedElements().filter((el): el is McpTab => el.tagName === 'MCP-TAB');
    }
  }

  private _selectTab(value: string) {
    this.value = value;
    this.dispatchEvent(new CustomEvent('mcp-change', {
      detail: { value },
      bubbles: true,
      composed: true,
    }));
    this._updatePanels();
  }

  private _updatePanels() {
    const panels = this.querySelectorAll('mcp-tab-panel');
    panels.forEach(panel => {
      (panel as McpTabPanel).active = panel.getAttribute('value') === this.value;
    });
  }

  updated(changedProperties: Map<string, unknown>) {
    if (changedProperties.has('value')) {
      this._updatePanels();
    }
  }

  render() {
    const listClasses = {
      'tabs-list': true,
      [`variant-${this.variant}`]: true,
    };

    return html`
      <div class=${classMap(listClasses)} role="tablist">
        <slot @slotchange=${this._updateTabs}></slot>
      </div>
      <slot name="panels"></slot>
    `;
  }
}

@customElement('mcp-tab')
export class McpTab extends LitElement {
  static styles = [
    baseStyles,
    css`
      :host {
        display: contents;
      }

      button {
        display: inline-flex;
        align-items: center;
        gap: var(--mcp-space-2);
        padding: var(--mcp-space-2) var(--mcp-space-4);
        border: none;
        background: transparent;
        font-family: inherit;
        font-size: var(--mcp-font-size-sm);
        font-weight: var(--mcp-font-weight-medium);
        color: var(--mcp-color-muted-foreground);
        cursor: pointer;
        transition: all var(--mcp-transition-fast);
        border-bottom: 2px solid transparent;
        margin-bottom: -1px;
      }

      button:hover:not(:disabled) {
        color: var(--mcp-color-foreground);
      }

      button.active {
        color: var(--mcp-color-primary);
        border-bottom-color: var(--mcp-color-primary);
      }

      button:disabled {
        opacity: 0.5;
        cursor: not-allowed;
      }

      /* Pills variant */
      :host-context(mcp-tabs[variant="pills"]) button {
        border-radius: var(--mcp-radius-md);
        border-bottom: none;
        margin-bottom: 0;
      }

      :host-context(mcp-tabs[variant="pills"]) button.active {
        background: var(--mcp-color-background);
        box-shadow: var(--mcp-shadow-sm);
      }

      /* Underline variant */
      :host-context(mcp-tabs[variant="underline"]) button {
        padding: var(--mcp-space-2) 0;
      }

      /* Sizes */
      :host-context(mcp-tabs[size="sm"]) button {
        padding: var(--mcp-space-1) var(--mcp-space-3);
        font-size: var(--mcp-font-size-xs);
      }

      :host-context(mcp-tabs[size="lg"]) button {
        padding: var(--mcp-space-3) var(--mcp-space-6);
        font-size: var(--mcp-font-size-base);
      }
    `
  ];

  @property({ type: String }) value = '';
  @property({ type: Boolean }) disabled = false;

  private get _isActive() {
    const tabs = this.closest('mcp-tabs') as McpTabs;
    return tabs?.value === this.value;
  }

  private _handleClick() {
    if (this.disabled) return;
    const tabs = this.closest('mcp-tabs') as McpTabs;
    if (tabs) {
      tabs.value = this.value;
      tabs.dispatchEvent(new CustomEvent('mcp-change', {
        detail: { value: this.value },
        bubbles: true,
        composed: true,
      }));
    }
  }

  render() {
    return html`
      <button
        class=${classMap({ active: this._isActive })}
        role="tab"
        aria-selected=${this._isActive}
        ?disabled=${this.disabled}
        @click=${this._handleClick}
      >
        <slot></slot>
      </button>
    `;
  }
}

@customElement('mcp-tab-panel')
export class McpTabPanel extends LitElement {
  static styles = [
    baseStyles,
    css`
      :host {
        display: none;
      }

      :host([active]) {
        display: block;
      }
    `
  ];

  @property({ type: String }) value = '';
  @property({ type: Boolean, reflect: true }) active = false;

  render() {
    return html`<slot></slot>`;
  }
}

declare global {
  interface HTMLElementTagNameMap {
    'mcp-tabs': McpTabs;
    'mcp-tab': McpTab;
    'mcp-tab-panel': McpTabPanel;
  }
}
