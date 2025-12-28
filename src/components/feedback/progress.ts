import { LitElement, html, css, nothing } from 'lit';
import { customElement, property } from 'lit/decorators.js';
import { classMap } from 'lit/directives/class-map.js';
import { baseStyles } from '../../styles/index.js';

export type ProgressVariant = 'default' | 'success' | 'warning' | 'error';

/**
 * A progress bar component for showing completion status.
 */
@customElement('mcp-progress')
export class McpProgress extends LitElement {
  static styles = [
    baseStyles,
    css`
      :host {
        display: block;
      }

      .wrapper {
        display: flex;
        flex-direction: column;
        gap: var(--mcp-space-1);
      }

      .header {
        display: flex;
        justify-content: space-between;
        font-size: var(--mcp-font-size-sm);
      }

      .label {
        color: var(--mcp-color-foreground);
      }

      .value {
        color: var(--mcp-color-muted-foreground);
      }

      .track {
        height: 0.5rem;
        background: var(--mcp-color-muted);
        border-radius: var(--mcp-radius-full);
        overflow: hidden;
      }

      .track.size-sm { height: 0.25rem; }
      .track.size-lg { height: 0.75rem; }

      .bar {
        height: 100%;
        background: var(--mcp-color-primary);
        border-radius: inherit;
        transition: width var(--mcp-transition-normal);
      }

      .bar.variant-success { background: var(--mcp-color-success); }
      .bar.variant-warning { background: var(--mcp-color-warning); }
      .bar.variant-error { background: var(--mcp-color-error); }

      .bar.indeterminate {
        width: 30% !important;
        animation: indeterminate 1.5s ease-in-out infinite;
      }

      @keyframes indeterminate {
        0% { transform: translateX(-100%); }
        100% { transform: translateX(400%); }
      }
    `
  ];

  /** Current value (0-100) */
  @property({ type: Number }) value = 0;
  
  /** Optional label */
  @property({ type: String }) label = '';
  
  /** Whether to show the percentage value */
  @property({ type: Boolean, attribute: 'show-value' }) showValue = false;
  
  /** Size variant */
  @property({ type: String }) size: 'sm' | 'md' | 'lg' = 'md';
  
  /** Color variant */
  @property({ type: String }) variant: ProgressVariant = 'default';
  
  /** Indeterminate state (for unknown progress) */
  @property({ type: Boolean }) indeterminate = false;

  render() {
    const trackClasses = {
      track: true,
      [`size-${this.size}`]: true,
    };

    const barClasses = {
      bar: true,
      [`variant-${this.variant}`]: true,
      indeterminate: this.indeterminate,
    };

    const clampedValue = Math.min(100, Math.max(0, this.value));

    return html`
      <div class="wrapper">
        ${this.label || this.showValue ? html`
          <div class="header">
            ${this.label ? html`<span class="label">${this.label}</span>` : nothing}
            ${this.showValue && !this.indeterminate 
              ? html`<span class="value">${clampedValue}%</span>` 
              : nothing}
          </div>
        ` : nothing}
        
        <div 
          class=${classMap(trackClasses)}
          role="progressbar"
          aria-valuenow=${this.indeterminate ? nothing : clampedValue}
          aria-valuemin="0"
          aria-valuemax="100"
          aria-label=${this.label || 'Progress'}
        >
          <div 
            class=${classMap(barClasses)}
            style=${this.indeterminate ? '' : `width: ${clampedValue}%`}
          ></div>
        </div>
      </div>
    `;
  }
}

declare global {
  interface HTMLElementTagNameMap {
    'mcp-progress': McpProgress;
  }
}
