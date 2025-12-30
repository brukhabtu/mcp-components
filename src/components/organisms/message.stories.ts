import type { Meta, StoryObj } from '@storybook/web-components-vite';
import { html } from 'lit';
import './message.js';
import '../atoms/avatar.js';

const meta: Meta = {
  title: 'Organisms/Message',
  component: 'mcp-message',
  tags: ['autodocs'],
  argTypes: {
    align: { control: 'select', options: ['start', 'end'] },
    variant: { control: 'select', options: ['default', 'ghost', 'bubble'] },
    status: { control: 'select', options: ['sending', 'sent', 'delivered', 'read', 'error'] },
    timestamp: { control: 'text' },
    continuation: { control: 'boolean' },
  },
};

export default meta;
type Story = StoryObj;

export const Default: Story = {
  args: {
    align: 'start',
    variant: 'ghost',
  },
  render: (args) => html`
    <mcp-message
      align=${args.align}
      variant=${args.variant}
      status=${args.status || ''}
      timestamp=${args.timestamp || ''}
      ?continuation=${args.continuation}
    >
      Hello! How can I help you today?
    </mcp-message>
  `,
};

export const Alignments: Story = {
  render: () => html`
    <div style="display: flex; flex-direction: column; gap: 1rem; max-width: 500px;">
      <mcp-message align="start" variant="ghost">
        Message aligned to start (incoming)
      </mcp-message>
      <mcp-message align="end" variant="ghost">
        Message aligned to end (outgoing)
      </mcp-message>
    </div>
  `,
};

export const Variants: Story = {
  render: () => html`
    <div style="display: flex; flex-direction: column; gap: 1rem; max-width: 500px;">
      <mcp-message variant="default">Default variant with border</mcp-message>
      <mcp-message variant="ghost">Ghost variant with subtle background</mcp-message>
      <mcp-message variant="bubble">Bubble variant (like iMessage)</mcp-message>
    </div>
  `,
};

export const BubbleVariant: Story = {
  name: 'Bubble Variant (iMessage style)',
  render: () => html`
    <div style="display: flex; flex-direction: column; gap: 0.5rem; max-width: 500px;">
      <mcp-message align="start" variant="bubble">
        Hey! How's it going?
      </mcp-message>
      <mcp-message align="end" variant="bubble">
        Pretty good! Just working on some code.
      </mcp-message>
      <mcp-message align="end" variant="bubble" continuation>
        How about you?
      </mcp-message>
      <mcp-message align="start" variant="bubble">
        Same here! Want to grab lunch later?
      </mcp-message>
    </div>
  `,
};

export const WithAvatar: Story = {
  render: () => html`
    <div style="display: flex; flex-direction: column; gap: 1rem; max-width: 500px;">
      <mcp-message align="start" variant="ghost">
        <mcp-avatar slot="avatar" name="Alice" size="sm"></mcp-avatar>
        Hello! I'm Alice.
      </mcp-message>
      <mcp-message align="end" variant="ghost">
        <mcp-avatar slot="avatar" name="Bob" size="sm"></mcp-avatar>
        Hi Alice! I'm Bob.
      </mcp-message>
    </div>
  `,
};

export const WithHeader: Story = {
  render: () => html`
    <div style="display: flex; flex-direction: column; gap: 1rem; max-width: 500px;">
      <mcp-message align="start" variant="ghost">
        <mcp-avatar slot="avatar" name="Alice" size="sm"></mcp-avatar>
        <span slot="header">Alice</span>
        This message has a header showing the sender name.
      </mcp-message>
      <mcp-message align="start" variant="ghost">
        <mcp-avatar slot="avatar" name="Bob" size="sm"></mcp-avatar>
        <span slot="header">Bob &middot; 2:30 PM</span>
        Headers can include timestamps too.
      </mcp-message>
    </div>
  `,
};

export const MessageStatus: Story = {
  render: () => html`
    <div style="display: flex; flex-direction: column; gap: 1rem; max-width: 500px;">
      <mcp-message align="end" variant="bubble" status="sending">
        Sending this message...
      </mcp-message>
      <mcp-message align="end" variant="bubble" status="sent">
        This message was sent
      </mcp-message>
      <mcp-message align="end" variant="bubble" status="delivered">
        This message was delivered
      </mcp-message>
      <mcp-message align="end" variant="bubble" status="read">
        This message was read
      </mcp-message>
      <mcp-message align="end" variant="bubble" status="error">
        This message failed to send
      </mcp-message>
    </div>
  `,
};

export const WithTimestamp: Story = {
  render: () => html`
    <div style="display: flex; flex-direction: column; gap: 1rem; max-width: 500px;">
      <mcp-message align="start" variant="ghost" timestamp="2:30 PM">
        <mcp-avatar slot="avatar" name="Alice" size="sm"></mcp-avatar>
        Message with timestamp
      </mcp-message>
      <mcp-message align="end" variant="ghost" timestamp="2:31 PM" status="read">
        Message with timestamp and status
      </mcp-message>
    </div>
  `,
};

export const GroupedMessages: Story = {
  name: 'Grouped Messages (Continuations)',
  render: () => html`
    <div style="display: flex; flex-direction: column; gap: 0.25rem; max-width: 500px;">
      <mcp-message align="start" variant="ghost">
        <mcp-avatar slot="avatar" name="Alice" size="sm"></mcp-avatar>
        <span slot="header">Alice &middot; 2:30 PM</span>
        This is the first message in a group.
      </mcp-message>
      <mcp-message align="start" variant="ghost" continuation>
        <mcp-avatar slot="avatar" name="Alice" size="sm"></mcp-avatar>
        This is a continuation - notice the avatar is hidden.
      </mcp-message>
      <mcp-message align="start" variant="ghost" continuation>
        <mcp-avatar slot="avatar" name="Alice" size="sm"></mcp-avatar>
        And another one!
      </mcp-message>
    </div>
  `,
};

export const ChatConversation: Story = {
  name: 'Full Chat Conversation',
  render: () => html`
    <div style="display: flex; flex-direction: column; gap: 0.5rem; max-width: 500px; padding: 1rem; background: var(--mcp-color-background); border-radius: var(--mcp-radius-lg);">
      <mcp-message align="start" variant="bubble">
        <mcp-avatar slot="avatar" name="Support" size="sm"></mcp-avatar>
        <span slot="header">Support</span>
        Hi there! How can I help you today?
      </mcp-message>

      <mcp-message align="end" variant="bubble" status="read">
        I'm having trouble with my account login.
      </mcp-message>

      <mcp-message align="start" variant="bubble">
        <mcp-avatar slot="avatar" name="Support" size="sm"></mcp-avatar>
        I'd be happy to help with that. Can you tell me what error message you're seeing?
      </mcp-message>

      <mcp-message align="end" variant="bubble" status="read">
        It says "Invalid credentials" but I'm sure my password is correct.
      </mcp-message>
      <mcp-message align="end" variant="bubble" continuation status="read">
        I even tried resetting it.
      </mcp-message>

      <mcp-message align="start" variant="bubble">
        <mcp-avatar slot="avatar" name="Support" size="sm"></mcp-avatar>
        Let me check your account status. One moment please...
      </mcp-message>
    </div>
  `,
};
