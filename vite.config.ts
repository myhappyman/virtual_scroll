import { defineConfig } from 'vite';

import react from '@vitejs/plugin-react';

// dns.setDefaultResultOrder('verbatim');
// https://vitejs.dev/config/
export default defineConfig({
  server: {
    host: 'localhost',
    port: 80,
  },
  plugins: [react()],
});
