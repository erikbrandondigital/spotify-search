import js from '@eslint/js';
import eslintConfigPrettier from 'eslint-config-prettier';
import prettierPlugin from 'eslint-plugin-prettier';
import { defineConfig } from 'eslint/config';
import globals from 'globals';

export default defineConfig([
  {
    files: ['**/*.{js,cjs}'],
    ...js.configs.recommended,
    plugins: { prettier: prettierPlugin },
    rules: {
      'prettier/prettier': 'warn',
    },
    languageOptions: { sourceType: 'commonjs', globals: globals.browser },
  },
  { files: ['**/*.{js,mjs,cjs}'], ...eslintConfigPrettier },
]);
