import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import path from 'path';
// import sassPlugin from 'vite-plugin-sass'; // Chú ý cài đặt plugin này

// https://vitejs.dev/config/
export default defineConfig({
    plugins: [react()],
    resolve: {
        alias: {
            '@': path.resolve(__dirname, './src'),
            '@apis': path.resolve(__dirname, './src/apis'),
            '@models': path.resolve(__dirname, './src/models'),
            '@components': path.resolve(__dirname, './src/components'),
            '@features': path.resolve(__dirname, './src/features'),
            '@store': path.resolve(__dirname, './src/store'),
            '@pages': path.resolve(__dirname, './src/pages'),
            '@hooks': path.resolve(__dirname, './src/hooks'),
            '@assets': path.resolve(__dirname, './src/assets'),
        },
    },
});
