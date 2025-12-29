import type { Meta, StoryObj } from '@storybook/web-components-vite';
import { html } from 'lit';
import './button';

const meta: Meta = {
  title: 'Primitives/Button',
  component: 'mcp-button',
  tags: ['autodocs'],
  argTypes: {
    variant: {
      control: 'select',
      options: ['primary', 'secondary', 'tertiary', 'success', 'warning', 'error', 'info'],
    },
    size: {
      control: 'select',
      options: ['sm', 'md', 'lg'],
    },
    disabled: { control: 'boolean' },
    loading: { control: 'boolean' },
  },
};

export default meta;
type Story = StoryObj;

export const Primary: Story = {
  args: {
    variant: 'primary',
    size: 'md',
  },
  render: (args) => html`
    <mcp-button variant=${args.variant} size=${args.size} ?disabled=${args.disabled} ?loading=${args.loading}>
      Button
    </mcp-button>
  `,
};

export const Secondary: Story = {
  render: () => html`<mcp-button variant="secondary">Secondary</mcp-button>`,
};

export const Tertiary: Story = {
  render: () => html`<mcp-button variant="tertiary">Tertiary</mcp-button>`,
};

export const Sizes: Story = {
  render: () => html`
    <div style="display: flex; gap: 1rem; align-items: center;">
      <mcp-button size="sm">Small</mcp-button>
      <mcp-button size="md">Medium</mcp-button>
      <mcp-button size="lg">Large</mcp-button>
    </div>
  `,
};

export const Loading: Story = {
  render: () => html`
    <div style="display: flex; gap: 1rem;">
      <mcp-button loading>Loading</mcp-button>
      <mcp-button variant="secondary" loading>Loading</mcp-button>
      <mcp-button variant="tertiary" loading>Loading</mcp-button>
    </div>
  `,
};

export const Disabled: Story = {
  render: () => html`
    <div style="display: flex; gap: 1rem;">
      <mcp-button disabled>Disabled</mcp-button>
      <mcp-button variant="tertiary" disabled>Disabled</mcp-button>
    </div>
  `,
};

export const HierarchyVariants: Story = {
  name: 'Hierarchy (Primary/Secondary/Tertiary)',
  render: () => html`
    <div style="display: flex; gap: 1rem; flex-wrap: wrap;">
      <mcp-button variant="primary">Primary</mcp-button>
      <mcp-button variant="secondary">Secondary</mcp-button>
      <mcp-button variant="tertiary">Tertiary</mcp-button>
    </div>
  `,
};

export const StatusVariants: Story = {
  name: 'Status (Success/Warning/Error/Info)',
  render: () => html`
    <div style="display: flex; gap: 1rem; flex-wrap: wrap;">
      <mcp-button variant="success">Success</mcp-button>
      <mcp-button variant="warning">Warning</mcp-button>
      <mcp-button variant="error">Error</mcp-button>
      <mcp-button variant="info">Info</mcp-button>
    </div>
  `,
};

export const AllVariants: Story = {
  render: () => html`
    <div style="display: flex; flex-direction: column; gap: 1rem;">
      <div>
        <h4 style="margin: 0 0 0.5rem; font-size: 0.875rem; color: var(--mcp-color-ghost-foreground);">Hierarchy</h4>
        <div style="display: flex; gap: 0.5rem;">
          <mcp-button variant="primary">Primary</mcp-button>
          <mcp-button variant="secondary">Secondary</mcp-button>
          <mcp-button variant="tertiary">Tertiary</mcp-button>
        </div>
      </div>
      <div>
        <h4 style="margin: 0 0 0.5rem; font-size: 0.875rem; color: var(--mcp-color-ghost-foreground);">Status</h4>
        <div style="display: flex; gap: 0.5rem;">
          <mcp-button variant="success">Success</mcp-button>
          <mcp-button variant="warning">Warning</mcp-button>
          <mcp-button variant="error">Error</mcp-button>
          <mcp-button variant="info">Info</mcp-button>
        </div>
      </div>
    </div>
  `,
};
