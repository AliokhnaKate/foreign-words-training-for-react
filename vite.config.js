import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vite.dev/config/
export default defineConfig({
  plugins: [react()],
  base: '/foreign-words-training-for-react/',
  build: {
    outDir: 'dist',
    assetsDir: 'assets',
  }
})
