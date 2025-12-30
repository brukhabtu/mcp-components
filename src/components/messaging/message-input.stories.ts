import type { Meta, StoryObj } from '@storybook/web-components-vite';
import { html } from 'lit';
import './message-input.js';
import '../primitives/icon-button.js';

const meta: Meta = {
  title: 'Messaging/MessageInput',
  component: 'mcp-message-input',
  tags: ['autodocs'],
  argTypes: {
    value: { control: 'text' },
    placeholder: { control: 'text' },
    disabled: { control: 'boolean' },
    maxlength: { control: 'number' },
    showCount: { control: 'boolean' },
    submitOnEnter: { control: 'boolean' },
  },
};

export default meta;
type Story = StoryObj;

// Common icons
const sendIcon = html`<svg viewBox="0 0 24 24" style="width: 1rem; height: 1rem;"><line x1="22" y1="2" x2="11" y2="13"/><polygon points="22 2 15 22 11 13 2 9 22 2"/></svg>`;
const attachIcon = html`<svg viewBox="0 0 24 24" style="width: 1rem; height: 1rem;"><path d="M21.44 11.05l-9.19 9.19a6 6 0 01-8.49-8.49l9.19-9.19a4 4 0 015.66 5.66l-9.2 9.19a2 2 0 01-2.83-2.83l8.49-8.48"/></svg>`;
const emojiIcon = html`<svg viewBox="0 0 24 24" style="width: 1rem; height: 1rem;"><circle cx="12" cy="12" r="10"/><path d="M8 14s1.5 2 4 2 4-2 4-2"/><line x1="9" y1="9" x2="9.01" y2="9"/><line x1="15" y1="9" x2="15.01" y2="9"/></svg>`;
const micIcon = html`<svg viewBox="0 0 24 24" style="width: 1rem; height: 1rem;"><path d="M12 1a3 3 0 00-3 3v8a3 3 0 006 0V4a3 3 0 00-3-3z"/><path d="M19 10v2a7 7 0 01-14 0v-2"/><line x1="12" y1="19" x2="12" y2="23"/><line x1="8" y1="23" x2="16" y2="23"/></svg>`;

export const Default: Story = {
  render: () => html`
    <mcp-message-input
      @mcp-submit=${(e: CustomEvent) => console.log('Submit:', e.detail.value)}
    ></mcp-message-input>
  `,
};

export const WithPlaceholder: Story = {
  render: () => html`
    <mcp-message-input
      placeholder="Ask me anything..."
    ></mcp-message-input>
  `,
};

export const WithValue: Story = {
  render: () => html`
    <mcp-message-input
      value="Hello, this is a pre-filled message"
    ></mcp-message-input>
  `,
};

export const WithSendButton: Story = {
  render: () => html`
    <mcp-message-input
      placeholder="Type a message..."
      @mcp-submit=${(e: CustomEvent) => console.log('Submit:', e.detail.value)}
    >
      <mcp-icon-button slot="end" variant="primary" size="sm" label="Send">
        ${sendIcon}
      </mcp-icon-button>
    </mcp-message-input>
  `,
};

export const WithMultipleActions: Story = {
  render: () => html`
    <mcp-message-input
      placeholder="Type a message..."
    >
      <mcp-icon-button slot="start" variant="ghost" size="sm" label="Attach file">
        ${attachIcon}
      </mcp-icon-button>
      <mcp-icon-button slot="end" variant="ghost" size="sm" label="Emoji">
        ${emojiIcon}
      </mcp-icon-button>
      <mcp-icon-button slot="end" variant="ghost" size="sm" label="Voice message">
        ${micIcon}
      </mcp-icon-button>
      <mcp-icon-button slot="end" variant="primary" size="sm" label="Send">
        ${sendIcon}
      </mcp-icon-button>
    </mcp-message-input>
  `,
};

export const WithCharacterCount: Story = {
  render: () => html`
    <mcp-message-input
      placeholder="Type a message (max 280 characters)..."
      maxlength="280"
      showCount
      value="This message shows the character count. Try typing more to see it update!"
    ></mcp-message-input>
  `,
};

export const NearLimit: Story = {
  render: () => html`
    <mcp-message-input
      placeholder="Type a message..."
      maxlength="100"
      showCount
      value="This message is getting close to the character limit and should show a warning color..."
    ></mcp-message-input>
  `,
};

export const AtLimit: Story = {
  render: () => html`
    <mcp-message-input
      placeholder="Type a message..."
      maxlength="50"
      showCount
      value="This message has reached the maximum character limit"
    ></mcp-message-input>
  `,
};

