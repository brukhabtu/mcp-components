import { LitElement, html, css } from 'lit';
import { customElement, property } from 'lit/decorators.js';
import { baseStyles } from '../../styles/index.js';
import '../atoms/skeleton.js';

/**
 * A skeleton text component that composes multiple mcp-skeleton elements.
 * Use to show placeholder text lines while content is loading.
 *
 * @csspart container - The container element
 */
@customElement('mcp-skeleton-text')
export class McpSkeletonText extends LitElement {
  static styles = [
    baseStyles,
    css`
      :host {
        display: flex;
        flex-direction: column;
        gap: var(--mcp-space-2);
      }

      mcp-skeleton:last-child {
        width: 80%;
      }
    `
  ];

  /** Number of lines to show */
  @property({ type: Number }) lines = 3;

  render() {
    return html`
      ${Array.from({ length: this.lines }, () =>
        html`<mcp-skeleton height="0.875rem"></mcp-skeleton>`
      )}
    `;
  }
}

declare global {
  interface HTMLElementTagNameMap {
    'mcp-skeleton-text': McpSkeletonText;
  }
}
