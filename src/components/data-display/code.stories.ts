import type { Meta, StoryObj } from '@storybook/web-components-vite';
import { html } from 'lit';
import './code';

const meta: Meta = {
  title: 'Data Display/Code',
  component: 'mcp-code',
  tags: ['autodocs'],
  argTypes: {
    language: { control: 'text' },
    copyable: { control: 'boolean' },
    inline: { control: 'boolean' },
  },
};

export default meta;
type Story = StoryObj;

export const Default: Story = {
  render: () => html`
    <mcp-code language="javascript">
const greeting = "Hello, World!";
console.log(greeting);
    </mcp-code>
  `,
};

export const JSON: Story = {
  render: () => html`
    <mcp-code language="json">{
  "name": "@mcp/ui-components",
  "version": "1.0.0",
  "type": "module"
}</mcp-code>
  `,
};

export const TypeScript: Story = {
  render: () => html`
    <mcp-code language="typescript">
interface User {
  id: number;
  name: string;
  email: string;
}

function greet(user: User): string {
  return \`Hello, \${user.name}!\`;
}
    </mcp-code>
  `,
};

export const WithoutCopy: Story = {
  render: () => html`
    <mcp-code language="bash" .copyable=${false}>
npm install @mcp/ui-components
    </mcp-code>
  `,
};

export const Inline: Story = {
  render: () => html`
    <p>
      Use the <mcp-code inline>npm install</mcp-code> command to install packages,
      or <mcp-code inline>npm run build</mcp-code> to build the project.
    </p>
  `,
};

export const MCPToolResponse: Story = {
  render: () => html`
    <mcp-code language="json">{
  "tool": "read_file",
  "result": {
    "content": "Hello, World!",
    "path": "/home/user/hello.txt",
    "size": 13
  }
}</mcp-code>
  `,
};