export const Disabled: Story = {
  render: () => html`
    <mcp-message-input
      disabled
      placeholder="Input is disabled..."
    >
      <mcp-icon-button slot="end" variant="ghost" size="sm" label="Send" disabled>
        ${sendIcon}
      </mcp-icon-button>
    </mcp-message-input>
  `,
};

export const WithAboveSlot: Story = {
  name: 'With Reply Preview (above slot)',
  render: () => html`
    <mcp-message-input placeholder="Type your reply...">
      <div slot="above" style="display: flex; align-items: center; justify-content: space-between; padding: 0.5rem; background: var(--mcp-color-ghost); border-radius: var(--mcp-radius-md); font-size: 0.875rem;">
        <div>
          <span style="color: var(--mcp-color-ghost-foreground);">Replying to </span>
          <strong>Alice</strong>
        </div>
        <mcp-icon-button variant="ghost" size="sm" label="Cancel reply">
          <svg viewBox="0 0 24 24" style="width: 0.875rem; height: 0.875rem;"><line x1="18" y1="6" x2="6" y2="18"/><line x1="6" y1="6" x2="18" y2="18"/></svg>
        </mcp-icon-button>
      </div>
      <mcp-icon-button slot="end" variant="primary" size="sm" label="Send">
        ${sendIcon}
      </mcp-icon-button>
    </mcp-message-input>
  `,
};

export const WithAttachmentPreview: Story = {
  name: 'With Attachment Preview',
  render: () => html`
    <mcp-message-input placeholder="Add a caption...">
      <div slot="above" style="display: flex; gap: 0.5rem;">
        <div style="position: relative; width: 80px; height: 80px; border-radius: var(--mcp-radius-md); overflow: hidden; background: var(--mcp-color-ghost);">
          <img src="https://via.placeholder.com/80" style="width: 100%; height: 100%; object-fit: cover;" alt="Attachment"/>
          <button style="position: absolute; top: 2px; right: 2px; width: 20px; height: 20px; border-radius: 50%; background: rgba(0,0,0,0.5); border: none; color: white; cursor: pointer; display: flex; align-items: center; justify-content: center;">
            <svg viewBox="0 0 24 24" style="width: 12px; height: 12px;" fill="none" stroke="currentColor" stroke-width="2"><line x1="18" y1="6" x2="6" y2="18"/><line x1="6" y1="6" x2="18" y2="18"/></svg>
          </button>
        </div>
        <div style="position: relative; width: 80px; height: 80px; border-radius: var(--mcp-radius-md); overflow: hidden; background: var(--mcp-color-ghost);">
          <img src="https://via.placeholder.com/80" style="width: 100%; height: 100%; object-fit: cover;" alt="Attachment"/>
          <button style="position: absolute; top: 2px; right: 2px; width: 20px; height: 20px; border-radius: 50%; background: rgba(0,0,0,0.5); border: none; color: white; cursor: pointer; display: flex; align-items: center; justify-content: center;">
            <svg viewBox="0 0 24 24" style="width: 12px; height: 12px;" fill="none" stroke="currentColor" stroke-width="2"><line x1="18" y1="6" x2="6" y2="18"/><line x1="6" y1="6" x2="18" y2="18"/></svg>
          </button>
        </div>
      </div>
      <mcp-icon-button slot="start" variant="ghost" size="sm" label="Add more">
        ${attachIcon}
      </mcp-icon-button>
      <mcp-icon-button slot="end" variant="primary" size="sm" label="Send">
        ${sendIcon}
      </mcp-icon-button>
    </mcp-message-input>
  `,
};

export const FullExample: Story = {
  name: 'Full-Featured Example',
  render: () => html`
    <div style="max-width: 500px;">
      <mcp-message-input
        placeholder="Message #general"
        maxlength="2000"
        @mcp-submit=${(e: CustomEvent) => {
          console.log('Submitted:', e.detail.value);
          const input = e.target as HTMLElement & { clear: () => void };
          input.clear();
        }}
      >
        <mcp-icon-button slot="start" variant="ghost" size="sm" label="Attach file">
          ${attachIcon}
        </mcp-icon-button>
        <mcp-icon-button slot="end" variant="ghost" size="sm" label="Emoji">
          ${emojiIcon}
        </mcp-icon-button>
        <mcp-icon-button slot="end" variant="primary" size="sm" label="Send">
          ${sendIcon}
        </mcp-icon-button>
      </mcp-message-input>
      <p style="font-size: 0.75rem; color: var(--mcp-color-ghost-foreground); margin-top: 0.5rem;">
        Press Enter to send, Shift+Enter for new line
      </p>
    </div>
  `,
};
