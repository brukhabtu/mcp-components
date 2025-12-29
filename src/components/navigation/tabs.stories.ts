import type { Meta, StoryObj } from '@storybook/web-components-vite';
import { html } from 'lit';
import './tabs';

const meta: Meta = {
  title: 'Navigation/Tabs',
  component: 'mcp-tabs',
  tags: ['autodocs'],
  argTypes: {
    activeTab: { control: 'text' },
    variant: {
      control: 'select',
      options: ['default', 'pills', 'underline'],
    },
  },
};

export default meta;
type Story = StoryObj;

export const Default: Story = {
  render: () => html`
    <mcp-tabs activeTab="tab1">
      <mcp-tab slot="tabs" value="tab1">Account</mcp-tab>
      <mcp-tab slot="tabs" value="tab2">Password</mcp-tab>
      <mcp-tab slot="tabs" value="tab3">Settings</mcp-tab>

      <mcp-tab-panel value="tab1">
        <h3>Account Settings</h3>
        <p>Manage your account details and preferences.</p>
      </mcp-tab-panel>
      <mcp-tab-panel value="tab2">
        <h3>Password Settings</h3>
        <p>Change your password and security settings.</p>
      </mcp-tab-panel>
      <mcp-tab-panel value="tab3">
        <h3>General Settings</h3>
        <p>Configure your application preferences.</p>
      </mcp-tab-panel>
    </mcp-tabs>
  `,
};

export const Pills: Story = {
  render: () => html`
    <mcp-tabs activeTab="overview" variant="pills">
      <mcp-tab slot="tabs" value="overview">Overview</mcp-tab>
      <mcp-tab slot="tabs" value="analytics">Analytics</mcp-tab>
      <mcp-tab slot="tabs" value="reports">Reports</mcp-tab>

      <mcp-tab-panel value="overview">
        <p>Overview content goes here.</p>
      </mcp-tab-panel>
      <mcp-tab-panel value="analytics">
        <p>Analytics content goes here.</p>
      </mcp-tab-panel>
      <mcp-tab-panel value="reports">
        <p>Reports content goes here.</p>
      </mcp-tab-panel>
    </mcp-tabs>
  `,
};

export const Underline: Story = {
  render: () => html`
    <mcp-tabs activeTab="home" variant="underline">
      <mcp-tab slot="tabs" value="home">Home</mcp-tab>
      <mcp-tab slot="tabs" value="profile">Profile</mcp-tab>
      <mcp-tab slot="tabs" value="messages">Messages</mcp-tab>

      <mcp-tab-panel value="home">
        <p>Welcome home!</p>
      </mcp-tab-panel>
      <mcp-tab-panel value="profile">
        <p>Your profile information.</p>
      </mcp-tab-panel>
      <mcp-tab-panel value="messages">
        <p>Your messages will appear here.</p>
      </mcp-tab-panel>
    </mcp-tabs>
  `,
};

export const WithDisabled: Story = {
  render: () => html`
    <mcp-tabs activeTab="active">
      <mcp-tab slot="tabs" value="active">Active Tab</mcp-tab>
      <mcp-tab slot="tabs" value="disabled" disabled>Disabled</mcp-tab>
      <mcp-tab slot="tabs" value="another">Another Tab</mcp-tab>

      <mcp-tab-panel value="active">
        <p>This tab is active.</p>
      </mcp-tab-panel>
      <mcp-tab-panel value="disabled">
        <p>This content won't be shown.</p>
      </mcp-tab-panel>
      <mcp-tab-panel value="another">
        <p>Another tab's content.</p>
      </mcp-tab-panel>
    </mcp-tabs>
  `,
};

export const WithIcons: Story = {
  render: () => html`
    <mcp-tabs activeTab="users">
      <mcp-tab slot="tabs" value="users">
        <span style="display: flex; align-items: center; gap: 0.5rem;">
          <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
            <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"/>
            <circle cx="12" cy="7" r="4"/>
          </svg>
          Users
        </span>
      </mcp-tab>
      <mcp-tab slot="tabs" value="settings">
        <span style="display: flex; align-items: center; gap: 0.5rem;">
          <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
            <circle cx="12" cy="12" r="3"/>
            <path d="M19.4 15a1.65 1.65 0 0 0 .33 1.82l.06.06a2 2 0 0 1 0 2.83 2 2 0 0 1-2.83 0l-.06-.06a1.65 1.65 0 0 0-1.82-.33 1.65 1.65 0 0 0-1 1.51V21a2 2 0 0 1-2 2 2 2 0 0 1-2-2v-.09A1.65 1.65 0 0 0 9 19.4a1.65 1.65 0 0 0-1.82.33l-.06.06a2 2 0 0 1-2.83 0 2 2 0 0 1 0-2.83l.06-.06a1.65 1.65 0 0 0 .33-1.82 1.65 1.65 0 0 0-1.51-1H3a2 2 0 0 1-2-2 2 2 0 0 1 2-2h.09A1.65 1.65 0 0 0 4.6 9a1.65 1.65 0 0 0-.33-1.82l-.06-.06a2 2 0 0 1 0-2.83 2 2 0 0 1 2.83 0l.06.06a1.65 1.65 0 0 0 1.82.33H9a1.65 1.65 0 0 0 1-1.51V3a2 2 0 0 1 2-2 2 2 0 0 1 2 2v.09a1.65 1.65 0 0 0 1 1.51 1.65 1.65 0 0 0 1.82-.33l.06-.06a2 2 0 0 1 2.83 0 2 2 0 0 1 0 2.83l-.06.06a1.65 1.65 0 0 0-.33 1.82V9a1.65 1.65 0 0 0 1.51 1H21a2 2 0 0 1 2 2 2 2 0 0 1-2 2h-.09a1.65 1.65 0 0 0-1.51 1z"/>
          </svg>
          Settings
        </span>
      </mcp-tab>

      <mcp-tab-panel value="users">
        <p>User management content.</p>
      </mcp-tab-panel>
      <mcp-tab-panel value="settings">
        <p>Settings content.</p>
      </mcp-tab-panel>
    </mcp-tabs>
  `,
};
