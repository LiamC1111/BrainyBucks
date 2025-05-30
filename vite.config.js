import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vite.dev/config/
export default defineConfig({
  server: {
    port: process.env.PORT || 3000,
    host: '0.0.0.0',
    allowedHosts: ['brainybucks.onrender.com'] 
  }
  ,plugins: [react()],
})



