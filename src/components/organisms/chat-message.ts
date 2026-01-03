import { LitElement, html, css, nothing } from 'lit';
import { customElement, property, state } from 'lit/decorators.js';
import { baseStyles } from '../../styles/index.js';
import '../atoms/avatar.js';

export type MessageRole = 'user' | 'assistant' | 'system' | 'tool';

/**
 * An AI chat message component that composes mcp-message internally.
 * Adds role-based styling, avatars, and copy functionality on top of
 * the generic mcp-message component.
 *
 * @slot - Message content
 * @slot avatar - Custom avatar (overrides default role-based avatar)
 *
 * @csspart message - The underlying mcp-message component
 * @csspart avatar - The avatar container
 * @csspart content - The content area
 */
@customElement('mcp-chat-message')
export class McpChatMessage extends LitElement {
  static styles = [
    baseStyles,
    css`
      :host {
        display: block;
      }

      /* Role-specific backgrounds - applied to host for full-width effect */
      :host([role="user"]) {
        background: var(--mcp-color-ghost);
      }

      :host([role="assistant"]) {
        background: var(--mcp-color-background);
      }

      :host([role="system"]) {
        background: var(--mcp-color-info-muted);
        border-left: 3px solid var(--mcp-color-info);
      }

      :host([role="tool"]) {
        background: var(--mcp-color-success-muted);
        border-left: 3px solid var(--mcp-color-success);
      }

      .wrapper {
        display: flex;
        gap: var(--mcp-space-3);
        padding: var(--mcp-space-4);
      }

      /* Avatar styling */
      .avatar {
        flex-shrink: 0;
      }

      mcp-avatar {
        --avatar-size: 2rem;
      }

      /* Content area */
      .content {
        flex: 1;
        min-width: 0;
        display: flex;
        flex-direction: column;
        gap: var(--mcp-space-2);
      }

      .header {
        display: flex;
        align-items: center;
        gap: var(--mcp-space-2);
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

      /* Loading animation */
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

      /* Actions */
      .actions {
        display: flex;
        gap: var(--mcp-space-2);
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

  @property({ type: String, reflect: true }) role: MessageRole = 'assistant';
  @property({ type: String }) timestamp = '';
  @property({ type: Boolean }) loading = false;
  @property({ type: Boolean }) copyable = true;

  @state() private _copied = false;

  /** Get role-specific avatar variant */
  private get _avatarVariant(): 'primary' | 'secondary' | 'info' | 'success' {
    switch (this.role) {
      case 'user': return 'primary';
      case 'assistant': return 'secondary';
      case 'system': return 'info';
      case 'tool': return 'success';
    }
  }

  /** Get role-specific icon */
  private get _roleIcon() {
    switch (this.role) {
      case 'user':
        return html`<svg viewBox="0 0 24 24" style="width:1rem;height:1rem;stroke:currentColor;stroke-width:2;fill:none;"><path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"/><circle cx="12" cy="7" r="4"/></svg>`;
      case 'assistant':
        return html`<svg viewBox="0 0 24 24" style="width:1rem;height:1rem;stroke:currentColor;stroke-width:2;fill:none;"><path d="M12 2L2 7l10 5 10-5-10-5zM2 17l10 5 10-5M2 12l10 5 10-5"/></svg>`;
      case 'system':
        return html`<svg viewBox="0 0 24 24" style="width:1rem;height:1rem;stroke:currentColor;stroke-width:2;fill:none;"><circle cx="12" cy="12" r="3"/><path d="M19.4 15a1.65 1.65 0 0 0 .33 1.82l.06.06a2 2 0 0 1 0 2.83 2 2 0 0 1-2.83 0l-.06-.06a1.65 1.65 0 0 0-1.82-.33 1.65 1.65 0 0 0-1 1.51V21a2 2 0 0 1-2 2 2 2 0 0 1-2-2v-.09A1.65 1.65 0 0 0 9 19.4a1.65 1.65 0 0 0-1.82.33l-.06.06a2 2 0 0 1-2.83 0 2 2 0 0 1 0-2.83l.06-.06a1.65 1.65 0 0 0 .33-1.82 1.65 1.65 0 0 0-1.51-1H3a2 2 0 0 1-2-2 2 2 0 0 1 2-2h.09A1.65 1.65 0 0 0 4.6 9a1.65 1.65 0 0 0-.33-1.82l-.06-.06a2 2 0 0 1 0-2.83 2 2 0 0 1 2.83 0l.06.06a1.65 1.65 0 0 0 1.82.33H9a1.65 1.65 0 0 0 1-1.51V3a2 2 0 0 1 2-2 2 2 0 0 1 2 2v.09a1.65 1.65 0 0 0 1 1.51 1.65 1.65 0 0 0 1.82-.33l.06-.06a2 2 0 0 1 2.83 0 2 2 0 0 1 0 2.83l-.06.06a1.65 1.65 0 0 0-.33 1.82V9a1.65 1.65 0 0 0 1.51 1H21a2 2 0 0 1 2 2 2 2 0 0 1-2 2h-.09a1.65 1.65 0 0 0-1.51 1z"/></svg>`;
      case 'tool':
        return html`<svg viewBox="0 0 24 24" style="width:1rem;height:1rem;stroke:currentColor;stroke-width:2;fill:none;"><path d="M14.7 6.3a1 1 0 0 0 0 1.4l1.6 1.6a1 1 0 0 0 1.4 0l3.77-3.77a6 6 0 0 1-7.94 7.94l-6.91 6.91a2.12 2.12 0 0 1-3-3l6.91-6.91a6 6 0 0 1 7.94-7.94l-3.76 3.76z"/></svg>`;
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
    return html`
      <div class="wrapper">
        <div class="avatar" part="avatar">
          <slot name="avatar">
            <mcp-avatar variant=${this._avatarVariant} size="md">
              ${this._roleIcon}
            </mcp-avatar>
          </slot>
        </div>
        <div class="content" part="content">
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
