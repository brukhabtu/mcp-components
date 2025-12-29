import type { Meta, StoryObj } from '@storybook/web-components-vite';
import { html } from 'lit';
import './table';
import type { TableColumn } from './table';

const meta: Meta = {
  title: 'Data Display/Table',
  component: 'mcp-table',
  tags: ['autodocs'],
  argTypes: {
    striped: { control: 'boolean' },
    hoverable: { control: 'boolean' },
    compact: { control: 'boolean' },
  },
};

export default meta;
type Story = StoryObj;

const sampleColumns: TableColumn[] = [
  { key: 'id', header: 'ID', width: '60px' },
  { key: 'name', header: 'Name', sortable: true },
  { key: 'email', header: 'Email', sortable: true },
  { key: 'role', header: 'Role' },
];

const sampleData = [
  { id: 1, name: 'Alice Johnson', email: 'alice@example.com', role: 'Admin' },
  { id: 2, name: 'Bob Smith', email: 'bob@example.com', role: 'User' },
  { id: 3, name: 'Carol White', email: 'carol@example.com', role: 'Editor' },
  { id: 4, name: 'David Brown', email: 'david@example.com', role: 'User' },
  { id: 5, name: 'Eve Davis', email: 'eve@example.com', role: 'Admin' },
];

export const Default: Story = {
  render: () => html`
    <mcp-table
      .columns=${sampleColumns}
      .data=${sampleData}
    ></mcp-table>
  `,
};

export const Striped: Story = {
  render: () => html`
    <mcp-table
      .columns=${sampleColumns}
      .data=${sampleData}
      striped
    ></mcp-table>
  `,
};

export const Hoverable: Story = {
  render: () => html`
    <mcp-table
      .columns=${sampleColumns}
      .data=${sampleData}
      hoverable
      @mcp-row-click=${(e: CustomEvent) => console.log('Row clicked:', e.detail)}
    ></mcp-table>
  `,
};

export const Compact: Story = {
  render: () => html`
    <mcp-table
      .columns=${sampleColumns}
      .data=${sampleData}
      compact
      striped
    ></mcp-table>
  `,
};

export const Sortable: Story = {
  render: () => html`
    <mcp-table
      .columns=${sampleColumns}
      .data=${sampleData}
      sortKey="name"
      sortDirection="asc"
      @mcp-sort=${(e: CustomEvent) => console.log('Sort:', e.detail)}
    ></mcp-table>
  `,
};

export const Empty: Story = {
  render: () => html`
    <mcp-table
      .columns=${sampleColumns}
      .data=${[]}
    ></mcp-table>
  `,
};

export const AllFeatures: Story = {
  render: () => html`
    <mcp-table
      .columns=${sampleColumns}
      .data=${sampleData}
      striped
      hoverable
      sortKey="email"
      sortDirection="desc"
    ></mcp-table>
  `,
};
