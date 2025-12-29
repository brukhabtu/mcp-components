import type { Meta, StoryObj } from '@storybook/web-components-vite';
import { html } from 'lit';
import './alert';

const meta: Meta = {
  title: 'Feedback/Alert',
  component: 'mcp-alert',
  tags: ['autodocs'],
  argTypes: {
    variant: {
      control: 'select',
      options: ['info', 'success', 'warning', 'error'],
    },
    dismissible: { control: 'boolean' },
  },
};

export default meta;
type Story = StoryObj;

export const Info: Story = {
  render: () => html`
    <mcp-alert variant="info" title="Information">
      This is an informational message to help users understand something.
    </mcp-alert>
  `,
};

export const Success: Story = {
  render: () => html`
    <mcp-alert variant="success" title="Success">
      Your changes have been saved successfully.
    </mcp-alert>
  `,
};

export const Warning: Story = {
  render: () => html`
    <mcp-alert variant="warning" title="Warning">
      Please review your input before proceeding.
    </mcp-alert>
  `,
};

export const Error: Story = {
  render: () => html`
    <mcp-alert variant="error" title="Error">
      Something went wrong. Please try again.
    </mcp-alert>
  `,
};

export const Dismissible: Story = {
  render: () => html`
    <mcp-alert variant="info" title="Dismissible Alert" dismissible>
      Click the X button to dismiss this alert.
    </mcp-alert>
  `,
};

export const WithoutTitle: Story = {
  render: () => html`
    <mcp-alert variant="info">
      A simple alert message without a title.
    </mcp-alert>
  `,
};

export const AllVariants: Story = {
  render: () => html`
    <div style="display: flex; flex-direction: column; gap: 1rem;">
      <mcp-alert variant="info" title="Info">Informational message</mcp-alert>
      <mcp-alert variant="success" title="Success">Operation completed</mcp-alert>
      <mcp-alert variant="warning" title="Warning">Please be careful</mcp-alert>
      <mcp-alert variant="error" title="Error">Something went wrong</mcp-alert>
    </div>
  `,
};
