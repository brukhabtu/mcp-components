import { LitElement, html, css } from 'lit';
import { customElement, property } from 'lit/decorators.js';
import { classMap } from 'lit/directives/class-map.js';
import { baseStyles } from '../../styles/index.js';

export type SwitchSize = 'sm' | 'md' | 'lg';

@customElement('mcp-switch')
export class McpSwitch extends LitElement {
  static styles = [
    baseStyles,
    css`
      :host {
        display: inline-flex;
      }

      label {
        display: inline-flex;
        align-items: center;
        gap: var(--mcp-space-3);
        cursor: pointer;
        font-size: var(--mcp-font-size-sm);
        color: var(--mcp-color-foreground);
      }

      label.disabled {
        opacity: 0.5;
        cursor: not-allowed;
      }

      label.label-left {
        flex-direction: row-reverse;
      }

      .track {
        position: relative;
        border-radius: var(--mcp-radius-full);
        background: var(--mcp-color-muted);
        transition: background var(--mcp-transition-fast);
        flex-shrink: 0;
      }

      .size-sm .track { width: 2rem; height: 1.125rem; }
      .size-md .track { width: 2.5rem; height: 1.375rem; }
      .size-lg .track { width: 3rem; height: 1.625rem; }

      .track.checked {
        background: var(--mcp-color-primary);
      }

      .thumb {
        position: absolute;
        top: 2px;
        left: 2px;
        border-radius: 50%;
        background: white;
        box-shadow: var(--mcp-shadow-sm);
        transition: transform var(--mcp-transition-fast);
      }

      .size-sm .thumb { width: 0.875rem; height: 0.875rem; }
      .size-md .thumb { width: 1.125rem; height: 1.125rem; }
      .size-lg .thumb { width: 1.375rem; height: 1.375rem; }

      .size-sm .track.checked .thumb { transform: translateX(0.875rem); }
      .size-md .track.checked .thumb { transform: translateX(1.125rem); }
      .size-lg .track.checked .thumb { transform: translateX(1.375rem); }

      input {
        position: absolute;
        opacity: 0;
        pointer-events: none;
      }

      label:focus-within .track {
        box-shadow: 0 0 0 3px rgb(99 102 241 / 0.2);
      }
    `
  ];

  @property({ type: Boolean }) checked = false;
  @property({ type: Boolean }) disabled = false;
  @property({ type: String }) size: SwitchSize = 'md';
  @property({ type: String }) label = '';
  @property({ type: String, attribute: 'label-position' }) labelPosition: 'left' | 'right' = 'right';
  @property({ type: String }) name = '';

  private _handleChange(e: Event) {
    const input = e.target as HTMLInputElement;
    this.checked = input.checked;
    this.dispatchEvent(new CustomEvent('mcp-change', {
      detail: { checked: this.checked },
      bubbles: true,
      composed: true,
    }));
  }

  render() {
    const labelClasses = {
      disabled: this.disabled,
      'label-left': this.labelPosition === 'left',
      [`size-${this.size}`]: true,
    };

    const trackClasses = {
      track: true,
      checked: this.checked,
    };

    return html`
      <label class=${classMap(labelClasses)}>
        <input
          type="checkbox"
          role="switch"
          .checked=${this.checked}
          ?disabled=${this.disabled}
          name=${this.name}
          @change=${this._handleChange}
        />
        <span class=${classMap(trackClasses)}>
          <span class="thumb"></span>
        </span>
        ${this.label ? html`<span>${this.label}</span>` : html`<slot></slot>`}
      </label>
    `;
  }
}

declare global {
  interface HTMLElementTagNameMap {
    'mcp-switch': McpSwitch;
  }
}
