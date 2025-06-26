import { defineConfig } from 'vitest/config'
import react from '@vitejs/plugin-react'

// https://vite.dev/config/
export default defineConfig({
  server: {
    proxy: {
      '/api': {
        target: 'http://localhost:5000',
        changeOrigin: true
      }
    }
  },
  plugins: [react()],
  test: {
    environment: "jsdom",
    setupFiles: ['./vitest.setup.ts']
  }
})
