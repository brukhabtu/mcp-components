import { LitElement, html, css, nothing } from 'lit';
import { customElement, property } from 'lit/decorators.js';
import { classMap } from 'lit/directives/class-map.js';
import { baseStyles } from '../../styles/index.js';

export type MessageAlign = 'start' | 'end';
export type MessageVariant = 'default' | 'ghost' | 'bubble';
export type MessageStatus = 'sending' | 'sent' | 'delivered' | 'read' | 'error';

/**
 * A generic message component for chat interfaces.
 * Works with any messaging app - AI chat, SMS, team chat, etc.
 *
 * @slot - Message content
 * @slot avatar - Avatar (use mcp-avatar)
 * @slot header - Header content (sender name, timestamp)
 * @slot footer - Footer content (status, reactions, actions)
 *
 * @csspart container - The outer container
 * @csspart bubble - The message bubble
 * @csspart content - The content area
 */
@customElement('mcp-message')
export class McpMessage extends LitElement {
  static styles = [
    baseStyles,
    css`
      :host {
        display: block;
      }

      .container {
        display: flex;
        gap: var(--mcp-space-2);
        max-width: 100%;
      }

      /* Alignment */
      .align-start {
        flex-direction: row;
        justify-content: flex-start;
      }

      .align-end {
        flex-direction: row-reverse;
        justify-content: flex-start;
      }

      .align-end .content-wrapper {
        align-items: flex-end;
      }

      /* Avatar */
      .avatar {
        flex-shrink: 0;
        align-self: flex-end;
      }

      .avatar:empty {
        display: none;
      }

      /* Hide avatar when grouped (continuation) */
      :host([continuation]) .avatar {
        visibility: hidden;
      }

      /* Content wrapper */
      .content-wrapper {
        display: flex;
        flex-direction: column;
        gap: var(--mcp-space-1);
        max-width: 80%;
        min-width: 0;
      }

      /* Header */
      .header {
        display: flex;
        align-items: center;
        gap: var(--mcp-space-2);
        font-size: var(--mcp-font-size-xs);
        color: var(--mcp-color-ghost-foreground);
        padding: 0 var(--mcp-space-1);
      }

      .header:empty {
        display: none;
      }

      .align-end .header {
        flex-direction: row-reverse;
      }

      /* Bubble */
      .bubble {
        padding: var(--mcp-space-2) var(--mcp-space-3);
        border-radius: var(--mcp-radius-lg);
        font-size: var(--mcp-font-size-sm);
        line-height: var(--mcp-line-height-normal);
        word-wrap: break-word;
        overflow-wrap: break-word;
      }

      /* Variant: default */
      .variant-default {
        background: var(--mcp-color-background);
        border: 1px solid var(--mcp-color-border);
      }

      /* Variant: ghost */
      .variant-ghost {
        background: var(--mcp-color-ghost);
      }

      /* Variant: bubble (more rounded, like iMessage) */
      .variant-bubble {
        background: var(--mcp-color-ghost);
        border-radius: var(--mcp-radius-xl);
      }

      .align-end .variant-bubble {
        background: var(--mcp-color-primary);
        color: var(--mcp-color-primary-foreground);
      }

      /* Tail styling for bubble variant */
      .variant-bubble.align-start-bubble {
        border-bottom-left-radius: var(--mcp-radius-sm);
      }

      .variant-bubble.align-end-bubble {
        border-bottom-right-radius: var(--mcp-radius-sm);
      }

      /* Remove tail for continuations */
      :host([continuation]) .variant-bubble {
        border-radius: var(--mcp-radius-xl);
      }

      /* Footer */
      .footer {
        display: flex;
        align-items: center;
        gap: var(--mcp-space-2);
        font-size: var(--mcp-font-size-xs);
        color: var(--mcp-color-ghost-foreground);
        padding: 0 var(--mcp-space-1);
      }

      .footer:empty {
        display: none;
      }

      .align-end .footer {
        flex-direction: row-reverse;
      }

      /* Status indicator */
      .status {
        display: inline-flex;
        align-items: center;
        gap: var(--mcp-space-1);
      }

      .status-icon {
        width: 0.875rem;
        height: 0.875rem;
      }

      .status-icon svg {
        width: 100%;
        height: 100%;
        stroke: currentColor;
        stroke-width: 2;
        fill: none;
      }

      .status-sending { color: var(--mcp-color-ghost-foreground); }
      .status-sent { color: var(--mcp-color-ghost-foreground); }
      .status-delivered { color: var(--mcp-color-info); }
      .status-read { color: var(--mcp-color-success); }
      .status-error { color: var(--mcp-color-error); }

      /* Timestamp */
      .timestamp {
        font-size: var(--mcp-font-size-xs);
        color: var(--mcp-color-ghost-foreground);
      }
    `
  ];

  @property({ type: String }) align: MessageAlign = 'start';
  @property({ type: String }) variant: MessageVariant = 'ghost';
  @property({ type: String }) status?: MessageStatus;
  @property({ type: String }) timestamp = '';
  @property({ type: Boolean, reflect: true }) continuation = false;

  private get _statusIcon() {
    switch (this.status) {
      case 'sending':
        return html`<svg viewBox="0 0 24 24"><circle cx="12" cy="12" r="10" stroke-dasharray="32" stroke-dashoffset="32"><animate attributeName="stroke-dashoffset" values="32;0" dur="1s" repeatCount="indefinite"/></circle></svg>`;
      case 'sent':
        return html`<svg viewBox="0 0 24 24"><path d="M5 12l5 5L20 7"/></svg>`;
      case 'delivered':
        return html`<svg viewBox="0 0 24 24"><path d="M2 12l5 5L17 7M7 12l5 5L22 7"/></svg>`;
      case 'read':
        return html`<svg viewBox="0 0 24 24"><path d="M2 12l5 5L17 7M7 12l5 5L22 7"/></svg>`;
      case 'error':
        return html`<svg viewBox="0 0 24 24"><circle cx="12" cy="12" r="10"/><path d="M12 8v4M12 16h.01"/></svg>`;
      default:
        return nothing;
    }
  }

  render() {
    const containerClasses = {
      container: true,
      [`align-${this.align}`]: true,
    };

    const bubbleClasses = {
      bubble: true,
      [`variant-${this.variant}`]: true,
      [`align-${this.align}-bubble`]: this.variant === 'bubble',
    };

    return html`
      <div class=${classMap(containerClasses)} part="container">
        <div class="avatar">
          <slot name="avatar"></slot>
        </div>

        <div class="content-wrapper">
          <div class="header">
            <slot name="header"></slot>
          </div>

          <div class=${classMap(bubbleClasses)} part="bubble">
            <div part="content">
              <slot></slot>
            </div>
          </div>

          <div class="footer">
            ${this.timestamp ? html`<span class="timestamp">${this.timestamp}</span>` : nothing}
            ${this.status ? html`
              <span class=${classMap({ status: true, [`status-${this.status}`]: true })}>
                <span class="status-icon">${this._statusIcon}</span>
              </span>
            ` : nothing}
            <slot name="footer"></slot>
          </div>
        </div>
      </div>
    `;
  }
}

declare global {
  interface HTMLElementTagNameMap {
    'mcp-message': McpMessage;
  }
}
