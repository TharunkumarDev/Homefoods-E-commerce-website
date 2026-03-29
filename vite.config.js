import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

export default defineConfig({
  plugins: [react()],
  // base: '/Homefoods-E-commerce-website/', // Removed for local dev with proxy to work easily, or use absolute proxy.
  server: {
    proxy: {
      '/api': {
        target: 'http://localhost:5005',
        changeOrigin: true,
      }
    }
  }
})
