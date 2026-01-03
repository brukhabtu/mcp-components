import { LitElement, html, css, nothing } from 'lit';
import { customElement, property, state } from 'lit/decorators.js';
import { classMap } from 'lit/directives/class-map.js';
import { baseStyles } from '../../styles/index.js';
import '../atoms/icon-button.js';
import '../atoms/code.js';

export type ToolCallStatus = 'pending' | 'running' | 'success' | 'error';

/**
 * A collapsible panel for displaying tool/function call details.
 * Composable with slots for customization.
 *
 * @slot icon - Custom status icon (overrides default)
 * @slot header-end - Content at the end of header (e.g., actions)
 * @slot sections - Additional custom sections
 *
 * @fires mcp-copy - When copy button is clicked, detail: { content: string, type: 'input' | 'output' }
 *
 * @csspart header - The header container
 * @csspart title - The tool name
 * @csspart section - Each collapsible section
 * @csspart content - Section content area
 */
@customElement('mcp-tool-call')
export class McpToolCall extends LitElement {
  static styles = [
    baseStyles,
    css`
      :host {
        display: block;
        max-width: 100%;
      }

      .tool-call {
        border: 1px solid var(--mcp-color-border);
        border-radius: var(--mcp-radius-lg);
        overflow: hidden;
        max-width: 100%;
      }

      .header {
        display: flex;
        align-items: center;
        gap: var(--mcp-space-3);
        padding: var(--mcp-space-3) var(--mcp-space-4);
        background: var(--mcp-color-ghost);
      }

      .status-icon {
        width: 1.25rem;
        height: 1.25rem;
        flex-shrink: 0;
      }

      .status-icon svg {
        width: 100%;
        height: 100%;
        stroke: currentColor;
        stroke-width: 2;
        fill: none;
      }

      .status-pending { color: var(--mcp-color-ghost-foreground); }
      .status-running { color: var(--mcp-color-info); }
      .status-success { color: var(--mcp-color-success); }
      .status-error { color: var(--mcp-color-error); }

      .status-running svg {
        animation: spin 1s linear infinite;
      }

      @keyframes spin {
        to { transform: rotate(360deg); }
      }

      .tool-name {
        font-family: var(--mcp-font-family-mono);
        font-size: var(--mcp-font-size-sm);
        font-weight: var(--mcp-font-weight-semibold);
        color: var(--mcp-color-foreground);
      }

      .duration {
        margin-left: auto;
        font-size: var(--mcp-font-size-xs);
        color: var(--mcp-color-ghost-foreground);
      }

      .section {
        border-top: 1px solid var(--mcp-color-border);
      }

      .section-header {
        display: flex;
        align-items: center;
        justify-content: space-between;
        padding: var(--mcp-space-2) var(--mcp-space-4);
        background: var(--mcp-color-background);
        cursor: pointer;
        transition: background var(--mcp-transition-fast);
      }

      .section-header:hover {
        background: var(--mcp-color-ghost);
      }

      .section-title {
        font-size: var(--mcp-font-size-xs);
        font-weight: var(--mcp-font-weight-medium);
        color: var(--mcp-color-ghost-foreground);
        text-transform: uppercase;
        letter-spacing: 0.05em;
      }

      .section-actions {
        display: flex;
        gap: var(--mcp-space-2);
      }

      .chevron {
        transition: transform var(--mcp-transition-fast);
      }

      .chevron.open {
        transform: rotate(180deg);
      }

      .section-content {
        display: none;
        padding: var(--mcp-space-3) var(--mcp-space-4);
        background: var(--mcp-color-background);
      }

      .section-content.open {
        display: block;
      }

      mcp-code {
        --mcp-font-size-sm: var(--mcp-font-size-xs);
      }

      mcp-code.error-output {
        --mcp-color-foreground: var(--mcp-color-error);
      }
    `
  ];

  @property({ type: String }) name = '';
  @property({ type: String }) status: ToolCallStatus = 'pending';
  @property({ type: Object }) input: Record<string, unknown> = {};
  @property({ type: Object }) output: unknown = null;
  @property({ type: String }) error = '';
  @property({ type: Number }) duration = 0;

  @state() private _inputOpen = false;
  @state() private _outputOpen = true;

  private get _statusIcon() {
    switch (this.status) {
      case 'pending':
        return html`<svg viewBox="0 0 24 24"><circle cx="12" cy="12" r="10"/></svg>`;
      case 'running':
        return html`<svg viewBox="0 0 24 24"><path d="M21 12a9 9 0 11-6.219-8.56"/></svg>`;
      case 'success':
        return html`<svg viewBox="0 0 24 24"><path d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"/></svg>`;
      case 'error':
        return html`<svg viewBox="0 0 24 24"><path d="M10 14l2-2m0 0l2-2m-2 2l-2-2m2 2l2 2m7-2a9 9 0 11-18 0 9 9 0 0118 0z"/></svg>`;
    }
  }

