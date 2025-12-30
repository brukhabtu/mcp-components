import type { Meta, StoryObj } from '@storybook/web-components-vite';
import { html } from 'lit';

// Import components
import '../components/data-display/code.js';
import '../components/navigation/tabs.js';
import '../components/primitives/button.js';
import '../components/primitives/badge.js';
import '../components/layout/card.js';

const meta: Meta = {
  title: 'Demos/Artifact Viewer',
  tags: ['autodocs'],
  parameters: {
    layout: 'fullscreen',
  },
};

export default meta;
type Story = StoryObj;

const sampleReactCode = `import { useState } from 'react';

interface CounterProps {
  initialValue?: number;
}

export function Counter({ initialValue = 0 }: CounterProps) {
  const [count, setCount] = useState(initialValue);

  return (
    <div className="counter">
      <h2>Count: {count}</h2>
      <div className="buttons">
        <button onClick={() => setCount(c => c - 1)}>
          Decrease
        </button>
        <button onClick={() => setCount(c => c + 1)}>
          Increase
        </button>
      </div>
    </div>
  );
}`;


/**
 * Artifact Viewer - Code artifact with tabs
 */
export const CodeArtifact: Story = {
  name: 'Code Artifact',
  render: () => html`
    <div data-theme="claude-dark" style="
      min-height: 100vh;
      background: var(--mcp-color-background);
      color: var(--mcp-color-foreground);
      font-family: var(--mcp-font-family);
      padding: var(--mcp-space-6);
    ">
      <div style="max-width: 800px; margin: 0 auto;">
        <!-- Artifact Container -->
        <div style="
          background: #1f1e1b;
          border: 1px solid var(--mcp-color-border);
          border-radius: var(--mcp-radius-xl);
          overflow: hidden;
          box-shadow: var(--mcp-shadow-lg);
        ">
          <!-- Header -->
          <div style="
            display: flex;
            align-items: center;
            justify-content: space-between;
            padding: var(--mcp-space-3) var(--mcp-space-4);
            border-bottom: 1px solid var(--mcp-color-border);
            background: var(--mcp-color-background);
          ">
            <div style="display: flex; align-items: center; gap: var(--mcp-space-3);">
              <!-- Code icon -->
              <div style="
                width: 28px;
                height: 28px;
                background: var(--mcp-color-primary-muted);
                border-radius: var(--mcp-radius-md);
                display: flex;
                align-items: center;
                justify-content: center;
              ">
                <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="var(--mcp-color-primary)" stroke-width="2">
                  <path d="M16 18l6-6-6-6M8 6l-6 6 6 6"/>
                </svg>
              </div>
              <div>
                <div style="font-weight: var(--mcp-font-weight-semibold); font-size: var(--mcp-font-size-sm);">
                  Counter.tsx
                </div>
                <div style="font-size: var(--mcp-font-size-xs); color: var(--mcp-color-ghost-foreground);">
                  React Component
                </div>
              </div>
            </div>
            <div style="display: flex; gap: var(--mcp-space-2);">
              <button style="
                padding: var(--mcp-space-2);
                background: transparent;
                border: none;
                border-radius: var(--mcp-radius-md);
                cursor: pointer;
                color: var(--mcp-color-ghost-foreground);
                transition: all var(--mcp-transition-fast);
              " title="Copy code">
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                  <path d="M8 16H6a2 2 0 01-2-2V6a2 2 0 012-2h8a2 2 0 012 2v2m-6 12h8a2 2 0 002-2v-8a2 2 0 00-2-2h-8a2 2 0 00-2 2v8a2 2 0 002 2z"/>
                </svg>
              </button>
              <button style="
                padding: var(--mcp-space-2);
                background: transparent;
                border: none;
                border-radius: var(--mcp-radius-md);
                cursor: pointer;
                color: var(--mcp-color-ghost-foreground);
                transition: all var(--mcp-transition-fast);
              " title="Download">
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                  <path d="M21 15v4a2 2 0 01-2 2H5a2 2 0 01-2-2v-4M7 10l5 5 5-5M12 15V3"/>
                </svg>
              </button>
              <button style="
                padding: var(--mcp-space-2);
                background: transparent;
                border: none;
                border-radius: var(--mcp-radius-md);
                cursor: pointer;
                color: var(--mcp-color-ghost-foreground);
                transition: all var(--mcp-transition-fast);
              " title="Expand">
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                  <path d="M15 3h6v6M9 21H3v-6M21 3l-7 7M3 21l7-7"/>
                </svg>
              </button>
            </div>
          </div>

          <!-- Code Content -->
          <div style="
            padding: var(--mcp-space-4);
            overflow-x: auto;
            font-family: var(--mcp-font-family-mono);
            font-size: var(--mcp-font-size-sm);
            line-height: 1.6;
          ">
            <pre style="margin: 0; color: var(--mcp-color-foreground);">${sampleReactCode}</pre>
          </div>
        </div>
      </div>
    </div>
  `,
};

