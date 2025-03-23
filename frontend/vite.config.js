import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

export default defineConfig({
  plugins: [react()],
  server: {
    host: true,          // <- lắng nghe tất cả IP
    port: 5173
  }
});
