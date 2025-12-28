import { LitElement, html, css, nothing } from 'lit';
import { customElement, property, state } from 'lit/decorators.js';
import { baseStyles } from '../../styles/index.js';

/**
 * A code block component for displaying code with optional copy functionality.
 * Ideal for displaying MCP tool responses, JSON data, etc.
 * 
 * @slot - Code content
 */
@customElement('mcp-code')
export class McpCode extends LitElement {
  static styles = [
    baseStyles,
    css`
      :host {
        display: block;
      }

      .wrapper {
        position: relative;
        background: var(--mcp-color-muted);
        border: 1px solid var(--mcp-color-border);
        border-radius: var(--mcp-radius-lg);
        overflow: hidden;
      }

      .header {
        display: flex;
        align-items: center;
        justify-content: space-between;
        padding: var(--mcp-space-2) var(--mcp-space-4);
        background: var(--mcp-color-border);
        font-size: var(--mcp-font-size-xs);
        color: var(--mcp-color-muted-foreground);
      }

      .language {
        font-weight: var(--mcp-font-weight-medium);
        text-transform: uppercase;
      }

      .copy-btn {
        display: inline-flex;
        align-items: center;
        gap: var(--mcp-space-1);
        padding: var(--mcp-space-1) var(--mcp-space-2);
        border: none;
        border-radius: var(--mcp-radius-sm);
        background: transparent;
        color: var(--mcp-color-muted-foreground);
        font-size: var(--mcp-font-size-xs);
        cursor: pointer;
        transition: all var(--mcp-transition-fast);
      }

      .copy-btn:hover {
        background: var(--mcp-color-background);
        color: var(--mcp-color-foreground);
      }

      .copy-btn svg {
        width: 0.875rem;
        height: 0.875rem;
        fill: none;
        stroke: currentColor;
        stroke-width: 2;
      }

      pre {
        margin: 0;
        padding: var(--mcp-space-4);
        overflow-x: auto;
        font-family: var(--mcp-font-family-mono);
        font-size: var(--mcp-font-size-sm);
        line-height: var(--mcp-line-height-normal);
        color: var(--mcp-color-foreground);
      }

      code {
        font-family: inherit;
      }

      /* Inline code variant */
      :host([inline]) {
        display: inline;
      }

      :host([inline]) .wrapper {
        display: inline;
        padding: var(--mcp-space-1) var(--mcp-space-2);
        border-radius: var(--mcp-radius-sm);
      }

      :host([inline]) pre {
        display: inline;
        padding: 0;
      }

      :host([inline]) .header {
        display: none;
      }
    `
  ];

  /** Programming language for syntax highlighting hints */
  @property({ type: String }) language = '';
  
  /** Whether to show copy button */
  @property({ type: Boolean }) copyable = true;
  
  /** The code content (alternative to slot) */
  @property({ type: String }) code = '';
  
  /** Inline code display */
  @property({ type: Boolean, reflect: true }) inline = false;

  @state() private _copied = false;

  private async _handleCopy() {
    const codeContent = this.code || this.textContent || '';
    
    try {
      await navigator.clipboard.writeText(codeContent.trim());
      this._copied = true;
      setTimeout(() => { this._copied = false; }, 2000);
    } catch (err) {
      console.error('Failed to copy:', err);
    }
  }

  render() {
    const showHeader = !this.inline && (this.language || this.copyable);

    return html`
      <div class="wrapper">
        ${showHeader ? html`
          <div class="header">
            <span class="language">${this.language}</span>
            ${this.copyable ? html`
              <button class="copy-btn" @click=${this._handleCopy}>
                ${this._copied ? html`
                  <svg viewBox="0 0 24 24"><path d="M5 13l4 4L19 7"/></svg>
                  Copied!
                ` : html`
                  <svg viewBox="0 0 24 24">
                    <path d="M8 16H6a2 2 0 01-2-2V6a2 2 0 012-2h8a2 2 0 012 2v2m-6 12h8a2 2 0 002-2v-8a2 2 0 00-2-2h-8a2 2 0 00-2 2v8a2 2 0 002 2z"/>
                  </svg>
                  Copy
                `}
              </button>
            ` : nothing}
          </div>
        ` : nothing}
        
        <pre><code>${this.code || html`<slot></slot>`}</code></pre>
      </div>
    `;
  }
}

declare global {
  interface HTMLElementTagNameMap {
    'mcp-code': McpCode;
  }
}
