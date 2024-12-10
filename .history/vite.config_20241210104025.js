import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

export default defineConfig({
  plugins: [react()],
  base: "/MyCareAssist-frontend/",
  server: {
    port: 3000,
  },
});
