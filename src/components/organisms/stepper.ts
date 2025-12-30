import { LitElement, html, css, nothing } from 'lit';
import { customElement, property } from 'lit/decorators.js';
import { classMap } from 'lit/directives/class-map.js';
import { baseStyles } from '../../styles/index.js';

/**
 * A stepper/wizard component for multi-step processes.
 *
 * @slot - Step elements
 */
@customElement('mcp-stepper')
export class McpStepper extends LitElement {
  static styles = [
    baseStyles,
    css`
      :host {
        display: block;
      }

      .stepper {
        display: flex;
        gap: var(--mcp-space-2);
      }

      .stepper.vertical {
        flex-direction: column;
      }

      .stepper.horizontal ::slotted(mcp-step) {
        flex: 1;
      }
    `
  ];

  @property({ type: Number }) currentStep = 0;
  @property({ type: Boolean }) vertical = false;
  @property({ type: Boolean }) clickable = false;

  updated(changedProperties: Map<string, unknown>) {
    if (changedProperties.has('currentStep') || changedProperties.has('clickable')) {
      this._updateSteps();
    }
  }

  private _updateSteps() {
    const steps = this.querySelectorAll('mcp-step');
    steps.forEach((step, index) => {
      step.setAttribute('data-index', String(index));
      step.setAttribute('data-state',
        index < this.currentStep ? 'completed' :
        index === this.currentStep ? 'current' : 'upcoming'
      );
      if (this.clickable) {
        step.setAttribute('clickable', '');
      } else {
        step.removeAttribute('clickable');
      }
    });
  }

  firstUpdated() {
    this._updateSteps();
  }

  render() {
    return html`
      <div class=${classMap({ stepper: true, vertical: this.vertical, horizontal: !this.vertical })}>
        <slot @slotchange=${this._updateSteps}></slot>
      </div>
    `;
  }
}

/**
 * A single step in a stepper.
 *
 * @fires mcp-step-click - When the step is clicked (if clickable)
 */
@customElement('mcp-step')
export class McpStep extends LitElement {
  static styles = [
    baseStyles,
    css`
      :host {
        display: flex;
        align-items: flex-start;
        gap: var(--mcp-space-3);
      }

      .step-indicator {
        display: flex;
        flex-direction: column;
        align-items: center;
        gap: var(--mcp-space-2);
      }

      .step-number {
        display: flex;
        align-items: center;
        justify-content: center;
        width: 2rem;
        height: 2rem;
        border-radius: 50%;
        font-size: var(--mcp-font-size-sm);
        font-weight: var(--mcp-font-weight-semibold);
        border: 2px solid var(--mcp-color-border);
        background: var(--mcp-color-background);
        color: var(--mcp-color-ghost-foreground);
        transition: all var(--mcp-transition-fast);
      }

      :host([data-state="current"]) .step-number {
        border-color: var(--mcp-color-primary);
        background: var(--mcp-color-primary);
        color: var(--mcp-color-primary-foreground);
      }

      :host([data-state="completed"]) .step-number {
        border-color: var(--mcp-color-primary);
        background: var(--mcp-color-primary);
        color: var(--mcp-color-primary-foreground);
      }

      .checkmark {
        width: 1rem;
        height: 1rem;
        stroke: currentColor;
        stroke-width: 3;
        fill: none;
      }

      .connector {
        flex: 1;
        width: 2px;
        min-height: 1.5rem;
        background: var(--mcp-color-border);
        transition: background var(--mcp-transition-fast);
      }

      :host([data-state="completed"]) .connector {
        background: var(--mcp-color-primary);
      }

      .step-content {
        flex: 1;
        padding-bottom: var(--mcp-space-4);
      }

      .step-label {
        font-weight: var(--mcp-font-weight-medium);
        color: var(--mcp-color-ghost-foreground);
        transition: color var(--mcp-transition-fast);
      }

      :host([data-state="current"]) .step-label {
        color: var(--mcp-color-foreground);
      }

      :host([data-state="completed"]) .step-label {
        color: var(--mcp-color-foreground);
      }

      .step-description {
        font-size: var(--mcp-font-size-sm);
        color: var(--mcp-color-ghost-foreground);
        margin-top: var(--mcp-space-1);
      }

      :host([clickable]) {
        cursor: pointer;
      }

      :host([clickable]) .step-number:hover {
        transform: scale(1.1);
      }

      :host([clickable]:focus-visible) .step-number {
        box-shadow: 0 0 0 3px var(--mcp-color-primary-muted);
      }
    `
  ];

  @property({ type: String }) label = '';
  @property({ type: String }) description = '';

  private _handleClick() {
    if (this.hasAttribute('clickable')) {
      const index = parseInt(this.getAttribute('data-index') || '0', 10);
      this.dispatchEvent(new CustomEvent('mcp-step-click', {
        detail: { step: index },
        bubbles: true,
        composed: true,
      }));
    }
  }

  render() {
    const state = this.getAttribute('data-state') || 'upcoming';
    const index = parseInt(this.getAttribute('data-index') || '0', 10);
    const isCompleted = state === 'completed';

    return html`
      <div class="step-indicator">
        <div
          class="step-number"
          @click=${this._handleClick}
          tabindex=${this.hasAttribute('clickable') ? 0 : -1}
          @keydown=${(e: KeyboardEvent) => e.key === 'Enter' && this._handleClick()}
        >
          ${isCompleted
            ? html`<svg class="checkmark" viewBox="0 0 24 24"><path d="M5 13l4 4L19 7"/></svg>`
            : index + 1
          }
        </div>
        <div class="connector"></div>
      </div>
      <div class="step-content">
        <div class="step-label">${this.label}</div>
        ${this.description ? html`<div class="step-description">${this.description}</div>` : nothing}
        <slot></slot>
      </div>
    `;
  }
}

declare global {
  interface HTMLElementTagNameMap {
    'mcp-stepper': McpStepper;
    'mcp-step': McpStep;
  }
}
