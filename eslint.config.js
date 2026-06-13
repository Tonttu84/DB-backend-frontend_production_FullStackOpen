import js from '@eslint/js'
import globals from 'globals'
import reactHooks from 'eslint-plugin-react-hooks'
import reactRefresh from 'eslint-plugin-react-refresh'
import { defineConfig } from 'eslint/config'

export default defineConfig([
  {
    ignores: ['server/dist'], // Ensure the correct path to the dist folder
  },

  // ✅ FRONTEND (React / Vite)
  {
    files: ['src/**/*.{js,jsx}'],
    extends: [
      js.configs.recommended,
      reactHooks.configs.flat.recommended,
      reactRefresh.configs.vite,
    ],
    languageOptions: {
      ecmaVersion: 2020,
      globals: globals.browser,
      parserOptions: {
        ecmaVersion: 'latest',
        ecmaFeatures: { jsx: true },
        sourceType: 'module',
      },
    },
    rules: {
      'no-unused-vars': ['error', { varsIgnorePattern: '^[A-Z_]' }],
    },
  },

  // ✅ BACKEND (Node / server)
  {
    files: ['server/**/*.{js,jsx}'],
    languageOptions: {
      ecmaVersion: 2020,
      globals: globals.node, // 👈 THIS fixes process, process.argv, etc.
      sourceType: 'module',
    },
  },

  // 🚫 Explicitly ignore all files in the dist folder
  {
    files: ['server/dist/**/*'],
    rules: {}, // Disable all rules for files in dist
  },
])