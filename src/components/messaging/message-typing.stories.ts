import type { Meta, StoryObj } from '@storybook/web-components-vite';
import { html } from 'lit';
import './message-typing.js';
import '../primitives/avatar.js';

const meta: Meta = {
  title: 'Messaging/MessageTyping',
  component: 'mcp-message-typing',
  tags: ['autodocs'],
  argTypes: {
    variant: { control: 'select', options: ['dots', 'pulse', 'wave'] },
  },
};

export default meta;
type Story = StoryObj;

export const Default: Story = {
  render: () => html`
    <mcp-message-typing></mcp-message-typing>
  `,
};

export const Variants: Story = {
  render: () => html`
    <div style="display: flex; flex-direction: column; gap: 1.5rem;">
      <div>
        <p style="font-size: 0.75rem; color: var(--mcp-color-ghost-foreground); margin-bottom: 0.5rem;">Dots (bounce)</p>
        <mcp-message-typing variant="dots"></mcp-message-typing>
      </div>
      <div>
        <p style="font-size: 0.75rem; color: var(--mcp-color-ghost-foreground); margin-bottom: 0.5rem;">Pulse (fade)</p>
        <mcp-message-typing variant="pulse"></mcp-message-typing>
      </div>
      <div>
        <p style="font-size: 0.75rem; color: var(--mcp-color-ghost-foreground); margin-bottom: 0.5rem;">Wave (jump)</p>
        <mcp-message-typing variant="wave"></mcp-message-typing>
      </div>
    </div>
  `,
};

export const WithAvatar: Story = {
  render: () => html`
    <mcp-message-typing>
      <mcp-avatar slot="avatar" name="Alice" size="sm"></mcp-avatar>
    </mcp-message-typing>
  `,
};

export const WithLabel: Story = {
  render: () => html`
    <mcp-message-typing>
      <mcp-avatar slot="avatar" name="Alice" size="sm"></mcp-avatar>
      <span slot="label">Alice is typing...</span>
    </mcp-message-typing>
  `,
};

export const MultipleTyping: Story = {
  name: 'Multiple People Typing',
  render: () => html`
    <mcp-message-typing>
      <div slot="avatar" style="display: flex;">
        <mcp-avatar name="Alice" size="sm" style="margin-right: -0.5rem; z-index: 2;"></mcp-avatar>
        <mcp-avatar name="Bob" size="sm" style="margin-right: -0.5rem; z-index: 1;"></mcp-avatar>
        <mcp-avatar name="Charlie" size="sm"></mcp-avatar>
      </div>
      <span slot="label">3 people are typing...</span>
    </mcp-message-typing>
  `,
};

export const InConversation: Story = {
  name: 'In Conversation Context',
  render: () => html`
    <div style="display: flex; flex-direction: column; gap: 0.5rem; max-width: 400px; padding: 1rem; background: var(--mcp-color-background); border-radius: var(--mcp-radius-lg);">
      <mcp-message align="start" variant="bubble">
        <mcp-avatar slot="avatar" name="Support" size="sm"></mcp-avatar>
        Let me check that for you...
      </mcp-message>

      <mcp-message-typing variant="dots">
        <mcp-avatar slot="avatar" name="Support" size="sm"></mcp-avatar>
      </mcp-message-typing>
    </div>
  `,
};

export const AITyping: Story = {
  name: 'AI Assistant Typing',
  render: () => html`
    <div style="display: flex; flex-direction: column; gap: 0.5rem; max-width: 500px;">
      <mcp-message align="end" variant="bubble">
        What's the weather like today?
      </mcp-message>

      <mcp-message-typing variant="pulse">
        <mcp-avatar slot="avatar" size="sm">
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" style="width: 1rem; height: 1rem;">
            <circle cx="12" cy="12" r="3"/>
            <path d="M12 1v2M12 21v2M4.22 4.22l1.42 1.42M18.36 18.36l1.42 1.42M1 12h2M21 12h2M4.22 19.78l1.42-1.42M18.36 5.64l1.42-1.42"/>
          </svg>
        </mcp-avatar>
        <span slot="label">Claude is thinking...</span>
      </mcp-message-typing>
    </div>
  `,
};

export const ChatApp: Story = {
  name: 'Chat App Example',
  render: () => html`
    <div style="display: flex; flex-direction: column; gap: 0.5rem; max-width: 400px; padding: 1rem; background: var(--mcp-color-ghost); border-radius: var(--mcp-radius-lg);">
      <mcp-message align="start" variant="bubble">
        <mcp-avatar slot="avatar" name="John" size="sm"></mcp-avatar>
        Hey, are you coming to the party tonight?
      </mcp-message>

      <mcp-message align="end" variant="bubble">
        Yeah! What time does it start?
      </mcp-message>

      <mcp-message-typing variant="wave">
        <mcp-avatar slot="avatar" name="John" size="sm"></mcp-avatar>
      </mcp-message-typing>
    </div>
  `,
};
