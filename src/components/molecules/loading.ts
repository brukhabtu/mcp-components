import { LitElement, html, css } from 'lit';
import { customElement, property } from 'lit/decorators.js';
import { baseStyles } from '../../styles/index.js';
import '../atoms/spinner.js';

export type LoadingSize = 'sm' | 'md' | 'lg' | 'xl';

/**
 * A loading overlay component that composes mcp-spinner.
 *
 * @slot - Optional loading message
 *
 * @csspart spinner - The spinner element
 * @csspart message - The message text
 */
@customElement('mcp-loading')
export class McpLoading extends LitElement {
  static styles = [
    baseStyles,
    css`
      :host {
        display: flex;
        flex-direction: column;
        align-items: center;
        justify-content: center;
        gap: var(--mcp-space-3);
        padding: var(--mcp-space-8);
      }

      :host([overlay]) {
        position: absolute;
        inset: 0;
        background: rgb(255 255 255 / 0.8);
        z-index: 10;
      }

      :host-context([data-theme="dark"])[overlay] {
        background: rgb(15 23 42 / 0.8);
      }

      .message {
        font-size: var(--mcp-font-size-sm);
        color: var(--mcp-color-ghost-foreground);
      }
    `
  ];

  @property({ type: String }) size: LoadingSize = 'lg';
  @property({ type: Boolean, reflect: true }) overlay = false;

  render() {
    return html`
      <mcp-spinner part="spinner" size=${this.size}></mcp-spinner>
      <span class="message" part="message"><slot>Loading...</slot></span>
    `;
  }
}

declare global {
  interface HTMLElementTagNameMap {
    'mcp-loading': McpLoading;
  }
}
