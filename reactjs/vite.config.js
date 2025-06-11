import react from '@vitejs/plugin-react-swc';
import { defineConfig } from 'vite';

// https://vitejs.dev/config/
export default defineConfig({
  envPrefix: 'API',
  plugins: [react()],
  server: {
    proxy: {
      '/spotify/v1': {
        target: 'http://127.0.0.1:5173',
        changeOrigin: true,
      },
    },
  },
});
