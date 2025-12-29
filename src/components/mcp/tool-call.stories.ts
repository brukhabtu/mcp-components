import type { Meta, StoryObj } from '@storybook/web-components-vite';
import { html } from 'lit';
import './tool-call';

const meta: Meta = {
  title: 'MCP/ToolCall',
  component: 'mcp-tool-call',
  tags: ['autodocs'],
  argTypes: {
    name: { control: 'text' },
    status: {
      control: 'select',
      options: ['pending', 'running', 'success', 'error'],
    },
    duration: { control: 'number' },
  },
};

export default meta;
type Story = StoryObj;

export const Pending: Story = {
  render: () => html`
    <mcp-tool-call
      name="get_weather"
      status="pending"
      .input=${{ location: 'San Francisco' }}
    ></mcp-tool-call>
  `,
};

export const Running: Story = {
  render: () => html`
    <mcp-tool-call
      name="search_database"
      status="running"
      .input=${{ query: 'SELECT * FROM users WHERE active = true', limit: 100 }}
    ></mcp-tool-call>
  `,
};

export const Success: Story = {
  render: () => html`
    <mcp-tool-call
      name="get_weather"
      status="success"
      duration=${245}
      .input=${{ location: 'San Francisco', units: 'fahrenheit' }}
      .output=${{ temperature: 68, condition: 'Partly Cloudy', humidity: 65 }}
    ></mcp-tool-call>
  `,
};

export const Error: Story = {
  render: () => html`
    <mcp-tool-call
      name="fetch_data"
      status="error"
      duration=${1523}
      .input=${{ url: 'https://api.example.com/data', method: 'GET' }}
      error="Connection timeout: Unable to reach server after 1500ms"
    ></mcp-tool-call>
  `,
};

export const ComplexInput: Story = {
  render: () => html`
    <mcp-tool-call
      name="create_document"
      status="success"
      duration=${892}
      .input=${{
        title: 'Quarterly Report',
        content: {
          sections: [
            { heading: 'Overview', body: 'This quarter showed significant growth...' },
            { heading: 'Metrics', body: 'Revenue increased by 25%...' }
          ],
          metadata: {
            author: 'AI Assistant',
            created: '2024-01-15T10:30:00Z',
            tags: ['quarterly', 'report', 'finance']
          }
        },
        options: {
          format: 'pdf',
          includeCharts: true
        }
      }}
      .output=${{ documentId: 'doc_abc123', url: 'https://docs.example.com/doc_abc123' }}
    ></mcp-tool-call>
  `,
};

export const LongOutput: Story = {
  render: () => html`
    <mcp-tool-call
      name="list_files"
      status="success"
      duration=${156}
      .input=${{ directory: '/home/user/projects', recursive: true }}
      .output=${{
        files: [
          '/home/user/projects/app/index.ts',
          '/home/user/projects/app/components/Button.tsx',
          '/home/user/projects/app/components/Input.tsx',
          '/home/user/projects/app/utils/helpers.ts',
          '/home/user/projects/app/styles/main.css',
          '/home/user/projects/tests/app.test.ts',
          '/home/user/projects/package.json',
          '/home/user/projects/tsconfig.json'
        ],
        count: 8
      }}
    ></mcp-tool-call>
  `,
};

export const MultipleTools: Story = {
  render: () => html`
    <div style="display: flex; flex-direction: column; gap: 1rem;">
      <mcp-tool-call
        name="search_web"
        status="success"
        duration=${1245}
        .input=${{ query: 'latest AI news' }}
        .output=${{ results: ['Article 1', 'Article 2', 'Article 3'] }}
      ></mcp-tool-call>

      <mcp-tool-call
        name="summarize_text"
        status="running"
        .input=${{ text: 'Long article content...', maxLength: 200 }}
      ></mcp-tool-call>

      <mcp-tool-call
        name="send_email"
        status="pending"
        .input=${{ to: 'user@example.com', subject: 'Summary Ready' }}
      ></mcp-tool-call>
    </div>
  `,
};