/**
 * Artifact Viewer with Preview tab
 */
export const HTMLArtifact: Story = {
  name: 'HTML with Preview',
  render: () => html`
    <div data-theme="claude" style="
      min-height: 100vh;
      background: var(--mcp-color-background);
      color: var(--mcp-color-foreground);
      font-family: var(--mcp-font-family);
      padding: var(--mcp-space-6);
    ">
      <div style="max-width: 900px; margin: 0 auto;">
        <!-- Artifact Container -->
        <div style="
          background: white;
          border: 1px solid var(--mcp-color-border);
          border-radius: var(--mcp-radius-xl);
          overflow: hidden;
          box-shadow: var(--mcp-shadow-lg);
        ">
          <!-- Header -->
          <div style="
            display: flex;
            align-items: center;
            justify-content: space-between;
            padding: var(--mcp-space-3) var(--mcp-space-4);
            border-bottom: 1px solid var(--mcp-color-border);
          ">
            <div style="display: flex; align-items: center; gap: var(--mcp-space-3);">
              <div style="
                width: 28px;
                height: 28px;
                background: rgba(74, 122, 158, 0.1);
                border-radius: var(--mcp-radius-md);
                display: flex;
                align-items: center;
                justify-content: center;
              ">
                <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="#4a7a9e" stroke-width="2">
                  <path d="M3 3l18 18M21 3L3 21"/>
                  <rect x="3" y="3" width="18" height="18" rx="2"/>
                </svg>
              </div>
              <div>
                <div style="font-weight: var(--mcp-font-weight-semibold); font-size: var(--mcp-font-size-sm);">
                  Landing Page
                </div>
                <div style="font-size: var(--mcp-font-size-xs); color: var(--mcp-color-ghost-foreground);">
                  HTML Document
                </div>
              </div>
            </div>

            <!-- Tabs -->
            <div style="
              display: flex;
              gap: var(--mcp-space-1);
              background: var(--mcp-color-ghost);
              padding: var(--mcp-space-1);
              border-radius: var(--mcp-radius-lg);
            ">
              <button style="
                padding: var(--mcp-space-1) var(--mcp-space-3);
                background: transparent;
                border: none;
                border-radius: var(--mcp-radius-md);
                font-size: var(--mcp-font-size-xs);
                font-weight: var(--mcp-font-weight-medium);
                color: var(--mcp-color-ghost-foreground);
                cursor: pointer;
              ">Code</button>
              <button style="
                padding: var(--mcp-space-1) var(--mcp-space-3);
                background: white;
                border: none;
                border-radius: var(--mcp-radius-md);
                font-size: var(--mcp-font-size-xs);
                font-weight: var(--mcp-font-weight-medium);
                color: var(--mcp-color-foreground);
                cursor: pointer;
                box-shadow: var(--mcp-shadow-sm);
              ">Preview</button>
            </div>
          </div>

          <!-- Preview Content -->
          <div style="
            height: 400px;
            background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
            display: flex;
            align-items: center;
            justify-content: center;
          ">
            <div style="text-align: center; color: white; padding: 2rem;">
              <h1 style="font-size: 2.5rem; margin: 0 0 0.5rem; font-weight: 700;">Welcome to the Future</h1>
              <p style="font-size: 1.125rem; opacity: 0.9; margin: 0 0 1.5rem;">Build something amazing today.</p>
              <button style="
                padding: 0.75rem 1.5rem;
                background: white;
                color: #764ba2;
                border: none;
                border-radius: 8px;
                font-size: 1rem;
                font-weight: 600;
                cursor: pointer;
              ">Get Started</button>
            </div>
          </div>
        </div>
      </div>
    </div>
  `,
};