  private _formatDuration() {
    if (!this.duration) return '';
    if (this.duration < 1000) return `${this.duration}ms`;
    return `${(this.duration / 1000).toFixed(2)}s`;
  }

  private async _copyToClipboard(text: string, type: 'input' | 'output') {
    // Emit event so parent can handle (e.g., show toast)
    this.dispatchEvent(new CustomEvent('mcp-copy', {
      detail: { content: text, type },
      bubbles: true,
      composed: true,
    }));

    try {
      await navigator.clipboard.writeText(text);
    } catch (err) {
      console.error('Failed to copy:', err);
    }
  }

  render() {
    const hasInput = Object.keys(this.input).length > 0;
    const hasOutput = this.output !== null || this.error;
    const inputJson = JSON.stringify(this.input, null, 2);
    const outputJson = this.error || JSON.stringify(this.output, null, 2);

    return html`
      <div class="tool-call">
        <div class="header" part="header">
          <span class=${classMap({ 'status-icon': true, [`status-${this.status}`]: true })}>
            <slot name="icon">${this._statusIcon}</slot>
          </span>
          <span class="tool-name" part="title">${this.name}</span>
          ${this.duration ? html`<span class="duration">${this._formatDuration()}</span>` : nothing}
          <slot name="header-end"></slot>
        </div>

        ${hasInput ? html`
          <div class="section" part="section">
            <div class="section-header" @click=${() => this._inputOpen = !this._inputOpen}>
              <span class="section-title">Input</span>
              <div class="section-actions">
                <mcp-icon-button
                  variant="ghost"
                  size="sm"
                  label="Copy input"
                  @click=${(e: Event) => { e.stopPropagation(); this._copyToClipboard(inputJson, 'input'); }}
                >
                  <svg viewBox="0 0 24 24"><path d="M8 16H6a2 2 0 01-2-2V6a2 2 0 012-2h8a2 2 0 012 2v2m-6 12h8a2 2 0 002-2v-8a2 2 0 00-2-2h-8a2 2 0 00-2 2v8a2 2 0 002 2z"/></svg>
                </mcp-icon-button>
                <svg class=${classMap({ chevron: true, open: this._inputOpen })} viewBox="0 0 24 24" style="width:1rem;height:1rem;stroke:currentColor;stroke-width:2;fill:none;">
                  <path d="M6 9l6 6 6-6"/>
                </svg>
              </div>
            </div>
            <div class=${classMap({ 'section-content': true, open: this._inputOpen })} part="content">
              <mcp-code language="json" .code=${inputJson} .copyable=${false}></mcp-code>
            </div>
          </div>
        ` : nothing}

        ${hasOutput ? html`
          <div class="section" part="section">
            <div class="section-header" @click=${() => this._outputOpen = !this._outputOpen}>
              <span class="section-title">${this.error ? 'Error' : 'Output'}</span>
              <div class="section-actions">
                <mcp-icon-button
                  variant="ghost"
                  size="sm"
                  label="Copy output"
                  @click=${(e: Event) => { e.stopPropagation(); this._copyToClipboard(outputJson, 'output'); }}
                >
                  <svg viewBox="0 0 24 24"><path d="M8 16H6a2 2 0 01-2-2V6a2 2 0 012-2h8a2 2 0 012 2v2m-6 12h8a2 2 0 002-2v-8a2 2 0 00-2-2h-8a2 2 0 00-2 2v8a2 2 0 002 2z"/></svg>
                </mcp-icon-button>
                <svg class=${classMap({ chevron: true, open: this._outputOpen })} viewBox="0 0 24 24" style="width:1rem;height:1rem;stroke:currentColor;stroke-width:2;fill:none;">
                  <path d="M6 9l6 6 6-6"/>
                </svg>
              </div>
            </div>
            <div class=${classMap({ 'section-content': true, open: this._outputOpen })} part="content">
              <mcp-code class=${this.error ? 'error-output' : ''} language="json" .code=${outputJson} .copyable=${false}></mcp-code>
            </div>
          </div>
        ` : nothing}

        <!-- Custom sections slot -->
        <slot name="sections"></slot>
      </div>
    `;
  }
}

declare global {
  interface HTMLElementTagNameMap {
    'mcp-tool-call': McpToolCall;
  }
}
