import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

export default defineConfig({
  plugins: [react()],
  build: {
    outDir: 'frontend/dist',  
    rollupOptions: {
      output: {
        manualChunks: {
          'three-vendor': ['three', 'threejs-components'],
          'react-vendor': ['react', 'react-dom', 'react-router-dom'],
        }
      }
    }
  }
})
