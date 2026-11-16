import { defineConfig, loadEnv } from 'vite';
import react from '@vitejs/plugin-react';

export default defineConfig(({ mode }) => {
  const env = loadEnv(mode, process.cwd(), '');
  const targetServer = env.SERVER_URL || env.VITE_SERVER_URL || 'http://localhost:5001';

  return {
    plugins: [react()],
    server: {
      port: 5173,
      proxy: {
        '/api': {
          target: targetServer,
          changeOrigin: true,
        },
        '/uploads': {
          target: targetServer,
          changeOrigin: true,
        }
      }
    }
  };
});
