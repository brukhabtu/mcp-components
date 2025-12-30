import type { Meta, StoryObj } from '@storybook/web-components-vite';
import { html } from 'lit';
import './popover';
import '../primitives/button';

const meta: Meta = {
  title: 'Molecules/Popover',
  component: 'mcp-popover',
  tags: ['autodocs'],
  argTypes: {
    placement: {
      control: 'select',
      options: ['top', 'bottom', 'left', 'right'],
    },
    trigger: {
      control: 'select',
      options: ['click', 'hover'],
    },
  },
};

export default meta;
type Story = StoryObj;

export const Default: Story = {
  render: () => html`
    <div style="padding: 100px; display: flex; justify-content: center;">
      <mcp-popover>
        <mcp-button>Click me</mcp-button>
        <div slot="content">
          <strong>Popover Title</strong>
          <p style="margin: 0.5rem 0 0;">This is the popover content. It can contain any HTML.</p>
        </div>
      </mcp-popover>
    </div>
  `,
};

export const Placements: Story = {
  render: () => html`
    <div style="padding: 100px; display: flex; gap: 2rem; justify-content: center; flex-wrap: wrap;">
      <mcp-popover placement="top">
        <mcp-button variant="secondary">Top</mcp-button>
        <div slot="content">Popover on top</div>
      </mcp-popover>

      <mcp-popover placement="bottom">
        <mcp-button variant="secondary">Bottom</mcp-button>
        <div slot="content">Popover on bottom</div>
      </mcp-popover>

      <mcp-popover placement="left">
        <mcp-button variant="secondary">Left</mcp-button>
        <div slot="content">Popover on left</div>
      </mcp-popover>

      <mcp-popover placement="right">
        <mcp-button variant="secondary">Right</mcp-button>
        <div slot="content">Popover on right</div>
      </mcp-popover>
    </div>
  `,
};

export const HoverTrigger: Story = {
  render: () => html`
    <div style="padding: 100px; display: flex; justify-content: center;">
      <mcp-popover trigger="hover">
        <mcp-button>Hover me</mcp-button>
        <div slot="content">
          <p style="margin: 0;">This popover appears on hover!</p>
        </div>
      </mcp-popover>
    </div>
  `,
};

export const RichContent: Story = {
  render: () => html`
    <div style="padding: 100px; display: flex; justify-content: center;">
      <mcp-popover>
        <mcp-button>User Menu</mcp-button>
        <div slot="content">
          <div style="display: flex; align-items: center; gap: 0.75rem; margin-bottom: 0.75rem;">
            <div style="width: 2.5rem; height: 2.5rem; background: var(--mcp-color-primary); border-radius: 50%; display: flex; align-items: center; justify-content: center; color: white;">JD</div>
            <div>
              <div style="font-weight: 600;">John Doe</div>
              <div style="font-size: 0.75rem; color: var(--mcp-color-ghost-foreground);">john@example.com</div>
            </div>
          </div>
          <hr style="border: none; border-top: 1px solid var(--mcp-color-border); margin: 0.75rem 0;">
          <div style="display: flex; flex-direction: column; gap: 0.5rem;">
            <a href="#" style="color: var(--mcp-color-foreground); text-decoration: none;">Profile</a>
            <a href="#" style="color: var(--mcp-color-foreground); text-decoration: none;">Settings</a>
            <a href="#" style="color: var(--mcp-color-error); text-decoration: none;">Sign out</a>
          </div>
        </div>
      </mcp-popover>
    </div>
  `,
};

export const WithEvents: Story = {
  render: () => html`
    <div style="padding: 100px; display: flex; justify-content: center;">
      <mcp-popover
        @mcp-open=${() => console.log('Popover opened')}
        @mcp-close=${() => console.log('Popover closed')}
      >
        <mcp-button>Open Popover</mcp-button>
        <div slot="content">
          <p style="margin: 0;">Check the console for events!</p>
        </div>
      </mcp-popover>
    </div>
  `,
};
