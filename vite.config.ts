import { defineConfig } from 'vite'
import { readFileSync } from 'fs'
import react from '@vitejs/plugin-react'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  server: {
    host: 'localhost',
    port: 5000,
    strictPort: true,
    https: {
      key: readFileSync('./certs/kefteme.key'),
      cert: readFileSync('./certs/kefteme.pem'),
    },
  },
})
