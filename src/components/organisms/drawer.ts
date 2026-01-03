import { LitElement, html, css, nothing } from 'lit';
import { customElement, property } from 'lit/decorators.js';
import { classMap } from 'lit/directives/class-map.js';
import { baseStyles } from '../../styles/index.js';
import '../atoms/icon-button.js';

export type DrawerPosition = 'left' | 'right';

/**
 * A slide-out drawer/sidebar component.
 * Can be positioned on the left or right side of the screen.
 *
 * @slot - Main content of the drawer
 * @slot header - Header content (title, close button)
 * @slot footer - Footer content (actions)
 *
 * @fires mcp-open - When drawer opens
 * @fires mcp-close - When drawer closes (via close button or overlay click)
 *
 * @csspart container - The drawer container
 * @csspart overlay - The backdrop overlay
 * @csspart content - The drawer content area
 * @csspart header - The header section
 * @csspart body - The body/main section
 * @csspart footer - The footer section
 */
@customElement('mcp-drawer')
export class McpDrawer extends LitElement {
  static styles = [
    baseStyles,
    css`
      :host {
        display: contents;
      }

      /* Overlay backdrop */
      .overlay {
        position: fixed;
        inset: 0;
        background: rgba(0, 0, 0, 0.4);
        opacity: 0;
        visibility: hidden;
        transition: opacity var(--mcp-transition-normal), visibility var(--mcp-transition-normal);
        z-index: 999;
      }

      .overlay.open {
        opacity: 1;
        visibility: visible;
      }

      /* Drawer container */
      .container {
        position: fixed;
        top: 0;
        bottom: 0;
        width: var(--mcp-drawer-width, 280px);
        max-width: calc(100vw - 3rem);
        background: var(--mcp-color-background);
        border: 1px solid var(--mcp-color-border);
        display: flex;
        flex-direction: column;
        transition: transform var(--mcp-transition-normal);
        z-index: 1000;
      }

      /* Left position */
      .position-left {
        left: 0;
        transform: translateX(-100%);
        border-left: none;
        border-top-right-radius: var(--mcp-radius-lg);
        border-bottom-right-radius: var(--mcp-radius-lg);
      }

      .position-left.open {
        transform: translateX(0);
      }

      /* Right position */
      .position-right {
        right: 0;
        transform: translateX(100%);
        border-right: none;
        border-top-left-radius: var(--mcp-radius-lg);
        border-bottom-left-radius: var(--mcp-radius-lg);
      }

      .position-right.open {
        transform: translateX(0);
      }

      /* Header */
      .header {
        display: flex;
        align-items: center;
        justify-content: space-between;
        padding: var(--mcp-space-3) var(--mcp-space-4);
        border-bottom: 1px solid var(--mcp-color-border);
        flex-shrink: 0;
      }

      .header:empty {
        display: none;
      }

      .header-title {
        font-size: var(--mcp-font-size-sm);
        font-weight: var(--mcp-font-weight-semibold);
      }

      /* Body */
      .body {
        flex: 1;
        overflow-y: auto;
        padding: var(--mcp-space-3);
      }

      /* Footer */
      .footer {
        padding: var(--mcp-space-3) var(--mcp-space-4);
        border-top: 1px solid var(--mcp-color-border);
        flex-shrink: 0;
      }

      .footer:empty {
        display: none;
      }
    `
  ];

  @property({ type: Boolean, reflect: true }) open = false;
  @property({ type: String }) position: DrawerPosition = 'left';
  @property({ type: String }) title = '';
  @property({ type: Boolean }) modal = true;
  @property({ type: Boolean }) closeOnOverlay = true;

  private _handleOverlayClick() {
    if (this.closeOnOverlay) {
      this._close();
    }
  }

  private _close() {
    this.open = false;
    this.dispatchEvent(new CustomEvent('mcp-close', {
      bubbles: true,
      composed: true,
    }));
  }

  show() {
    this.open = true;
    this.dispatchEvent(new CustomEvent('mcp-open', {
      bubbles: true,
      composed: true,
    }));
  }

  hide() {
    this._close();
  }

  toggle() {
    if (this.open) {
      this.hide();
    } else {
      this.show();
    }
  }

  render() {
    const containerClasses = {
      container: true,
      [`position-${this.position}`]: true,
      open: this.open,
    };

    const overlayClasses = {
      overlay: true,
      open: this.open && this.modal,
    };

    return html`
      ${this.modal ? html`
        <div
          class=${classMap(overlayClasses)}
          part="overlay"
          @click=${this._handleOverlayClick}
        ></div>
      ` : nothing}

      <aside class=${classMap(containerClasses)} part="container">
        <div class="header" part="header">
          <slot name="header">
            ${this.title ? html`<span class="header-title">${this.title}</span>` : nothing}
          </slot>
          <mcp-icon-button
            variant="ghost"
            size="sm"
            label="Close"
            @click=${this._close}
          >
            <svg viewBox="0 0 24 24"><path d="M6 18L18 6M6 6l12 12"/></svg>
          </mcp-icon-button>
        </div>

        <div class="body" part="body">
          <slot></slot>
        </div>

        <div class="footer" part="footer">
          <slot name="footer"></slot>
        </div>
      </aside>
    `;
  }
}

declare global {
  interface HTMLElementTagNameMap {
    'mcp-drawer': McpDrawer;
  }
}
