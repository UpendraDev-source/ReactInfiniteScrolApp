import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

// https://vite.dev/config/
export default defineConfig({
  plugins: [react()],
  server: {
    host: '0.0.0.0',  // This allows external devices to access the server
    port: 3000,       // Make sure this matches the port you want to use
    strictPort: true, // Forces Vite to use the specified port, avoiding conflicts
  },
});
