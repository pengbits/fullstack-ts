import { loadEnv } from 'vite'
import { defineConfig } from 'vitest/config'
import react from '@vitejs/plugin-react'

// https://vite.dev/config/
export default defineConfig(({mode}) => {
  const {
    GOOGLE_MAPS_API_KEY, 
    GOOGLE_MAPS_MAP_ID
  } = loadEnv(mode, process.cwd(), '');

  return {
    define: {
      'process.env.GOOGLE_MAPS_API_KEY': JSON.stringify(GOOGLE_MAPS_API_KEY),
      'process.env.GOOGLE_MAPS_MAP_ID': JSON.stringify(GOOGLE_MAPS_MAP_ID)
    },
    resolve: {
      alias: {
        '@vis.gl/react-google-maps/examples.js':
          'https://visgl.github.io/react-google-maps/scripts/examples.js'
      }
    },
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
      setupFiles: ['./test/testSetup.ts']
    }
  }
})
