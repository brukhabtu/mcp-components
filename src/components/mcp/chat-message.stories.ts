import type { Meta, StoryObj } from '@storybook/web-components-vite';
import { html } from 'lit';
import './chat-message';

const meta: Meta = {
  title: 'MCP/ChatMessage',
  component: 'mcp-chat-message',
  tags: ['autodocs'],
  argTypes: {
    role: {
      control: 'select',
      options: ['user', 'assistant', 'system', 'tool'],
    },
    timestamp: { control: 'text' },
  },
};

export default meta;
type Story = StoryObj;

export const User: Story = {
  render: () => html`
    <mcp-chat-message role="user" timestamp="10:30 AM">
      Hello! Can you help me understand how MCP works?
    </mcp-chat-message>
  `,
};

export const Assistant: Story = {
  render: () => html`
    <mcp-chat-message role="assistant" timestamp="10:31 AM">
      Of course! MCP (Model Context Protocol) is a protocol that enables AI models to interact with external tools and data sources. It provides a standardized way for AI assistants to access real-world functionality.
    </mcp-chat-message>
  `,
};

export const System: Story = {
  render: () => html`
    <mcp-chat-message role="system">
      You are a helpful assistant with access to various tools.
    </mcp-chat-message>
  `,
};

export const Tool: Story = {
  render: () => html`
    <mcp-chat-message role="tool" timestamp="10:32 AM">
      <pre style="margin: 0;">{"status": "success", "data": {"temperature": 72, "humidity": 45}}</pre>
    </mcp-chat-message>
  `,
};

export const Conversation: Story = {
  render: () => html`
    <div style="display: flex; flex-direction: column; gap: 1rem; max-width: 600px;">
      <mcp-chat-message role="system">
        You are a helpful weather assistant with access to weather data tools.
      </mcp-chat-message>

      <mcp-chat-message role="user" timestamp="2:15 PM">
        What's the weather like in San Francisco today?
      </mcp-chat-message>

      <mcp-chat-message role="assistant" timestamp="2:15 PM">
        Let me check the current weather in San Francisco for you.
      </mcp-chat-message>

      <mcp-chat-message role="tool" timestamp="2:15 PM">
        <pre style="margin: 0;">{
  "location": "San Francisco, CA",
  "temperature": 68,
  "condition": "Partly Cloudy",
  "humidity": 65
}</pre>
      </mcp-chat-message>

      <mcp-chat-message role="assistant" timestamp="2:16 PM">
        The weather in San Francisco is currently 68°F (20°C) with partly cloudy skies. The humidity is at 65%, which is fairly comfortable. It's a pleasant day!
      </mcp-chat-message>

      <mcp-chat-message role="user" timestamp="2:16 PM">
        Thanks! Should I bring a jacket?
      </mcp-chat-message>

      <mcp-chat-message role="assistant" timestamp="2:17 PM">
        I'd recommend bringing a light jacket. San Francisco is known for its microclimates and temperature changes, especially in the evening. The fog can roll in and temperatures can drop by 10-15 degrees, so it's always good to be prepared!
      </mcp-chat-message>
    </div>
  `,
};

export const WithCodeBlock: Story = {
  render: () => html`
    <mcp-chat-message role="assistant" timestamp="3:00 PM">
      <p>Here's how you can create a simple MCP tool:</p>
      <pre style="background: var(--mcp-color-ghost); padding: 1rem; border-radius: 0.5rem; overflow-x: auto;">
const tool = {
  name: 'get_weather',
  description: 'Get current weather',
  parameters: {
    type: 'object',
    properties: {
      location: { type: 'string' }
    }
  }
};</pre>
    </mcp-chat-message>
  `,
};

export const Loading: Story = {
  render: () => html`
    <div style="display: flex; flex-direction: column; gap: 1rem; max-width: 600px;">
      <mcp-chat-message role="user" timestamp="4:00 PM">
        Can you analyze this data?
      </mcp-chat-message>
      <mcp-chat-message role="assistant" timestamp="4:00 PM">
        <div style="display: flex; align-items: center; gap: 0.5rem;">
          <mcp-spinner size="sm"></mcp-spinner>
          <span>Analyzing...</span>
        </div>
      </mcp-chat-message>
    </div>
  `,
};
