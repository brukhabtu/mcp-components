import { LitElement, html, css, nothing } from 'lit';
import { customElement, property, state } from 'lit/decorators.js';
import { classMap } from 'lit/directives/class-map.js';
import { baseStyles } from '../../styles/index.js';

export type ServerConnectionStatus = 'connected' | 'connecting' | 'disconnected' | 'error';

@customElement('mcp-server-status')
export class McpServerStatus extends LitElement {
  static styles = [
    baseStyles,
    css`
      :host {
        display: block;
      }

      .server {
        border: 1px solid var(--mcp-color-border);
        border-radius: var(--mcp-radius-lg);
        overflow: hidden;
        transition: all var(--mcp-transition-fast);
      }

      .server.interactive {
        cursor: pointer;
      }

      .server.interactive:hover {
        border-color: var(--mcp-color-border-hover);
        box-shadow: var(--mcp-shadow-sm);
      }

      .header {
        display: flex;
        align-items: center;
        gap: var(--mcp-space-3);
        padding: var(--mcp-space-3) var(--mcp-space-4);
        background: var(--mcp-color-background);
      }

      .status-dot {
        width: 0.625rem;
        height: 0.625rem;
        border-radius: 50%;
        flex-shrink: 0;
      }

      .status-connected { background: var(--mcp-color-success); }
      .status-connecting {
        background: var(--mcp-color-warning);
        animation: pulse 1.5s infinite;
      }
      .status-disconnected { background: var(--mcp-color-ghost-foreground); }
      .status-error { background: var(--mcp-color-error); }

      @keyframes pulse {
        0%, 100% { opacity: 1; }
        50% { opacity: 0.5; }
      }

      .info {
        flex: 1;
        min-width: 0;
      }

      .name {
        font-size: var(--mcp-font-size-sm);
        font-weight: var(--mcp-font-weight-medium);
        color: var(--mcp-color-foreground);
        white-space: nowrap;
        overflow: hidden;
        text-overflow: ellipsis;
      }

      .meta {
        display: flex;
        align-items: center;
        gap: var(--mcp-space-2);
        font-size: var(--mcp-font-size-xs);
        color: var(--mcp-color-ghost-foreground);
        margin-top: var(--mcp-space-1);
      }

      .tools-count {
        display: inline-flex;
        align-items: center;
        gap: var(--mcp-space-1);
        padding: 0 var(--mcp-space-2);
        background: var(--mcp-color-ghost);
        border-radius: var(--mcp-radius-full);
        font-size: var(--mcp-font-size-xs);
        color: var(--mcp-color-ghost-foreground);
      }

      .tools-count svg {
        width: 0.75rem;
        height: 0.75rem;
        stroke: currentColor;
        stroke-width: 2;
        fill: none;
      }

      .chevron {
        width: 1.25rem;
        height: 1.25rem;
        stroke: var(--mcp-color-ghost-foreground);
        stroke-width: 2;
        fill: none;
        flex-shrink: 0;
        transition: transform var(--mcp-transition-fast);
      }

      .chevron.open {
        transform: rotate(180deg);
      }

      .details {
        display: none;
        padding: var(--mcp-space-3) var(--mcp-space-4);
        background: var(--mcp-color-ghost);
        border-top: 1px solid var(--mcp-color-border);
      }

      .details.open {
        display: block;
      }

      .detail-row {
        display: flex;
        justify-content: space-between;
        font-size: var(--mcp-font-size-xs);
        padding: var(--mcp-space-1) 0;
      }

      .detail-label {
        color: var(--mcp-color-ghost-foreground);
      }

      .detail-value {
        color: var(--mcp-color-foreground);
        font-family: var(--mcp-font-family-mono);
      }

      /* Compact variant */
      :host([compact]) .header {
        padding: var(--mcp-space-2) var(--mcp-space-3);
      }

      :host([compact]) .meta {
        display: none;
      }

      :host([compact]) .name {
        font-size: var(--mcp-font-size-xs);
      }
    `
  ];

  @property({ type: String }) name = '';
  @property({ type: String }) status: ServerConnectionStatus = 'disconnected';
  @property({ type: Number }) toolsCount = 0;
  @property({ type: Number }) latency = 0;
  @property({ type: String }) version = '';
  @property({ type: Boolean }) expandable = false;
  @property({ type: Boolean, reflect: true }) compact = false;

  @state() private _expanded = false;

  private get _statusLabel() {
    switch (this.status) {
      case 'connected': return 'Connected';
      case 'connecting': return 'Connecting...';
      case 'disconnected': return 'Disconnected';
      case 'error': return 'Error';
    }
  }

  private _handleClick() {
    if (this.expandable) {
      this._expanded = !this._expanded;
    }
  }

  render() {
    const serverClasses = {
      server: true,
      interactive: this.expandable,
    };

    return html`
      <div class=${classMap(serverClasses)} @click=${this._handleClick}>
        <div class="header">
          <span class=${classMap({ 'status-dot': true, [`status-${this.status}`]: true })}></span>
          <div class="info">
            <div class="name">${this.name}</div>
            <div class="meta">
              <span>${this._statusLabel}</span>
              ${this.latency && this.status === 'connected' ? html`
                <span>${this.latency}ms</span>
              ` : nothing}
            </div>
          </div>
          ${this.toolsCount > 0 ? html`
            <span class="tools-count">
              <svg viewBox="0 0 24 24"><path d="M14.7 6.3a1 1 0 0 0 0 1.4l1.6 1.6a1 1 0 0 0 1.4 0l3.77-3.77a6 6 0 0 1-7.94 7.94l-6.91 6.91a2.12 2.12 0 0 1-3-3l6.91-6.91a6 6 0 0 1 7.94-7.94l-3.76 3.76z"/></svg>
              ${this.toolsCount}
            </span>
          ` : nothing}
          ${this.expandable ? html`
            <svg class=${classMap({ chevron: true, open: this._expanded })} viewBox="0 0 24 24">
              <path d="M6 9l6 6 6-6"/>
            </svg>
          ` : nothing}
        </div>
        ${this.expandable ? html`
          <div class=${classMap({ details: true, open: this._expanded })}>
            <div class="detail-row">
              <span class="detail-label">Status</span>
              <span class="detail-value">${this._statusLabel}</span>
            </div>
            ${this.version ? html`
              <div class="detail-row">
                <span class="detail-label">Version</span>
                <span class="detail-value">${this.version}</span>
              </div>
            ` : nothing}
            ${this.latency ? html`
              <div class="detail-row">
                <span class="detail-label">Latency</span>
                <span class="detail-value">${this.latency}ms</span>
              </div>
            ` : nothing}
            <div class="detail-row">
              <span class="detail-label">Tools</span>
              <span class="detail-value">${this.toolsCount}</span>
            </div>
          </div>
        ` : nothing}
      </div>
    `;
  }
}

declare global {
  interface HTMLElementTagNameMap {
    'mcp-server-status': McpServerStatus;
  }
}
