import { LitElement, html, css } from 'lit';
import { customElement, property } from 'lit/decorators.js';
import { baseStyles } from '../../styles/index.js';

/**
 * A breadcrumb navigation component.
 *
 * @slot - Breadcrumb items
 */
@customElement('mcp-breadcrumb')
export class McpBreadcrumb extends LitElement {
  static styles = [
    baseStyles,
    css`
      :host {
        display: block;
      }

      nav {
        display: flex;
        align-items: center;
        flex-wrap: wrap;
        gap: var(--mcp-space-2);
        font-size: var(--mcp-font-size-sm);
      }

      ::slotted(mcp-breadcrumb-item:not(:last-child))::after {
        content: var(--separator, '/');
        margin-left: var(--mcp-space-2);
        color: var(--mcp-color-ghost-foreground);
      }
    `
  ];

  @property({ type: String }) separator = '/';

  render() {
    return html`
      <nav aria-label="Breadcrumb" style="--separator: '${this.separator}'">
        <slot></slot>
      </nav>
    `;
  }
}

/**
 * A single breadcrumb item.
 *
 * @slot - Item content
 * @fires mcp-navigate - When the item is clicked (if it has an href)
 */
@customElement('mcp-breadcrumb-item')
export class McpBreadcrumbItem extends LitElement {
  static styles = [
    baseStyles,
    css`
      :host {
        display: inline-flex;
        align-items: center;
      }

      a, span {
        color: var(--mcp-color-ghost-foreground);
        text-decoration: none;
        transition: color var(--mcp-transition-fast);
      }

      a:hover {
        color: var(--mcp-color-primary);
        text-decoration: underline;
      }

      a:focus-visible {
        outline: none;
        border-radius: var(--mcp-radius-sm);
        box-shadow: 0 0 0 3px var(--mcp-color-primary-muted);
      }

      :host(:last-child) span,
      :host(:last-child) a {
        color: var(--mcp-color-foreground);
        font-weight: var(--mcp-font-weight-medium);
        pointer-events: none;
      }

      .icon {
        display: flex;
        align-items: center;
        margin-right: var(--mcp-space-1);
      }

      .icon svg {
        width: 1rem;
        height: 1rem;
        stroke: currentColor;
        stroke-width: 2;
        fill: none;
      }
    `
  ];

  @property({ type: String }) href = '';

  private _handleClick(e: Event) {
    if (this.href) {
      e.preventDefault();
      this.dispatchEvent(new CustomEvent('mcp-navigate', {
        detail: { href: this.href },
        bubbles: true,
        composed: true,
      }));
    }
  }

  render() {
    if (this.href) {
      return html`
        <a href=${this.href} @click=${this._handleClick}>
          <slot></slot>
        </a>
      `;
    }

    return html`<span><slot></slot></span>`;
  }
}

declare global {
  interface HTMLElementTagNameMap {
    'mcp-breadcrumb': McpBreadcrumb;
    'mcp-breadcrumb-item': McpBreadcrumbItem;
  }
}
