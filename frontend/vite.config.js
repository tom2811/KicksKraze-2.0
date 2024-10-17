import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import path from 'path';

export default defineConfig(({ mode }) => ({
  plugins: [react()],
  resolve: {
    alias: {
      '@': path.resolve(__dirname, 'src'),
    },
  },
  optimizeDeps: {
    include: ['firebase/app', 'firebase/auth']
  },
  define: {
    'process.env': process.env
  },
  build: {
    sourcemap: mode === 'development'
  },
  server: {
    open: true,
    port: 3000
  }
}));