/**
 * SVG Artifact with live preview
 */
export const SVGArtifact: Story = {
  name: 'SVG Graphic',
  render: () => html`
    <div data-theme="claude-dark" style="
      min-height: 100vh;
      background: var(--mcp-color-background);
      color: var(--mcp-color-foreground);
      font-family: var(--mcp-font-family);
      padding: var(--mcp-space-6);
    ">
      <div style="max-width: 600px; margin: 0 auto;">
        <!-- Artifact Container -->
        <div style="
          background: #1f1e1b;
          border: 1px solid var(--mcp-color-border);
          border-radius: var(--mcp-radius-xl);
          overflow: hidden;
          box-shadow: var(--mcp-shadow-lg);
        ">
          <!-- Header -->
          <div style="
            display: flex;
            align-items: center;
            justify-content: space-between;
            padding: var(--mcp-space-3) var(--mcp-space-4);
            border-bottom: 1px solid var(--mcp-color-border);
            background: var(--mcp-color-background);
          ">
            <div style="display: flex; align-items: center; gap: var(--mcp-space-3);">
              <div style="
                width: 28px;
                height: 28px;
                background: rgba(122, 158, 106, 0.15);
                border-radius: var(--mcp-radius-md);
                display: flex;
                align-items: center;
                justify-content: center;
              ">
                <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="#7a9e6a" stroke-width="2">
                  <polygon points="12 2 2 7 12 12 22 7 12 2"/>
                  <polyline points="2 17 12 22 22 17"/>
                  <polyline points="2 12 12 17 22 12"/>
                </svg>
              </div>
              <div>
                <div style="font-weight: var(--mcp-font-weight-semibold); font-size: var(--mcp-font-size-sm);">
                  Claude Logo
                </div>
                <div style="font-size: var(--mcp-font-size-xs); color: var(--mcp-color-ghost-foreground);">
                  SVG Graphic
                </div>
              </div>
            </div>

            <mcp-badge variant="success">Vector</mcp-badge>
          </div>

          <!-- SVG Preview -->
          <div style="
            padding: var(--mcp-space-8);
            display: flex;
            align-items: center;
            justify-content: center;
            background: #252422;
          ">
            <svg viewBox="0 0 200 200" xmlns="http://www.w3.org/2000/svg" style="width: 200px; height: 200px;">
              <defs>
                <linearGradient id="grad" x1="0%" y1="0%" x2="100%" y2="100%">
                  <stop offset="0%" style="stop-color:#ae5630"/>
                  <stop offset="100%" style="stop-color:#d97757"/>
                </linearGradient>
              </defs>
              <circle cx="100" cy="100" r="90" fill="url(#grad)"/>
              <g fill="none" stroke="white" stroke-width="4">
                <path d="M100 50 L60 75 L100 100 L140 75 Z"/>
                <path d="M60 75 L60 125 L100 150 L100 100"/>
                <path d="M140 75 L140 125 L100 150 L100 100"/>
              </g>
            </svg>
          </div>

          <!-- Footer with dimensions -->
          <div style="
            padding: var(--mcp-space-2) var(--mcp-space-4);
            border-top: 1px solid var(--mcp-color-border);
            display: flex;
            justify-content: space-between;
            font-size: var(--mcp-font-size-xs);
            color: var(--mcp-color-ghost-foreground);
          ">
            <span>200 x 200</span>
            <span>SVG</span>
          </div>
        </div>
      </div>
    </div>
  `,
};

