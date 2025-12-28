import { LitElement, html, css } from 'lit';
import { customElement, property } from 'lit/decorators.js';
import { classMap } from 'lit/directives/class-map.js';
import { baseStyles } from '../../styles/index.js';

export interface KeyValueItem {
  key: string;
  value: string | number | boolean | null | undefined;
  copyable?: boolean;
}

/**
 * A component for displaying key-value pairs.
 * Useful for displaying MCP tool parameters, metadata, etc.
 * 
 * @slot - Key-value items (use mcp-kv-item)
 */
@customElement('mcp-kv')
export class McpKeyValue extends LitElement {
  static styles = [
    baseStyles,
    css`
      :host {
        display: block;
      }

      .list {
        display: flex;
        flex-direction: column;
        gap: var(--mcp-space-2);
      }

      .list.horizontal {
        flex-direction: row;
        flex-wrap: wrap;
        gap: var(--mcp-space-4);
      }

      .list.grid {
        display: grid;
        grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
        gap: var(--mcp-space-3);
      }

      .list.bordered {
        border: 1px solid var(--mcp-color-border);
        border-radius: var(--mcp-radius-lg);
        padding: var(--mcp-space-4);
      }

      .list.striped ::slotted(mcp-kv-item:nth-child(odd)) {
        background: var(--mcp-color-muted);
      }
    `
  ];

  /** Layout direction */
  @property({ type: String }) layout: 'vertical' | 'horizontal' | 'grid' = 'vertical';
  
  /** Add border around the list */
  @property({ type: Boolean }) bordered = false;
  
  /** Add striped background */
  @property({ type: Boolean }) striped = false;

  render() {
    const classes = {
      list: true,
      [this.layout]: true,
      bordered: this.bordered,
      striped: this.striped,
    };

    return html`
      <div class=${classMap(classes)} role="list">
        <slot></slot>
      </div>
    `;
  }
}

/**
 * A single key-value item.
 */
@customElement('mcp-kv-item')
export class McpKvItem extends LitElement {
  static styles = [
    baseStyles,
    css`
      :host {
        display: flex;
        flex-direction: column;
        gap: var(--mcp-space-1);
        padding: var(--mcp-space-2);
        border-radius: var(--mcp-radius-sm);
      }

      :host([inline]) {
        flex-direction: row;
        align-items: baseline;
        gap: var(--mcp-space-2);
      }

      .key {
        font-size: var(--mcp-font-size-sm);
        font-weight: var(--mcp-font-weight-medium);
        color: var(--mcp-color-muted-foreground);
      }

      :host([inline]) .key::after {
        content: ':';
      }

      .value {
        font-size: var(--mcp-font-size-sm);
        color: var(--mcp-color-foreground);
        word-break: break-word;
      }

      .value.mono {
        font-family: var(--mcp-font-family-mono);
      }

      .value.null {
        color: var(--mcp-color-muted-foreground);
        font-style: italic;
      }

      .copy-wrapper {
        display: inline-flex;
        align-items: center;
        gap: var(--mcp-space-1);
      }

      .copy-btn {
        padding: var(--mcp-space-1);
        border: none;
        background: transparent;
        color: var(--mcp-color-muted-foreground);
        cursor: pointer;
        opacity: 0;
        transition: opacity var(--mcp-transition-fast);
      }

      :host(:hover) .copy-btn {
        opacity: 1;
      }

      .copy-btn:hover {
        color: var(--mcp-color-foreground);
      }

      .copy-btn svg {
        width: 0.75rem;
        height: 0.75rem;
        fill: none;
        stroke: currentColor;
        stroke-width: 2;
      }
    `
  ];

  @property({ type: String }) key = '';
  @property({ type: String }) value = '';
  @property({ type: Boolean }) mono = false;
  @property({ type: Boolean }) copyable = false;
  @property({ type: Boolean, reflect: true }) inline = false;

  private async _handleCopy() {
    try {
      await navigator.clipboard.writeText(this.value);
    } catch (err) {
      console.error('Failed to copy:', err);
    }
  }

  render() {
    const isNull = this.value === '' || this.value === null || this.value === undefined;
    const displayValue = isNull ? 'N/A' : this.value;

    const valueClasses = {
      value: true,
      mono: this.mono,
      null: isNull,
    };

    return html`
      <span class="key">${this.key}</span>
      <span class=${classMap(valueClasses)}>
        ${this.copyable && !isNull ? html`
          <span class="copy-wrapper">
            ${displayValue}
            <button class="copy-btn" @click=${this._handleCopy} aria-label="Copy value">
              <svg viewBox="0 0 24 24">
                <path d="M8 16H6a2 2 0 01-2-2V6a2 2 0 012-2h8a2 2 0 012 2v2m-6 12h8a2 2 0 002-2v-8a2 2 0 00-2-2h-8a2 2 0 00-2 2v8a2 2 0 002 2z"/>
              </svg>
            </button>
          </span>
        ` : displayValue}
      </span>
    `;
  }
}

declare global {
  interface HTMLElementTagNameMap {
    'mcp-kv': McpKeyValue;
    'mcp-kv-item': McpKvItem;
  }
}
