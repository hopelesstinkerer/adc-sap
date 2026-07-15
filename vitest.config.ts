import { defineConfig } from 'vitest/config';

export default defineConfig({
  test: {
    include: ['*.test.ts', 'scripts/**/*.test.ts'],
    exclude: ['**/node_modules/**', 'packages/**', 'libs/**', 'apps/**'],
  },
});
