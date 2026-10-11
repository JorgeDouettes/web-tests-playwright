import { defineConfig } from 'eslint/config';
import js from '@eslint/js';

import tseslint from 'typescript-eslint';
import playwright from 'eslint-plugin-playwright';
import prettier from 'eslint-config-prettier/flat';

export default defineConfig([
  { ignores: ['node_modules/', 'playwright-report/', 'test-results/'] },
  js.configs.recommended,
  tseslint.configs.recommended,
  { ...playwright.configs['flat/recommended'], files: ['tests/**'] },
  prettier,
]);
