import type { Meta, StoryObj } from '@storybook/web-components-vite';
import { html } from 'lit';
import './badge';

const meta: Meta = {
  title: 'Primitives/Badge',
  component: 'mcp-badge',
  tags: ['autodocs'],
  argTypes: {
    variant: {
      control: 'select',
      options: ['default', 'primary', 'secondary', 'success', 'warning', 'error', 'info'],
    },
    outline: { control: 'boolean' },
    dot: { control: 'boolean' },
  },
};

export default meta;
type Story = StoryObj;

export const Default: Story = {
  args: {
    variant: 'default',
  },
  render: (args) => html`
    <mcp-badge variant=${args.variant} ?outline=${args.outline} ?dot=${args.dot}>
      Badge
    </mcp-badge>
  `,
};

export const AllVariants: Story = {
  render: () => html`
    <div style="display: flex; gap: 0.5rem; flex-wrap: wrap;">
      <mcp-badge variant="default">Default</mcp-badge>
      <mcp-badge variant="primary">Primary</mcp-badge>
      <mcp-badge variant="secondary">Secondary</mcp-badge>
      <mcp-badge variant="success">Success</mcp-badge>
      <mcp-badge variant="warning">Warning</mcp-badge>
      <mcp-badge variant="error">Error</mcp-badge>
      <mcp-badge variant="info">Info</mcp-badge>
    </div>
  `,
};

export const Outline: Story = {
  render: () => html`
    <div style="display: flex; gap: 0.5rem; flex-wrap: wrap;">
      <mcp-badge variant="default" outline>Default</mcp-badge>
      <mcp-badge variant="primary" outline>Primary</mcp-badge>
      <mcp-badge variant="success" outline>Success</mcp-badge>
      <mcp-badge variant="warning" outline>Warning</mcp-badge>
      <mcp-badge variant="error" outline>Error</mcp-badge>
      <mcp-badge variant="info" outline>Info</mcp-badge>
    </div>
  `,
};

export const WithDot: Story = {
  render: () => html`
    <div style="display: flex; gap: 0.5rem; flex-wrap: wrap;">
      <mcp-badge variant="success" dot>Online</mcp-badge>
      <mcp-badge variant="warning" dot>Away</mcp-badge>
      <mcp-badge variant="error" dot>Offline</mcp-badge>
    </div>
  `,
};

export const Status: Story = {
  render: () => html`
    <div style="display: flex; gap: 0.5rem;">
      <mcp-badge variant="success" dot>Connected</mcp-badge>
      <mcp-badge variant="info">v1.0.0</mcp-badge>
      <mcp-badge variant="warning">Beta</mcp-badge>
    </div>
  `,
};
