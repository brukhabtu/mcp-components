import type { Meta, StoryObj } from '@storybook/web-components-vite';
import { html } from 'lit';
import './accordion';

const meta: Meta = {
  title: 'Organisms/Accordion',
  component: 'mcp-accordion',
  tags: ['autodocs'],
  argTypes: {
    multiple: { control: 'boolean' },
  },
};

export default meta;
type Story = StoryObj;

export const Default: Story = {
  render: () => html`
    <mcp-accordion>
      <mcp-accordion-item>
        <span slot="header">What is MCP?</span>
        <p>MCP (Model Context Protocol) is a protocol for connecting AI models to external tools and data sources.</p>
      </mcp-accordion-item>
      <mcp-accordion-item>
        <span slot="header">How do I get started?</span>
        <p>Install the mcp-components package and import the components you need. Check out our documentation for detailed guides.</p>
      </mcp-accordion-item>
      <mcp-accordion-item>
        <span slot="header">Is it open source?</span>
        <p>Yes! MCP components are open source and available on GitHub.</p>
      </mcp-accordion-item>
    </mcp-accordion>
  `,
};

export const Multiple: Story = {
  render: () => html`
    <mcp-accordion multiple>
      <mcp-accordion-item open>
        <span slot="header">Section 1</span>
        <p>This section is open by default.</p>
      </mcp-accordion-item>
      <mcp-accordion-item open>
        <span slot="header">Section 2</span>
        <p>Multiple sections can be open at once.</p>
      </mcp-accordion-item>
      <mcp-accordion-item>
        <span slot="header">Section 3</span>
        <p>Click to toggle this section.</p>
      </mcp-accordion-item>
    </mcp-accordion>
  `,
};

export const WithDefaultOpen: Story = {
  render: () => html`
    <mcp-accordion>
      <mcp-accordion-item open>
        <span slot="header">Open by Default</span>
        <p>This accordion item starts in the open state.</p>
      </mcp-accordion-item>
      <mcp-accordion-item>
        <span slot="header">Closed by Default</span>
        <p>This one is closed initially.</p>
      </mcp-accordion-item>
    </mcp-accordion>
  `,
};

export const Disabled: Story = {
  render: () => html`
    <mcp-accordion>
      <mcp-accordion-item>
        <span slot="header">Enabled Item</span>
        <p>This item can be toggled.</p>
      </mcp-accordion-item>
      <mcp-accordion-item disabled>
        <span slot="header">Disabled Item</span>
        <p>This content won't be accessible.</p>
      </mcp-accordion-item>
      <mcp-accordion-item>
        <span slot="header">Another Enabled Item</span>
        <p>This item can also be toggled.</p>
      </mcp-accordion-item>
    </mcp-accordion>
  `,
};

export const FAQ: Story = {
  render: () => html`
    <div style="max-width: 600px;">
      <h2 style="margin-bottom: 1rem;">Frequently Asked Questions</h2>
      <mcp-accordion>
        <mcp-accordion-item>
          <span slot="header">How do I create an account?</span>
          <p>Click the "Sign Up" button in the top right corner and follow the registration process. You'll need a valid email address.</p>
        </mcp-accordion-item>
        <mcp-accordion-item>
          <span slot="header">What payment methods do you accept?</span>
          <p>We accept all major credit cards (Visa, MasterCard, American Express), PayPal, and bank transfers for enterprise customers.</p>
        </mcp-accordion-item>
        <mcp-accordion-item>
          <span slot="header">Can I cancel my subscription?</span>
          <p>Yes, you can cancel your subscription at any time from your account settings. You'll continue to have access until the end of your billing period.</p>
        </mcp-accordion-item>
        <mcp-accordion-item>
          <span slot="header">How do I contact support?</span>
          <p>You can reach our support team via email at support@example.com or through the chat widget in the bottom right corner of the page.</p>
        </mcp-accordion-item>
      </mcp-accordion>
    </div>
  `,
};
