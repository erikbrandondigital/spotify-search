import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react-swc';

// https://vitejs.dev/config/
export default defineConfig({
    envDir: '../',
    envPrefix: 'API',
    plugins: [react()],
    server: {
        proxy: {
            '/spotify/v1': {
                target: 'http://localhost:5173',
                changeOrigin: true
            }
        }
    }
});
