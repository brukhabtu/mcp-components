import type { Meta, StoryObj } from '@storybook/web-components-vite';
import { html } from 'lit';
import './tooltip';

const meta: Meta = {
  title: 'Overlay/Tooltip',
  component: 'mcp-tooltip',
  tags: ['autodocs'],
  argTypes: {
    content: { control: 'text' },
    position: {
      control: 'select',
      options: ['top', 'bottom', 'left', 'right'],
    },
    delay: { control: 'number' },
  },
};

export default meta;
type Story = StoryObj;

export const Default: Story = {
  args: {
    content: 'This is a tooltip',
    position: 'top',
  },
  render: (args) => html`
    <div style="padding: 4rem; display: flex; justify-content: center;">
      <mcp-tooltip content=${args.content} position=${args.position}>
        <mcp-button>Hover me</mcp-button>
      </mcp-tooltip>
    </div>
  `,
};

export const Positions: Story = {
  render: () => html`
    <div style="padding: 4rem; display: grid; grid-template-columns: repeat(2, 1fr); gap: 2rem; max-width: 400px; margin: 0 auto;">
      <mcp-tooltip content="Top tooltip" position="top">
        <mcp-button style="width: 100%;">Top</mcp-button>
      </mcp-tooltip>
      <mcp-tooltip content="Bottom tooltip" position="bottom">
        <mcp-button style="width: 100%;">Bottom</mcp-button>
      </mcp-tooltip>
      <mcp-tooltip content="Left tooltip" position="left">
        <mcp-button style="width: 100%;">Left</mcp-button>
      </mcp-tooltip>
      <mcp-tooltip content="Right tooltip" position="right">
        <mcp-button style="width: 100%;">Right</mcp-button>
      </mcp-tooltip>
    </div>
  `,
};

export const WithDelay: Story = {
  render: () => html`
    <div style="padding: 4rem; display: flex; justify-content: center;">
      <mcp-tooltip content="I appear after 500ms" delay=${500}>
        <mcp-button>Delayed tooltip</mcp-button>
      </mcp-tooltip>
    </div>
  `,
};

export const OnIcons: Story = {
  render: () => html`
    <div style="padding: 4rem; display: flex; gap: 1rem; justify-content: center;">
      <mcp-tooltip content="Edit">
        <mcp-button variant="ghost" size="sm">✏️</mcp-button>
      </mcp-tooltip>
      <mcp-tooltip content="Delete">
        <mcp-button variant="ghost" size="sm">🗑️</mcp-button>
      </mcp-tooltip>
      <mcp-tooltip content="Settings">
        <mcp-button variant="ghost" size="sm">⚙️</mcp-button>
      </mcp-tooltip>
    </div>
  `,
};
