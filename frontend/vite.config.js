import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

// https://vite.dev/config/
export default defineConfig({
  plugins: [react()],
  build: {
    outDir: 'dist',
    assetsDir: 'assets',
    emptyOutDir: true,
    rollupOptions: {
      output: {
        assetFileNames: 'assets/[name].[ext]',
        entryFileNames: 'assets/[name].js',
        chunkFileNames: 'assets/[name].js'
      }
    }
  },
  base: '/',
  server: {
    headers: {
      'Content-Type': 'application/javascript'
    }
  }
})
