import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import { apiConfig } from './src/config.js'

// https://vite.dev/config/
export default defineConfig({
  plugins: [react()],
  server: {
    cors: true,
    proxy: {
      '/api': {
        target: apiConfig.baseUrl,
        changeOrigin: true,
        secure: false,
        rewrite: (path) => path.replace(/^\/api/, '')
      }
    }
  }
})
