import type { Meta, StoryObj } from '@storybook/web-components-vite';
import { html } from 'lit';

const meta: Meta = {
  title: 'Design System/Tokens',
  tags: ['autodocs'],
};

export default meta;
type Story = StoryObj;

export const Colors: Story = {
  name: 'Color Tokens',
  render: () => html`
    <div style="font-family: system-ui; max-width: 800px;">
      <h2 style="margin-bottom: 1rem;">Variants (Visual Hierarchy)</h2>
      <div style="display: grid; grid-template-columns: repeat(4, 1fr); gap: 1rem; margin-bottom: 2rem;">
        <div>
          <div style="background: var(--mcp-color-primary); height: 60px; border-radius: 8px; margin-bottom: 0.5rem;"></div>
          <div style="font-size: 0.75rem;"><strong>Primary</strong><br/><code>--mcp-color-primary</code></div>
        </div>
        <div>
          <div style="background: var(--mcp-color-secondary); height: 60px; border-radius: 8px; margin-bottom: 0.5rem;"></div>
          <div style="font-size: 0.75rem;"><strong>Secondary</strong><br/><code>--mcp-color-secondary</code></div>
        </div>
        <div>
          <div style="background: var(--mcp-color-ghost); height: 60px; border-radius: 8px; border: 1px solid var(--mcp-color-border); margin-bottom: 0.5rem;"></div>
          <div style="font-size: 0.75rem;"><strong>Ghost</strong><br/><code>--mcp-color-ghost</code></div>
        </div>
        <div>
          <div style="background: transparent; height: 60px; border-radius: 8px; border: 1px dashed var(--mcp-color-border); margin-bottom: 0.5rem;"></div>
          <div style="font-size: 0.75rem;"><strong>Tertiary</strong><br/><code>--mcp-color-tertiary</code></div>
        </div>
      </div>

      <h2 style="margin-bottom: 1rem;">Status Colors</h2>
      <div style="display: grid; grid-template-columns: repeat(4, 1fr); gap: 1rem; margin-bottom: 2rem;">
        <div>
          <div style="background: var(--mcp-color-success); height: 60px; border-radius: 8px; margin-bottom: 0.5rem;"></div>
          <div style="font-size: 0.75rem;"><strong>Success</strong><br/><code>--mcp-color-success</code></div>
        </div>
        <div>
          <div style="background: var(--mcp-color-warning); height: 60px; border-radius: 8px; margin-bottom: 0.5rem;"></div>
          <div style="font-size: 0.75rem;"><strong>Warning</strong><br/><code>--mcp-color-warning</code></div>
        </div>
        <div>
          <div style="background: var(--mcp-color-error); height: 60px; border-radius: 8px; margin-bottom: 0.5rem;"></div>
          <div style="font-size: 0.75rem;"><strong>Error</strong><br/><code>--mcp-color-error</code></div>
        </div>
        <div>
          <div style="background: var(--mcp-color-info); height: 60px; border-radius: 8px; margin-bottom: 0.5rem;"></div>
          <div style="font-size: 0.75rem;"><strong>Info</strong><br/><code>--mcp-color-info</code></div>
        </div>
      </div>

      <h2 style="margin-bottom: 1rem;">Muted Variants (Alpha)</h2>
      <p style="color: var(--mcp-color-ghost-foreground); margin-bottom: 1rem;">Used for focus rings, selections, and soft backgrounds.</p>
      <div style="display: grid; grid-template-columns: repeat(4, 1fr); gap: 1rem; margin-bottom: 2rem;">
        <div>
          <div style="background: var(--mcp-color-primary-muted); height: 60px; border-radius: 8px; border: 1px solid var(--mcp-color-primary); margin-bottom: 0.5rem;"></div>
          <div style="font-size: 0.75rem;"><code>--mcp-color-primary-muted</code></div>
        </div>
        <div>
          <div style="background: var(--mcp-color-success-muted); height: 60px; border-radius: 8px; border: 1px solid var(--mcp-color-success); margin-bottom: 0.5rem;"></div>
          <div style="font-size: 0.75rem;"><code>--mcp-color-success-muted</code></div>
        </div>
        <div>
          <div style="background: var(--mcp-color-warning-muted); height: 60px; border-radius: 8px; border: 1px solid var(--mcp-color-warning); margin-bottom: 0.5rem;"></div>
          <div style="font-size: 0.75rem;"><code>--mcp-color-warning-muted</code></div>
        </div>
        <div>
          <div style="background: var(--mcp-color-error-muted); height: 60px; border-radius: 8px; border: 1px solid var(--mcp-color-error); margin-bottom: 0.5rem;"></div>
          <div style="font-size: 0.75rem;"><code>--mcp-color-error-muted</code></div>
        </div>
      </div>

      <h2 style="margin-bottom: 1rem;">Surface Colors</h2>
      <div style="display: grid; grid-template-columns: repeat(3, 1fr); gap: 1rem;">
        <div>
          <div style="background: var(--mcp-color-background); height: 60px; border-radius: 8px; border: 1px solid var(--mcp-color-border); margin-bottom: 0.5rem;"></div>
          <div style="font-size: 0.75rem;"><strong>Background</strong><br/><code>--mcp-color-background</code></div>
        </div>
        <div>
          <div style="background: var(--mcp-color-foreground); height: 60px; border-radius: 8px; margin-bottom: 0.5rem;"></div>
          <div style="font-size: 0.75rem;"><strong>Foreground</strong><br/><code>--mcp-color-foreground</code></div>
        </div>
        <div>
          <div style="background: var(--mcp-color-border); height: 60px; border-radius: 8px; margin-bottom: 0.5rem;"></div>
          <div style="font-size: 0.75rem;"><strong>Border</strong><br/><code>--mcp-color-border</code></div>
        </div>
      </div>
    </div>
  `,
};

