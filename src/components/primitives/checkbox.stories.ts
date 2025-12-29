import type { Meta, StoryObj } from '@storybook/web-components-vite';
import { html } from 'lit';
import './checkbox';

const meta: Meta = {
  title: 'Primitives/Checkbox',
  component: 'mcp-checkbox',
  tags: ['autodocs'],
  argTypes: {
    checked: { control: 'boolean' },
    indeterminate: { control: 'boolean' },
    disabled: { control: 'boolean' },
    label: { control: 'text' },
  },
};

export default meta;
type Story = StoryObj;

export const Default: Story = {
  args: {
    label: 'Accept terms and conditions',
    checked: false,
  },
  render: (args) => html`
    <mcp-checkbox
      label=${args.label}
      ?checked=${args.checked}
      ?indeterminate=${args.indeterminate}
      ?disabled=${args.disabled}
    ></mcp-checkbox>
  `,
};

export const Checked: Story = {
  render: () => html`
    <mcp-checkbox label="This is checked" checked></mcp-checkbox>
  `,
};

export const Indeterminate: Story = {
  render: () => html`
    <mcp-checkbox label="Indeterminate state" indeterminate></mcp-checkbox>
  `,
};

export const Disabled: Story = {
  render: () => html`
    <div style="display: flex; flex-direction: column; gap: 0.5rem;">
      <mcp-checkbox label="Disabled unchecked" disabled></mcp-checkbox>
      <mcp-checkbox label="Disabled checked" disabled checked></mcp-checkbox>
    </div>
  `,
};

export const Group: Story = {
  render: () => html`
    <div style="display: flex; flex-direction: column; gap: 0.5rem;">
      <mcp-checkbox label="Option 1" checked></mcp-checkbox>
      <mcp-checkbox label="Option 2"></mcp-checkbox>
      <mcp-checkbox label="Option 3" checked></mcp-checkbox>
      <mcp-checkbox label="Option 4"></mcp-checkbox>
    </div>
  `,
};

export const WithDescription: Story = {
  render: () => html`
    <div style="display: flex; flex-direction: column; gap: 1rem;">
      <div>
        <mcp-checkbox label="Marketing emails"></mcp-checkbox>
        <div style="margin-left: 1.75rem; font-size: 0.875rem; color: var(--mcp-color-muted-foreground);">
          Receive emails about new products and features.
        </div>
      </div>
      <div>
        <mcp-checkbox label="Security alerts" checked></mcp-checkbox>
        <div style="margin-left: 1.75rem; font-size: 0.875rem; color: var(--mcp-color-muted-foreground);">
          Get notified about security issues.
        </div>
      </div>
    </div>
  `,
};
