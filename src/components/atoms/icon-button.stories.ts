import type { Meta, StoryObj } from '@storybook/web-components-vite';
import { html } from 'lit';
import './icon-button.js';

const meta: Meta = {
  title: 'Atoms/IconButton',
  component: 'mcp-icon-button',
  tags: ['autodocs'],
  argTypes: {
    variant: {
      control: 'select',
      options: ['primary', 'secondary', 'tertiary', 'ghost'],
    },
    size: { control: 'select', options: ['sm', 'md', 'lg'] },
    disabled: { control: 'boolean' },
    loading: { control: 'boolean' },
    label: { control: 'text' },
  },
};

export default meta;
type Story = StoryObj;

// Common icons for stories
const plusIcon = html`<svg viewBox="0 0 24 24"><line x1="12" y1="5" x2="12" y2="19"/><line x1="5" y1="12" x2="19" y2="12"/></svg>`;
const sendIcon = html`<svg viewBox="0 0 24 24"><line x1="22" y1="2" x2="11" y2="13"/><polygon points="22 2 15 22 11 13 2 9 22 2"/></svg>`;
const heartIcon = html`<svg viewBox="0 0 24 24"><path d="M20.84 4.61a5.5 5.5 0 00-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 00-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 000-7.78z"/></svg>`;
const trashIcon = html`<svg viewBox="0 0 24 24"><polyline points="3 6 5 6 21 6"/><path d="M19 6v14a2 2 0 01-2 2H7a2 2 0 01-2-2V6m3 0V4a2 2 0 012-2h4a2 2 0 012 2v2"/></svg>`;
const moreIcon = html`<svg viewBox="0 0 24 24"><circle cx="12" cy="12" r="1"/><circle cx="19" cy="12" r="1"/><circle cx="5" cy="12" r="1"/></svg>`;

export const Default: Story = {
  args: {
    variant: 'primary',
    size: 'md',
    label: 'Add item',
  },
  render: (args) => html`
    <mcp-icon-button
      variant=${args.variant}
      size=${args.size}
      ?disabled=${args.disabled}
      ?loading=${args.loading}
      label=${args.label}
    >
      ${plusIcon}
    </mcp-icon-button>
  `,
};

export const Variants: Story = {
  render: () => html`
    <div style="display: flex; gap: 1rem; align-items: center;">
      <mcp-icon-button variant="primary" label="Primary">${plusIcon}</mcp-icon-button>
      <mcp-icon-button variant="secondary" label="Secondary">${plusIcon}</mcp-icon-button>
      <mcp-icon-button variant="tertiary" label="Tertiary">${plusIcon}</mcp-icon-button>
      <mcp-icon-button variant="ghost" label="Ghost">${plusIcon}</mcp-icon-button>
    </div>
  `,
};

export const Sizes: Story = {
  render: () => html`
    <div style="display: flex; gap: 1rem; align-items: center;">
      <mcp-icon-button size="sm" variant="primary" label="Small">${plusIcon}</mcp-icon-button>
      <mcp-icon-button size="md" variant="primary" label="Medium">${plusIcon}</mcp-icon-button>
      <mcp-icon-button size="lg" variant="primary" label="Large">${plusIcon}</mcp-icon-button>
    </div>
  `,
};

export const Square: Story = {
  render: () => html`
    <div style="display: flex; gap: 1rem; align-items: center;">
      <mcp-icon-button square variant="primary" label="Square primary">${plusIcon}</mcp-icon-button>
      <mcp-icon-button square variant="secondary" label="Square secondary">${plusIcon}</mcp-icon-button>
      <mcp-icon-button square variant="tertiary" label="Square tertiary">${plusIcon}</mcp-icon-button>
      <mcp-icon-button square variant="ghost" label="Square ghost">${plusIcon}</mcp-icon-button>
    </div>
  `,
};

export const Loading: Story = {
  render: () => html`
    <div style="display: flex; gap: 1rem; align-items: center;">
      <mcp-icon-button loading variant="primary" label="Loading">${plusIcon}</mcp-icon-button>
      <mcp-icon-button loading variant="secondary" label="Loading">${plusIcon}</mcp-icon-button>
      <mcp-icon-button loading variant="ghost" label="Loading">${plusIcon}</mcp-icon-button>
    </div>
  `,
};

export const Disabled: Story = {
  render: () => html`
    <div style="display: flex; gap: 1rem; align-items: center;">
      <mcp-icon-button disabled variant="primary" label="Disabled">${plusIcon}</mcp-icon-button>
      <mcp-icon-button disabled variant="secondary" label="Disabled">${plusIcon}</mcp-icon-button>
      <mcp-icon-button disabled variant="ghost" label="Disabled">${plusIcon}</mcp-icon-button>
    </div>
  `,
};

export const CommonActions: Story = {
  name: 'Common Action Icons',
  render: () => html`
    <div style="display: flex; gap: 0.5rem; align-items: center;">
      <mcp-icon-button variant="primary" label="Send">${sendIcon}</mcp-icon-button>
      <mcp-icon-button variant="ghost" label="Like">${heartIcon}</mcp-icon-button>
      <mcp-icon-button variant="ghost" label="Delete">${trashIcon}</mcp-icon-button>
      <mcp-icon-button variant="ghost" label="More options">${moreIcon}</mcp-icon-button>
    </div>
  `,
};

export const Toolbar: Story = {
  name: 'Toolbar Example',
  render: () => html`
    <div style="display: flex; gap: 0.25rem; padding: 0.5rem; background: var(--mcp-color-ghost); border-radius: var(--mcp-radius-lg); width: fit-content;">
      <mcp-icon-button variant="ghost" size="sm" label="Bold">
        <svg viewBox="0 0 24 24"><path d="M6 4h8a4 4 0 014 4 4 4 0 01-4 4H6z"/><path d="M6 12h9a4 4 0 014 4 4 4 0 01-4 4H6z"/></svg>
      </mcp-icon-button>
      <mcp-icon-button variant="ghost" size="sm" label="Italic">
        <svg viewBox="0 0 24 24"><line x1="19" y1="4" x2="10" y2="4"/><line x1="14" y1="20" x2="5" y2="20"/><line x1="15" y1="4" x2="9" y2="20"/></svg>
      </mcp-icon-button>
      <mcp-icon-button variant="ghost" size="sm" label="Underline">
        <svg viewBox="0 0 24 24"><path d="M6 3v7a6 6 0 006 6 6 6 0 006-6V3"/><line x1="4" y1="21" x2="20" y2="21"/></svg>
      </mcp-icon-button>
      <div style="width: 1px; background: var(--mcp-color-border); margin: 0.25rem 0.25rem;"></div>
      <mcp-icon-button variant="ghost" size="sm" label="Link">
        <svg viewBox="0 0 24 24"><path d="M10 13a5 5 0 007.54.54l3-3a5 5 0 00-7.07-7.07l-1.72 1.71"/><path d="M14 11a5 5 0 00-7.54-.54l-3 3a5 5 0 007.07 7.07l1.71-1.71"/></svg>
      </mcp-icon-button>
      <mcp-icon-button variant="ghost" size="sm" label="Image">
        <svg viewBox="0 0 24 24"><rect x="3" y="3" width="18" height="18" rx="2" ry="2"/><circle cx="8.5" cy="8.5" r="1.5"/><polyline points="21 15 16 10 5 21"/></svg>
      </mcp-icon-button>
    </div>
  `,
};
