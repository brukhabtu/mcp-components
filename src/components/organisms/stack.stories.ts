import type { Meta, StoryObj } from '@storybook/web-components-vite';
import { html } from 'lit';
import './stack';
import '../atoms/button';

const meta: Meta = {
  title: 'Organisms/Stack',
  component: 'mcp-stack',
  tags: ['autodocs'],
  argTypes: {
    direction: {
      control: 'select',
      options: ['row', 'column', 'row-reverse', 'column-reverse'],
    },
    align: {
      control: 'select',
      options: ['start', 'center', 'end', 'stretch', 'baseline'],
    },
    justify: {
      control: 'select',
      options: ['start', 'center', 'end', 'between', 'around', 'evenly'],
    },
    gap: { control: 'text' },
  },
};

export default meta;
type Story = StoryObj;

export const Vertical: Story = {
  render: () => html`
    <mcp-vstack gap="var(--mcp-space-4)">
      <mcp-button>Button 1</mcp-button>
      <mcp-button variant="secondary">Button 2</mcp-button>
      <mcp-button variant="outline">Button 3</mcp-button>
    </mcp-vstack>
  `,
};

export const Horizontal: Story = {
  render: () => html`
    <mcp-hstack gap="var(--mcp-space-4)">
      <mcp-button>Button 1</mcp-button>
      <mcp-button variant="secondary">Button 2</mcp-button>
      <mcp-button variant="outline">Button 3</mcp-button>
    </mcp-hstack>
  `,
};

export const Centered: Story = {
  render: () => html`
    <mcp-stack direction="row" align="center" justify="center" gap="var(--mcp-space-4)" style="height: 200px; border: 1px dashed var(--mcp-color-border); border-radius: var(--mcp-radius-lg);">
      <mcp-button>Centered</mcp-button>
      <mcp-button variant="secondary">Content</mcp-button>
    </mcp-stack>
  `,
};

export const SpaceBetween: Story = {
  render: () => html`
    <mcp-hstack justify="between" style="width: 100%;">
      <mcp-button variant="ghost">Cancel</mcp-button>
      <mcp-hstack gap="var(--mcp-space-2)">
        <mcp-button variant="outline">Save Draft</mcp-button>
        <mcp-button>Publish</mcp-button>
      </mcp-hstack>
    </mcp-hstack>
  `,
};

export const Nested: Story = {
  render: () => html`
    <mcp-vstack gap="var(--mcp-space-6)">
      <mcp-hstack gap="var(--mcp-space-4)">
        <div style="width: 80px; height: 80px; background: var(--mcp-color-ghost); border-radius: var(--mcp-radius-lg);"></div>
        <mcp-vstack gap="var(--mcp-space-2)">
          <strong>Title</strong>
          <span style="color: var(--mcp-color-ghost-foreground);">Description text goes here</span>
        </mcp-vstack>
      </mcp-hstack>
      <mcp-hstack gap="var(--mcp-space-4)">
        <div style="width: 80px; height: 80px; background: var(--mcp-color-ghost); border-radius: var(--mcp-radius-lg);"></div>
        <mcp-vstack gap="var(--mcp-space-2)">
          <strong>Another Title</strong>
          <span style="color: var(--mcp-color-ghost-foreground);">More description text</span>
        </mcp-vstack>
      </mcp-hstack>
    </mcp-vstack>
  `,
};
