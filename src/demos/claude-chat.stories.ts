import type { Meta, StoryObj } from '@storybook/web-components-vite';
import { html } from 'lit';

// Import components
import '../components/organisms/chat-message.js';
import '../components/organisms/tool-call.js';
import '../components/organisms/server-status.js';
import '../components/atoms/button.js';
import '../components/atoms/textarea.js';
import '../components/atoms/avatar.js';
import '../components/organisms/card.js';
import '../components/organisms/stack.js';

const meta: Meta = {
  title: 'Demos/Claude Chat',
  tags: ['autodocs'],
  parameters: {
    layout: 'fullscreen',
  },
};

export default meta;
type Story = StoryObj;

/**
 * A demo showcasing the Claude App theme with a chat interface
 * that mimics the look and feel of claude.ai
 */
export const ClaudeChat: Story = {
  name: 'Claude Conversation',
  render: () => html`
    <div data-theme="claude" style="
      min-height: 100vh;
      background: var(--mcp-color-background);
      color: var(--mcp-color-foreground);
      font-family: var(--mcp-font-family);
      display: flex;
      flex-direction: column;
    ">
      <!-- Header -->
      <header style="
        padding: var(--mcp-space-3) var(--mcp-space-4);
        border-bottom: 1px solid var(--mcp-color-border);
        display: flex;
        align-items: center;
        justify-content: space-between;
        background: var(--mcp-color-background);
      ">
        <div style="display: flex; align-items: center; gap: var(--mcp-space-3);">
          <div style="
            width: 32px;
            height: 32px;
            background: var(--mcp-color-primary);
            border-radius: var(--mcp-radius-lg);
            display: flex;
            align-items: center;
            justify-content: center;
          ">
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="white" stroke-width="2">
              <path d="M12 2L2 7l10 5 10-5-10-5zM2 17l10 5 10-5M2 12l10 5 10-5"/>
            </svg>
          </div>
          <span style="font-weight: var(--mcp-font-weight-semibold); font-size: var(--mcp-font-size-lg);">
            Claude
          </span>
        </div>
        <mcp-server-status
          name="filesystem"
          status="connected"
          .toolsCount=${5}
          compact
        ></mcp-server-status>
      </header>

      <!-- Chat Area -->
      <main style="
        flex: 1;
        overflow-y: auto;
        padding: var(--mcp-space-6) var(--mcp-space-4);
        max-width: 768px;
        margin: 0 auto;
        width: 100%;
      ">
        <!-- User Message 1 -->
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
            line-height: var(--mcp-line-height-normal);
          ">
            Can you read my package.json and tell me what dependencies I have?
          </div>
        </div>

        <!-- Assistant Response 1 -->
        <div style="margin-bottom: var(--mcp-space-6);">
          <div style="
            display: flex;
            align-items: flex-start;
            gap: var(--mcp-space-3);
            margin-bottom: var(--mcp-space-3);
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
            <div style="
              font-size: var(--mcp-font-size-sm);
              line-height: var(--mcp-line-height-relaxed);
              color: var(--mcp-color-foreground);
            ">
              I'll read your package.json file to check the dependencies.
            </div>
          </div>

          <!-- Tool Call -->
          <div style="margin-left: 40px; margin-bottom: var(--mcp-space-3);">
            <mcp-tool-call
              name="read_file"
              status="success"
              .input=${{ path: "package.json" }}
              .output=${{
                name: "mcp-components",
                version: "0.1.0",
                dependencies: {
                  lit: "^3.1.0"
                },
                devDependencies: {
                  "@storybook/web-components-vite": "^8.0.0",
                  typescript: "^5.3.0",
                  vite: "^5.0.0"
                }
              }}
              .duration=${45}
            ></mcp-tool-call>
          </div>

          <div style="
            display: flex;
            align-items: flex-start;
            gap: var(--mcp-space-3);
          ">
            <div style="width: 28px; flex-shrink: 0;"></div>
            <div style="
              font-size: var(--mcp-font-size-sm);
              line-height: var(--mcp-line-height-relaxed);
              color: var(--mcp-color-foreground);
            ">
              <p style="margin: 0 0 var(--mcp-space-3);">
                Here's what I found in your <code style="
                  background: var(--mcp-color-ghost);
                  padding: 0.125rem 0.375rem;
                  border-radius: var(--mcp-radius-sm);
                  font-family: var(--mcp-font-family-mono);
                  font-size: 0.85em;
                ">package.json</code>:
              </p>
              <p style="margin: 0 0 var(--mcp-space-2);"><strong>Dependencies:</strong></p>
              <ul style="margin: 0 0 var(--mcp-space-3); padding-left: var(--mcp-space-5);">
                <li><code style="font-family: var(--mcp-font-family-mono); font-size: 0.85em;">lit</code> ^3.1.0 - Web component library</li>
              </ul>
              <p style="margin: 0 0 var(--mcp-space-2);"><strong>Dev Dependencies:</strong></p>
              <ul style="margin: 0; padding-left: var(--mcp-space-5);">
                <li><code style="font-family: var(--mcp-font-family-mono); font-size: 0.85em;">@storybook/web-components-vite</code> ^8.0.0</li>
                <li><code style="font-family: var(--mcp-font-family-mono); font-size: 0.85em;">typescript</code> ^5.3.0</li>
                <li><code style="font-family: var(--mcp-font-family-mono); font-size: 0.85em;">vite</code> ^5.0.0</li>
              </ul>
            </div>
          </div>
        </div>

        <!-- User Message 2 -->
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
            line-height: var(--mcp-line-height-normal);
          ">
            Can you add lodash as a dependency?
          </div>
        </div>

        <!-- Assistant Response 2 (loading) -->
        <div style="margin-bottom: var(--mcp-space-6);">
          <div style="
            display: flex;
            align-items: flex-start;
            gap: var(--mcp-space-3);
            margin-bottom: var(--mcp-space-3);
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
            <div style="
              font-size: var(--mcp-font-size-sm);
              line-height: var(--mcp-line-height-relaxed);
              color: var(--mcp-color-foreground);
            ">
              I'll add lodash to your dependencies.
            </div>
          </div>

          <!-- Tool Call Running -->
          <div style="margin-left: 40px;">
            <mcp-tool-call
              name="run_command"
              status="running"
              .input=${{ command: "npm install lodash" }}
            ></mcp-tool-call>
          </div>
        </div>
      </main>

      <!-- Composer -->
      <footer style="
        padding: var(--mcp-space-4);
        border-top: 1px solid var(--mcp-color-border);
        background: var(--mcp-color-background);
      ">
        <div style="
          max-width: 768px;
          margin: 0 auto;
          display: flex;
          gap: var(--mcp-space-3);
          align-items: flex-end;
        ">
          <div style="
            flex: 1;
            background: white;
            border: 1px solid var(--mcp-color-border);
            border-radius: var(--mcp-radius-xl);
            padding: var(--mcp-space-3) var(--mcp-space-4);
            box-shadow: var(--mcp-shadow-md);
          ">
            <textarea
              placeholder="Message Claude..."
              rows="1"
              style="
                width: 100%;
                border: none;
                outline: none;
                resize: none;
                font-family: inherit;
                font-size: var(--mcp-font-size-sm);
                line-height: var(--mcp-line-height-normal);
                background: transparent;
              "
            ></textarea>
          </div>
          <button style="
            width: 40px;
            height: 40px;
            border-radius: var(--mcp-radius-full);
            background: var(--mcp-color-primary);
            border: none;
            cursor: pointer;
            display: flex;
            align-items: center;
            justify-content: center;
            transition: all var(--mcp-transition-normal);
          ">
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="white" stroke-width="2">
              <path d="M22 2L11 13M22 2l-7 20-4-9-9-4 20-7z"/>
            </svg>
          </button>
        </div>
      </footer>
    </div>
  `,
};

