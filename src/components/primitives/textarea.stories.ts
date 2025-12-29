import type { Meta, StoryObj } from '@storybook/web-components-vite';
import { html } from 'lit';
import './textarea.js';

const meta: Meta = {
  title: 'Primitives/Textarea',
  component: 'mcp-textarea',
  tags: ['autodocs'],
  argTypes: {
    disabled: { control: 'boolean' },
    required: { control: 'boolean' },
    autosize: { control: 'boolean' },
    showCount: { control: 'boolean' },
    rows: { control: 'number' },
  },
};

export default meta;
type Story = StoryObj;

export const Default: Story = {
  args: {
    placeholder: 'Enter your message...',
    label: 'Message',
  },
  render: (args) => html`
    <mcp-textarea
      placeholder=${args.placeholder}
      label=${args.label}
      rows=${args.rows || 3}
      ?disabled=${args.disabled}
      ?required=${args.required}
      ?autosize=${args.autosize}
      ?showCount=${args.showCount}
    ></mcp-textarea>
  `,
};

export const WithLabel: Story = {
  render: () => html`
    <mcp-textarea label="Description" placeholder="Enter a description..."></mcp-textarea>
  `,
};

export const WithHelper: Story = {
  render: () => html`
    <mcp-textarea
      label="Bio"
      placeholder="Tell us about yourself..."
      helper="Maximum 500 characters"
    ></mcp-textarea>
  `,
};

export const WithError: Story = {
  render: () => html`
    <mcp-textarea
      label="Comment"
      value="Short"
      error="Comment must be at least 20 characters"
    ></mcp-textarea>
  `,
};

export const WithCharacterCount: Story = {
  render: () => html`
    <mcp-textarea
      label="Tweet"
      placeholder="What's happening?"
      maxlength="280"
      showCount
    ></mcp-textarea>
  `,
};

export const Autosize: Story = {
  render: () => html`
    <mcp-textarea
      label="Notes"
      placeholder="Start typing and the textarea will grow..."
      autosize
    ></mcp-textarea>
  `,
};

export const Disabled: Story = {
  render: () => html`
    <mcp-textarea
      label="Disabled"
      value="This textarea is disabled"
      disabled
    ></mcp-textarea>
  `,
};
