import { LitElement, html, css, nothing } from 'lit';
import { customElement, property } from 'lit/decorators.js';
import { classMap } from 'lit/directives/class-map.js';
import { baseStyles } from '../../styles/index.js';

/**
 * A list component for displaying data items with optional selection.
 * 
 * @slot - List items (use mcp-list-item)
 * 
 * @fires mcp-select - When an item is selected
 */
@customElement('mcp-list')
export class McpList extends LitElement {
  static styles = [
    baseStyles,
    css`
      :host {
        display: block;
      }

      .list {
        display: flex;
        flex-direction: column;
        border: 1px solid var(--mcp-color-border);
        border-radius: var(--mcp-radius-lg);
        overflow: hidden;
      }

      .list.borderless {
        border: none;
        border-radius: 0;
      }

      ::slotted(mcp-list-item:not(:last-child)) {
        border-bottom: 1px solid var(--mcp-color-border);
      }
    `
  ];

  @property({ type: Boolean }) borderless = false;

  render() {
    const classes = {
      list: true,
      borderless: this.borderless,
    };

    return html`
      <div class=${classMap(classes)} role="list">
        <slot></slot>
      </div>
    `;
  }
}

/**
 * A single list item component.
 * 
 * @slot - Item content
 * @slot prefix - Content before main content (e.g., icon, avatar)
 * @slot suffix - Content after main content (e.g., badge, action)
 */
@customElement('mcp-list-item')
export class McpListItem extends LitElement {
  static styles = [
    baseStyles,
    css`
      :host {
        display: block;
      }

      .item {
        display: flex;
        align-items: center;
        gap: var(--mcp-space-3);
        padding: var(--mcp-space-3) var(--mcp-space-4);
        background: var(--mcp-color-background);
        transition: background var(--mcp-transition-fast);
      }

      .item.interactive {
        cursor: pointer;
      }

      .item.interactive:hover {
        background: var(--mcp-color-ghost);
      }

      .item.selected {
        background: rgb(99 102 241 / 0.1);
      }

      .item.disabled {
        opacity: 0.5;
        pointer-events: none;
      }

      .prefix {
        flex-shrink: 0;
      }

      .content {
        flex: 1;
        min-width: 0;
      }

      .title {
        font-size: var(--mcp-font-size-sm);
        font-weight: var(--mcp-font-weight-medium);
        color: var(--mcp-color-foreground);
      }

      .description {
        font-size: var(--mcp-font-size-xs);
        color: var(--mcp-color-ghost-foreground);
        margin-top: var(--mcp-space-1);
      }

      .suffix {
        flex-shrink: 0;
      }

      ::slotted(mcp-icon) {
        color: var(--mcp-color-ghost-foreground);
      }
    `
  ];

  @property({ type: String }) title = '';
  @property({ type: String }) description = '';
  @property({ type: Boolean }) interactive = false;
  @property({ type: Boolean }) selected = false;
  @property({ type: Boolean }) disabled = false;
  @property({ type: String }) value = '';

  private _handleClick() {
    if (!this.interactive || this.disabled) return;
    
    this.dispatchEvent(new CustomEvent('mcp-select', {
      detail: { value: this.value, selected: !this.selected },
      bubbles: true,
      composed: true,
    }));
  }

  render() {
    const classes = {
      item: true,
      interactive: this.interactive,
      selected: this.selected,
      disabled: this.disabled,
    };

    return html`
      <div 
        class=${classMap(classes)} 
        role=${this.interactive ? 'button' : 'listitem'}
        tabindex=${this.interactive && !this.disabled ? '0' : '-1'}
        @click=${this._handleClick}
      >
        <div class="prefix">
          <slot name="prefix"></slot>
        </div>
        
        <div class="content">
          ${this.title ? html`<div class="title">${this.title}</div>` : nothing}
          ${this.description ? html`<div class="description">${this.description}</div>` : nothing}
          <slot></slot>
        </div>
        
        <div class="suffix">
          <slot name="suffix"></slot>
        </div>
      </div>
    `;
  }
}

declare global {
  interface HTMLElementTagNameMap {
    'mcp-list': McpList;
    'mcp-list-item': McpListItem;
  }
}
