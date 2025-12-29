import type { Meta, StoryObj } from '@storybook/web-components-vite';
import { html } from 'lit';
import './toast';

const meta: Meta = {
  title: 'Feedback/Toast',
  component: 'mcp-toast',
  tags: ['autodocs'],
  argTypes: {
    variant: {
      control: 'select',
      options: ['default', 'success', 'error', 'warning', 'info'],
    },
    message: { control: 'text' },
    duration: { control: 'number' },
    closable: { control: 'boolean' },
  },
};

export default meta;
type Story = StoryObj;

export const Default: Story = {
  render: () => html`
    <mcp-toast variant="default" message="This is a default toast notification"></mcp-toast>
  `,
};

export const Variants: Story = {
  render: () => html`
    <div style="display: flex; flex-direction: column; gap: 1rem;">
      <mcp-toast variant="default" message="Default notification"></mcp-toast>
      <mcp-toast variant="success" message="Success! Your changes have been saved."></mcp-toast>
      <mcp-toast variant="error" message="Error! Something went wrong."></mcp-toast>
      <mcp-toast variant="warning" message="Warning! Please review your input."></mcp-toast>
      <mcp-toast variant="info" message="Info: New updates available."></mcp-toast>
    </div>
  `,
};

export const WithTitle: Story = {
  render: () => html`
    <div style="display: flex; flex-direction: column; gap: 1rem;">
      <mcp-toast variant="success" title="Success" message="Your profile has been updated."></mcp-toast>
      <mcp-toast variant="error" title="Error" message="Failed to save changes. Please try again."></mcp-toast>
    </div>
  `,
};

export const Closable: Story = {
  render: () => html`
    <mcp-toast variant="info" message="Click the X to close this toast" closable></mcp-toast>
  `,
};

export const Interactive: Story = {
  render: () => html`
    <div style="display: flex; gap: 0.5rem; flex-wrap: wrap;">
      <mcp-button variant="primary" @click=${() => {
        const toaster = document.querySelector('mcp-toaster') as any;
        toaster?.show({ variant: 'success', message: 'Action completed successfully!' });
      }}>Show Success</mcp-button>
      <mcp-button variant="secondary" @click=${() => {
        const toaster = document.querySelector('mcp-toaster') as any;
        toaster?.show({ variant: 'error', message: 'An error occurred!' });
      }}>Show Error</mcp-button>
      <mcp-button variant="outline" @click=${() => {
        const toaster = document.querySelector('mcp-toaster') as any;
        toaster?.show({ variant: 'warning', message: 'Please check your input.' });
      }}>Show Warning</mcp-button>
      <mcp-button variant="ghost" @click=${() => {
        const toaster = document.querySelector('mcp-toaster') as any;
        toaster?.show({ variant: 'info', message: 'Here is some information.' });
      }}>Show Info</mcp-button>
    </div>
    <mcp-toaster position="bottom-right"></mcp-toaster>
  `,
};

export const ToasterPositions: Story = {
  render: () => html`
    <div style="display: grid; grid-template-columns: repeat(3, 1fr); gap: 0.5rem; max-width: 400px;">
      <mcp-button size="sm" @click=${() => {
        const toaster = document.getElementById('toaster-demo') as any;
        toaster.position = 'top-left';
        toaster?.show({ message: 'Top Left' });
      }}>Top Left</mcp-button>
      <mcp-button size="sm" @click=${() => {
        const toaster = document.getElementById('toaster-demo') as any;
        toaster.position = 'top-center';
        toaster?.show({ message: 'Top Center' });
      }}>Top Center</mcp-button>
      <mcp-button size="sm" @click=${() => {
        const toaster = document.getElementById('toaster-demo') as any;
        toaster.position = 'top-right';
        toaster?.show({ message: 'Top Right' });
      }}>Top Right</mcp-button>
      <mcp-button size="sm" @click=${() => {
        const toaster = document.getElementById('toaster-demo') as any;
        toaster.position = 'bottom-left';
        toaster?.show({ message: 'Bottom Left' });
      }}>Bottom Left</mcp-button>
      <mcp-button size="sm" @click=${() => {
        const toaster = document.getElementById('toaster-demo') as any;
        toaster.position = 'bottom-center';
        toaster?.show({ message: 'Bottom Center' });
      }}>Bottom Center</mcp-button>
      <mcp-button size="sm" @click=${() => {
        const toaster = document.getElementById('toaster-demo') as any;
        toaster.position = 'bottom-right';
        toaster?.show({ message: 'Bottom Right' });
      }}>Bottom Right</mcp-button>
    </div>
    <mcp-toaster id="toaster-demo" position="top-right"></mcp-toaster>
  `,
};
