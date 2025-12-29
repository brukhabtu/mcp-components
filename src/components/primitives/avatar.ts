import { LitElement, html, css, nothing } from 'lit';
import { customElement, property, state } from 'lit/decorators.js';
import { classMap } from 'lit/directives/class-map.js';
import { baseStyles } from '../../styles/index.js';

export type AvatarSize = 'xs' | 'sm' | 'md' | 'lg' | 'xl';
export type AvatarShape = 'circle' | 'square' | 'rounded';
export type AvatarStatus = 'online' | 'offline' | 'busy' | 'away';

@customElement('mcp-avatar')
export class McpAvatar extends LitElement {
  static styles = [
    baseStyles,
    css`
      :host {
        display: inline-block;
      }

      .avatar {
        position: relative;
        display: flex;
        align-items: center;
        justify-content: center;
        background: var(--mcp-color-muted);
        color: var(--mcp-color-muted-foreground);
        font-weight: var(--mcp-font-weight-medium);
        overflow: hidden;
        flex-shrink: 0;
      }

      .size-xs { width: 1.5rem; height: 1.5rem; font-size: 0.625rem; }
      .size-sm { width: 2rem; height: 2rem; font-size: 0.75rem; }
      .size-md { width: 2.5rem; height: 2.5rem; font-size: 0.875rem; }
      .size-lg { width: 3rem; height: 3rem; font-size: 1rem; }
      .size-xl { width: 4rem; height: 4rem; font-size: 1.25rem; }

      .shape-circle { border-radius: 50%; }
      .shape-square { border-radius: 0; }
      .shape-rounded { border-radius: var(--mcp-radius-lg); }

      img {
        width: 100%;
        height: 100%;
        object-fit: cover;
      }

      .initials {
        text-transform: uppercase;
        user-select: none;
      }

      .icon svg {
        width: 60%;
        height: 60%;
        stroke: currentColor;
        stroke-width: 1.5;
        fill: none;
      }

      .status {
        position: absolute;
        bottom: 0;
        right: 0;
        border-radius: 50%;
        border: 2px solid var(--mcp-color-background);
      }

      .size-xs .status, .size-sm .status { width: 0.5rem; height: 0.5rem; }
      .size-md .status { width: 0.625rem; height: 0.625rem; }
      .size-lg .status, .size-xl .status { width: 0.75rem; height: 0.75rem; }

      .status-online { background: var(--mcp-color-success); }
      .status-offline { background: var(--mcp-color-muted-foreground); }
      .status-busy { background: var(--mcp-color-error); }
      .status-away { background: var(--mcp-color-warning); }
    `
  ];

  @property({ type: String }) src = '';
  @property({ type: String }) alt = '';
  @property({ type: String }) name = '';
  @property({ type: String }) size: AvatarSize = 'md';
  @property({ type: String }) shape: AvatarShape = 'circle';
  @property({ type: String }) status?: AvatarStatus;

  @state() private _imgError = false;

  private get _initials() {
    if (!this.name) return '';
    const parts = this.name.trim().split(/\s+/);
    if (parts.length === 1) return parts[0].substring(0, 2);
    return parts[0][0] + parts[parts.length - 1][0];
  }

  private _handleImgError() {
    this._imgError = true;
  }

  render() {
    const classes = {
      avatar: true,
      [`size-${this.size}`]: true,
      [`shape-${this.shape}`]: true,
    };

    const showImage = this.src && !this._imgError;
    const showInitials = !showImage && this._initials;
    const showIcon = !showImage && !showInitials;

    return html`
      <div class=${classMap(classes)}>
        ${showImage ? html`
          <img src=${this.src} alt=${this.alt || this.name} @error=${this._handleImgError} />
        ` : nothing}

        ${showInitials ? html`
          <span class="initials">${this._initials}</span>
        ` : nothing}

        ${showIcon ? html`
          <span class="icon">
            <svg viewBox="0 0 24 24">
              <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"/>
              <circle cx="12" cy="7" r="4"/>
            </svg>
          </span>
        ` : nothing}

        ${this.status ? html`
          <span class=${classMap({ status: true, [`status-${this.status}`]: true })}></span>
        ` : nothing}
      </div>
    `;
  }
}

@customElement('mcp-avatar-group')
export class McpAvatarGroup extends LitElement {
  static styles = [
    baseStyles,
    css`
      :host {
        display: inline-flex;
        flex-direction: row-reverse;
      }

      ::slotted(mcp-avatar) {
        margin-left: -0.5rem;
        box-shadow: 0 0 0 2px var(--mcp-color-background);
      }

      ::slotted(mcp-avatar:last-child) {
        margin-left: 0;
      }

      .overflow {
        display: flex;
        align-items: center;
        justify-content: center;
        background: var(--mcp-color-muted);
        color: var(--mcp-color-muted-foreground);
        border-radius: 50%;
        font-size: var(--mcp-font-size-xs);
        font-weight: var(--mcp-font-weight-medium);
        margin-left: -0.5rem;
        box-shadow: 0 0 0 2px var(--mcp-color-background);
      }

      :host([size="sm"]) .overflow { width: 2rem; height: 2rem; }
      :host([size="md"]) .overflow { width: 2.5rem; height: 2.5rem; }
      :host([size="lg"]) .overflow { width: 3rem; height: 3rem; }
    `
  ];

  @property({ type: Number }) max = 5;
  @property({ type: String }) size: AvatarSize = 'md';

  render() {
    return html`
      <slot></slot>
    `;
  }
}

declare global {
  interface HTMLElementTagNameMap {
    'mcp-avatar': McpAvatar;
    'mcp-avatar-group': McpAvatarGroup;
  }
}
