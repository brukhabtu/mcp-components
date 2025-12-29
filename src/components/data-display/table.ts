import { LitElement, html, css, nothing } from 'lit';
import { customElement, property } from 'lit/decorators.js';
import { classMap } from 'lit/directives/class-map.js';
import { baseStyles } from '../../styles/index.js';

export interface TableColumn {
  key: string;
  header: string;
  width?: string;
  sortable?: boolean;
}

export type SortDirection = 'asc' | 'desc' | null;

/**
 * A table component for displaying tabular data.
 *
 * @fires mcp-sort - When a sortable column header is clicked
 * @fires mcp-row-click - When a row is clicked
 */
@customElement('mcp-table')
export class McpTable extends LitElement {
  static styles = [
    baseStyles,
    css`
      :host {
        display: block;
      }

      .table-wrapper {
        overflow-x: auto;
        border: 1px solid var(--mcp-color-border);
        border-radius: var(--mcp-radius-lg);
      }

      table {
        width: 100%;
        border-collapse: collapse;
        font-size: var(--mcp-font-size-sm);
      }

      th, td {
        padding: var(--mcp-space-3) var(--mcp-space-4);
        text-align: left;
      }

      th {
        background: var(--mcp-color-ghost);
        font-weight: var(--mcp-font-weight-semibold);
        color: var(--mcp-color-foreground);
        border-bottom: 1px solid var(--mcp-color-border);
        white-space: nowrap;
      }

      th.sortable {
        cursor: pointer;
        user-select: none;
        transition: background var(--mcp-transition-fast);
      }

      th.sortable:hover {
        background: var(--mcp-color-border);
      }

      th.sortable:focus-visible {
        outline: none;
        box-shadow: inset 0 0 0 3px var(--mcp-color-primary-muted);
      }

      .sort-icon {
        display: inline-block;
        margin-left: var(--mcp-space-1);
        opacity: 0.5;
      }

      .sort-icon.active {
        opacity: 1;
        color: var(--mcp-color-primary);
      }

      td {
        color: var(--mcp-color-foreground);
        border-bottom: 1px solid var(--mcp-color-border);
      }

      tr:last-child td {
        border-bottom: none;
      }

      /* Striped */
      .striped tbody tr:nth-child(odd) {
        background: var(--mcp-color-ghost);
      }

      /* Hoverable */
      .hoverable tbody tr {
        transition: background var(--mcp-transition-fast);
      }

      .hoverable tbody tr:hover {
        background: var(--mcp-color-primary-muted);
        cursor: pointer;
      }

      /* Compact */
      .compact th, .compact td {
        padding: var(--mcp-space-2) var(--mcp-space-3);
      }

      /* Empty state */
      .empty {
        text-align: center;
        color: var(--mcp-color-ghost-foreground);
        padding: var(--mcp-space-8);
      }
    `
  ];

  @property({ type: Array }) columns: TableColumn[] = [];
  @property({ type: Array }) data: Record<string, unknown>[] = [];
  @property({ type: Boolean }) striped = false;
  @property({ type: Boolean }) hoverable = false;
  @property({ type: Boolean }) compact = false;
  @property({ type: String }) sortKey: string | null = null;
  @property({ type: String }) sortDirection: SortDirection = null;

  private _handleSort(column: TableColumn) {
    if (!column.sortable) return;

    let direction: SortDirection = 'asc';
    if (this.sortKey === column.key) {
      direction = this.sortDirection === 'asc' ? 'desc' : this.sortDirection === 'desc' ? null : 'asc';
    }

    this.dispatchEvent(new CustomEvent('mcp-sort', {
      detail: { key: column.key, direction },
      bubbles: true,
      composed: true,
    }));
  }

  private _handleRowClick(row: Record<string, unknown>, index: number) {
    if (!this.hoverable) return;

    this.dispatchEvent(new CustomEvent('mcp-row-click', {
      detail: { row, index },
      bubbles: true,
      composed: true,
    }));
  }

  private _renderSortIcon(column: TableColumn) {
    if (!column.sortable) return nothing;

    const isActive = this.sortKey === column.key;
    const icon = this.sortDirection === 'asc' ? '↑' : this.sortDirection === 'desc' ? '↓' : '↕';

    return html`<span class=${classMap({ 'sort-icon': true, active: isActive })}>${isActive ? icon : '↕'}</span>`;
  }

  render() {
    const tableClasses = {
      striped: this.striped,
      hoverable: this.hoverable,
      compact: this.compact,
    };

    return html`
      <div class="table-wrapper">
        <table class=${classMap(tableClasses)}>
          <thead>
            <tr>
              ${this.columns.map(col => html`
                <th
                  class=${classMap({ sortable: !!col.sortable })}
                  style=${col.width ? `width: ${col.width}` : ''}
                  @click=${() => this._handleSort(col)}
                  @keydown=${(e: KeyboardEvent) => e.key === 'Enter' && this._handleSort(col)}
                  tabindex=${col.sortable ? 0 : -1}
                >
                  ${col.header}${this._renderSortIcon(col)}
                </th>
              `)}
            </tr>
          </thead>
          <tbody>
            ${this.data.length === 0
              ? html`<tr><td colspan=${this.columns.length} class="empty">No data</td></tr>`
              : this.data.map((row, index) => html`
                <tr @click=${() => this._handleRowClick(row, index)}>
                  ${this.columns.map(col => html`
                    <td>${row[col.key] ?? ''}</td>
                  `)}
                </tr>
              `)
            }
          </tbody>
        </table>
      </div>
    `;
  }
}

declare global {
  interface HTMLElementTagNameMap {
    'mcp-table': McpTable;
  }
}