export const Spacing: Story = {
  name: 'Spacing Scale',
  render: () => html`
    <div style="font-family: system-ui; max-width: 800px;">
      <h2 style="margin-bottom: 1rem;">Spacing Scale</h2>
      <div style="display: flex; align-items: flex-end; gap: 1.5rem; flex-wrap: wrap; margin-bottom: 2rem;">
        ${[0, 1, 2, 3, 4, 5, 6, 8, 10, 12].map(n => html`
          <div style="text-align: center;">
            <div style="width: var(--mcp-space-${n}); height: 60px; background: var(--mcp-color-primary); border-radius: 4px; min-width: ${n === 0 ? '2px' : '0'};"></div>
            <div style="font-size: 0.75rem; margin-top: 0.5rem;"><strong>${n}</strong></div>
          </div>
        `)}
      </div>
      <table style="width: 100%; border-collapse: collapse; font-size: 0.875rem;">
        <thead>
          <tr style="border-bottom: 1px solid var(--mcp-color-border);">
            <th style="text-align: left; padding: 0.5rem;">Token</th>
            <th style="text-align: left; padding: 0.5rem;">Value</th>
          </tr>
        </thead>
        <tbody>
          <tr><td style="padding: 0.5rem;"><code>--mcp-space-0</code></td><td style="padding: 0.5rem;">0</td></tr>
          <tr><td style="padding: 0.5rem;"><code>--mcp-space-1</code></td><td style="padding: 0.5rem;">0.25rem (4px)</td></tr>
          <tr><td style="padding: 0.5rem;"><code>--mcp-space-2</code></td><td style="padding: 0.5rem;">0.5rem (8px)</td></tr>
          <tr><td style="padding: 0.5rem;"><code>--mcp-space-3</code></td><td style="padding: 0.5rem;">0.75rem (12px)</td></tr>
          <tr><td style="padding: 0.5rem;"><code>--mcp-space-4</code></td><td style="padding: 0.5rem;">1rem (16px)</td></tr>
          <tr><td style="padding: 0.5rem;"><code>--mcp-space-5</code></td><td style="padding: 0.5rem;">1.25rem (20px)</td></tr>
          <tr><td style="padding: 0.5rem;"><code>--mcp-space-6</code></td><td style="padding: 0.5rem;">1.5rem (24px)</td></tr>
          <tr><td style="padding: 0.5rem;"><code>--mcp-space-8</code></td><td style="padding: 0.5rem;">2rem (32px)</td></tr>
          <tr><td style="padding: 0.5rem;"><code>--mcp-space-10</code></td><td style="padding: 0.5rem;">2.5rem (40px)</td></tr>
          <tr><td style="padding: 0.5rem;"><code>--mcp-space-12</code></td><td style="padding: 0.5rem;">3rem (48px)</td></tr>
        </tbody>
      </table>
    </div>
  `,
};

