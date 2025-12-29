import { LitElement, html, css, nothing } from 'lit';
import { customElement, property, state } from 'lit/decorators.js';
import { classMap } from 'lit/directives/class-map.js';
import { baseStyles } from '../../styles/index.js';

@customElement('mcp-menu')
export class McpMenu extends LitElement {
  static styles = [
    baseStyles,
    css`
      :host {
        display: block;
      }

      .menu {
        background: var(--mcp-color-background);
        border: 1px solid var(--mcp-color-border);
        border-radius: var(--mcp-radius-lg);
        box-shadow: var(--mcp-shadow-lg);
        padding: var(--mcp-space-1);
        min-width: 12rem;
        overflow: hidden;
      }
    `
  ];

  render() {
    return html`
      <div class="menu" role="menu">
        <slot></slot>
      </div>
    `;
  }
}

@customElement('mcp-menu-item')
export class McpMenuItem extends LitElement {
  static styles = [
    baseStyles,
    css`
      :host {
        display: block;
      }

      button {
        display: flex;
        align-items: center;
        gap: var(--mcp-space-3);
        width: 100%;
        padding: var(--mcp-space-2) var(--mcp-space-3);
        border: none;
        background: transparent;
        font-family: inherit;
        font-size: var(--mcp-font-size-sm);
        color: var(--mcp-color-foreground);
        cursor: pointer;
        border-radius: var(--mcp-radius-md);
        text-align: left;
        transition: background var(--mcp-transition-fast);
      }

      button:hover:not(:disabled) {
        background: var(--mcp-color-muted);
      }

      button:focus {
        outline: none;
        background: var(--mcp-color-muted);
      }

      button:disabled {
        opacity: 0.5;
        cursor: not-allowed;
      }

      button.destructive {
        color: var(--mcp-color-error);
      }

      .icon {
        width: 1rem;
        height: 1rem;
        flex-shrink: 0;
      }

      .icon ::slotted(svg) {
        width: 100%;
        height: 100%;
        stroke: currentColor;
        stroke-width: 2;
        fill: none;
      }

      .label {
        flex: 1;
      }

      .shortcut {
        font-size: var(--mcp-font-size-xs);
        color: var(--mcp-color-muted-foreground);
        margin-left: auto;
      }
    `
  ];

  @property({ type: Boolean }) disabled = false;
  @property({ type: Boolean }) destructive = false;
  @property({ type: String }) shortcut = '';

  private _handleClick() {
    if (this.disabled) return;
    this.dispatchEvent(new CustomEvent('mcp-select', {
      bubbles: true,
      composed: true,
    }));
  }

  render() {
    const buttonClasses = {
      destructive: this.destructive,
    };

    return html`
      <button
        class=${classMap(buttonClasses)}
        role="menuitem"
        ?disabled=${this.disabled}
        @click=${this._handleClick}
      >
        <span class="icon"><slot name="icon"></slot></span>
        <span class="label"><slot></slot></span>
        ${this.shortcut ? html`<span class="shortcut">${this.shortcut}</span>` : nothing}
      </button>
    `;
  }
}

@customElement('mcp-menu-divider')
export class McpMenuDivider extends LitElement {
  static styles = [
    baseStyles,
    css`
      :host {
        display: block;
        height: 1px;
        background: var(--mcp-color-border);
        margin: var(--mcp-space-1) 0;
      }
    `
  ];

  render() {
    return html``;
  }
}

@customElement('mcp-menu-group')
export class McpMenuGroup extends LitElement {
  static styles = [
    baseStyles,
    css`
      :host {
        display: block;
      }

      .label {
        padding: var(--mcp-space-2) var(--mcp-space-3);
        font-size: var(--mcp-font-size-xs);
        font-weight: var(--mcp-font-weight-medium);
        color: var(--mcp-color-muted-foreground);
        text-transform: uppercase;
        letter-spacing: 0.05em;
      }
    `
  ];

  @property({ type: String }) label = '';

  render() {
    return html`
      ${this.label ? html`<div class="label">${this.label}</div>` : nothing}
      <slot></slot>
    `;
  }
}

declare global {
  interface HTMLElementTagNameMap {
    'mcp-menu': McpMenu;
    'mcp-menu-item': McpMenuItem;
    'mcp-menu-divider': McpMenuDivider;
    'mcp-menu-group': McpMenuGroup;
  }
}