/**
 * Dark mode version of the Claude chat interface
 */
export const ClaudeChatDark: Story = {
  name: 'Claude Conversation (Dark)',
  render: () => html`
    <div data-theme="claude-dark" style="
      min-height: 100vh;
      background: var(--mcp-color-background);
      color: var(--mcp-color-foreground);
      font-family: var(--mcp-font-family);
      display: flex;
      flex-direction: column;
    ">
      <!-- Header -->
      <header style="
        padding: var(--mcp-space-3) var(--mcp-space-4);
        border-bottom: 1px solid var(--mcp-color-border);
        display: flex;
        align-items: center;
        justify-content: space-between;
        background: var(--mcp-color-background);
      ">
        <div style="display: flex; align-items: center; gap: var(--mcp-space-3);">
          <div style="
            width: 32px;
            height: 32px;
            background: var(--mcp-color-primary);
            border-radius: var(--mcp-radius-lg);
            display: flex;
            align-items: center;
            justify-content: center;
          ">
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="white" stroke-width="2">
              <path d="M12 2L2 7l10 5 10-5-10-5zM2 17l10 5 10-5M2 12l10 5 10-5"/>
            </svg>
          </div>
          <span style="font-weight: var(--mcp-font-weight-semibold); font-size: var(--mcp-font-size-lg);">
            Claude
          </span>
        </div>
        <div style="display: flex; gap: var(--mcp-space-2);">
          <mcp-server-status
            name="filesystem"
            status="connected"
            .toolsCount=${5}
            compact
          ></mcp-server-status>
          <mcp-server-status
            name="github"
            status="connected"
            .toolsCount=${12}
            compact
          ></mcp-server-status>
        </div>
      </header>

      <!-- Chat Area -->
      <main style="
        flex: 1;
        overflow-y: auto;
        padding: var(--mcp-space-6) var(--mcp-space-4);
        max-width: 768px;
        margin: 0 auto;
        width: 100%;
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
            line-height: var(--mcp-line-height-normal);
          ">
            What files are in my src directory?
          </div>
        </div>

        <!-- Assistant Response -->
        <div style="margin-bottom: var(--mcp-space-6);">
          <div style="
            display: flex;
            align-items: flex-start;
            gap: var(--mcp-space-3);
            margin-bottom: var(--mcp-space-3);
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
            <div style="
              font-size: var(--mcp-font-size-sm);
              line-height: var(--mcp-line-height-relaxed);
              color: var(--mcp-color-foreground);
            ">
              Let me list the contents of your src directory.
            </div>
          </div>

          <!-- Tool Call -->
          <div style="margin-left: 40px; margin-bottom: var(--mcp-space-3);">
            <mcp-tool-call
              name="list_directory"
              status="success"
              .input=${{ path: "src/" }}
              .output=${{
                files: [
                  "components/",
                  "demos/",
                  "styles/",
                  "index.ts"
                ]
              }}
              .duration=${12}
            ></mcp-tool-call>
          </div>

          <div style="
            display: flex;
            align-items: flex-start;
            gap: var(--mcp-space-3);
          ">
            <div style="width: 28px; flex-shrink: 0;"></div>
            <div style="
              font-size: var(--mcp-font-size-sm);
              line-height: var(--mcp-line-height-relaxed);
              color: var(--mcp-color-foreground);
            ">
              <p style="margin: 0 0 var(--mcp-space-3);">
                Your <code style="
                  background: var(--mcp-color-ghost);
                  padding: 0.125rem 0.375rem;
                  border-radius: var(--mcp-radius-sm);
                  font-family: var(--mcp-font-family-mono);
                  font-size: 0.85em;
                ">src/</code> directory contains:
              </p>
              <ul style="margin: 0; padding-left: var(--mcp-space-5);">
                <li><strong>components/</strong> - UI component library</li>
                <li><strong>demos/</strong> - Demo stories and examples</li>
                <li><strong>styles/</strong> - Design tokens and themes</li>
                <li><strong>index.ts</strong> - Main entry point</li>
              </ul>
            </div>
          </div>
        </div>
      </main>

      <!-- Composer -->
      <footer style="
        padding: var(--mcp-space-4);
        border-top: 1px solid var(--mcp-color-border);
        background: #1f1e1b;
      ">
        <div style="
          max-width: 768px;
          margin: 0 auto;
          display: flex;
          gap: var(--mcp-space-3);
          align-items: flex-end;
        ">
          <div style="
            flex: 1;
            background: var(--mcp-color-ghost);
            border: 1px solid var(--mcp-color-border);
            border-radius: var(--mcp-radius-xl);
            padding: var(--mcp-space-3) var(--mcp-space-4);
            box-shadow: var(--mcp-shadow-md);
          ">
            <textarea
              placeholder="Message Claude..."
              rows="1"
              style="
                width: 100%;
                border: none;
                outline: none;
                resize: none;
                font-family: inherit;
                font-size: var(--mcp-font-size-sm);
                line-height: var(--mcp-line-height-normal);
                background: transparent;
                color: var(--mcp-color-foreground);
              "
            ></textarea>
          </div>
          <button style="
            width: 40px;
            height: 40px;
            border-radius: var(--mcp-radius-full);
            background: var(--mcp-color-primary);
            border: none;
            cursor: pointer;
            display: flex;
            align-items: center;
            justify-content: center;
            transition: all var(--mcp-transition-normal);
          ">
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="white" stroke-width="2">
              <path d="M22 2L11 13M22 2l-7 20-4-9-9-4 20-7z"/>
            </svg>
          </button>
        </div>
      </footer>
    </div>
  `,
};

/**
 * Shows available MCP servers and their status
 */
export const MCPServers: Story = {
  name: 'MCP Servers Panel',
  render: () => html`
    <div data-theme="claude-dark" style="
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
        ">MCP Servers</h2>

        <div style="display: flex; flex-direction: column; gap: var(--mcp-space-3);">
          <mcp-server-status
            name="filesystem"
            status="connected"
            .toolsCount=${5}
            .latency=${23}
            version="1.0.0"
            expandable
          ></mcp-server-status>

          <mcp-server-status
            name="github"
            status="connected"
            .toolsCount=${12}
            .latency=${145}
            version="2.1.0"
            expandable
          ></mcp-server-status>

          <mcp-server-status
            name="database"
            status="connecting"
            .toolsCount=${8}
            expandable
          ></mcp-server-status>

          <mcp-server-status
            name="web-search"
            status="error"
            .toolsCount=${3}
            expandable
          ></mcp-server-status>

          <mcp-server-status
            name="memory"
            status="disconnected"
            .toolsCount=${4}
            expandable
          ></mcp-server-status>
        </div>
      </div>
    </div>
  `,
};
