import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'




export default defineConfig({
  plugins: [react()],
  server: {
    host: '0.0.0.0', // This makes it accessible on the network
    port: 5174, // Optional: Specify a port if desired
    plugins: [react()],
  },
})


