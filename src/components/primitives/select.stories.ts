import type { Meta, StoryObj } from '@storybook/web-components-vite';
import { html } from 'lit';
import './select';

const meta: Meta = {
  title: 'Primitives/Select',
  component: 'mcp-select',
  tags: ['autodocs'],
  argTypes: {
    placeholder: { control: 'text' },
    disabled: { control: 'boolean' },
    searchable: { control: 'boolean' },
  },
};

export default meta;
type Story = StoryObj;

const options = [
  { value: 'react', label: 'React' },
  { value: 'vue', label: 'Vue' },
  { value: 'angular', label: 'Angular' },
  { value: 'svelte', label: 'Svelte' },
  { value: 'lit', label: 'Lit' },
];

export const Default: Story = {
  args: {
    placeholder: 'Select a framework',
  },
  render: (args) => html`
    <mcp-select
      placeholder=${args.placeholder}
      ?disabled=${args.disabled}
      ?searchable=${args.searchable}
      .options=${options}
    ></mcp-select>
  `,
};

export const WithValue: Story = {
  render: () => html`
    <mcp-select
      placeholder="Select a framework"
      value="lit"
      .options=${options}
    ></mcp-select>
  `,
};

export const Searchable: Story = {
  render: () => html`
    <mcp-select
      placeholder="Search and select..."
      searchable
      .options=${[
        { value: 'us', label: 'United States' },
        { value: 'uk', label: 'United Kingdom' },
        { value: 'ca', label: 'Canada' },
        { value: 'au', label: 'Australia' },
        { value: 'de', label: 'Germany' },
        { value: 'fr', label: 'France' },
        { value: 'jp', label: 'Japan' },
        { value: 'cn', label: 'China' },
        { value: 'br', label: 'Brazil' },
        { value: 'in', label: 'India' },
      ]}
    ></mcp-select>
  `,
};

export const Disabled: Story = {
  render: () => html`
    <mcp-select
      placeholder="Disabled select"
      disabled
      .options=${options}
    ></mcp-select>
  `,
};

export const WithGroups: Story = {
  render: () => html`
    <mcp-select
      placeholder="Select a color"
      .options=${[
        { value: 'red', label: 'Red', group: 'Warm' },
        { value: 'orange', label: 'Orange', group: 'Warm' },
        { value: 'yellow', label: 'Yellow', group: 'Warm' },
        { value: 'blue', label: 'Blue', group: 'Cool' },
        { value: 'green', label: 'Green', group: 'Cool' },
        { value: 'purple', label: 'Purple', group: 'Cool' },
      ]}
    ></mcp-select>
  `,
};
