import type { Meta, StoryObj } from '@storybook/web-components-vite';
import { html } from 'lit';
import './pagination';

const meta: Meta = {
  title: 'Organisms/Pagination',
  component: 'mcp-pagination',
  tags: ['autodocs'],
  argTypes: {
    total: { control: 'number' },
    pageSize: { control: 'number' },
    currentPage: { control: 'number' },
    compact: { control: 'boolean' },
    showFirstLast: { control: 'boolean' },
  },
};

export default meta;
type Story = StoryObj;

export const Default: Story = {
  args: {
    total: 100,
    pageSize: 10,
    currentPage: 1,
  },
  render: (args) => html`
    <mcp-pagination
      total=${args.total}
      pageSize=${args.pageSize}
      currentPage=${args.currentPage}
      ?compact=${args.compact}
      ?showFirstLast=${args.showFirstLast}
      @mcp-page-change=${(e: CustomEvent) => console.log('Page:', e.detail.page)}
    ></mcp-pagination>
  `,
};

export const MiddlePage: Story = {
  render: () => html`
    <mcp-pagination
      total="200"
      pageSize="10"
      currentPage="10"
    ></mcp-pagination>
  `,
};

export const LastPage: Story = {
  render: () => html`
    <mcp-pagination
      total="100"
      pageSize="10"
      currentPage="10"
    ></mcp-pagination>
  `,
};

export const FewPages: Story = {
  render: () => html`
    <mcp-pagination
      total="30"
      pageSize="10"
      currentPage="2"
    ></mcp-pagination>
  `,
};

export const WithFirstLast: Story = {
  render: () => html`
    <mcp-pagination
      total="500"
      pageSize="10"
      currentPage="25"
      showFirstLast
    ></mcp-pagination>
  `,
};

export const Compact: Story = {
  render: () => html`
    <mcp-pagination
      total="100"
      pageSize="10"
      currentPage="5"
      compact
    ></mcp-pagination>
  `,
};

export const SinglePage: Story = {
  render: () => html`
    <mcp-pagination
      total="5"
      pageSize="10"
      currentPage="1"
    ></mcp-pagination>
  `,
};
