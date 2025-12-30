import { LitElement, html, css } from 'lit';
import { customElement, property } from 'lit/decorators.js';
import { classMap } from 'lit/directives/class-map.js';
import { baseStyles } from '../../styles/index.js';

/**
 * A card container component for grouping related content.
 * Supports multiple variants and optional interactive states.
 * 
 * @slot - Main card content
 * @slot header - Card header content
 * @slot footer - Card footer content
 * 
 * @csspart card - The main card container
 * @csspart header - The header section
 * @csspart content - The content section
 * @csspart footer - The footer section
 */
@customElement('mcp-card')
export class McpCard extends LitElement {
  static styles = [
    baseStyles,
    css`
      :host {
        display: block;
      }

      .card {
        background: var(--mcp-color-background);
        border: 1px solid var(--mcp-color-border);
        border-radius: var(--mcp-radius-lg);
        overflow: hidden;
      }

      .card.elevated {
        border: none;
        box-shadow: var(--mcp-shadow-md);
      }

      .card.interactive {
        cursor: pointer;
        transition: all var(--mcp-transition-fast);
      }

      .card.interactive:hover {
        border-color: var(--mcp-color-border-hover);
        box-shadow: var(--mcp-shadow-md);
      }

      .card.elevated.interactive:hover {
        box-shadow: var(--mcp-shadow-lg);
        transform: translateY(-1px);
      }

      .card.selected {
        border-color: var(--mcp-color-primary);
        box-shadow: 0 0 0 1px var(--mcp-color-primary);
      }

      .header {
        padding: var(--mcp-space-4);
        border-bottom: 1px solid var(--mcp-color-border);
      }

      .header.no-border {
        border-bottom: none;
      }

      .content {
        padding: var(--mcp-space-4);
      }

      .content.compact {
        padding: var(--mcp-space-3);
      }

      .footer {
        padding: var(--mcp-space-4);
        border-top: 1px solid var(--mcp-color-border);
        background: var(--mcp-color-ghost);
      }

      /* Hide empty slots */
      .header:not(:has(::slotted(*))) {
        display: none;
      }

      .footer:not(:has(::slotted(*))) {
        display: none;
      }
    `
  ];

  @property({ type: Boolean }) elevated = false;
  @property({ type: Boolean }) interactive = false;
  @property({ type: Boolean }) selected = false;
  @property({ type: Boolean }) compact = false;
  @property({ type: Boolean, attribute: 'no-header-border' }) noHeaderBorder = false;

  private _handleClick() {
    if (this.interactive) {
      this.dispatchEvent(new CustomEvent('mcp-select', {
        detail: { selected: !this.selected },
        bubbles: true,
        composed: true,
      }));
    }
  }

  render() {
    const cardClasses = {
      card: true,
      elevated: this.elevated,
      interactive: this.interactive,
      selected: this.selected,
    };

    const headerClasses = {
      header: true,
      'no-border': this.noHeaderBorder,
    };

    const contentClasses = {
      content: true,
      compact: this.compact,
    };

    return html`
      <div
        part="card"
        class=${classMap(cardClasses)}
        @click=${this._handleClick}
        role=${this.interactive ? 'button' : 'region'}
        tabindex=${this.interactive ? '0' : '-1'}
      >
        <div part="header" class=${classMap(headerClasses)}>
          <slot name="header"></slot>
        </div>
        <div part="content" class=${classMap(contentClasses)}>
          <slot></slot>
        </div>
        <div part="footer" class="footer">
          <slot name="footer"></slot>
        </div>
      </div>
    `;
  }
}

declare global {
  interface HTMLElementTagNameMap {
    'mcp-card': McpCard;
  }
}
