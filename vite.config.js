import path from "path";
import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "./src"),
    },
  },
  server: {
    host: '0.0.0.0',
    allowedHosts: [
      '7f6222b2-47ab-4218-bb0b-c7ac067aa261-00-1sd8fsa0h3sqt.picard.replit.dev'
    ],
  }
})
