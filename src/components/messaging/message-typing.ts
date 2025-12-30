import { LitElement, html, css } from 'lit';
import { customElement, property } from 'lit/decorators.js';
import { classMap } from 'lit/directives/class-map.js';
import { baseStyles } from '../../styles/index.js';

export type TypingVariant = 'dots' | 'pulse' | 'wave';

/**
 * A typing indicator component for chat interfaces.
 * Shows animated dots/pulse to indicate someone is typing.
 *
 * @slot avatar - Avatar of the person typing (use mcp-avatar)
 * @slot label - Optional label (e.g., "Claude is typing...")
 *
 * @csspart container - The outer container
 * @csspart bubble - The typing bubble
 * @csspart dots - The dots container
 */
@customElement('mcp-message-typing')
export class McpMessageTyping extends LitElement {
  static styles = [
    baseStyles,
    css`
      :host {
        display: block;
      }

      .container {
        display: flex;
        gap: var(--mcp-space-2);
        align-items: flex-end;
      }

      /* Avatar */
      .avatar {
        flex-shrink: 0;
      }

      .avatar:empty {
        display: none;
      }

      /* Content wrapper */
      .content-wrapper {
        display: flex;
        flex-direction: column;
        gap: var(--mcp-space-1);
      }

      /* Bubble */
      .bubble {
        display: inline-flex;
        align-items: center;
        gap: var(--mcp-space-1);
        padding: var(--mcp-space-2) var(--mcp-space-3);
        background: var(--mcp-color-ghost);
        border-radius: var(--mcp-radius-xl);
        border-bottom-left-radius: var(--mcp-radius-sm);
      }

      /* Label */
      .label {
        font-size: var(--mcp-font-size-xs);
        color: var(--mcp-color-ghost-foreground);
        padding: 0 var(--mcp-space-1);
      }

      .label:empty {
        display: none;
      }

      /* Dots variant (default) */
      .dots {
        display: flex;
        align-items: center;
        gap: 0.25rem;
        padding: 0.25rem 0;
      }

      .dot {
        width: 0.5rem;
        height: 0.5rem;
        background: var(--mcp-color-ghost-foreground);
        border-radius: var(--mcp-radius-full);
      }

      .variant-dots .dot {
        animation: dotBounce 1.4s ease-in-out infinite both;
      }

      .variant-dots .dot:nth-child(1) {
        animation-delay: 0s;
      }

      .variant-dots .dot:nth-child(2) {
        animation-delay: 0.16s;
      }

      .variant-dots .dot:nth-child(3) {
        animation-delay: 0.32s;
      }

      @keyframes dotBounce {
        0%, 80%, 100% {
          transform: scale(0.6);
          opacity: 0.4;
        }
        40% {
          transform: scale(1);
          opacity: 1;
        }
      }

      /* Pulse variant */
      .variant-pulse .dot {
        animation: dotPulse 1.4s ease-in-out infinite;
      }

      .variant-pulse .dot:nth-child(1) {
        animation-delay: 0s;
      }

      .variant-pulse .dot:nth-child(2) {
        animation-delay: 0.2s;
      }

      .variant-pulse .dot:nth-child(3) {
        animation-delay: 0.4s;
      }

      @keyframes dotPulse {
        0%, 100% {
          opacity: 0.3;
        }
        50% {
          opacity: 1;
        }
      }

      /* Wave variant */
      .variant-wave .dot {
        animation: dotWave 1.2s ease-in-out infinite;
      }

      .variant-wave .dot:nth-child(1) {
        animation-delay: 0s;
      }

      .variant-wave .dot:nth-child(2) {
        animation-delay: 0.15s;
      }

      .variant-wave .dot:nth-child(3) {
        animation-delay: 0.3s;
      }

      @keyframes dotWave {
        0%, 60%, 100% {
          transform: translateY(0);
        }
        30% {
          transform: translateY(-0.375rem);
        }
      }
    `
  ];

  @property({ type: String }) variant: TypingVariant = 'dots';

  render() {
    const bubbleClasses = {
      bubble: true,
      [`variant-${this.variant}`]: true,
    };

    return html`
      <div class="container" part="container">
        <div class="avatar">
          <slot name="avatar"></slot>
        </div>

        <div class="content-wrapper">
          <div class="label">
            <slot name="label"></slot>
          </div>

          <div class=${classMap(bubbleClasses)} part="bubble">
            <div class="dots" part="dots">
              <span class="dot"></span>
              <span class="dot"></span>
              <span class="dot"></span>
            </div>
          </div>
        </div>
      </div>
    `;
  }
}

declare global {
  interface HTMLElementTagNameMap {
    'mcp-message-typing': McpMessageTyping;
  }
}
