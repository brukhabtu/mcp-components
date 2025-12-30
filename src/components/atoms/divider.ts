import { LitElement, html, css } from 'lit';
import { customElement, property } from 'lit/decorators.js';
import { baseStyles } from '../../styles/index.js';

/**
 * A divider component for visually separating content.
 * 
 * @slot - Optional label content to display in the divider
 */
@customElement('mcp-divider')
export class McpDivider extends LitElement {
  static styles = [
    baseStyles,
    css`
      :host {
        display: flex;
        align-items: center;
        width: 100%;
      }

      :host([vertical]) {
        flex-direction: column;
        width: auto;
        height: 100%;
        min-height: 1rem;
      }

      .line {
        flex: 1;
        height: 1px;
        background: var(--mcp-color-border);
      }

      :host([vertical]) .line {
        height: auto;
        width: 1px;
        min-height: inherit;
      }

      .label {
        padding: 0 var(--mcp-space-3);
        font-size: var(--mcp-font-size-sm);
        color: var(--mcp-color-ghost-foreground);
        white-space: nowrap;
      }

      :host([vertical]) .label {
        padding: var(--mcp-space-2) 0;
      }

      /* Dashed variant */
      :host([dashed]) .line {
        background: transparent;
        border-top: 1px dashed var(--mcp-color-border);
        height: 0;
      }

      :host([vertical][dashed]) .line {
        border-top: none;
        border-left: 1px dashed var(--mcp-color-border);
        width: 0;
      }
    `
  ];

  @property({ type: Boolean, reflect: true }) vertical = false;
  @property({ type: Boolean, reflect: true }) dashed = false;

  render() {
    return html`
      <div class="line"></div>
      <slot class="label"></slot>
      <div class="line"></div>
    `;
  }
}

declare global {
  interface HTMLElementTagNameMap {
    'mcp-divider': McpDivider;
  }
}
