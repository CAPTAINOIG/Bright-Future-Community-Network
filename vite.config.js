import react from '@vitejs/plugin-react'
import tailwindcss from '@tailwindcss/vite'
import { defineConfig } from 'vite'

// https://vite.dev/config/
export default defineConfig({
  plugins: [react(), tailwindcss()],
  build: {
    target: 'es2020',
    rollupOptions: {
      external: (id) => {
        // Don't externalize anything for now
        return false;
      },
      output: {
        manualChunks: (id) => {
          // Simplified chunking to avoid complex dependencies
          if (id.includes('node_modules')) {
            if (id.includes('react') || id.includes('react-dom')) {
              return 'react';
            }
            if (id.includes('antd')) {
              return 'antd';
            }
            if (id.includes('framer-motion')) {
              return 'motion';
            }
            return 'vendor';
          }
        }
      }
    },
    sourcemap: false,
    minify: false, // Disable minification temporarily
    chunkSizeWarningLimit: 2000
  },
  optimizeDeps: {
    force: true,
    include: ['react', 'react-dom', 'react-router-dom']
  }
})
