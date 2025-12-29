import type { Meta, StoryObj } from '@storybook/web-components-vite';
import { html } from 'lit';
import './server-status';

const meta: Meta = {
  title: 'MCP/ServerStatus',
  component: 'mcp-server-status',
  tags: ['autodocs'],
  argTypes: {
    name: { control: 'text' },
    status: {
      control: 'select',
      options: ['connected', 'connecting', 'disconnected', 'error'],
    },
    toolsCount: { control: 'number' },
    latency: { control: 'number' },
    version: { control: 'text' },
    expandable: { control: 'boolean' },
    compact: { control: 'boolean' },
  },
};

export default meta;
type Story = StoryObj;

export const Connected: Story = {
  args: {
    name: 'Weather Server',
    status: 'connected',
    toolsCount: 5,
    latency: 42,
    version: '1.2.0',
    expandable: true,
  },
  render: (args) => html`
    <mcp-server-status
      name=${args.name}
      status=${args.status}
      toolsCount=${args.toolsCount}
      latency=${args.latency}
      version=${args.version}
      ?expandable=${args.expandable}
      ?compact=${args.compact}
    ></mcp-server-status>
  `,
};

export const Connecting: Story = {
  render: () => html`
    <mcp-server-status
      name="Database Server"
      status="connecting"
    ></mcp-server-status>
  `,
};

export const Disconnected: Story = {
  render: () => html`
    <mcp-server-status
      name="Analytics Server"
      status="disconnected"
      toolsCount=${3}
    ></mcp-server-status>
  `,
};

export const Error: Story = {
  render: () => html`
    <mcp-server-status
      name="API Server"
      status="error"
      expandable
    ></mcp-server-status>
  `,
};

export const Compact: Story = {
  render: () => html`
    <div style="display: flex; gap: 0.5rem; flex-wrap: wrap;">
      <mcp-server-status name="Server 1" status="connected" compact></mcp-server-status>
      <mcp-server-status name="Server 2" status="connecting" compact></mcp-server-status>
      <mcp-server-status name="Server 3" status="disconnected" compact></mcp-server-status>
      <mcp-server-status name="Server 4" status="error" compact></mcp-server-status>
    </div>
  `,
};

export const ServerList: Story = {
  render: () => html`
    <div style="display: flex; flex-direction: column; gap: 0.75rem; max-width: 400px;">
      <mcp-server-status
        name="Weather MCP Server"
        status="connected"
        toolsCount=${5}
        latency=${42}
        version="1.2.0"
        expandable
      ></mcp-server-status>

      <mcp-server-status
        name="Database Tools"
        status="connected"
        toolsCount=${12}
        latency=${15}
        version="2.0.1"
        expandable
      ></mcp-server-status>

      <mcp-server-status
        name="File System Access"
        status="connecting"
        toolsCount=${8}
        expandable
      ></mcp-server-status>

      <mcp-server-status
        name="Legacy API Bridge"
        status="error"
        toolsCount=${3}
        version="0.9.5"
        expandable
      ></mcp-server-status>
    </div>
  `,
};

export const Dashboard: Story = {
  render: () => html`
    <mcp-card>
      <h3 style="margin: 0 0 1rem 0;">MCP Servers</h3>
      <div style="display: flex; flex-direction: column; gap: 0.5rem;">
        <mcp-server-status name="Primary Server" status="connected" toolsCount=${15} latency=${28}></mcp-server-status>
        <mcp-server-status name="Backup Server" status="connected" toolsCount=${15} latency=${45}></mcp-server-status>
        <mcp-server-status name="Dev Server" status="disconnected" toolsCount=${20}></mcp-server-status>
      </div>
      <mcp-divider style="margin: 1rem 0;"></mcp-divider>
      <div style="display: flex; justify-content: space-between; font-size: 0.875rem; color: var(--mcp-color-muted-foreground);">
        <span>2 of 3 servers online</span>
        <span>30 tools available</span>
      </div>
    </mcp-card>
  `,
};
