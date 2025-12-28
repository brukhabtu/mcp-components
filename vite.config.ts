import { defineConfig } from 'vite';
import { resolve } from 'path';

export default defineConfig({
  root: 'demo',
  base: '/mcp-components/',
  resolve: {
    alias: {
      '@mcp/ui-components': resolve(__dirname, 'src'),
    },
  },
  build: {
    outDir: '../dist-showcase',
    emptyOutDir: true,
  },
});
