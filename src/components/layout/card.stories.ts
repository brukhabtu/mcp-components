import type { Meta, StoryObj } from '@storybook/web-components-vite';
import { html } from 'lit';
import './card';
import '../primitives/button';

const meta: Meta = {
  title: 'Layout/Card',
  component: 'mcp-card',
  tags: ['autodocs'],
  argTypes: {
    elevated: { control: 'boolean' },
    interactive: { control: 'boolean' },
    selected: { control: 'boolean' },
    compact: { control: 'boolean' },
  },
};

export default meta;
type Story = StoryObj;

export const Default: Story = {
  render: (args) => html`
    <mcp-card ?elevated=${args.elevated} ?interactive=${args.interactive} ?selected=${args.selected} ?compact=${args.compact}>
      <p>This is a basic card with some content.</p>
    </mcp-card>
  `,
};

export const WithHeader: Story = {
  render: () => html`
    <mcp-card>
      <span slot="header"><strong>Card Title</strong></span>
      <p>This card has a header section with a title.</p>
    </mcp-card>
  `,
};

export const WithFooter: Story = {
  render: () => html`
    <mcp-card>
      <span slot="header"><strong>Card Title</strong></span>
      <p>This card has both header and footer sections.</p>
      <div slot="footer" style="display: flex; gap: 0.5rem;">
        <mcp-button variant="ghost" size="sm">Cancel</mcp-button>
        <mcp-button size="sm">Save</mcp-button>
      </div>
    </mcp-card>
  `,
};

export const Elevated: Story = {
  render: () => html`
    <mcp-card elevated>
      <span slot="header"><strong>Elevated Card</strong></span>
      <p>This card uses a shadow instead of a border.</p>
    </mcp-card>
  `,
};

export const Interactive: Story = {
  render: () => html`
    <div style="display: grid; grid-template-columns: repeat(3, 1fr); gap: 1rem;">
      <mcp-card interactive>
        <span slot="header"><strong>Option 1</strong></span>
        <p>Click to select</p>
      </mcp-card>
      <mcp-card interactive selected>
        <span slot="header"><strong>Option 2</strong></span>
        <p>Currently selected</p>
      </mcp-card>
      <mcp-card interactive>
        <span slot="header"><strong>Option 3</strong></span>
        <p>Click to select</p>
      </mcp-card>
    </div>
  `,
};

export const Compact: Story = {
  render: () => html`
    <mcp-card compact>
      <p>This card has less padding for a more compact look.</p>
    </mcp-card>
  `,
};