/**
 * Multiple artifacts in a list
 */
export const ArtifactList: Story = {
  name: 'Artifact Gallery',
  render: () => html`
    <div data-theme="claude" style="
      min-height: 100vh;
      background: var(--mcp-color-background);
      color: var(--mcp-color-foreground);
      font-family: var(--mcp-font-family);
      padding: var(--mcp-space-6);
    ">
      <div style="max-width: 400px; margin: 0 auto;">
        <h2 style="
          font-size: var(--mcp-font-size-lg);
          font-weight: var(--mcp-font-weight-semibold);
          margin-bottom: var(--mcp-space-4);
        ">Artifacts</h2>

        <div style="display: flex; flex-direction: column; gap: var(--mcp-space-3);">
          <!-- React Component -->
          <div style="
            display: flex;
            align-items: center;
            gap: var(--mcp-space-3);
            padding: var(--mcp-space-3);
            background: white;
            border: 1px solid var(--mcp-color-border);
            border-radius: var(--mcp-radius-lg);
            cursor: pointer;
            transition: all var(--mcp-transition-fast);
          ">
            <div style="
              width: 40px;
              height: 40px;
              background: var(--mcp-color-primary-muted);
              border-radius: var(--mcp-radius-md);
              display: flex;
              align-items: center;
              justify-content: center;
            ">
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="var(--mcp-color-primary)" stroke-width="2">
                <path d="M16 18l6-6-6-6M8 6l-6 6 6 6"/>
              </svg>
            </div>
            <div style="flex: 1;">
              <div style="font-weight: var(--mcp-font-weight-medium); font-size: var(--mcp-font-size-sm);">
                Counter.tsx
              </div>
              <div style="font-size: var(--mcp-font-size-xs); color: var(--mcp-color-ghost-foreground);">
                React Component
              </div>
            </div>
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="var(--mcp-color-ghost-foreground)" stroke-width="2">
              <path d="M9 18l6-6-6-6"/>
            </svg>
          </div>

          <!-- Landing Page -->
          <div style="
            display: flex;
            align-items: center;
            gap: var(--mcp-space-3);
            padding: var(--mcp-space-3);
            background: white;
            border: 1px solid var(--mcp-color-border);
            border-radius: var(--mcp-radius-lg);
            cursor: pointer;
            transition: all var(--mcp-transition-fast);
          ">
            <div style="
              width: 40px;
              height: 40px;
              background: rgba(74, 122, 158, 0.1);
              border-radius: var(--mcp-radius-md);
              display: flex;
              align-items: center;
              justify-content: center;
            ">
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="#4a7a9e" stroke-width="2">
                <rect x="3" y="3" width="18" height="18" rx="2"/>
                <path d="M3 9h18"/>
              </svg>
            </div>
            <div style="flex: 1;">
              <div style="font-weight: var(--mcp-font-weight-medium); font-size: var(--mcp-font-size-sm);">
                Landing Page
              </div>
              <div style="font-size: var(--mcp-font-size-xs); color: var(--mcp-color-ghost-foreground);">
                HTML Document
              </div>
            </div>
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="var(--mcp-color-ghost-foreground)" stroke-width="2">
              <path d="M9 18l6-6-6-6"/>
            </svg>
          </div>

          <!-- SVG -->
          <div style="
            display: flex;
            align-items: center;
            gap: var(--mcp-space-3);
            padding: var(--mcp-space-3);
            background: white;
            border: 1px solid var(--mcp-color-border);
            border-radius: var(--mcp-radius-lg);
            cursor: pointer;
            transition: all var(--mcp-transition-fast);
          ">
            <div style="
              width: 40px;
              height: 40px;
              background: rgba(93, 122, 74, 0.1);
              border-radius: var(--mcp-radius-md);
              display: flex;
              align-items: center;
              justify-content: center;
            ">
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="#5d7a4a" stroke-width="2">
                <polygon points="12 2 2 7 12 12 22 7 12 2"/>
                <polyline points="2 17 12 22 22 17"/>
              </svg>
            </div>
            <div style="flex: 1;">
              <div style="font-weight: var(--mcp-font-weight-medium); font-size: var(--mcp-font-size-sm);">
                Claude Logo
              </div>
              <div style="font-size: var(--mcp-font-size-xs); color: var(--mcp-color-ghost-foreground);">
                SVG Graphic
              </div>
            </div>
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="var(--mcp-color-ghost-foreground)" stroke-width="2">
              <path d="M9 18l6-6-6-6"/>
            </svg>
          </div>

          <!-- Python -->
          <div style="
            display: flex;
            align-items: center;
            gap: var(--mcp-space-3);
            padding: var(--mcp-space-3);
            background: white;
            border: 1px solid var(--mcp-color-border);
            border-radius: var(--mcp-radius-lg);
            cursor: pointer;
            transition: all var(--mcp-transition-fast);
          ">
            <div style="
              width: 40px;
              height: 40px;
              background: rgba(196, 146, 58, 0.1);
              border-radius: var(--mcp-radius-md);
              display: flex;
              align-items: center;
              justify-content: center;
            ">
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="#c4923a" stroke-width="2">
                <path d="M12 2L2 7l10 5 10-5-10-5z"/>
                <path d="M2 17l10 5 10-5"/>
                <path d="M2 12l10 5 10-5"/>
              </svg>
            </div>
            <div style="flex: 1;">
              <div style="font-weight: var(--mcp-font-weight-medium); font-size: var(--mcp-font-size-sm);">
                task_manager.py
              </div>
              <div style="font-size: var(--mcp-font-size-xs); color: var(--mcp-color-ghost-foreground);">
                Python Script
              </div>
            </div>
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="var(--mcp-color-ghost-foreground)" stroke-width="2">
              <path d="M9 18l6-6-6-6"/>
            </svg>
          </div>
        </div>
      </div>
    </div>
  `,
};

