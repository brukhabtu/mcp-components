import type { Meta, StoryObj } from '@storybook/web-components-vite';
import { html } from 'lit';
import './menu';

const meta: Meta = {
  title: 'Organisms/Menu',
  component: 'mcp-menu',
  tags: ['autodocs'],
};

export default meta;
type Story = StoryObj;

export const Default: Story = {
  render: () => html`
    <mcp-menu style="width: 200px;">
      <mcp-menu-item>Profile</mcp-menu-item>
      <mcp-menu-item>Settings</mcp-menu-item>
      <mcp-menu-item>Help</mcp-menu-item>
      <mcp-menu-divider></mcp-menu-divider>
      <mcp-menu-item>Logout</mcp-menu-item>
    </mcp-menu>
  `,
};

export const WithShortcuts: Story = {
  render: () => html`
    <mcp-menu style="width: 220px;">
      <mcp-menu-item shortcut="⌘N">New File</mcp-menu-item>
      <mcp-menu-item shortcut="⌘O">Open</mcp-menu-item>
      <mcp-menu-item shortcut="⌘S">Save</mcp-menu-item>
      <mcp-menu-item shortcut="⇧⌘S">Save As...</mcp-menu-item>
      <mcp-menu-divider></mcp-menu-divider>
      <mcp-menu-item shortcut="⌘Q">Quit</mcp-menu-item>
    </mcp-menu>
  `,
};

export const WithIcons: Story = {
  render: () => html`
    <mcp-menu style="width: 200px;">
      <mcp-menu-item>
        <svg slot="icon" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
          <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"/>
          <circle cx="12" cy="7" r="4"/>
        </svg>
        Profile
      </mcp-menu-item>
      <mcp-menu-item>
        <svg slot="icon" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
          <circle cx="12" cy="12" r="3"/>
          <path d="M19.4 15a1.65 1.65 0 0 0 .33 1.82l.06.06a2 2 0 0 1 0 2.83 2 2 0 0 1-2.83 0l-.06-.06a1.65 1.65 0 0 0-1.82-.33 1.65 1.65 0 0 0-1 1.51V21a2 2 0 0 1-2 2 2 2 0 0 1-2-2v-.09A1.65 1.65 0 0 0 9 19.4"/>
        </svg>
        Settings
      </mcp-menu-item>
      <mcp-menu-divider></mcp-menu-divider>
      <mcp-menu-item>
        <svg slot="icon" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
          <path d="M9 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h4"/>
          <polyline points="16 17 21 12 16 7"/>
          <line x1="21" y1="12" x2="9" y2="12"/>
        </svg>
        Logout
      </mcp-menu-item>
    </mcp-menu>
  `,
};

export const WithGroups: Story = {
  render: () => html`
    <mcp-menu style="width: 200px;">
      <mcp-menu-group label="Account">
        <mcp-menu-item>Profile</mcp-menu-item>
        <mcp-menu-item>Billing</mcp-menu-item>
      </mcp-menu-group>
      <mcp-menu-group label="Team">
        <mcp-menu-item>Members</mcp-menu-item>
        <mcp-menu-item>Invitations</mcp-menu-item>
      </mcp-menu-group>
    </mcp-menu>
  `,
};

export const WithDisabled: Story = {
  render: () => html`
    <mcp-menu style="width: 200px;">
      <mcp-menu-item>Edit</mcp-menu-item>
      <mcp-menu-item>Duplicate</mcp-menu-item>
      <mcp-menu-item disabled>Archive</mcp-menu-item>
      <mcp-menu-divider></mcp-menu-divider>
      <mcp-menu-item disabled>Delete</mcp-menu-item>
    </mcp-menu>
  `,
};

export const ContextMenu: Story = {
  render: () => html`
    <div
      style="width: 300px; height: 200px; border: 2px dashed var(--mcp-color-border); display: flex; align-items: center; justify-content: center; border-radius: 8px;"
      @contextmenu=${(e: Event) => {
        e.preventDefault();
        const menu = document.getElementById('context-menu') as any;
        menu.style.display = 'block';
      }}
    >
      Right-click here
    </div>
    <mcp-menu id="context-menu" style="width: 180px; display: none; position: absolute;">
      <mcp-menu-item shortcut="⌘C">Copy</mcp-menu-item>
      <mcp-menu-item shortcut="⌘X">Cut</mcp-menu-item>
      <mcp-menu-item shortcut="⌘V">Paste</mcp-menu-item>
      <mcp-menu-divider></mcp-menu-divider>
      <mcp-menu-item>Select All</mcp-menu-item>
    </mcp-menu>
  `,
};
