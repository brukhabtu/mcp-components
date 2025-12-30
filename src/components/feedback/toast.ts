import { LitElement, html, css, nothing } from 'lit';
import { customElement, property, state } from 'lit/decorators.js';
import { classMap } from 'lit/directives/class-map.js';
import { baseStyles } from '../../styles/index.js';

export type ToastVariant = 'info' | 'success' | 'warning' | 'error';
export type ToastPosition = 'top-right' | 'top-left' | 'bottom-right' | 'bottom-left' | 'top-center' | 'bottom-center';

const iconPaths: Record<ToastVariant, string> = {
  info: 'M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z',
  success: 'M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z',
  warning: 'M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z',
  error: 'M10 14l2-2m0 0l2-2m-2 2l-2-2m2 2l2 2m7-2a9 9 0 11-18 0 9 9 0 0118 0z',
};

/**
 * A toast notification component.
 *
 * @slot - Additional content
 * @slot icon - Custom icon (overrides default variant icon)
 * @slot action - Optional action button
 *
 * @fires mcp-dismiss - When the toast is dismissed
 *
 * @csspart container - The toast container
 * @csspart icon - The icon container
 * @csspart content - The content area
 * @csspart close - The close button
 */
@customElement('mcp-toast')
export class McpToast extends LitElement {
  static styles = [
    baseStyles,
    css`
      :host {
        display: block;
      }

      .toast {
        display: flex;
        align-items: flex-start;
        gap: var(--mcp-space-3);
        padding: var(--mcp-space-4);
        background: var(--mcp-color-background);
        border: var(--mcp-border-width) solid var(--mcp-color-border);
        border-radius: var(--mcp-radius-lg);
        box-shadow: var(--mcp-shadow-lg);
        min-width: 20rem;
        max-width: 28rem;
        animation: slideIn var(--mcp-transition-normal);
      }

      @keyframes slideIn {
        from {
          opacity: 0;
          transform: translateX(100%);
        }
        to {
          opacity: 1;
          transform: translateX(0);
        }
      }

      .toast.exiting {
        animation: slideOut var(--mcp-transition-normal) forwards;
      }

      @keyframes slideOut {
        to {
          opacity: 0;
          transform: translateX(100%);
        }
      }

      .icon {
        flex-shrink: 0;
        width: 1.25rem;
        height: 1.25rem;
      }

      .icon svg,
      .icon ::slotted(svg) {
        width: 100%;
        height: 100%;
        fill: none;
        stroke: currentColor;
        stroke-width: 2;
      }

      /* Hide default icon when slot is used */
      .icon:has(::slotted(*)) .default-icon {
        display: none;
      }

      .variant-info .icon { color: var(--mcp-color-info); }
      .variant-success .icon { color: var(--mcp-color-success); }
      .variant-warning .icon { color: var(--mcp-color-warning); }
      .variant-error .icon { color: var(--mcp-color-error); }

      .content {
        flex: 1;
        min-width: 0;
      }

      .title {
        font-weight: var(--mcp-font-weight-semibold);
        font-size: var(--mcp-font-size-sm);
        color: var(--mcp-color-foreground);
        margin-bottom: var(--mcp-space-1);
      }

      .message {
        font-size: var(--mcp-font-size-sm);
        color: var(--mcp-color-ghost-foreground);
      }

      .close-btn {
        flex-shrink: 0;
        display: flex;
        align-items: center;
        justify-content: center;
        width: 1.5rem;
        height: 1.5rem;
        border: none;
        background: transparent;
        border-radius: var(--mcp-radius-sm);
        cursor: pointer;
        color: var(--mcp-color-ghost-foreground);
        transition: all var(--mcp-transition-fast);
      }

      .close-btn:hover {
        background: var(--mcp-color-ghost);
        color: var(--mcp-color-foreground);
      }

      .close-btn:focus-visible {
        outline: none;
        box-shadow: 0 0 0 3px var(--mcp-color-primary-muted);
      }

      .close-btn svg {
        width: 1rem;
        height: 1rem;
        stroke: currentColor;
        stroke-width: 2;
        fill: none;
      }

      .action {
        margin-top: var(--mcp-space-2);
      }
    `
  ];

  @property({ type: String }) variant: ToastVariant = 'info';
  @property({ type: String }) title = '';
  @property({ type: String }) message = '';
  @property({ type: Boolean }) dismissible = true;
  @property({ type: Number }) duration = 5000;

  @state() private _exiting = false;

  private _timeout?: ReturnType<typeof setTimeout>;

  connectedCallback() {
    super.connectedCallback();
    if (this.duration > 0) {
      this._timeout = setTimeout(() => this._dismiss(), this.duration);
    }
  }

  disconnectedCallback() {
    super.disconnectedCallback();
    if (this._timeout) clearTimeout(this._timeout);
  }

  private _dismiss() {
    this._exiting = true;
    setTimeout(() => {
      this.dispatchEvent(new CustomEvent('mcp-dismiss', { bubbles: true, composed: true }));
    }, 200);
  }

  render() {
    const classes = {
      toast: true,
      [`variant-${this.variant}`]: true,
      exiting: this._exiting,
    };

    return html`
      <div class=${classMap(classes)} role="alert" part="container">
        <div class="icon" part="icon">
          <slot name="icon">
            <svg class="default-icon" viewBox="0 0 24 24"><path d=${iconPaths[this.variant]}/></svg>
          </slot>
        </div>
        <div class="content" part="content">
          ${this.title ? html`<div class="title">${this.title}</div>` : nothing}
          ${this.message ? html`<div class="message">${this.message}</div>` : nothing}
          <slot></slot>
          <div class="action">
            <slot name="action"></slot>
          </div>
        </div>
        ${this.dismissible ? html`
          <button class="close-btn" part="close" @click=${this._dismiss} aria-label="Dismiss">
            <svg viewBox="0 0 24 24"><path d="M6 18L18 6M6 6l12 12"/></svg>
          </button>
        ` : nothing}
      </div>
    `;
  }
}

/**
 * A container for managing multiple toast notifications.
 */
@customElement('mcp-toaster')
export class McpToaster extends LitElement {
  static styles = [
    baseStyles,
    css`
      :host {
        position: fixed;
        z-index: var(--mcp-z-toast);
        display: flex;
        flex-direction: column;
        gap: var(--mcp-space-3);
        padding: var(--mcp-space-4);
        pointer-events: none;
      }

      :host([position="top-right"]) { top: 0; right: 0; }
      :host([position="top-left"]) { top: 0; left: 0; }
      :host([position="bottom-right"]) { bottom: 0; right: 0; }
      :host([position="bottom-left"]) { bottom: 0; left: 0; }
      :host([position="top-center"]) { top: 0; left: 50%; transform: translateX(-50%); }
      :host([position="bottom-center"]) { bottom: 0; left: 50%; transform: translateX(-50%); }

      ::slotted(mcp-toast) {
        pointer-events: auto;
      }
    `
  ];

  @property({ type: String, reflect: true }) position: ToastPosition = 'top-right';

  render() {
    return html`<slot></slot>`;
  }
}

declare global {
  interface HTMLElementTagNameMap {
    'mcp-toast': McpToast;
    'mcp-toaster': McpToaster;
  }
}
