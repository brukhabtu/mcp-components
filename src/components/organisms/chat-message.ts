import { LitElement, html, css, nothing } from 'lit';
import { customElement, property, state } from 'lit/decorators.js';
import { classMap } from 'lit/directives/class-map.js';
import { baseStyles } from '../../styles/index.js';

export type MessageRole = 'user' | 'assistant' | 'system' | 'tool';

@customElement('mcp-chat-message')
export class McpChatMessage extends LitElement {
  static styles = [
    baseStyles,
    css`
      :host {
        display: block;
      }

      .message {
        display: flex;
        gap: var(--mcp-space-3);
        padding: var(--mcp-space-4);
      }

      .message.role-user {
        background: var(--mcp-color-ghost);
      }

      .message.role-assistant {
        background: var(--mcp-color-background);
      }

      .message.role-system {
        background: rgb(59 130 246 / 0.05);
        border-left: 3px solid var(--mcp-color-info);
      }

      .message.role-tool {
        background: rgb(34 197 94 / 0.05);
        border-left: 3px solid var(--mcp-color-success);
      }

      .avatar {
        flex-shrink: 0;
      }

      .avatar-icon {
        width: 2rem;
        height: 2rem;
        border-radius: 50%;
        display: flex;
        align-items: center;
        justify-content: center;
        font-size: var(--mcp-font-size-sm);
        font-weight: var(--mcp-font-weight-medium);
      }

      .role-user .avatar-icon {
        background: var(--mcp-color-primary);
        color: var(--mcp-color-primary-foreground);
      }

      .role-assistant .avatar-icon {
        background: var(--mcp-color-secondary);
        color: var(--mcp-color-secondary-foreground);
      }

      .role-system .avatar-icon {
        background: var(--mcp-color-info);
        color: var(--mcp-color-info-foreground);
      }

      .role-tool .avatar-icon {
        background: var(--mcp-color-success);
        color: var(--mcp-color-success-foreground);
      }

      .avatar-icon svg {
        width: 1rem;
        height: 1rem;
        stroke: currentColor;
        stroke-width: 2;
        fill: none;
      }

      .content {
        flex: 1;
        min-width: 0;
      }

      .header {
        display: flex;
        align-items: center;
        gap: var(--mcp-space-2);
        margin-bottom: var(--mcp-space-2);
      }

      .role-label {
        font-size: var(--mcp-font-size-sm);
        font-weight: var(--mcp-font-weight-semibold);
        color: var(--mcp-color-foreground);
        text-transform: capitalize;
      }

      .timestamp {
        font-size: var(--mcp-font-size-xs);
        color: var(--mcp-color-ghost-foreground);
      }

      .body {
        font-size: var(--mcp-font-size-sm);
        line-height: var(--mcp-line-height-normal);
        color: var(--mcp-color-foreground);
      }

      .body ::slotted(p) {
        margin: 0 0 var(--mcp-space-2);
      }

      .body ::slotted(p:last-child) {
        margin-bottom: 0;
      }

      .loading {
        display: flex;
        gap: var(--mcp-space-1);
      }

      .loading span {
        width: 0.5rem;
        height: 0.5rem;
        background: var(--mcp-color-ghost-foreground);
        border-radius: 50%;
        animation: bounce 1.4s infinite ease-in-out both;
      }

      .loading span:nth-child(1) { animation-delay: -0.32s; }
      .loading span:nth-child(2) { animation-delay: -0.16s; }

      @keyframes bounce {
        0%, 80%, 100% { transform: scale(0); }
        40% { transform: scale(1); }
      }

      .actions {
        display: flex;
        gap: var(--mcp-space-2);
        margin-top: var(--mcp-space-3);
      }

      .copy-btn {
        display: inline-flex;
        align-items: center;
        gap: var(--mcp-space-1);
        padding: var(--mcp-space-1) var(--mcp-space-2);
        border: none;
        background: transparent;
        border-radius: var(--mcp-radius-sm);
        font-size: var(--mcp-font-size-xs);
        color: var(--mcp-color-ghost-foreground);
        cursor: pointer;
        transition: all var(--mcp-transition-fast);
      }

      .copy-btn:hover {
        background: var(--mcp-color-ghost);
        color: var(--mcp-color-foreground);
      }

      .copy-btn svg {
        width: 0.875rem;
        height: 0.875rem;
        stroke: currentColor;
        stroke-width: 2;
        fill: none;
      }
    `
  ];

  @property({ type: String }) role: MessageRole = 'assistant';
  @property({ type: String }) timestamp = '';
  @property({ type: Boolean }) loading = false;
  @property({ type: Boolean }) copyable = true;

