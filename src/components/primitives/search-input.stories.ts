import type { Meta, StoryObj } from '@storybook/web-components-vite';
import { html } from 'lit';
import './search-input.js';

const meta: Meta = {
  title: 'Primitives/SearchInput',
  component: 'mcp-search-input',
  tags: ['autodocs'],
  argTypes: {
    value: { control: 'text' },
    placeholder: { control: 'text' },
    size: { control: 'select', options: ['sm', 'md', 'lg'] },
    disabled: { control: 'boolean' },
    loading: { control: 'boolean' },
  },
};

export default meta;
type Story = StoryObj;

export const Default: Story = {
  args: {
    placeholder: 'Search...',
  },
  render: (args) => html`
    <mcp-search-input
      placeholder=${args.placeholder}
      ?disabled=${args.disabled}
      ?loading=${args.loading}
      size=${args.size || 'md'}
    ></mcp-search-input>
  `,
};

export const WithValue: Story = {
  render: () => html`
    <mcp-search-input value="React components"></mcp-search-input>
  `,
};

export const Loading: Story = {
  render: () => html`
    <mcp-search-input value="searching..." loading></mcp-search-input>
  `,
};

export const Sizes: Story = {
  render: () => html`
    <div style="display: flex; flex-direction: column; gap: 1rem; max-width: 300px;">
      <mcp-search-input size="sm" placeholder="Small search"></mcp-search-input>
      <mcp-search-input size="md" placeholder="Medium search"></mcp-search-input>
      <mcp-search-input size="lg" placeholder="Large search"></mcp-search-input>
    </div>
  `,
};

export const Disabled: Story = {
  render: () => html`
    <mcp-search-input disabled placeholder="Disabled search"></mcp-search-input>
  `,
};

export const WithEvents: Story = {
  render: () => html`
    <div style="display: flex; flex-direction: column; gap: 1rem; max-width: 300px;">
      <mcp-search-input
        placeholder="Type and press Enter..."
        @mcp-input=${(e: CustomEvent) => console.log('Input:', e.detail.value)}
        @mcp-submit=${(e: CustomEvent) => console.log('Submit:', e.detail.value)}
        @mcp-clear=${() => console.log('Cleared')}
      ></mcp-search-input>
      <p style="font-size: 0.875rem; color: var(--mcp-color-ghost-foreground);">
        Open console to see events
      </p>
    </div>
  `,
};
