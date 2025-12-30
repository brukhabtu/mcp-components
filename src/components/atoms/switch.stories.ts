import type { Meta, StoryObj } from '@storybook/web-components-vite';
import { html } from 'lit';
import './switch';

const meta: Meta = {
  title: 'Atoms/Switch',
  component: 'mcp-switch',
  tags: ['autodocs'],
  argTypes: {
    checked: { control: 'boolean' },
    disabled: { control: 'boolean' },
    label: { control: 'text' },
    labelPosition: {
      control: 'select',
      options: ['left', 'right'],
    },
  },
};

export default meta;
type Story = StoryObj;

export const Default: Story = {
  args: {
    label: 'Enable notifications',
    checked: false,
  },
  render: (args) => html`
    <mcp-switch
      label=${args.label}
      ?checked=${args.checked}
      ?disabled=${args.disabled}
      labelPosition=${args.labelPosition || 'right'}
    ></mcp-switch>
  `,
};

export const Checked: Story = {
  render: () => html`
    <mcp-switch label="Feature enabled" checked></mcp-switch>
  `,
};

export const LabelPositions: Story = {
  render: () => html`
    <div style="display: flex; flex-direction: column; gap: 1rem;">
      <mcp-switch label="Label on right" labelPosition="right"></mcp-switch>
      <mcp-switch label="Label on left" labelPosition="left"></mcp-switch>
    </div>
  `,
};

export const Disabled: Story = {
  render: () => html`
    <div style="display: flex; flex-direction: column; gap: 0.5rem;">
      <mcp-switch label="Disabled off" disabled></mcp-switch>
      <mcp-switch label="Disabled on" disabled checked></mcp-switch>
    </div>
  `,
};

export const SettingsPanel: Story = {
  render: () => html`
    <mcp-card>
      <div style="display: flex; flex-direction: column; gap: 1.5rem; padding: 0.5rem;">
        <div style="display: flex; justify-content: space-between; align-items: center;">
          <div>
            <div style="font-weight: 500;">Dark Mode</div>
            <div style="font-size: 0.875rem; color: var(--mcp-color-ghost-foreground);">Enable dark theme</div>
          </div>
          <mcp-switch checked></mcp-switch>
        </div>
        <mcp-divider></mcp-divider>
        <div style="display: flex; justify-content: space-between; align-items: center;">
          <div>
            <div style="font-weight: 500;">Notifications</div>
            <div style="font-size: 0.875rem; color: var(--mcp-color-ghost-foreground);">Receive push notifications</div>
          </div>
          <mcp-switch></mcp-switch>
        </div>
        <mcp-divider></mcp-divider>
        <div style="display: flex; justify-content: space-between; align-items: center;">
          <div>
            <div style="font-weight: 500;">Auto-save</div>
            <div style="font-size: 0.875rem; color: var(--mcp-color-ghost-foreground);">Automatically save changes</div>
          </div>
          <mcp-switch checked></mcp-switch>
        </div>
      </div>
    </mcp-card>
  `,
};
