import type { Meta, StoryObj } from '@storybook/web-components-vite';
import { html } from 'lit';
import './modal';

const meta: Meta = {
  title: 'Overlay/Modal',
  component: 'mcp-modal',
  tags: ['autodocs'],
  argTypes: {
    open: { control: 'boolean' },
    size: {
      control: 'select',
      options: ['sm', 'md', 'lg', 'xl', 'full'],
    },
    closeOnEscape: { control: 'boolean' },
    closeOnBackdrop: { control: 'boolean' },
  },
};

export default meta;
type Story = StoryObj;

export const Default: Story = {
  render: () => html`
    <mcp-button @click=${(e: Event) => {
      const modal = (e.target as HTMLElement).nextElementSibling as any;
      modal.open = true;
    }}>Open Modal</mcp-button>
    <mcp-modal>
      <span slot="header">Modal Title</span>
      <p>This is the modal content. You can put anything here.</p>
      <div slot="footer" style="display: flex; gap: 0.5rem; justify-content: flex-end;">
        <mcp-button variant="outline">Cancel</mcp-button>
        <mcp-button variant="primary">Confirm</mcp-button>
      </div>
    </mcp-modal>
  `,
};

export const Sizes: Story = {
  render: () => html`
    <div style="display: flex; gap: 1rem; flex-wrap: wrap;">
      ${['sm', 'md', 'lg', 'xl'].map(size => html`
        <mcp-button @click=${(e: Event) => {
          const modal = document.getElementById(`modal-${size}`) as any;
          modal.open = true;
        }}>${size.toUpperCase()}</mcp-button>
        <mcp-modal id="modal-${size}" size=${size}>
          <span slot="header">${size.toUpperCase()} Modal</span>
          <p>This is a ${size} modal.</p>
        </mcp-modal>
      `)}
    </div>
  `,
};

export const NoCloseOnBackdrop: Story = {
  render: () => html`
    <mcp-button @click=${(e: Event) => {
      const modal = (e.target as HTMLElement).nextElementSibling as any;
      modal.open = true;
    }}>Open Modal</mcp-button>
    <mcp-modal .closeOnBackdrop=${false}>
      <span slot="header">Persistent Modal</span>
      <p>Click the X button or press Escape to close. Clicking the backdrop won't close this modal.</p>
    </mcp-modal>
  `,
};

export const LongContent: Story = {
  render: () => html`
    <mcp-button @click=${(e: Event) => {
      const modal = (e.target as HTMLElement).nextElementSibling as any;
      modal.open = true;
    }}>Open Modal</mcp-button>
    <mcp-modal>
      <span slot="header">Long Content</span>
      ${Array(20).fill(null).map((_, i) => html`
        <p>Paragraph ${i + 1}: Lorem ipsum dolor sit amet, consectetur adipiscing elit.</p>
      `)}
      <div slot="footer">
        <mcp-button variant="primary">Done</mcp-button>
      </div>
    </mcp-modal>
  `,
};
