import { LitElement, html, css } from 'lit';
import { customElement, property, state } from 'lit/decorators.js';
import { classMap } from 'lit/directives/class-map.js';
import { baseStyles } from '../../styles/index.js';

export type TooltipPosition = 'top' | 'bottom' | 'left' | 'right';

@customElement('mcp-tooltip')
export class McpTooltip extends LitElement {
  static styles = [
    baseStyles,
    css`
      :host {
        display: inline-block;
        position: relative;
      }

      .tooltip {
        position: absolute;
        z-index: var(--mcp-z-tooltip);
        padding: var(--mcp-space-2) var(--mcp-space-3);
        background: var(--mcp-color-foreground);
        color: var(--mcp-color-background);
        font-size: var(--mcp-font-size-xs);
        border-radius: var(--mcp-radius-md);
        white-space: nowrap;
        max-width: 20rem;
        opacity: 0;
        visibility: hidden;
        transition: opacity var(--mcp-transition-fast), visibility var(--mcp-transition-fast);
        pointer-events: none;
      }

      .tooltip.visible {
        opacity: 1;
        visibility: visible;
      }

      .tooltip.wrap {
        white-space: normal;
      }

      /* Positions */
      .position-top {
        bottom: 100%;
        left: 50%;
        transform: translateX(-50%);
        margin-bottom: var(--mcp-space-2);
      }

      .position-bottom {
        top: 100%;
        left: 50%;
        transform: translateX(-50%);
        margin-top: var(--mcp-space-2);
      }

      .position-left {
        right: 100%;
        top: 50%;
        transform: translateY(-50%);
        margin-right: var(--mcp-space-2);
      }

      .position-right {
        left: 100%;
        top: 50%;
        transform: translateY(-50%);
        margin-left: var(--mcp-space-2);
      }

      /* Arrows */
      .tooltip::after {
        content: '';
        position: absolute;
        border: 6px solid transparent;
      }

      .position-top::after {
        top: 100%;
        left: 50%;
        transform: translateX(-50%);
        border-top-color: var(--mcp-color-foreground);
      }

      .position-bottom::after {
        bottom: 100%;
        left: 50%;
        transform: translateX(-50%);
        border-bottom-color: var(--mcp-color-foreground);
      }

      .position-left::after {
        left: 100%;
        top: 50%;
        transform: translateY(-50%);
        border-left-color: var(--mcp-color-foreground);
      }

      .position-right::after {
        right: 100%;
        top: 50%;
        transform: translateY(-50%);
        border-right-color: var(--mcp-color-foreground);
      }

      .trigger {
        display: inline-block;
      }
    `
  ];

  @property({ type: String }) content = '';
  @property({ type: String }) position: TooltipPosition = 'top';
  @property({ type: Number }) delay = 200;
  @property({ type: Boolean }) wrap = false;

  @state() private _visible = false;

  private _timeout?: ReturnType<typeof setTimeout>;

  private _show() {
    this._timeout = setTimeout(() => {
      this._visible = true;
    }, this.delay);
  }

  private _hide() {
    if (this._timeout) clearTimeout(this._timeout);
    this._visible = false;
  }

  render() {
    const tooltipClasses = {
      tooltip: true,
      visible: this._visible,
      wrap: this.wrap,
      [`position-${this.position}`]: true,
    };

    return html`
      <span
        class="trigger"
        @mouseenter=${this._show}
        @mouseleave=${this._hide}
        @focus=${this._show}
        @blur=${this._hide}
      >
        <slot></slot>
      </span>
      <div class=${classMap(tooltipClasses)} role="tooltip">
        ${this.content || html`<slot name="content"></slot>`}
      </div>
    `;
  }
}

declare global {
  interface HTMLElementTagNameMap {
    'mcp-tooltip': McpTooltip;
  }
}
