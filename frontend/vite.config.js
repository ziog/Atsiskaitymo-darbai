import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

// https://vitejs.dev/config/
export default defineConfig({
  root: './',  // Keep the root at the project level (or specify a custom root folder)
  plugins: [react()],
  build: {
    outDir: 'dist',  // Output directory for production build
  },
  server: {
    open: true,  // Open the browser on startup
    port: 3001,  // Default port for Vite dev server
  },
});
