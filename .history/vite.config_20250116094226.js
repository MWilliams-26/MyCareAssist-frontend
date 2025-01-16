// vite.config.js
import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import dotenv from 'dotenv';
dotenv.config();

export default defineConfig({
  plugins: [react()],
  server: {
    port: 3000,
  },
  base: '/MyCareAssist-frontend/',
  build: {
    sourcemap: true,
    rollupOptions: {
      output: {
        sourcemapPathTransform: (relativeSourcePath) => {
          return relativeSourcePath.replace(/^\//, '');
        }
      }
    }
  }
});