export const Typography: Story = {
  name: 'Typography',
  render: () => html`
    <div style="font-family: system-ui; max-width: 800px;">
      <h2 style="margin-bottom: 1rem;">Font Sizes</h2>
      <div style="margin-bottom: 2rem;">
        <div style="font-size: var(--mcp-font-size-xs); margin-bottom: 0.5rem;">Extra Small (xs) - <code>--mcp-font-size-xs</code> - 0.75rem</div>
        <div style="font-size: var(--mcp-font-size-sm); margin-bottom: 0.5rem;">Small (sm) - <code>--mcp-font-size-sm</code> - 0.875rem</div>
        <div style="font-size: var(--mcp-font-size-base); margin-bottom: 0.5rem;">Base - <code>--mcp-font-size-base</code> - 1rem</div>
        <div style="font-size: var(--mcp-font-size-lg); margin-bottom: 0.5rem;">Large (lg) - <code>--mcp-font-size-lg</code> - 1.125rem</div>
        <div style="font-size: var(--mcp-font-size-xl); margin-bottom: 0.5rem;">Extra Large (xl) - <code>--mcp-font-size-xl</code> - 1.25rem</div>
        <div style="font-size: var(--mcp-font-size-2xl); margin-bottom: 0.5rem;">2XL - <code>--mcp-font-size-2xl</code> - 1.5rem</div>
        <div style="font-size: var(--mcp-font-size-3xl); margin-bottom: 0.5rem;">3XL - <code>--mcp-font-size-3xl</code> - 1.875rem</div>
      </div>

      <h2 style="margin-bottom: 1rem;">Font Weights</h2>
      <div style="margin-bottom: 2rem;">
        <div style="font-weight: var(--mcp-font-weight-normal); margin-bottom: 0.5rem;">Normal (400) - <code>--mcp-font-weight-normal</code></div>
        <div style="font-weight: var(--mcp-font-weight-medium); margin-bottom: 0.5rem;">Medium (500) - <code>--mcp-font-weight-medium</code></div>
        <div style="font-weight: var(--mcp-font-weight-semibold); margin-bottom: 0.5rem;">Semibold (600) - <code>--mcp-font-weight-semibold</code></div>
        <div style="font-weight: var(--mcp-font-weight-bold); margin-bottom: 0.5rem;">Bold (700) - <code>--mcp-font-weight-bold</code></div>
      </div>

      <h2 style="margin-bottom: 1rem;">Font Families</h2>
      <div style="margin-bottom: 2rem;">
        <div style="font-family: var(--mcp-font-family); margin-bottom: 1rem;">
          <strong>Sans-serif</strong> - <code>--mcp-font-family</code><br/>
          The quick brown fox jumps over the lazy dog. 0123456789
        </div>
        <div style="font-family: var(--mcp-font-family-mono);">
          <strong>Monospace</strong> - <code>--mcp-font-family-mono</code><br/>
          The quick brown fox jumps over the lazy dog. 0123456789
        </div>
      </div>
    </div>
  `,
};

