import type { Meta, StoryObj } from '@storybook/web-components-vite';
import { html } from 'lit';
import './list';
import '../primitives/badge';

const meta: Meta = {
  title: 'Data Display/List',
  component: 'mcp-list',
  tags: ['autodocs'],
  argTypes: {
    borderless: { control: 'boolean' },
  },
};

export default meta;
type Story = StoryObj;

export const Default: Story = {
  render: () => html`
    <mcp-list>
      <mcp-list-item title="Item 1" description="Description for item 1"></mcp-list-item>
      <mcp-list-item title="Item 2" description="Description for item 2"></mcp-list-item>
      <mcp-list-item title="Item 3" description="Description for item 3"></mcp-list-item>
    </mcp-list>
  `,
};

export const Interactive: Story = {
  render: () => html`
    <mcp-list>
      <mcp-list-item title="Clickable Item 1" description="Click to select" interactive></mcp-list-item>
      <mcp-list-item title="Clickable Item 2" description="Click to select" interactive selected></mcp-list-item>
      <mcp-list-item title="Clickable Item 3" description="Click to select" interactive></mcp-list-item>
    </mcp-list>
  `,
};

export const WithSuffix: Story = {
  render: () => html`
    <mcp-list>
      <mcp-list-item title="Feature 1" description="Enabled feature">
        <mcp-badge slot="suffix" variant="success">Active</mcp-badge>
      </mcp-list-item>
      <mcp-list-item title="Feature 2" description="Coming soon">
        <mcp-badge slot="suffix" variant="warning">Beta</mcp-badge>
      </mcp-list-item>
      <mcp-list-item title="Feature 3" description="Not available">
        <mcp-badge slot="suffix" variant="default">Disabled</mcp-badge>
      </mcp-list-item>
    </mcp-list>
  `,
};

export const Borderless: Story = {
  render: () => html`
    <mcp-list borderless>
      <mcp-list-item title="Borderless Item 1" description="No outer border"></mcp-list-item>
      <mcp-list-item title="Borderless Item 2" description="Clean look"></mcp-list-item>
      <mcp-list-item title="Borderless Item 3" description="Simple style"></mcp-list-item>
    </mcp-list>
  `,
};

export const MCPTools: Story = {
  render: () => html`
    <mcp-list>
      <mcp-list-item title="read_file" description="Read contents of a file" interactive>
        <mcp-badge slot="suffix" variant="primary">Tool</mcp-badge>
      </mcp-list-item>
      <mcp-list-item title="write_file" description="Write content to a file" interactive>
        <mcp-badge slot="suffix" variant="primary">Tool</mcp-badge>
      </mcp-list-item>
      <mcp-list-item title="list_directory" description="List files in a directory" interactive>
        <mcp-badge slot="suffix" variant="primary">Tool</mcp-badge>
      </mcp-list-item>
    </mcp-list>
  `,
};
