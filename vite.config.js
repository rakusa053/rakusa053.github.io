import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vite.dev/config/ - triggered build
export default defineConfig({
  plugins: [react()],
  base: '/', 
})
