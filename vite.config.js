import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

// https://vitejs.dev/config/
export default defineConfig({
  base: '/', // good for deployment at root domain
  plugins: [react()],
  build: {
    outDir: 'dist', // optional: default is 'dist'
  },
  server: {
    // during development, support SPA fallback
    historyApiFallback: true,
  },
});
