import react from '@vitejs/plugin-react';
import fs from 'fs';
import { defineConfig } from 'vite';
import { configDefaults } from 'vitest/config';

export default defineConfig(({ mode }) => {
  const isProd = mode === 'production';
  const metrika = isProd ? fs.readFileSync('scripts/yandex-metrika.html', 'utf-8') : '';

  return {
    plugins: [
      react(),
      {
        name: 'html-transform',
        transformIndexHtml(html) {
          return html.replace('%YANDEX_METRIKA%', metrika);
        },
      },
    ],
    test: {
      globals: true,
      environment: 'jsdom',
      setupFiles: './src/setupTests.ts',
      exclude: [...configDefaults.exclude, 'e2e/*'],
    },
  };
});
