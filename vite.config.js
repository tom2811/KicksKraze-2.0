import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

// https://vitejs.dev/config/
export default defineConfig(({ mode }) => {
  return {
    plugins: [react()],
    resolve: {
      alias: {
        './runtimeConfig': './runtimeConfig.browser',
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
  }
});
