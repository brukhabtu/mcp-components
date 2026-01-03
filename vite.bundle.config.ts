import { defineConfig } from 'vite';
import { resolve } from 'path';

// Build a browser-ready bundle with all dependencies included
export default defineConfig({
  build: {
    outDir: 'dist-browser',
    lib: {
      entry: resolve(__dirname, 'src/index.ts'),
      name: 'McpComponents',
      formats: ['es', 'iife'],
      fileName: (format) => `mcp-components.${format === 'es' ? 'esm' : 'iife'}.js`
    },
    rollupOptions: {
      // Don't externalize lit - bundle it
      external: [],
      output: {
        // Provide global variables for IIFE build
        globals: {}
      }
    },
    // Include source maps for debugging
    sourcemap: true,
    // Minify for production
    minify: 'esbuild'
  }
});
