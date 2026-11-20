import react from '@vitejs/plugin-react'
import { defineConfig } from 'vite'

// https://vite.dev/config/
export default defineConfig({
  plugins: [react()],
  server: {
    // Opens the browser on `npm run dev`. On macOS with a Chromium-based
    // browser running, Vite reuses an existing tab for this URL if there is one.
    open: true,
  },
})
