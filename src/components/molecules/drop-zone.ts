import { LitElement, html, css } from 'lit';
import { customElement, property, state } from 'lit/decorators.js';
import { classMap } from 'lit/directives/class-map.js';
import { baseStyles } from '../../styles/index.js';

/**
 * A drag-and-drop file upload zone.
 *
 * @slot - Custom content for the drop zone (replaces default)
 * @slot icon - Custom icon
 *
 * @fires mcp-drop - When files are dropped, detail contains FileList
 * @fires mcp-select - When files are selected via click, detail contains FileList
 *
 * @csspart dropzone - The drop zone container
 * @csspart input - The hidden file input
 */
@customElement('mcp-drop-zone')
export class McpDropZone extends LitElement {
  static styles = [
    baseStyles,
    css`
      :host {
        display: block;
      }

      .dropzone {
        display: flex;
        flex-direction: column;
        align-items: center;
        justify-content: center;
        gap: var(--mcp-space-3);
        padding: var(--mcp-space-8);
        border: 2px dashed var(--mcp-color-border);
        border-radius: var(--mcp-radius-lg);
        background: var(--mcp-color-background);
        cursor: pointer;
        transition: all var(--mcp-transition-fast);
        text-align: center;
      }

      .dropzone:hover {
        border-color: var(--mcp-color-primary);
        background: var(--mcp-color-primary-muted);
      }

      .dropzone.dragging {
        border-color: var(--mcp-color-primary);
        background: var(--mcp-color-primary-muted);
        border-style: solid;
      }

      .dropzone.disabled {
        opacity: var(--mcp-opacity-disabled);
        cursor: not-allowed;
        pointer-events: none;
      }

      .dropzone.compact {
        padding: var(--mcp-space-4);
        flex-direction: row;
      }

      .dropzone.compact .icon {
        width: 1.5rem;
        height: 1.5rem;
      }

      .icon {
        width: 2.5rem;
        height: 2.5rem;
        color: var(--mcp-color-ghost-foreground);
      }

      .dragging .icon {
        color: var(--mcp-color-primary);
      }

      .icon svg {
        width: 100%;
        height: 100%;
        stroke: currentColor;
        stroke-width: 1.5;
        fill: none;
      }

      .text {
        display: flex;
        flex-direction: column;
        gap: var(--mcp-space-1);
      }

      .compact .text {
        flex-direction: row;
        gap: var(--mcp-space-2);
        align-items: center;
      }

      .primary-text {
        font-size: var(--mcp-font-size-sm);
        font-weight: var(--mcp-font-weight-medium);
        color: var(--mcp-color-foreground);
      }

      .primary-text strong {
        color: var(--mcp-color-primary);
      }

      .secondary-text {
        font-size: var(--mcp-font-size-xs);
        color: var(--mcp-color-ghost-foreground);
      }

      input[type="file"] {
        display: none;
      }

      /* Error state */
      .error {
        border-color: var(--mcp-color-error);
      }

      .error:hover {
        background: var(--mcp-color-error-muted);
      }

      .error-message {
        font-size: var(--mcp-font-size-xs);
        color: var(--mcp-color-error);
        margin-top: var(--mcp-space-2);
      }
    `
  ];

  @property({ type: String }) accept = '';
  @property({ type: Boolean }) multiple = false;
  @property({ type: Boolean }) disabled = false;
  @property({ type: Boolean }) compact = false;
  @property({ type: String }) label = 'Drop files here or click to upload';
  @property({ type: String }) hint = '';
  @property({ type: String }) error = '';
  @property({ type: Number }) maxSize = 0; // in bytes, 0 = no limit

  @state() private _dragging = false;

  private _handleDragOver(e: DragEvent) {
    e.preventDefault();
    if (!this.disabled) {
      this._dragging = true;
    }
  }

  private _handleDragLeave(e: DragEvent) {
    e.preventDefault();
    this._dragging = false;
  }

  private _handleDrop(e: DragEvent) {
    e.preventDefault();
    this._dragging = false;

    if (this.disabled) return;

    const files = e.dataTransfer?.files;
    if (files && files.length > 0) {
      this._processFiles(files, 'drop');
    }
  }

  private _handleClick() {
    if (this.disabled) return;
    const input = this.shadowRoot?.querySelector('input');
    input?.click();
  }

  private _handleInputChange(e: Event) {
    const input = e.target as HTMLInputElement;
    if (input.files && input.files.length > 0) {
      this._processFiles(input.files, 'select');
      // Reset input so same file can be selected again
      input.value = '';
    }
  }

  private _processFiles(files: FileList, source: 'drop' | 'select') {
    // Validate file types if accept is specified
    if (this.accept) {
      const acceptedTypes = this.accept.split(',').map(t => t.trim().toLowerCase());
      const validFiles = Array.from(files).filter(file => {
        const fileExt = '.' + file.name.split('.').pop()?.toLowerCase();
        const fileType = file.type.toLowerCase();
        return acceptedTypes.some(type => {
          if (type.startsWith('.')) {
            return fileExt === type;
          }
          if (type.endsWith('/*')) {
            return fileType.startsWith(type.replace('/*', '/'));
          }
          return fileType === type;
        });
      });

      if (validFiles.length === 0) {
        return; // No valid files
      }
    }

    // Validate file size if maxSize is specified
    if (this.maxSize > 0) {
      const validFiles = Array.from(files).filter(file => file.size <= this.maxSize);
      if (validFiles.length === 0) {
        return; // No files within size limit
      }
    }

    const eventName = source === 'drop' ? 'mcp-drop' : 'mcp-select';
    this.dispatchEvent(new CustomEvent(eventName, {
      detail: { files },
      bubbles: true,
      composed: true,
    }));
  }

  render() {
    const classes = {
      dropzone: true,
      dragging: this._dragging,
      disabled: this.disabled,
      compact: this.compact,
      error: !!this.error,
    };

    return html`
      <div
        class=${classMap(classes)}
        part="dropzone"
        @dragover=${this._handleDragOver}
        @dragleave=${this._handleDragLeave}
        @drop=${this._handleDrop}
        @click=${this._handleClick}
        role="button"
        tabindex=${this.disabled ? '-1' : '0'}
        @keydown=${(e: KeyboardEvent) => e.key === 'Enter' && this._handleClick()}
        aria-disabled=${this.disabled}
      >
        <slot name="icon">
          <div class="icon">
            <svg viewBox="0 0 24 24">
              <path d="M21 15v4a2 2 0 01-2 2H5a2 2 0 01-2-2v-4"/>
              <polyline points="17 8 12 3 7 8"/>
              <line x1="12" y1="3" x2="12" y2="15"/>
            </svg>
          </div>
        </slot>

        <slot>
          <div class="text">
            <span class="primary-text">
              ${this._dragging
                ? 'Drop files here'
                : html`<strong>Click to upload</strong> or drag and drop`
              }
            </span>
            ${this.hint && !this.compact
              ? html`<span class="secondary-text">${this.hint}</span>`
              : null
            }
          </div>
        </slot>

        <input
          part="input"
          type="file"
          accept=${this.accept}
          ?multiple=${this.multiple}
          ?disabled=${this.disabled}
          @change=${this._handleInputChange}
        />
      </div>

      ${this.error
        ? html`<div class="error-message">${this.error}</div>`
        : null
      }
    `;
  }
}

declare global {
  interface HTMLElementTagNameMap {
    'mcp-drop-zone': McpDropZone;
  }
}
