import { LitElement, html, css } from 'lit';
import { customElement, property, state } from 'lit/decorators.js';
import { classMap } from 'lit/directives/class-map.js';
import { baseStyles } from '../../styles/index.js';

export type PopoverPlacement = 'top' | 'bottom' | 'left' | 'right';
export type PopoverTrigger = 'click' | 'hover';

/**
 * A popover component for displaying rich content in a floating panel.
 *
 * @slot - The trigger element
 * @slot content - The popover content
 *
 * @fires mcp-open - When the popover opens
 * @fires mcp-close - When the popover closes
 */
@customElement('mcp-popover')
export class McpPopover extends LitElement {
  static styles = [
    baseStyles,
    css`
      :host {
        display: inline-block;
        position: relative;
      }

      .trigger {
        display: inline-block;
      }

      .popover {
        position: absolute;
        z-index: var(--mcp-z-dropdown);
        min-width: 12rem;
        max-width: 20rem;
        padding: var(--mcp-space-4);
        background: var(--mcp-color-background);
        border: 1px solid var(--mcp-color-border);
        border-radius: var(--mcp-radius-lg);
        box-shadow: var(--mcp-shadow-lg);
        opacity: 0;
        visibility: hidden;
        transition: opacity var(--mcp-transition-fast), visibility var(--mcp-transition-fast);
      }

      .popover.open {
        opacity: 1;
        visibility: visible;
      }

      /* Placement */
      .popover.top {
        bottom: 100%;
        left: 50%;
        transform: translateX(-50%);
        margin-bottom: var(--mcp-space-2);
      }

      .popover.bottom {
        top: 100%;
        left: 50%;
        transform: translateX(-50%);
        margin-top: var(--mcp-space-2);
      }

      .popover.left {
        right: 100%;
        top: 50%;
        transform: translateY(-50%);
        margin-right: var(--mcp-space-2);
      }

      .popover.right {
        left: 100%;
        top: 50%;
        transform: translateY(-50%);
        margin-left: var(--mcp-space-2);
      }

      /* Arrow */
      .popover::before {
        content: '';
        position: absolute;
        width: 0.5rem;
        height: 0.5rem;
        background: var(--mcp-color-background);
        border: 1px solid var(--mcp-color-border);
        transform: rotate(45deg);
      }

      .popover.top::before {
        bottom: -0.3rem;
        left: 50%;
        margin-left: -0.25rem;
        border-top: none;
        border-left: none;
      }

      .popover.bottom::before {
        top: -0.3rem;
        left: 50%;
        margin-left: -0.25rem;
        border-bottom: none;
        border-right: none;
      }

      .popover.left::before {
        right: -0.3rem;
        top: 50%;
        margin-top: -0.25rem;
        border-bottom: none;
        border-left: none;
      }

      .popover.right::before {
        left: -0.3rem;
        top: 50%;
        margin-top: -0.25rem;
        border-top: none;
        border-right: none;
      }

      .popover-content {
        font-size: var(--mcp-font-size-sm);
        color: var(--mcp-color-foreground);
      }
    `
  ];

  @property({ type: String }) placement: PopoverPlacement = 'bottom';
  @property({ type: String }) trigger: PopoverTrigger = 'click';
  @property({ type: Boolean }) open = false;

  @state() private _isOpen = false;

  private _hoverTimeout?: ReturnType<typeof setTimeout>;

  connectedCallback() {
    super.connectedCallback();
    document.addEventListener('click', this._handleOutsideClick);
    document.addEventListener('keydown', this._handleEscape);
  }

  disconnectedCallback() {
    super.disconnectedCallback();
    document.removeEventListener('click', this._handleOutsideClick);
    document.removeEventListener('keydown', this._handleEscape);
    if (this._hoverTimeout) clearTimeout(this._hoverTimeout);
  }

  private _handleOutsideClick = (e: MouseEvent) => {
    if (this._isOpen && !this.contains(e.target as Node)) {
      this._close();
    }
  };

  private _handleEscape = (e: KeyboardEvent) => {
    if (this._isOpen && e.key === 'Escape') {
      this._close();
    }
  };

  private _toggle() {
    if (this._isOpen) {
      this._close();
    } else {
      this._open();
    }
  }

  private _open() {
    this._isOpen = true;
    this.dispatchEvent(new CustomEvent('mcp-open', { bubbles: true, composed: true }));
  }

  private _close() {
    this._isOpen = false;
    this.dispatchEvent(new CustomEvent('mcp-close', { bubbles: true, composed: true }));
  }

  private _handleTriggerClick() {
    if (this.trigger === 'click') {
      this._toggle();
    }
  }

  private _handleMouseEnter() {
    if (this.trigger === 'hover') {
      if (this._hoverTimeout) clearTimeout(this._hoverTimeout);
      this._open();
    }
  }

  private _handleMouseLeave() {
    if (this.trigger === 'hover') {
      this._hoverTimeout = setTimeout(() => this._close(), 150);
    }
  }

  updated(changedProperties: Map<string, unknown>) {
    if (changedProperties.has('open')) {
      this._isOpen = this.open;
    }
  }

  render() {
    const popoverClasses = {
      popover: true,
      open: this._isOpen,
      [this.placement]: true,
    };

    return html`
      <div
        class="trigger"
        @click=${this._handleTriggerClick}
        @mouseenter=${this._handleMouseEnter}
        @mouseleave=${this._handleMouseLeave}
      >
        <slot></slot>
      </div>
      <div
        class=${classMap(popoverClasses)}
        @mouseenter=${this._handleMouseEnter}
        @mouseleave=${this._handleMouseLeave}
        role="dialog"
        aria-hidden=${!this._isOpen}
      >
        <div class="popover-content">
          <slot name="content"></slot>
        </div>
      </div>
    `;
  }
}

declare global {
  interface HTMLElementTagNameMap {
    'mcp-popover': McpPopover;
  }
}
