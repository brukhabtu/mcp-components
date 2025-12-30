import { LitElement, html, css } from 'lit';
import { customElement, property } from 'lit/decorators.js';
import { baseStyles } from '../../styles/index.js';

export type StackDirection = 'row' | 'column' | 'row-reverse' | 'column-reverse';
export type StackAlign = 'start' | 'center' | 'end' | 'stretch' | 'baseline';
export type StackJustify = 'start' | 'center' | 'end' | 'between' | 'around' | 'evenly';
export type StackWrap = 'nowrap' | 'wrap' | 'wrap-reverse';

const alignMap: Record<StackAlign, string> = {
  start: 'flex-start',
  center: 'center',
  end: 'flex-end',
  stretch: 'stretch',
  baseline: 'baseline',
};

const justifyMap: Record<StackJustify, string> = {
  start: 'flex-start',
  center: 'center',
  end: 'flex-end',
  between: 'space-between',
  around: 'space-around',
  evenly: 'space-evenly',
};

/**
 * A flexible layout component for stacking elements vertically or horizontally.
 * Core building block for composing complex layouts.
 * 
 * @slot - Stack content
 */
@customElement('mcp-stack')
export class McpStack extends LitElement {
  static styles = [
    baseStyles,
    css`
      :host {
        display: flex;
      }
    `
  ];

  @property({ type: String }) direction: StackDirection = 'column';
  @property({ type: String }) align: StackAlign = 'stretch';
  @property({ type: String }) justify: StackJustify = 'start';
  @property({ type: String }) wrap: StackWrap = 'nowrap';
  @property({ type: String }) gap = 'var(--mcp-space-4)';
  @property({ type: Boolean }) inline = false;

  render() {
    const styles = {
      display: this.inline ? 'inline-flex' : 'flex',
      flexDirection: this.direction,
      alignItems: alignMap[this.align],
      justifyContent: justifyMap[this.justify],
      flexWrap: this.wrap,
      gap: this.gap,
    };

    return html`
      <style>:host { ${Object.entries(styles).map(([k, v]) => `${k.replace(/[A-Z]/g, m => '-' + m.toLowerCase())}: ${v}`).join('; ')} }</style>
      <slot></slot>
    `;
  }
}

/**
 * Horizontal stack (row direction) - convenience wrapper
 */
@customElement('mcp-hstack')
export class McpHStack extends McpStack {
  constructor() {
    super();
    this.direction = 'row';
  }
}

/**
 * Vertical stack (column direction) - convenience wrapper
 */
@customElement('mcp-vstack')
export class McpVStack extends McpStack {
  constructor() {
    super();
    this.direction = 'column';
  }
}

declare global {
  interface HTMLElementTagNameMap {
    'mcp-stack': McpStack;
    'mcp-hstack': McpHStack;
    'mcp-vstack': McpVStack;
  }
}
