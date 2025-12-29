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
      options: ['muted', 'primary', 'secondary', 'tertiary', 'success', 'warning', 'error', 'info'],
    },
    outline: { control: 'boolean' },
    soft: { control: 'boolean' },
    dot: { control: 'boolean' },
  },
};

export default meta;
type Story = StoryObj;

export const Default: Story = {
  args: {
    variant: 'muted',
  },
  render: (args) => html`
    <mcp-badge variant=${args.variant} ?outline=${args.outline} ?soft=${args.soft} ?dot=${args.dot}>
      Badge
    </mcp-badge>
  `,
};

export const HierarchyVariants: Story = {
  name: 'Hierarchy (Muted/Primary/Secondary/Tertiary)',
  render: () => html`
    <div style="display: flex; gap: 0.5rem; flex-wrap: wrap;">
      <mcp-badge variant="muted">Muted</mcp-badge>
      <mcp-badge variant="primary">Primary</mcp-badge>
      <mcp-badge variant="secondary">Secondary</mcp-badge>
      <mcp-badge variant="tertiary">Tertiary</mcp-badge>
    </div>
  `,
};

export const StatusVariants: Story = {
  name: 'Status (Success/Warning/Error/Info)',
  render: () => html`
    <div style="display: flex; gap: 0.5rem; flex-wrap: wrap;">
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
      <mcp-badge variant="muted" outline>Muted</mcp-badge>
      <mcp-badge variant="primary" outline>Primary</mcp-badge>
      <mcp-badge variant="secondary" outline>Secondary</mcp-badge>
      <mcp-badge variant="success" outline>Success</mcp-badge>
      <mcp-badge variant="warning" outline>Warning</mcp-badge>
      <mcp-badge variant="error" outline>Error</mcp-badge>
      <mcp-badge variant="info" outline>Info</mcp-badge>
    </div>
  `,
};

export const Soft: Story = {
  render: () => html`
    <div style="display: flex; gap: 0.5rem; flex-wrap: wrap;">
      <mcp-badge variant="primary" soft>Primary</mcp-badge>
      <mcp-badge variant="secondary" soft>Secondary</mcp-badge>
      <mcp-badge variant="success" soft>Success</mcp-badge>
      <mcp-badge variant="warning" soft>Warning</mcp-badge>
      <mcp-badge variant="error" soft>Error</mcp-badge>
      <mcp-badge variant="info" soft>Info</mcp-badge>
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

export const AllVariants: Story = {
  render: () => html`
    <div style="display: flex; flex-direction: column; gap: 1rem;">
      <div>
        <h4 style="margin: 0 0 0.5rem; font-size: 0.875rem; color: var(--mcp-color-muted-foreground);">Solid</h4>
        <div style="display: flex; gap: 0.5rem; flex-wrap: wrap;">
          <mcp-badge variant="muted">Muted</mcp-badge>
          <mcp-badge variant="primary">Primary</mcp-badge>
          <mcp-badge variant="secondary">Secondary</mcp-badge>
          <mcp-badge variant="tertiary">Tertiary</mcp-badge>
          <mcp-badge variant="success">Success</mcp-badge>
          <mcp-badge variant="warning">Warning</mcp-badge>
          <mcp-badge variant="error">Error</mcp-badge>
          <mcp-badge variant="info">Info</mcp-badge>
        </div>
      </div>
      <div>
        <h4 style="margin: 0 0 0.5rem; font-size: 0.875rem; color: var(--mcp-color-muted-foreground);">Soft</h4>
        <div style="display: flex; gap: 0.5rem; flex-wrap: wrap;">
          <mcp-badge variant="primary" soft>Primary</mcp-badge>
          <mcp-badge variant="secondary" soft>Secondary</mcp-badge>
          <mcp-badge variant="success" soft>Success</mcp-badge>
          <mcp-badge variant="warning" soft>Warning</mcp-badge>
          <mcp-badge variant="error" soft>Error</mcp-badge>
          <mcp-badge variant="info" soft>Info</mcp-badge>
        </div>
      </div>
      <div>
        <h4 style="margin: 0 0 0.5rem; font-size: 0.875rem; color: var(--mcp-color-muted-foreground);">Outline</h4>
        <div style="display: flex; gap: 0.5rem; flex-wrap: wrap;">
          <mcp-badge variant="muted" outline>Muted</mcp-badge>
          <mcp-badge variant="primary" outline>Primary</mcp-badge>
          <mcp-badge variant="secondary" outline>Secondary</mcp-badge>
          <mcp-badge variant="success" outline>Success</mcp-badge>
          <mcp-badge variant="warning" outline>Warning</mcp-badge>
          <mcp-badge variant="error" outline>Error</mcp-badge>
          <mcp-badge variant="info" outline>Info</mcp-badge>
        </div>
      </div>
    </div>
  `,
};
