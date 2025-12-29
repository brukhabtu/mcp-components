import { LitElement, html, css, nothing } from 'lit';
import { customElement, property } from 'lit/decorators.js';
import { baseStyles } from '../../styles/index.js';

/**
 * An empty state component for when there's no data to display.
 * 
 * @slot - Main content/description
 * @slot icon - Custom icon slot
 * @slot action - Action buttons
 */
@customElement('mcp-empty')
export class McpEmpty extends LitElement {
  static styles = [
    baseStyles,
    css`
      :host {
        display: flex;
        flex-direction: column;
        align-items: center;
        justify-content: center;
        padding: var(--mcp-space-8);
        text-align: center;
      }

      .icon {
        color: var(--mcp-color-ghost-foreground);
        margin-bottom: var(--mcp-space-4);
      }

      .icon svg {
        width: 3rem;
        height: 3rem;
        fill: none;
        stroke: currentColor;
        stroke-width: 1.5;
      }

      .title {
        font-size: var(--mcp-font-size-lg);
        font-weight: var(--mcp-font-weight-semibold);
        color: var(--mcp-color-foreground);
        margin-bottom: var(--mcp-space-2);
      }

      .description {
        font-size: var(--mcp-font-size-sm);
        color: var(--mcp-color-ghost-foreground);
        max-width: 24rem;
      }

      .actions {
        margin-top: var(--mcp-space-6);
        display: flex;
        gap: var(--mcp-space-3);
      }
    `
  ];

  @property({ type: String }) title = '';
  @property({ type: String }) description = '';

  render() {
    return html`
      <div class="icon">
        <slot name="icon">
          <svg viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" d="M20 13V6a2 2 0 00-2-2H6a2 2 0 00-2 2v7m16 0v5a2 2 0 01-2 2H6a2 2 0 01-2-2v-5m16 0h-2.586a1 1 0 00-.707.293l-2.414 2.414a1 1 0 01-.707.293h-3.172a1 1 0 01-.707-.293l-2.414-2.414A1 1 0 006.586 13H4"/>
          </svg>
        </slot>
      </div>

      ${this.title ? html`<h3 class="title">${this.title}</h3>` : nothing}
      
      <div class="description">
        ${this.description || html`<slot></slot>`}
      </div>

      <div class="actions">
        <slot name="action"></slot>
      </div>
    `;
  }
}

declare global {
  interface HTMLElementTagNameMap {
    'mcp-empty': McpEmpty;
  }
}
