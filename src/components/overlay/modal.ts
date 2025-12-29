import { LitElement, html, css, nothing } from 'lit';
import { customElement, property, query } from 'lit/decorators.js';
import { classMap } from 'lit/directives/class-map.js';
import { baseStyles } from '../../styles/index.js';

export type ModalSize = 'sm' | 'md' | 'lg' | 'xl' | 'full';

@customElement('mcp-modal')
export class McpModal extends LitElement {
  static styles = [
    baseStyles,
    css`
      :host {
        display: contents;
      }

      .backdrop {
        position: fixed;
        inset: 0;
        background: rgb(0 0 0 / 0.5);
        z-index: var(--mcp-z-modal);
        display: flex;
        align-items: center;
        justify-content: center;
        padding: var(--mcp-space-4);
        opacity: 0;
        visibility: hidden;
        transition: opacity var(--mcp-transition-normal), visibility var(--mcp-transition-normal);
      }

      .backdrop.open {
        opacity: 1;
        visibility: visible;
      }

      .modal {
        background: var(--mcp-color-background);
        border-radius: var(--mcp-radius-lg);
        box-shadow: var(--mcp-shadow-lg);
        max-height: calc(100vh - var(--mcp-space-8));
        display: flex;
        flex-direction: column;
        transform: scale(0.95) translateY(-10px);
        transition: transform var(--mcp-transition-normal);
        overflow: hidden;
      }

      .backdrop.open .modal {
        transform: scale(1) translateY(0);
      }

      .size-sm { width: 100%; max-width: 24rem; }
      .size-md { width: 100%; max-width: 32rem; }
      .size-lg { width: 100%; max-width: 42rem; }
      .size-xl { width: 100%; max-width: 56rem; }
      .size-full { width: calc(100vw - var(--mcp-space-8)); max-width: none; height: calc(100vh - var(--mcp-space-8)); }

      .header {
        display: flex;
        align-items: center;
        justify-content: space-between;
        padding: var(--mcp-space-4) var(--mcp-space-6);
        border-bottom: 1px solid var(--mcp-color-border);
      }

      .title {
        font-size: var(--mcp-font-size-lg);
        font-weight: var(--mcp-font-weight-semibold);
        color: var(--mcp-color-foreground);
        margin: 0;
      }

      .close-btn {
        display: flex;
        align-items: center;
        justify-content: center;
        width: 2rem;
        height: 2rem;
        border: none;
        background: transparent;
        border-radius: var(--mcp-radius-md);
        cursor: pointer;
        color: var(--mcp-color-muted-foreground);
        transition: all var(--mcp-transition-fast);
      }

      .close-btn:hover {
        background: var(--mcp-color-muted);
        color: var(--mcp-color-foreground);
      }

      .close-btn svg {
        width: 1.25rem;
        height: 1.25rem;
        stroke: currentColor;
        stroke-width: 2;
        fill: none;
      }

      .body {
        flex: 1;
        overflow-y: auto;
        padding: var(--mcp-space-6);
      }

      .footer {
        display: flex;
        align-items: center;
        justify-content: flex-end;
        gap: var(--mcp-space-3);
        padding: var(--mcp-space-4) var(--mcp-space-6);
        border-top: 1px solid var(--mcp-color-border);
        background: var(--mcp-color-muted);
      }

      .footer:empty {
        display: none;
      }
    `
  ];

  @property({ type: Boolean, reflect: true }) open = false;
  @property({ type: String }) size: ModalSize = 'md';
  @property({ type: String }) title = '';
  @property({ type: Boolean, attribute: 'close-on-backdrop' }) closeOnBackdrop = true;
  @property({ type: Boolean, attribute: 'close-on-escape' }) closeOnEscape = true;
  @property({ type: Boolean, attribute: 'hide-close-button' }) hideCloseButton = false;

  @query('.backdrop') private _backdrop!: HTMLElement;

  connectedCallback() {
    super.connectedCallback();
    document.addEventListener('keydown', this._handleKeydown);
  }

  disconnectedCallback() {
    super.disconnectedCallback();
    document.removeEventListener('keydown', this._handleKeydown);
  }

  private _handleKeydown = (e: KeyboardEvent) => {
    if (this.open && this.closeOnEscape && e.key === 'Escape') {
      this._close();
    }
  };

  private _handleBackdropClick = (e: MouseEvent) => {
    if (this.closeOnBackdrop && e.target === this._backdrop) {
      this._close();
    }
  };

  private _close() {
    this.dispatchEvent(new CustomEvent('mcp-close', { bubbles: true, composed: true }));
  }

  render() {
    const backdropClasses = { backdrop: true, open: this.open };
    const modalClasses = { modal: true, [`size-${this.size}`]: true };

    return html`
      <div class=${classMap(backdropClasses)} @click=${this._handleBackdropClick}>
        <div class=${classMap(modalClasses)} role="dialog" aria-modal="true" aria-labelledby="modal-title">
          <div class="header">
            <h2 class="title" id="modal-title">
              ${this.title || html`<slot name="title"></slot>`}
            </h2>
            ${!this.hideCloseButton ? html`
              <button class="close-btn" @click=${this._close} aria-label="Close">
                <svg viewBox="0 0 24 24"><path d="M6 18L18 6M6 6l12 12"/></svg>
              </button>
            ` : nothing}
          </div>
          <div class="body">
            <slot></slot>
          </div>
          <div class="footer">
            <slot name="footer"></slot>
          </div>
        </div>
      </div>
    `;
  }
}

declare global {
  interface HTMLElementTagNameMap {
    'mcp-modal': McpModal;
  }
}
