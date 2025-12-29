import type { Meta, StoryObj } from '@storybook/web-components-vite';
import { html } from 'lit';
import './breadcrumb';

const meta: Meta = {
  title: 'Navigation/Breadcrumb',
  component: 'mcp-breadcrumb',
  tags: ['autodocs'],
  argTypes: {
    separator: { control: 'text' },
  },
};

export default meta;
type Story = StoryObj;

export const Default: Story = {
  render: () => html`
    <mcp-breadcrumb>
      <mcp-breadcrumb-item href="/">Home</mcp-breadcrumb-item>
      <mcp-breadcrumb-item href="/products">Products</mcp-breadcrumb-item>
      <mcp-breadcrumb-item href="/products/electronics">Electronics</mcp-breadcrumb-item>
      <mcp-breadcrumb-item>Laptops</mcp-breadcrumb-item>
    </mcp-breadcrumb>
  `,
};

export const CustomSeparator: Story = {
  render: () => html`
    <mcp-breadcrumb separator=">">
      <mcp-breadcrumb-item href="/">Home</mcp-breadcrumb-item>
      <mcp-breadcrumb-item href="/docs">Documentation</mcp-breadcrumb-item>
      <mcp-breadcrumb-item>Getting Started</mcp-breadcrumb-item>
    </mcp-breadcrumb>
  `,
};

export const ArrowSeparator: Story = {
  render: () => html`
    <mcp-breadcrumb separator="→">
      <mcp-breadcrumb-item href="/">Dashboard</mcp-breadcrumb-item>
      <mcp-breadcrumb-item href="/settings">Settings</mcp-breadcrumb-item>
      <mcp-breadcrumb-item>Profile</mcp-breadcrumb-item>
    </mcp-breadcrumb>
  `,
};

export const TwoItems: Story = {
  render: () => html`
    <mcp-breadcrumb>
      <mcp-breadcrumb-item href="/">Home</mcp-breadcrumb-item>
      <mcp-breadcrumb-item>About</mcp-breadcrumb-item>
    </mcp-breadcrumb>
  `,
};

export const WithNavigation: Story = {
  render: () => html`
    <mcp-breadcrumb
      @mcp-navigate=${(e: CustomEvent) => console.log('Navigate to:', e.detail.href)}
    >
      <mcp-breadcrumb-item href="/">Home</mcp-breadcrumb-item>
      <mcp-breadcrumb-item href="/users">Users</mcp-breadcrumb-item>
      <mcp-breadcrumb-item href="/users/123">John Doe</mcp-breadcrumb-item>
      <mcp-breadcrumb-item>Edit</mcp-breadcrumb-item>
    </mcp-breadcrumb>
  `,
};
