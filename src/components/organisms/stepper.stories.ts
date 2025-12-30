import type { Meta, StoryObj } from '@storybook/web-components-vite';
import { html } from 'lit';
import './stepper';

const meta: Meta = {
  title: 'Organisms/Stepper',
  component: 'mcp-stepper',
  tags: ['autodocs'],
  argTypes: {
    currentStep: { control: 'number' },
    vertical: { control: 'boolean' },
    clickable: { control: 'boolean' },
  },
};

export default meta;
type Story = StoryObj;

export const Default: Story = {
  args: {
    currentStep: 1,
  },
  render: (args) => html`
    <mcp-stepper currentStep=${args.currentStep} ?vertical=${args.vertical} ?clickable=${args.clickable}>
      <mcp-step label="Account" description="Create your account"></mcp-step>
      <mcp-step label="Profile" description="Set up your profile"></mcp-step>
      <mcp-step label="Review" description="Review and confirm"></mcp-step>
    </mcp-stepper>
  `,
};

export const FirstStep: Story = {
  render: () => html`
    <mcp-stepper currentStep="0">
      <mcp-step label="Cart" description="Review your items"></mcp-step>
      <mcp-step label="Shipping" description="Enter shipping details"></mcp-step>
      <mcp-step label="Payment" description="Complete payment"></mcp-step>
      <mcp-step label="Confirmation"></mcp-step>
    </mcp-stepper>
  `,
};

export const MiddleStep: Story = {
  render: () => html`
    <mcp-stepper currentStep="2">
      <mcp-step label="Cart" description="Review your items"></mcp-step>
      <mcp-step label="Shipping" description="Enter shipping details"></mcp-step>
      <mcp-step label="Payment" description="Complete payment"></mcp-step>
      <mcp-step label="Confirmation"></mcp-step>
    </mcp-stepper>
  `,
};

export const Completed: Story = {
  render: () => html`
    <mcp-stepper currentStep="4">
      <mcp-step label="Cart"></mcp-step>
      <mcp-step label="Shipping"></mcp-step>
      <mcp-step label="Payment"></mcp-step>
      <mcp-step label="Confirmation"></mcp-step>
    </mcp-stepper>
  `,
};

export const Clickable: Story = {
  render: () => html`
    <mcp-stepper
      currentStep="1"
      clickable
      @mcp-step-click=${(e: CustomEvent) => console.log('Step clicked:', e.detail.step)}
    >
      <mcp-step label="Step 1" description="First step"></mcp-step>
      <mcp-step label="Step 2" description="Second step"></mcp-step>
      <mcp-step label="Step 3" description="Third step"></mcp-step>
    </mcp-stepper>
  `,
};

export const SimpleLabels: Story = {
  render: () => html`
    <mcp-stepper currentStep="1">
      <mcp-step label="Details"></mcp-step>
      <mcp-step label="Address"></mcp-step>
      <mcp-step label="Payment"></mcp-step>
      <mcp-step label="Done"></mcp-step>
    </mcp-stepper>
  `,
};