/**
 * Split view - Chat + Artifact side by side
 */
export const SplitView: Story = {
  name: 'Split View (Chat + Artifact)',
  render: () => html`
    <div data-theme="claude" style="
      min-height: 100vh;
      background: var(--mcp-color-background);
      color: var(--mcp-color-foreground);
      font-family: var(--mcp-font-family);
      display: flex;
    ">
      <!-- Chat Panel -->
      <div style="
        flex: 1;
        border-right: 1px solid var(--mcp-color-border);
        display: flex;
        flex-direction: column;
      ">
        <!-- Chat Header -->
        <div style="
          padding: var(--mcp-space-3) var(--mcp-space-4);
          border-bottom: 1px solid var(--mcp-color-border);
          font-weight: var(--mcp-font-weight-semibold);
        ">
          New conversation
        </div>

        <!-- Chat Messages -->
        <div style="
          flex: 1;
          padding: var(--mcp-space-4);
          overflow-y: auto;
        ">
          <!-- User Message -->
          <div style="
            display: flex;
            justify-content: flex-end;
            margin-bottom: var(--mcp-space-4);
          ">
            <div style="
              background: var(--mcp-color-ghost);
              padding: var(--mcp-space-3) var(--mcp-space-4);
              border-radius: var(--mcp-radius-xl);
              max-width: 80%;
              font-size: var(--mcp-font-size-sm);
            ">
              Create a simple counter component in React with TypeScript
            </div>
          </div>

          <!-- Assistant Message -->
          <div style="
            display: flex;
            gap: var(--mcp-space-3);
            margin-bottom: var(--mcp-space-4);
          ">
            <div style="
              width: 28px;
              height: 28px;
              background: var(--mcp-color-primary);
              border-radius: var(--mcp-radius-full);
              display: flex;
              align-items: center;
              justify-content: center;
              flex-shrink: 0;
            ">
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="white" stroke-width="2">
                <path d="M12 2L2 7l10 5 10-5-10-5zM2 17l10 5 10-5M2 12l10 5 10-5"/>
              </svg>
            </div>
            <div style="font-size: var(--mcp-font-size-sm); line-height: var(--mcp-line-height-relaxed);">
              <p style="margin: 0 0 var(--mcp-space-3);">
                I've created a Counter component with TypeScript. It includes:
              </p>
              <ul style="margin: 0 0 var(--mcp-space-3); padding-left: var(--mcp-space-5);">
                <li>Type-safe props with optional initial value</li>
                <li>useState hook for state management</li>
                <li>Increment and decrement buttons</li>
              </ul>
              <p style="margin: 0;">
                You can see the code in the artifact panel on the right.
              </p>
            </div>
          </div>
        </div>

        <!-- Composer -->
        <div style="
          padding: var(--mcp-space-3);
          border-top: 1px solid var(--mcp-color-border);
        ">
          <div style="
            background: white;
            border: 1px solid var(--mcp-color-border);
            border-radius: var(--mcp-radius-xl);
            padding: var(--mcp-space-3);
            display: flex;
            gap: var(--mcp-space-2);
          ">
            <input
              type="text"
              placeholder="Message Claude..."
              style="
                flex: 1;
                border: none;
                outline: none;
                font-size: var(--mcp-font-size-sm);
                font-family: inherit;
              "
            />
            <button style="
              width: 32px;
              height: 32px;
              border-radius: var(--mcp-radius-full);
              background: var(--mcp-color-primary);
              border: none;
              cursor: pointer;
              display: flex;
              align-items: center;
              justify-content: center;
            ">
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="white" stroke-width="2">
                <path d="M22 2L11 13M22 2l-7 20-4-9-9-4 20-7z"/>
              </svg>
            </button>
          </div>
        </div>
      </div>

      <!-- Artifact Panel -->
      <div style="
        width: 50%;
        background: #fafaf8;
        display: flex;
        flex-direction: column;
      ">
        <!-- Artifact Header -->
        <div style="
          display: flex;
          align-items: center;
          justify-content: space-between;
          padding: var(--mcp-space-3) var(--mcp-space-4);
          border-bottom: 1px solid var(--mcp-color-border);
          background: white;
        ">
          <div style="display: flex; align-items: center; gap: var(--mcp-space-3);">
            <div style="
              width: 28px;
              height: 28px;
              background: var(--mcp-color-primary-muted);
              border-radius: var(--mcp-radius-md);
              display: flex;
              align-items: center;
              justify-content: center;
            ">
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="var(--mcp-color-primary)" stroke-width="2">
                <path d="M16 18l6-6-6-6M8 6l-6 6 6 6"/>
              </svg>
            </div>
            <div>
              <div style="font-weight: var(--mcp-font-weight-semibold); font-size: var(--mcp-font-size-sm);">
                Counter.tsx
              </div>
            </div>
          </div>
          <div style="display: flex; gap: var(--mcp-space-1);">
            <button style="
              padding: var(--mcp-space-2);
              background: transparent;
              border: none;
              border-radius: var(--mcp-radius-md);
              cursor: pointer;
              color: var(--mcp-color-ghost-foreground);
            ">
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                <path d="M8 16H6a2 2 0 01-2-2V6a2 2 0 012-2h8a2 2 0 012 2v2m-6 12h8a2 2 0 002-2v-8a2 2 0 00-2-2h-8a2 2 0 00-2 2v8a2 2 0 002 2z"/>
              </svg>
            </button>
            <button style="
              padding: var(--mcp-space-2);
              background: transparent;
              border: none;
              border-radius: var(--mcp-radius-md);
              cursor: pointer;
              color: var(--mcp-color-ghost-foreground);
            ">
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                <path d="M18 6L6 18M6 6l12 12"/>
              </svg>
            </button>
          </div>
        </div>

        <!-- Code Content -->
        <div style="
          flex: 1;
          overflow: auto;
          padding: var(--mcp-space-4);
        ">
          <pre style="
            margin: 0;
            font-family: var(--mcp-font-family-mono);
            font-size: var(--mcp-font-size-sm);
            line-height: 1.6;
            color: var(--mcp-color-foreground);
          ">${sampleReactCode}</pre>
        </div>
      </div>
    </div>
  `,
};
