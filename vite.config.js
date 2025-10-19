import path from 'path';
import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import pkg from './package.json';

// https://vitejs.dev/config/
export default defineConfig(({ mode }) => {
  return {
    plugins: [react()],
    define: {
      // package.jsonからアプリ名とバージョンを取得
      'import.meta.env.VITE_APP_NAME': JSON.stringify(pkg.name),
      'import.meta.env.VITE_APP_VERSION': JSON.stringify(pkg.version),
    },
    esbuild:
      mode === 'production'
        ? {
            drop: ['console', 'debugger'],
          }
        : {},
    resolve: {
      alias: {
        '@': path.resolve(__dirname, './src'),
      },
    },
    server: {
      host: '0.0.0.0',
      allowedHosts: ['localhost'],
    },
    build: {
      rollupOptions: {
        output: {
          manualChunks(id) {
            if (id.includes('node_modules')) {
              return 'vendor';
            }
          },
        },
      },
      chunkSizeWarningLimit: 1000,
    },
  };
});
