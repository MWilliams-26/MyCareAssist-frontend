// vite.config.js
import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import dotenv from 'dotenv';
dotenv.config();

export default defineConfig({
  plugins: [react()],
  server: {
    port: 3000,
    fs: {
      strict: true
    }
  },
  base: '/MyCareAssist-frontend/',
  build: {
    sourcemap: true,






    minify: 'terser',
    terserOptions: {
      sourceMap: true
    }
  }
});

