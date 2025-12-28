import { LitElement, html, css } from 'lit';
import { customElement, property } from 'lit/decorators.js';
import { baseStyles } from '../../styles/index.js';

/**
 * A responsive grid layout component using CSS Grid.
 * 
 * @slot - Grid items
 */
@customElement('mcp-grid')
export class McpGrid extends LitElement {
  static styles = [
    baseStyles,
    css`
      :host {
        display: grid;
      }
    `
  ];

  /** Number of columns (or 'auto-fit' / 'auto-fill') */
  @property({ type: String }) columns = '1';
  
  /** Minimum column width for auto-fit/auto-fill */
  @property({ type: String, attribute: 'min-col-width' }) minColWidth = '200px';
  
  /** Gap between grid items */
  @property({ type: String }) gap = 'var(--mcp-space-4)';
  
  /** Row gap (overrides gap for rows) */
  @property({ type: String, attribute: 'row-gap' }) rowGap = '';
  
  /** Column gap (overrides gap for columns) */
  @property({ type: String, attribute: 'col-gap' }) colGap = '';

  /** Alignment of items within cells */
  @property({ type: String }) align = 'stretch';
  
  /** Justification of items within cells */
  @property({ type: String }) justify = 'stretch';

  updated() {
    let gridTemplateColumns: string;

    if (this.columns === 'auto-fit' || this.columns === 'auto-fill') {
      gridTemplateColumns = `repeat(${this.columns}, minmax(${this.minColWidth}, 1fr))`;
    } else {
      const cols = parseInt(this.columns);
      gridTemplateColumns = isNaN(cols) ? this.columns : `repeat(${cols}, 1fr)`;
    }

    this.style.gridTemplateColumns = gridTemplateColumns;
    this.style.gap = this.gap;
    if (this.rowGap) this.style.rowGap = this.rowGap;
    if (this.colGap) this.style.columnGap = this.colGap;
    this.style.alignItems = this.align;
    this.style.justifyItems = this.justify;
  }

  render() {
    return html`<slot></slot>`;
  }
}

/**
 * A grid item component for controlling individual cell behavior.
 */
@customElement('mcp-grid-item')
export class McpGridItem extends LitElement {
  static styles = css`
    :host {
      display: block;
    }
  `;

  /** Number of columns to span */
  @property({ type: Number, attribute: 'col-span' }) colSpan = 1;
  
  /** Number of rows to span */
  @property({ type: Number, attribute: 'row-span' }) rowSpan = 1;
  
  /** Starting column */
  @property({ type: Number, attribute: 'col-start' }) colStart?: number;
  
  /** Starting row */
  @property({ type: Number, attribute: 'row-start' }) rowStart?: number;

  updated() {
    if (this.colSpan > 1) {
      this.style.gridColumn = `span ${this.colSpan}`;
    }
    if (this.rowSpan > 1) {
      this.style.gridRow = `span ${this.rowSpan}`;
    }
    if (this.colStart) {
      this.style.gridColumnStart = String(this.colStart);
    }
    if (this.rowStart) {
      this.style.gridRowStart = String(this.rowStart);
    }
  }

  render() {
    return html`<slot></slot>`;
  }
}

declare global {
  interface HTMLElementTagNameMap {
    'mcp-grid': McpGrid;
    'mcp-grid-item': McpGridItem;
  }
}
