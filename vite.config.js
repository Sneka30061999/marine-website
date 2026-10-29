import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

/**
 * Vite configuration
 *
 * §11/§12 performance:
 *  - Manual chunk splitting keeps vendor code separate from app code.
 *  - Image assets are hashed for long-term caching.
 *  - No unused plugins that add JS weight.
 */
export default defineConfig({
  plugins: [react()],

  build: {
    // Raise the warning limit slightly — our bundle is intentionally lean.
    chunkSizeWarningLimit: 400,

    rollupOptions: {
      output: {
        // Split React + router into a separate vendor chunk.
        // Browsers can cache it independently of app code changes.
        manualChunks: {
          vendor: ['react', 'react-dom', 'react-router-dom'],
        },
      },
    },
  },
})
