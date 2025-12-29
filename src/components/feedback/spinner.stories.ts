import type { Meta, StoryObj } from '@storybook/web-components-vite';
import { html } from 'lit';
import './spinner';
import '../primitives/button';

const meta: Meta = {
  title: 'Feedback/Spinner',
  component: 'mcp-spinner',
  tags: ['autodocs'],
  argTypes: {
    size: {
      control: 'select',
      options: ['sm', 'md', 'lg', 'xl'],
    },
  },
};

export default meta;
type Story = StoryObj;

export const Default: Story = {
  render: () => html`<mcp-spinner></mcp-spinner>`,
};

export const Sizes: Story = {
  render: () => html`
    <div style="display: flex; gap: 1.5rem; align-items: center;">
      <mcp-spinner size="sm"></mcp-spinner>
      <mcp-spinner size="md"></mcp-spinner>
      <mcp-spinner size="lg"></mcp-spinner>
      <mcp-spinner size="xl"></mcp-spinner>
    </div>
  `,
};

export const Loading: Story = {
  render: () => html`
    <mcp-loading>Loading data...</mcp-loading>
  `,
};

export const LoadingOverlay: Story = {
  render: () => html`
    <div style="position: relative; height: 200px; border: 1px solid var(--mcp-color-border); border-radius: var(--mcp-radius-lg);">
      <div style="padding: 1rem;">
        <p>Content behind the loading overlay</p>
        <p>This content is partially visible</p>
      </div>
      <mcp-loading overlay>Loading...</mcp-loading>
    </div>
  `,
};

export const InButton: Story = {
  render: () => html`
    <mcp-button loading>Saving...</mcp-button>
  `,
};
