import type { Meta, StoryObj } from '@storybook/web-components-vite';
import { html } from 'lit';
import './input';

const meta: Meta = {
  title: 'Primitives/Input',
  component: 'mcp-input',
  tags: ['autodocs'],
  argTypes: {
    type: {
      control: 'select',
      options: ['text', 'email', 'password', 'number', 'search', 'tel', 'url'],
    },
    disabled: { control: 'boolean' },
    required: { control: 'boolean' },
  },
};

export default meta;
type Story = StoryObj;

export const Default: Story = {
  args: {
    placeholder: 'Enter text...',
    label: 'Label',
  },
  render: (args) => html`
    <mcp-input
      placeholder=${args.placeholder}
      label=${args.label}
      ?disabled=${args.disabled}
      ?required=${args.required}
    ></mcp-input>
  `,
};

export const WithLabel: Story = {
  render: () => html`
    <mcp-input label="Email Address" placeholder="you@example.com" type="email"></mcp-input>
  `,
};

export const WithHelper: Story = {
  render: () => html`
    <mcp-input label="Username" placeholder="johndoe" helper="Choose a unique username"></mcp-input>
  `,
};

export const WithError: Story = {
  render: () => html`
    <mcp-input label="Email" value="invalid-email" error="Please enter a valid email address"></mcp-input>
  `,
};

export const Required: Story = {
  render: () => html`
    <mcp-input label="Required Field" required placeholder="This field is required"></mcp-input>
  `,
};

export const Disabled: Story = {
  render: () => html`
    <mcp-input label="Disabled" value="Cannot edit" disabled></mcp-input>
  `,
};

export const Password: Story = {
  render: () => html`
    <mcp-input label="Password" type="password" placeholder="Enter password"></mcp-input>
  `,
};

export const Types: Story = {
  render: () => html`
    <div style="display: flex; flex-direction: column; gap: 1rem; max-width: 300px;">
      <mcp-input label="Text" type="text" placeholder="Text input"></mcp-input>
      <mcp-input label="Email" type="email" placeholder="email@example.com"></mcp-input>
      <mcp-input label="Password" type="password" placeholder="Password"></mcp-input>
      <mcp-input label="Number" type="number" placeholder="123"></mcp-input>
      <mcp-input label="Search" type="search" placeholder="Search..."></mcp-input>
    </div>
  `,
};