  @state() private _copied = false;

  private get _roleIcon() {
    switch (this.role) {
      case 'user':
        return html`<svg viewBox="0 0 24 24"><path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"/><circle cx="12" cy="7" r="4"/></svg>`;
      case 'assistant':
        return html`<svg viewBox="0 0 24 24"><path d="M12 2L2 7l10 5 10-5-10-5zM2 17l10 5 10-5M2 12l10 5 10-5"/></svg>`;
      case 'system':
        return html`<svg viewBox="0 0 24 24"><circle cx="12" cy="12" r="3"/><path d="M19.4 15a1.65 1.65 0 0 0 .33 1.82l.06.06a2 2 0 0 1 0 2.83 2 2 0 0 1-2.83 0l-.06-.06a1.65 1.65 0 0 0-1.82-.33 1.65 1.65 0 0 0-1 1.51V21a2 2 0 0 1-2 2 2 2 0 0 1-2-2v-.09A1.65 1.65 0 0 0 9 19.4a1.65 1.65 0 0 0-1.82.33l-.06.06a2 2 0 0 1-2.83 0 2 2 0 0 1 0-2.83l.06-.06a1.65 1.65 0 0 0 .33-1.82 1.65 1.65 0 0 0-1.51-1H3a2 2 0 0 1-2-2 2 2 0 0 1 2-2h.09A1.65 1.65 0 0 0 4.6 9a1.65 1.65 0 0 0-.33-1.82l-.06-.06a2 2 0 0 1 0-2.83 2 2 0 0 1 2.83 0l.06.06a1.65 1.65 0 0 0 1.82.33H9a1.65 1.65 0 0 0 1-1.51V3a2 2 0 0 1 2-2 2 2 0 0 1 2 2v.09a1.65 1.65 0 0 0 1 1.51 1.65 1.65 0 0 0 1.82-.33l.06-.06a2 2 0 0 1 2.83 0 2 2 0 0 1 0 2.83l-.06.06a1.65 1.65 0 0 0-.33 1.82V9a1.65 1.65 0 0 0 1.51 1H21a2 2 0 0 1 2 2 2 2 0 0 1-2 2h-.09a1.65 1.65 0 0 0-1.51 1z"/></svg>`;
      case 'tool':
        return html`<svg viewBox="0 0 24 24"><path d="M14.7 6.3a1 1 0 0 0 0 1.4l1.6 1.6a1 1 0 0 0 1.4 0l3.77-3.77a6 6 0 0 1-7.94 7.94l-6.91 6.91a2.12 2.12 0 0 1-3-3l6.91-6.91a6 6 0 0 1 7.94-7.94l-3.76 3.76z"/></svg>`;
    }
  }

  private async _handleCopy() {
    const content = this.textContent?.trim() || '';
    try {
      await navigator.clipboard.writeText(content);
      this._copied = true;
      setTimeout(() => { this._copied = false; }, 2000);
    } catch (err) {
      console.error('Failed to copy:', err);
    }
  }

  render() {
    const messageClasses = {
      message: true,
      [`role-${this.role}`]: true,
    };

    return html`
      <div class=${classMap(messageClasses)}>
        <div class="avatar">
          <slot name="avatar">
            <div class="avatar-icon">${this._roleIcon}</div>
          </slot>
        </div>
        <div class="content">
          <div class="header">
            <span class="role-label">${this.role}</span>
            ${this.timestamp ? html`<span class="timestamp">${this.timestamp}</span>` : nothing}
          </div>
          <div class="body">
            ${this.loading ? html`
              <div class="loading">
                <span></span><span></span><span></span>
              </div>
            ` : html`<slot></slot>`}
          </div>
          ${this.copyable && !this.loading ? html`
            <div class="actions">
              <button class="copy-btn" @click=${this._handleCopy}>
                ${this._copied ? html`
                  <svg viewBox="0 0 24 24"><path d="M5 13l4 4L19 7"/></svg>
                  Copied
                ` : html`
                  <svg viewBox="0 0 24 24"><path d="M8 16H6a2 2 0 01-2-2V6a2 2 0 012-2h8a2 2 0 012 2v2m-6 12h8a2 2 0 002-2v-8a2 2 0 00-2-2h-8a2 2 0 00-2 2v8a2 2 0 002 2z"/></svg>
                  Copy
                `}
              </button>
            </div>
          ` : nothing}
        </div>
      </div>
    `;
  }
}

declare global {
  interface HTMLElementTagNameMap {
    'mcp-chat-message': McpChatMessage;
  }
}
