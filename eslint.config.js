import eslint from '@eslint/js'
import reactHooks from 'eslint-plugin-react-hooks'
import reactRefresh from 'eslint-plugin-react-refresh'
import importPlugin from 'eslint-plugin-import'
import jsxA11y from 'eslint-plugin-jsx-a11y'
import reactPlugin from 'eslint-plugin-react'
import tseslint from 'typescript-eslint'
import eslintPluginPrettierRecommended from 'eslint-plugin-prettier/recommended'

export default tseslint.config(
  eslint.configs.recommended,
  importPlugin.flatConfigs.recommended,
  jsxA11y.flatConfigs.recommended,
  reactPlugin.configs.flat.recommended,
  reactPlugin.configs.flat['jsx-runtime'],
  tseslint.configs.recommendedTypeChecked,
  tseslint.configs.stylisticTypeChecked,
  eslintPluginPrettierRecommended,
  { ignores: ['eslint.config.js', 'node_modules', 'dist'] },
  {
    languageOptions: {
      parserOptions: {
        projectService: true,
        tsconfigRootDir: import.meta.dirname,
      },
    },
  },
  {
    settings: {
      // pour éviter les erreurs de "react version not specified" (react-plugin)
      react: {
        version: 'detect',
      },
      // pour éviter les erreurs de "import/no-unresolved" (eslint-plugin-import)
      'import/resolver': {
        typescript: {
          alwaysTryTypes: true,
          project: './tsconfig.json',
        },
        // node: {
        //   extensions: ['.js', '.jsx', '.ts', '.tsx'],
        // },
      },
    },
    plugins: {
      'react-hooks': reactHooks,
      'react-refresh': reactRefresh,
    },
    rules: {
      ...reactHooks.configs.recommended.rules,
      'react-refresh/only-export-components': [
        'warn',
        { allowConstantExport: true },
      ],

      // --- Rules perso, début ---
      '@typescript-eslint/no-unused-vars': [
        'error',
        { argsIgnorePattern: '^_' },
      ],
      '@typescript-eslint/no-explicit-any': 'warn',
      // mettre en error strict-boolean-expressions est mieux mais implique de changer les conditions de type "{error && " pour afficher un message d'erreur par exemple
      '@typescript-eslint/strict-boolean-expressions': 'warn', // j'avais mis off avant, essayer de le mettre en warn
      // no-misused-promises est issue des règles avancées recommended-type-checked
      '@typescript-eslint/no-misused-promises': 'off', // j'avais mis off avant, on peut le laisser en warn, car il est utile pour repérer les promesses mal utilisées
      // désactiver no-floating-promises (issue des règles avancées recommended-type-checked) si besoin car on utilise déjà try/catch et gère déjà les états pending/fulfilled/rejected
      'react/self-closing-comp': 'error',
      'react/prop-types': 'off', // on utilise TypeScript
      'react/no-unused-state': 'warn', // repérer les states non utilisées
      'react/no-deprecated': 'warn', // repérer les méthodes React obsolètes
      'react/jsx-no-duplicate-props': 'warn', // repérer les props dupliquées
      'jsx-a11y/alt-text': 'warn',
      'jsx-a11y/anchor-is-valid': 'warn',
      // --- Rules perso, fin ---

      'no-unused-vars': 'off', // eslint-plugin-import
      'import/no-dynamic-require': 'warn', // eslint-plugin-import
      'import/no-nodejs-modules': ['warn', { allow: ['path'] }], // eslint-plugin-import
    },
  },
)
