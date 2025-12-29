import type { Meta, StoryObj } from '@storybook/web-components-vite';
import { html } from 'lit';
import './avatar';

const meta: Meta = {
  title: 'Primitives/Avatar',
  component: 'mcp-avatar',
  tags: ['autodocs'],
  argTypes: {
    src: { control: 'text' },
    alt: { control: 'text' },
    initials: { control: 'text' },
    size: {
      control: 'select',
      options: ['xs', 'sm', 'md', 'lg', 'xl'],
    },
    status: {
      control: 'select',
      options: ['none', 'online', 'offline', 'busy', 'away'],
    },
  },
};

export default meta;
type Story = StoryObj;

export const Default: Story = {
  args: {
    src: 'https://i.pravatar.cc/150?u=1',
    alt: 'User avatar',
    size: 'md',
  },
  render: (args) => html`
    <mcp-avatar
      src=${args.src}
      alt=${args.alt}
      size=${args.size}
      status=${args.status || 'none'}
    ></mcp-avatar>
  `,
};

export const Sizes: Story = {
  render: () => html`
    <div style="display: flex; gap: 1rem; align-items: center;">
      <mcp-avatar src="https://i.pravatar.cc/150?u=2" size="xs"></mcp-avatar>
      <mcp-avatar src="https://i.pravatar.cc/150?u=2" size="sm"></mcp-avatar>
      <mcp-avatar src="https://i.pravatar.cc/150?u=2" size="md"></mcp-avatar>
      <mcp-avatar src="https://i.pravatar.cc/150?u=2" size="lg"></mcp-avatar>
      <mcp-avatar src="https://i.pravatar.cc/150?u=2" size="xl"></mcp-avatar>
    </div>
  `,
};

export const WithInitials: Story = {
  render: () => html`
    <div style="display: flex; gap: 1rem; align-items: center;">
      <mcp-avatar initials="JD"></mcp-avatar>
      <mcp-avatar initials="AB"></mcp-avatar>
      <mcp-avatar initials="MK"></mcp-avatar>
      <mcp-avatar initials="ZY"></mcp-avatar>
    </div>
  `,
};

export const WithStatus: Story = {
  render: () => html`
    <div style="display: flex; gap: 1rem; align-items: center;">
      <mcp-avatar src="https://i.pravatar.cc/150?u=3" status="online"></mcp-avatar>
      <mcp-avatar src="https://i.pravatar.cc/150?u=4" status="offline"></mcp-avatar>
      <mcp-avatar src="https://i.pravatar.cc/150?u=5" status="busy"></mcp-avatar>
      <mcp-avatar src="https://i.pravatar.cc/150?u=6" status="away"></mcp-avatar>
    </div>
  `,
};

export const Fallback: Story = {
  render: () => html`
    <div style="display: flex; gap: 1rem; align-items: center;">
      <mcp-avatar></mcp-avatar>
      <mcp-avatar src="invalid-url.jpg"></mcp-avatar>
    </div>
  `,
};

export const UserList: Story = {
  render: () => html`
    <div style="display: flex; flex-direction: column; gap: 0.75rem;">
      ${[
        { name: 'Alice Johnson', status: 'online', id: 10 },
        { name: 'Bob Smith', status: 'away', id: 11 },
        { name: 'Carol Williams', status: 'busy', id: 12 },
        { name: 'David Brown', status: 'offline', id: 13 },
      ].map(user => html`
        <div style="display: flex; align-items: center; gap: 0.75rem;">
          <mcp-avatar src="https://i.pravatar.cc/150?u=${user.id}" status=${user.status}></mcp-avatar>
          <div>
            <div style="font-weight: 500;">${user.name}</div>
            <div style="font-size: 0.875rem; color: var(--mcp-color-ghost-foreground); text-transform: capitalize;">${user.status}</div>
          </div>
        </div>
      `)}
    </div>
  `,
};
