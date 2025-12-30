import { LitElement, html, css } from 'lit';
import { customElement, property } from 'lit/decorators.js';
import { classMap } from 'lit/directives/class-map.js';
import { baseStyles } from '../../styles/index.js';

export type SpinnerSize = 'sm' | 'md' | 'lg' | 'xl';

/**
 * A loading spinner component.
 *
 * @csspart spinner - The spinner element
 */
@customElement('mcp-spinner')
export class McpSpinner extends LitElement {
  static styles = [
    baseStyles,
    css`
      :host {
        display: inline-flex;
        align-items: center;
        justify-content: center;
      }

      .spinner {
        border-radius: 50%;
        border: 2px solid var(--mcp-color-ghost);
        border-top-color: var(--mcp-color-primary);
        animation: spin 0.8s linear infinite;
      }

      .size-sm { width: 1rem; height: 1rem; }
      .size-md { width: 1.5rem; height: 1.5rem; }
      .size-lg { width: 2rem; height: 2rem; }
      .size-xl { width: 3rem; height: 3rem; }

      @keyframes spin {
        to { transform: rotate(360deg); }
      }
    `
  ];

  @property({ type: String }) size: SpinnerSize = 'md';
  @property({ type: String }) label = 'Loading';

  render() {
    return html`
      <div
        class=${classMap({ spinner: true, [`size-${this.size}`]: true })}
        part="spinner"
        role="status"
        aria-label=${this.label}
      ></div>
    `;
  }
}

declare global {
  interface HTMLElementTagNameMap {
    'mcp-spinner': McpSpinner;
  }
}
