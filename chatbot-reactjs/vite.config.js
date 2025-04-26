import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vite.dev/config/
export default defineConfig({
  host: true, // allows access from network devices
  plugins: [react()],
})
