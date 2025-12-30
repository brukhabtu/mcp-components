import { LitElement, html, css } from 'lit';
import { customElement, property } from 'lit/decorators.js';
import { baseStyles } from '../../styles/index.js';

/**
 * A skeleton loading placeholder component.
 * Use to show a placeholder while content is loading.
 *
 * @csspart skeleton - The skeleton element
 */
@customElement('mcp-skeleton')
export class McpSkeleton extends LitElement {
  static styles = [
    baseStyles,
    css`
      :host {
        display: block;
      }

      .skeleton {
        background: var(--mcp-color-ghost);
        border-radius: var(--mcp-radius-md);
        animation: pulse 2s ease-in-out infinite;
      }

      .circle {
        border-radius: 50%;
      }

      @keyframes pulse {
        0%, 100% { opacity: 1; }
        50% { opacity: 0.5; }
      }
    `
  ];

  /** Width of the skeleton (CSS value) */
  @property({ type: String }) width = '100%';

  /** Height of the skeleton (CSS value) */
  @property({ type: String }) height = '1rem';

  /** Whether to render as a circle */
  @property({ type: Boolean }) circle = false;

  render() {
    const styles = `width: ${this.width}; height: ${this.height};`;

    return html`
      <div
        class="skeleton ${this.circle ? 'circle' : ''}"
        part="skeleton"
        style=${styles}
        aria-hidden="true"
      ></div>
    `;
  }
}

declare global {
  interface HTMLElementTagNameMap {
    'mcp-skeleton': McpSkeleton;
  }
}
