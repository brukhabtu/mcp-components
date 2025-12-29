import { LitElement, html, css } from 'lit';
import { customElement, property } from 'lit/decorators.js';
import { classMap } from 'lit/directives/class-map.js';
import { baseStyles } from '../../styles/index.js';

export type SpinnerSize = 'sm' | 'md' | 'lg' | 'xl';

/**
 * A loading spinner component.
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
        role="status"
        aria-label=${this.label}
      ></div>
    `;
  }
}

/**
 * A loading overlay component that covers its parent.
 * 
 * @slot - Optional loading message
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

  @property({ type: String }) size: SpinnerSize = 'lg';
  @property({ type: Boolean, reflect: true }) overlay = false;

  render() {
    return html`
      <mcp-spinner size=${this.size}></mcp-spinner>
      <span class="message"><slot>Loading...</slot></span>
    `;
  }
}

declare global {
  interface HTMLElementTagNameMap {
    'mcp-spinner': McpSpinner;
    'mcp-loading': McpLoading;
  }
}