export const BorderRadius: Story = {
  name: 'Border Radius',
  render: () => html`
    <div style="font-family: system-ui; max-width: 800px;">
      <h2 style="margin-bottom: 1rem;">Border Radius Scale</h2>
      <div style="display: flex; gap: 1.5rem; flex-wrap: wrap;">
        <div style="text-align: center;">
          <div style="width: 60px; height: 60px; background: var(--mcp-color-primary); border-radius: var(--mcp-radius-none);"></div>
          <div style="font-size: 0.75rem; margin-top: 0.5rem;">none<br/><code>0</code></div>
        </div>
        <div style="text-align: center;">
          <div style="width: 60px; height: 60px; background: var(--mcp-color-primary); border-radius: var(--mcp-radius-sm);"></div>
          <div style="font-size: 0.75rem; margin-top: 0.5rem;">sm<br/><code>0.25rem</code></div>
        </div>
        <div style="text-align: center;">
          <div style="width: 60px; height: 60px; background: var(--mcp-color-primary); border-radius: var(--mcp-radius-md);"></div>
          <div style="font-size: 0.75rem; margin-top: 0.5rem;">md<br/><code>0.375rem</code></div>
        </div>
        <div style="text-align: center;">
          <div style="width: 60px; height: 60px; background: var(--mcp-color-primary); border-radius: var(--mcp-radius-lg);"></div>
          <div style="font-size: 0.75rem; margin-top: 0.5rem;">lg<br/><code>0.5rem</code></div>
        </div>
        <div style="text-align: center;">
          <div style="width: 60px; height: 60px; background: var(--mcp-color-primary); border-radius: var(--mcp-radius-xl);"></div>
          <div style="font-size: 0.75rem; margin-top: 0.5rem;">xl<br/><code>0.75rem</code></div>
        </div>
        <div style="text-align: center;">
          <div style="width: 60px; height: 60px; background: var(--mcp-color-primary); border-radius: var(--mcp-radius-full);"></div>
          <div style="font-size: 0.75rem; margin-top: 0.5rem;">full<br/><code>9999px</code></div>
        </div>
      </div>
    </div>
  `,
};

export const Shadows: Story = {
  name: 'Shadows',
  render: () => html`
    <div style="font-family: system-ui; max-width: 800px;">
      <h2 style="margin-bottom: 1rem;">Shadow Scale</h2>
      <div style="display: grid; grid-template-columns: repeat(4, 1fr); gap: 2rem;">
        <div style="text-align: center;">
          <div style="width: 100%; height: 60px; background: var(--mcp-color-background); border-radius: 8px; box-shadow: var(--mcp-shadow-sm);"></div>
          <div style="font-size: 0.75rem; margin-top: 0.75rem;"><strong>Small</strong><br/><code>--mcp-shadow-sm</code></div>
        </div>
        <div style="text-align: center;">
          <div style="width: 100%; height: 60px; background: var(--mcp-color-background); border-radius: 8px; box-shadow: var(--mcp-shadow-md);"></div>
          <div style="font-size: 0.75rem; margin-top: 0.75rem;"><strong>Medium</strong><br/><code>--mcp-shadow-md</code></div>
        </div>
        <div style="text-align: center;">
          <div style="width: 100%; height: 60px; background: var(--mcp-color-background); border-radius: 8px; box-shadow: var(--mcp-shadow-lg);"></div>
          <div style="font-size: 0.75rem; margin-top: 0.75rem;"><strong>Large</strong><br/><code>--mcp-shadow-lg</code></div>
        </div>
        <div style="text-align: center;">
          <div style="width: 100%; height: 60px; background: var(--mcp-color-background); border-radius: 8px; box-shadow: var(--mcp-shadow-xl);"></div>
          <div style="font-size: 0.75rem; margin-top: 0.75rem;"><strong>Extra Large</strong><br/><code>--mcp-shadow-xl</code></div>
        </div>
      </div>
    </div>
  `,
};

