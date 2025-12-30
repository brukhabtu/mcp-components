import type { Meta, StoryObj } from '@storybook/web-components-vite';
import { html } from 'lit';
import './tag.js';

const meta: Meta = {
  title: 'Primitives/Tag',
  component: 'mcp-tag',
  tags: ['autodocs'],
  argTypes: {
    variant: {
      control: 'select',
      options: ['ghost', 'primary', 'secondary', 'success', 'warning', 'error', 'info'],
    },
    size: { control: 'select', options: ['sm', 'md', 'lg'] },
    removable: { control: 'boolean' },
    clickable: { control: 'boolean' },
    disabled: { control: 'boolean' },
  },
};

export default meta;
type Story = StoryObj;

export const Default: Story = {
  args: {
    variant: 'ghost',
  },
  render: (args) => html`
    <mcp-tag
      variant=${args.variant}
      size=${args.size || 'md'}
      ?removable=${args.removable}
      ?clickable=${args.clickable}
      ?disabled=${args.disabled}
    >
      Label
    </mcp-tag>
  `,
};

export const Variants: Story = {
  render: () => html`
    <div style="display: flex; gap: 0.5rem; flex-wrap: wrap;">
      <mcp-tag variant="ghost">Ghost</mcp-tag>
      <mcp-tag variant="primary">Primary</mcp-tag>
      <mcp-tag variant="secondary">Secondary</mcp-tag>
      <mcp-tag variant="success">Success</mcp-tag>
      <mcp-tag variant="warning">Warning</mcp-tag>
      <mcp-tag variant="error">Error</mcp-tag>
      <mcp-tag variant="info">Info</mcp-tag>
    </div>
  `,
};

export const Sizes: Story = {
  render: () => html`
    <div style="display: flex; gap: 0.5rem; align-items: center;">
      <mcp-tag size="sm" variant="primary">Small</mcp-tag>
      <mcp-tag size="md" variant="primary">Medium</mcp-tag>
      <mcp-tag size="lg" variant="primary">Large</mcp-tag>
    </div>
  `,
};

export const Removable: Story = {
  render: () => html`
    <div style="display: flex; gap: 0.5rem; flex-wrap: wrap;">
      <mcp-tag variant="primary" removable>React</mcp-tag>
      <mcp-tag variant="info" removable>TypeScript</mcp-tag>
      <mcp-tag variant="success" removable>Lit</mcp-tag>
      <mcp-tag variant="warning" removable>Storybook</mcp-tag>
    </div>
  `,
};

export const Clickable: Story = {
  render: () => html`
    <div style="display: flex; gap: 0.5rem; flex-wrap: wrap;">
      <mcp-tag variant="ghost" clickable @mcp-click=${() => console.log('Clicked: All')}>All</mcp-tag>
      <mcp-tag variant="primary" clickable @mcp-click=${() => console.log('Clicked: Active')}>Active</mcp-tag>
      <mcp-tag variant="ghost" clickable @mcp-click=${() => console.log('Clicked: Completed')}>Completed</mcp-tag>
    </div>
  `,
};

export const WithIcon: Story = {
  render: () => html`
    <div style="display: flex; gap: 0.5rem; flex-wrap: wrap;">
      <mcp-tag variant="primary">
        <svg slot="icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
          <path d="M20.59 13.41l-7.17 7.17a2 2 0 01-2.83 0L2 12V2h10l8.59 8.59a2 2 0 010 2.82z"/>
          <line x1="7" y1="7" x2="7.01" y2="7"/>
        </svg>
        Feature
      </mcp-tag>
      <mcp-tag variant="error">
        <svg slot="icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
          <circle cx="12" cy="12" r="10"/>
          <line x1="12" y1="8" x2="12" y2="12"/>
          <line x1="12" y1="16" x2="12.01" y2="16"/>
        </svg>
        Bug
      </mcp-tag>
      <mcp-tag variant="info">
        <svg slot="icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
          <path d="M14 2H6a2 2 0 00-2 2v16a2 2 0 002 2h12a2 2 0 002-2V8z"/>
          <polyline points="14 2 14 8 20 8"/>
        </svg>
        Documentation
      </mcp-tag>
    </div>
  `,
};

export const TagGroup: Story = {
  name: 'Tag Group (Interactive)',
  render: () => html`
    <div style="max-width: 400px;">
      <p style="font-size: 0.875rem; margin-bottom: 0.5rem; color: var(--mcp-color-ghost-foreground);">
        Selected technologies:
      </p>
      <div style="display: flex; gap: 0.5rem; flex-wrap: wrap;">
        <mcp-tag variant="primary" removable @mcp-remove=${(e: Event) => (e.target as HTMLElement).remove()}>
          React
        </mcp-tag>
        <mcp-tag variant="primary" removable @mcp-remove=${(e: Event) => (e.target as HTMLElement).remove()}>
          TypeScript
        </mcp-tag>
        <mcp-tag variant="primary" removable @mcp-remove=${(e: Event) => (e.target as HTMLElement).remove()}>
          Node.js
        </mcp-tag>
        <mcp-tag variant="primary" removable @mcp-remove=${(e: Event) => (e.target as HTMLElement).remove()}>
          PostgreSQL
        </mcp-tag>
      </div>
    </div>
  `,
};

export const Disabled: Story = {
  render: () => html`
    <div style="display: flex; gap: 0.5rem;">
      <mcp-tag variant="primary" disabled>Disabled</mcp-tag>
      <mcp-tag variant="primary" disabled removable>Disabled Removable</mcp-tag>
    </div>
  `,
};
