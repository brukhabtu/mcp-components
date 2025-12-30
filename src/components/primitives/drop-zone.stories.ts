import type { Meta, StoryObj } from '@storybook/web-components-vite';
import { html } from 'lit';
import './drop-zone.js';

const meta: Meta = {
  title: 'Primitives/DropZone',
  component: 'mcp-drop-zone',
  tags: ['autodocs'],
  argTypes: {
    accept: { control: 'text' },
    multiple: { control: 'boolean' },
    disabled: { control: 'boolean' },
    compact: { control: 'boolean' },
    hint: { control: 'text' },
    error: { control: 'text' },
  },
};

export default meta;
type Story = StoryObj;

export const Default: Story = {
  render: () => html`
    <mcp-drop-zone
      @mcp-drop=${(e: CustomEvent) => console.log('Dropped:', e.detail.files)}
      @mcp-select=${(e: CustomEvent) => console.log('Selected:', e.detail.files)}
    ></mcp-drop-zone>
  `,
};

export const WithHint: Story = {
  render: () => html`
    <mcp-drop-zone
      hint="PNG, JPG, GIF up to 10MB"
      accept="image/*"
    ></mcp-drop-zone>
  `,
};

export const Compact: Story = {
  render: () => html`
    <mcp-drop-zone compact></mcp-drop-zone>
  `,
};

export const MultipleFiles: Story = {
  render: () => html`
    <mcp-drop-zone
      multiple
      hint="You can select multiple files"
    ></mcp-drop-zone>
  `,
};

export const ImagesOnly: Story = {
  render: () => html`
    <mcp-drop-zone
      accept="image/*"
      hint="Only image files are accepted"
    ></mcp-drop-zone>
  `,
};

export const DocumentsOnly: Story = {
  render: () => html`
    <mcp-drop-zone
      accept=".pdf,.doc,.docx,.txt"
      hint="PDF, DOC, DOCX, or TXT files"
    ></mcp-drop-zone>
  `,
};

export const WithError: Story = {
  render: () => html`
    <mcp-drop-zone
      error="File size exceeds 10MB limit"
    ></mcp-drop-zone>
  `,
};

export const Disabled: Story = {
  render: () => html`
    <mcp-drop-zone disabled></mcp-drop-zone>
  `,
};

export const CustomContent: Story = {
  render: () => html`
    <mcp-drop-zone>
      <svg slot="icon" viewBox="0 0 24 24" style="width: 3rem; height: 3rem;" fill="none" stroke="var(--mcp-color-primary)" stroke-width="1.5">
        <rect x="3" y="3" width="18" height="18" rx="2" ry="2"/>
        <circle cx="8.5" cy="8.5" r="1.5"/>
        <polyline points="21 15 16 10 5 21"/>
      </svg>
      <div style="text-align: center;">
        <p style="font-weight: 500; margin: 0;">Upload your images</p>
        <p style="font-size: 0.75rem; color: var(--mcp-color-ghost-foreground); margin: 0.5rem 0 0;">
          Drag photos here or click to browse
        </p>
      </div>
    </mcp-drop-zone>
  `,
};

export const WithFileList: Story = {
  name: 'Interactive with File List',
  render: () => html`
    <div style="max-width: 400px;">
      <mcp-drop-zone
        multiple
        hint="Drop files or click to upload"
        @mcp-drop=${(e: CustomEvent) => {
          const list = document.getElementById('file-list');
          if (list) {
            Array.from(e.detail.files as FileList).forEach((file: File) => {
              const item = document.createElement('div');
              item.style.cssText = 'display: flex; align-items: center; gap: 0.5rem; padding: 0.5rem; background: var(--mcp-color-ghost); border-radius: 0.375rem; font-size: 0.875rem;';
              item.innerHTML = `
                <svg viewBox="0 0 24 24" style="width: 1rem; height: 1rem;" fill="none" stroke="currentColor" stroke-width="2">
                  <path d="M14 2H6a2 2 0 00-2 2v16a2 2 0 002 2h12a2 2 0 002-2V8z"/>
                  <polyline points="14 2 14 8 20 8"/>
                </svg>
                <span style="flex: 1; overflow: hidden; text-overflow: ellipsis; white-space: nowrap;">${file.name}</span>
                <span style="color: var(--mcp-color-ghost-foreground);">${(file.size / 1024).toFixed(1)} KB</span>
              `;
              list.appendChild(item);
            });
          }
        }}
        @mcp-select=${(e: CustomEvent) => {
          const list = document.getElementById('file-list');
          if (list) {
            Array.from(e.detail.files as FileList).forEach((file: File) => {
              const item = document.createElement('div');
              item.style.cssText = 'display: flex; align-items: center; gap: 0.5rem; padding: 0.5rem; background: var(--mcp-color-ghost); border-radius: 0.375rem; font-size: 0.875rem;';
              item.innerHTML = `
                <svg viewBox="0 0 24 24" style="width: 1rem; height: 1rem;" fill="none" stroke="currentColor" stroke-width="2">
                  <path d="M14 2H6a2 2 0 00-2 2v16a2 2 0 002 2h12a2 2 0 002-2V8z"/>
                  <polyline points="14 2 14 8 20 8"/>
                </svg>
                <span style="flex: 1; overflow: hidden; text-overflow: ellipsis; white-space: nowrap;">${file.name}</span>
                <span style="color: var(--mcp-color-ghost-foreground);">${(file.size / 1024).toFixed(1)} KB</span>
              `;
              list.appendChild(item);
            });
          }
        }}
      ></mcp-drop-zone>
      <div id="file-list" style="margin-top: 1rem; display: flex; flex-direction: column; gap: 0.5rem;"></div>
    </div>
  `,
};