export const ZIndexAndTransitions: Story = {
  name: 'Z-Index & Transitions',
  render: () => html`
    <div style="font-family: system-ui; max-width: 800px;">
      <h2 style="margin-bottom: 1rem;">Z-Index Scale</h2>
      <table style="width: 100%; border-collapse: collapse; font-size: 0.875rem; margin-bottom: 2rem;">
        <thead>
          <tr style="border-bottom: 1px solid var(--mcp-color-border);">
            <th style="text-align: left; padding: 0.5rem;">Token</th>
            <th style="text-align: left; padding: 0.5rem;">Value</th>
            <th style="text-align: left; padding: 0.5rem;">Usage</th>
          </tr>
        </thead>
        <tbody>
          <tr><td style="padding: 0.5rem;"><code>--mcp-z-dropdown</code></td><td style="padding: 0.5rem;">1000</td><td style="padding: 0.5rem;">Dropdown menus</td></tr>
          <tr><td style="padding: 0.5rem;"><code>--mcp-z-sticky</code></td><td style="padding: 0.5rem;">1010</td><td style="padding: 0.5rem;">Sticky headers</td></tr>
          <tr><td style="padding: 0.5rem;"><code>--mcp-z-modal</code></td><td style="padding: 0.5rem;">1030</td><td style="padding: 0.5rem;">Modal dialogs</td></tr>
          <tr><td style="padding: 0.5rem;"><code>--mcp-z-tooltip</code></td><td style="padding: 0.5rem;">1050</td><td style="padding: 0.5rem;">Tooltips</td></tr>
          <tr><td style="padding: 0.5rem;"><code>--mcp-z-toast</code></td><td style="padding: 0.5rem;">1060</td><td style="padding: 0.5rem;">Toast notifications</td></tr>
        </tbody>
      </table>

      <h2 style="margin-bottom: 1rem;">Transitions</h2>
      <table style="width: 100%; border-collapse: collapse; font-size: 0.875rem; margin-bottom: 2rem;">
        <thead>
          <tr style="border-bottom: 1px solid var(--mcp-color-border);">
            <th style="text-align: left; padding: 0.5rem;">Token</th>
            <th style="text-align: left; padding: 0.5rem;">Value</th>
            <th style="text-align: left; padding: 0.5rem;">Usage</th>
          </tr>
        </thead>
        <tbody>
          <tr><td style="padding: 0.5rem;"><code>--mcp-transition-fast</code></td><td style="padding: 0.5rem;">150ms ease</td><td style="padding: 0.5rem;">Quick interactions</td></tr>
          <tr><td style="padding: 0.5rem;"><code>--mcp-transition-normal</code></td><td style="padding: 0.5rem;">200ms ease</td><td style="padding: 0.5rem;">Standard transitions</td></tr>
          <tr><td style="padding: 0.5rem;"><code>--mcp-transition-slow</code></td><td style="padding: 0.5rem;">300ms ease</td><td style="padding: 0.5rem;">Deliberate animations</td></tr>
        </tbody>
      </table>

      <h2 style="margin-bottom: 1rem;">Opacity</h2>
      <table style="width: 100%; border-collapse: collapse; font-size: 0.875rem;">
        <thead>
          <tr style="border-bottom: 1px solid var(--mcp-color-border);">
            <th style="text-align: left; padding: 0.5rem;">Token</th>
            <th style="text-align: left; padding: 0.5rem;">Value</th>
            <th style="text-align: left; padding: 0.5rem;">Usage</th>
          </tr>
        </thead>
        <tbody>
          <tr><td style="padding: 0.5rem;"><code>--mcp-opacity-disabled</code></td><td style="padding: 0.5rem;">0.5</td><td style="padding: 0.5rem;">Disabled elements</td></tr>
        </tbody>
      </table>
    </div>
  `,
};
