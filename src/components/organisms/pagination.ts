import { LitElement, html, css, nothing } from 'lit';
import { customElement, property } from 'lit/decorators.js';
import { classMap } from 'lit/directives/class-map.js';
import { baseStyles } from '../../styles/index.js';

/**
 * A pagination component for navigating through pages.
 *
 * @fires mcp-page-change - When the page changes
 */
@customElement('mcp-pagination')
export class McpPagination extends LitElement {
  static styles = [
    baseStyles,
    css`
      :host {
        display: block;
      }

      .pagination {
        display: flex;
        align-items: center;
        gap: var(--mcp-space-1);
      }

      .btn {
        display: flex;
        align-items: center;
        justify-content: center;
        min-width: 2rem;
        height: 2rem;
        padding: 0 var(--mcp-space-2);
        border: 1px solid var(--mcp-color-border);
        border-radius: var(--mcp-radius-md);
        background: var(--mcp-color-background);
        color: var(--mcp-color-foreground);
        font-size: var(--mcp-font-size-sm);
        cursor: pointer;
        transition: all var(--mcp-transition-fast);
      }

      .btn:hover:not(:disabled) {
        background: var(--mcp-color-ghost);
        border-color: var(--mcp-color-border-hover);
      }

      .btn:focus-visible {
        outline: none;
        box-shadow: 0 0 0 3px var(--mcp-color-primary-muted);
      }

      .btn:disabled {
        opacity: var(--mcp-opacity-disabled);
        cursor: not-allowed;
      }

      .btn.active {
        background: var(--mcp-color-primary);
        border-color: var(--mcp-color-primary);
        color: var(--mcp-color-primary-foreground);
      }

      .btn.active:hover {
        background: var(--mcp-color-primary-hover);
      }

      .ellipsis {
        display: flex;
        align-items: center;
        justify-content: center;
        min-width: 2rem;
        height: 2rem;
        color: var(--mcp-color-ghost-foreground);
        font-size: var(--mcp-font-size-sm);
      }

      .compact .btn {
        min-width: 1.75rem;
        height: 1.75rem;
        font-size: var(--mcp-font-size-xs);
      }

      .nav-btn svg {
        width: 1rem;
        height: 1rem;
        stroke: currentColor;
        stroke-width: 2;
        fill: none;
      }
    `
  ];

  @property({ type: Number }) total = 0;
  @property({ type: Number }) pageSize = 10;
  @property({ type: Number }) currentPage = 1;
  @property({ type: Boolean }) compact = false;
  @property({ type: Boolean }) showFirstLast = false;

  private get _totalPages() {
    return Math.ceil(this.total / this.pageSize);
  }

  private _getPageNumbers(): (number | 'ellipsis')[] {
    const total = this._totalPages;
    const current = this.currentPage;
    const pages: (number | 'ellipsis')[] = [];

    if (total <= 7) {
      for (let i = 1; i <= total; i++) pages.push(i);
      return pages;
    }

    pages.push(1);

    if (current > 3) {
      pages.push('ellipsis');
    }

    const start = Math.max(2, current - 1);
    const end = Math.min(total - 1, current + 1);

    for (let i = start; i <= end; i++) {
      pages.push(i);
    }

    if (current < total - 2) {
      pages.push('ellipsis');
    }

    pages.push(total);

    return pages;
  }

  private _goToPage(page: number) {
    if (page < 1 || page > this._totalPages || page === this.currentPage) return;

    this.dispatchEvent(new CustomEvent('mcp-page-change', {
      detail: { page },
      bubbles: true,
      composed: true,
    }));
  }

  render() {
    const pages = this._getPageNumbers();
    const isFirst = this.currentPage === 1;
    const isLast = this.currentPage === this._totalPages;

    if (this._totalPages <= 1) return nothing;

    return html`
      <nav class=${classMap({ pagination: true, compact: this.compact })} aria-label="Pagination">
        ${this.showFirstLast ? html`
          <button
            class="btn nav-btn"
            @click=${() => this._goToPage(1)}
            ?disabled=${isFirst}
            aria-label="First page"
          >
            <svg viewBox="0 0 24 24"><path d="M11 17l-5-5 5-5M18 17l-5-5 5-5"/></svg>
          </button>
        ` : nothing}

        <button
          class="btn nav-btn"
          @click=${() => this._goToPage(this.currentPage - 1)}
          ?disabled=${isFirst}
          aria-label="Previous page"
        >
          <svg viewBox="0 0 24 24"><path d="M15 18l-6-6 6-6"/></svg>
        </button>

        ${pages.map(page =>
          page === 'ellipsis'
            ? html`<span class="ellipsis">...</span>`
            : html`
              <button
                class=${classMap({ btn: true, active: page === this.currentPage })}
                @click=${() => this._goToPage(page)}
                aria-current=${page === this.currentPage ? 'page' : nothing}
              >
                ${page}
              </button>
            `
        )}

        <button
          class="btn nav-btn"
          @click=${() => this._goToPage(this.currentPage + 1)}
          ?disabled=${isLast}
          aria-label="Next page"
        >
          <svg viewBox="0 0 24 24"><path d="M9 18l6-6-6-6"/></svg>
        </button>

        ${this.showFirstLast ? html`
          <button
            class="btn nav-btn"
            @click=${() => this._goToPage(this._totalPages)}
            ?disabled=${isLast}
            aria-label="Last page"
          >
            <svg viewBox="0 0 24 24"><path d="M13 17l5-5-5-5M6 17l5-5-5-5"/></svg>
          </button>
        ` : nothing}
      </nav>
    `;
  }
}

declare global {
  interface HTMLElementTagNameMap {
    'mcp-pagination': McpPagination;
  }
}
