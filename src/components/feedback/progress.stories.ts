import type { Meta, StoryObj } from '@storybook/web-components-vite';
import { html } from 'lit';
import './progress.js';

const meta: Meta = {
  title: 'Feedback/Progress',
  component: 'mcp-progress',
  tags: ['autodocs'],
  argTypes: {
    value: { control: { type: 'range', min: 0, max: 100 } },
    variant: {
      control: 'select',
      options: ['default', 'success', 'warning', 'error'],
    },
    size: {
      control: 'select',
      options: ['sm', 'md', 'lg'],
    },
    showValue: { control: 'boolean' },
    indeterminate: { control: 'boolean' },
  },
};

export default meta;
type Story = StoryObj;

export const Default: Story = {
  args: {
    value: 60,
  },
  render: (args) => html`
    <mcp-progress
      value=${args.value}
      label=${args.label || ''}
      variant=${args.variant || 'default'}
      size=${args.size || 'md'}
      ?show-value=${args.showValue}
      ?indeterminate=${args.indeterminate}
    ></mcp-progress>
  `,
};

export const WithLabel: Story = {
  render: () => html`
    <mcp-progress value="75" label="Upload Progress" show-value></mcp-progress>
  `,
};

export const Sizes: Story = {
  render: () => html`
    <div style="display: flex; flex-direction: column; gap: 1rem;">
      <mcp-progress value="60" size="sm" label="Small"></mcp-progress>
      <mcp-progress value="60" size="md" label="Medium"></mcp-progress>
      <mcp-progress value="60" size="lg" label="Large"></mcp-progress>
    </div>
  `,
};

export const Variants: Story = {
  render: () => html`
    <div style="display: flex; flex-direction: column; gap: 1rem;">
      <mcp-progress value="25" variant="default" label="Default"></mcp-progress>
      <mcp-progress value="50" variant="success" label="Success"></mcp-progress>
      <mcp-progress value="75" variant="warning" label="Warning"></mcp-progress>
      <mcp-progress value="90" variant="error" label="Error"></mcp-progress>
    </div>
  `,
};

export const Indeterminate: Story = {
  render: () => html`
    <mcp-progress indeterminate label="Processing..."></mcp-progress>
  `,
};

export const FileUpload: Story = {
  render: () => html`
    <div style="display: flex; flex-direction: column; gap: 0.5rem;">
      <mcp-progress value="100" variant="success" label="document.pdf" show-value></mcp-progress>
      <mcp-progress value="67" label="image.png" show-value></mcp-progress>
      <mcp-progress value="23" label="video.mp4" show-value></mcp-progress>
    </div>
  `,
};
