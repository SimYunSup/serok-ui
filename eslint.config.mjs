import { defineConfig } from 'eslint/config';
import eslint from '@eslint/js';
import typescriptEslint from 'typescript-eslint';
import stylistic from '@stylistic/eslint-plugin';

export default defineConfig(
  {
    ignores: [
      'eslint.config.mjs',
      'sd.config.mjs',
      'build/**',
      '.react-router/**', // 폴더 전체를 무시하려면 **를 붙이는 것이 확실합니다.
      '**/.source/**'
    ],
  },
  {
    files: [
      'lib/**/*.ts',
      'lib/**/*.tsx',
      'docs/**/*.ts',
      'docs/**/*.tsx',
      'vite.config.ts',
    ],
  },
  eslint.configs.recommended,
  typescriptEslint.configs.recommended,
  typescriptEslint.configs.stylistic,
  stylistic.configs.recommended,
  {
    languageOptions: {
      sourceType: 'module',
    },
    plugins: {
      '@stylistic': stylistic,
    },
    rules: {
      '@stylistic/indent': ['error', 2],
      '@stylistic/quotes': ['error', 'single', { avoidEscape: true }],
      '@stylistic/semi': ['error', 'always'],
      '@typescript-eslint/no-empty-object-type': 'off',
    },
  },
);
