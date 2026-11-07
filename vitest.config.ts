import { defineConfig } from 'vitest/config';
import path from 'node:path';

export default defineConfig({
  resolve: {
    alias: {
      '@': path.resolve(__dirname, 'src'),
      'bye-chem-engine': path.resolve(__dirname, '../BYE-Chem_engine/src'),
      'bye-math-engine': path.resolve(__dirname, '../BYE-Math_engine/src'),
    },
  },
  test: { include: ['test/**/*.test.ts'] },
});
