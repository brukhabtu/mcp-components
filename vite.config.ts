import { defineConfig } from 'vite';
import { resolve } from 'path';

export default defineConfig({
  root: 'demo',
  resolve: {
    alias: {
      '@mcp/ui-components': resolve(__dirname, 'src'),
    },
  },
  build: {
    outDir: '../dist-demo',
  },
});
