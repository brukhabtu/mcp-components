import { LitElement, html, css } from 'lit';
import { customElement, property } from 'lit/decorators.js';
import { baseStyles } from '../../styles/index.js';
import type { AvatarSize } from '../atoms/avatar.js';

/**
 * A component that groups multiple mcp-avatar elements with overlap.
 *
 * @slot - mcp-avatar elements to group
 *
 * @csspart container - The container element
 * @csspart overflow - The overflow indicator
 */
@customElement('mcp-avatar-group')
export class McpAvatarGroup extends LitElement {
  static styles = [
    baseStyles,
    css`
      :host {
        display: inline-flex;
        flex-direction: row-reverse;
      }

      ::slotted(mcp-avatar) {
        margin-left: -0.5rem;
        box-shadow: 0 0 0 2px var(--mcp-color-background);
      }

      ::slotted(mcp-avatar:last-child) {
        margin-left: 0;
      }

      .overflow {
        display: flex;
        align-items: center;
        justify-content: center;
        background: var(--mcp-color-ghost);
        color: var(--mcp-color-ghost-foreground);
        border-radius: 50%;
        font-size: var(--mcp-font-size-xs);
        font-weight: var(--mcp-font-weight-medium);
        margin-left: -0.5rem;
        box-shadow: 0 0 0 2px var(--mcp-color-background);
      }

      :host([size="sm"]) .overflow { width: 2rem; height: 2rem; }
      :host([size="md"]) .overflow { width: 2.5rem; height: 2.5rem; }
      :host([size="lg"]) .overflow { width: 3rem; height: 3rem; }
    `
  ];

  @property({ type: Number }) max = 5;
  @property({ type: String, reflect: true }) size: AvatarSize = 'md';

  render() {
    return html`
      <slot part="container"></slot>
    `;
  }
}

declare global {
  interface HTMLElementTagNameMap {
    'mcp-avatar-group': McpAvatarGroup;
  }
}
