import { LitElement, html, css } from 'lit';
import { customElement, property } from 'lit/decorators.js';
import { unsafeSVG } from 'lit/directives/unsafe-svg.js';
import { baseStyles } from '../../styles/index.js';

// Built-in icon set (common icons)
const icons: Record<string, string> = {
  check: '<path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 13l4 4L19 7"/>',
  x: '<path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12"/>',
  'chevron-down': '<path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 9l-7 7-7-7"/>',
  'chevron-up': '<path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 15l7-7 7 7"/>',
  'chevron-left': '<path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 19l-7-7 7-7"/>',
  'chevron-right': '<path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 5l7 7-7 7"/>',
  search: '<path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"/>',
  spinner: '<path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"/>',
  info: '<path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"/>',
  warning: '<path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z"/>',
  error: '<path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M10 14l2-2m0 0l2-2m-2 2l-2-2m2 2l2 2m7-2a9 9 0 11-18 0 9 9 0 0118 0z"/>',
  success: '<path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"/>',
  plus: '<path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 6v6m0 0v6m0-6h6m-6 0H6"/>',
  minus: '<path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M20 12H4"/>',
  menu: '<path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 6h16M4 12h16M4 18h16"/>',
  copy: '<path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M8 16H6a2 2 0 01-2-2V6a2 2 0 012-2h8a2 2 0 012 2v2m-6 12h8a2 2 0 002-2v-8a2 2 0 00-2-2h-8a2 2 0 00-2 2v8a2 2 0 002 2z"/>',
  external: '<path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14"/>',
};

/**
 * An icon component that renders SVG icons.
 * Supports built-in icons or custom SVG content via the svg property.
 */
@customElement('mcp-icon')
export class McpIcon extends LitElement {
  static styles = [
    baseStyles,
    css`
      :host {
        display: inline-flex;
        align-items: center;
        justify-content: center;
        width: 1em;
        height: 1em;
        color: inherit;
      }

      svg {
        width: 100%;
        height: 100%;
        fill: none;
        stroke: currentColor;
      }

      :host([spin]) svg {
        animation: spin 1s linear infinite;
      }

      @keyframes spin {
        to { transform: rotate(360deg); }
      }
    `
  ];

  /** Name of a built-in icon */
  @property({ type: String }) name = '';

  /** Custom SVG content (path elements only) */
  @property({ type: String }) svg = '';

  /** Whether to animate the icon with a spin */
  @property({ type: Boolean, reflect: true }) spin = false;

  /** Accessible label for the icon */
  @property({ type: String }) label = '';

  render() {
    const svgContent = this.svg || icons[this.name] || '';
    
    return html`
      <svg
        viewBox="0 0 24 24"
        aria-hidden=${this.label ? 'false' : 'true'}
        aria-label=${this.label || ''}
        role=${this.label ? 'img' : 'presentation'}
      >
        ${unsafeSVG(svgContent)}
      </svg>
    `;
  }

  /** Register a custom icon for use with the name property */
  static registerIcon(name: string, svgContent: string) {
    icons[name] = svgContent;
  }
}

declare global {
  interface HTMLElementTagNameMap {
    'mcp-icon': McpIcon;
  }
}
