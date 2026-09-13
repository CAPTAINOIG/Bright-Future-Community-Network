import react from '@vitejs/plugin-react'
import tailwindcss from '@tailwindcss/vite'
import { defineConfig } from 'vite'

// https://vite.dev/config/
export default defineConfig({
  plugins: [react(), tailwindcss()],
  build: {
    target: 'esnext',
    rollupOptions: {
      output: {
        manualChunks: (id) => {
          if (id.includes('node_modules')) {
            if (id.includes('react') && !id.includes('react-router')) {
              return 'vendor';
            }
            if (id.includes('antd')) {
              return 'antd';
            }
            if (id.includes('react-router')) {
              return 'router';
            }
            if (id.includes('lucide-react') || id.includes('@heroicons')) {
              return 'icons';
            }
            if (id.includes('framer-motion')) {
              return 'motion';
            }
            if (id.includes('react-hook-form')) {
              return 'forms';
            }
            return 'vendor';
          }
        }
      }
    },
    chunkSizeWarningLimit: 1000,
    sourcemap: false
  },
  optimizeDeps: {
    include: ['react', 'react-dom', 'antd', 'react-router-dom', 'lucide-react', '@heroicons/react']
  }
})
