import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import path from 'path';

// https://vitejs.dev/config/
export default defineConfig({
    plugins: [react()],
    resolve: {
        alias: {
            '@': path.resolve(__dirname, './src'),
            '@apis': path.resolve(__dirname, './src/apis'),
            '@models': path.resolve(__dirname, './src/models'),
            '@store': path.resolve(__dirname, './src/store'),
            '@components': path.resolve(__dirname, './src/components'),
        },
    },
});
