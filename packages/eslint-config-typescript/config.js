/* eslint-disable perfectionist/sort-objects */
import PluginStylistic from '@stylistic/eslint-plugin';
import PluginImportX, { flatConfigs as PluginImportXConfigs } from 'eslint-plugin-import-x';
import globals from 'globals';

export { createTypeScriptImportResolver } from 'eslint-import-resolver-typescript';
export { createNodeResolver } from 'eslint-plugin-import-x';
export { default as TSEslint } from 'typescript-eslint';

const EslintConfigTypescript = {
  languageOptions: {
    ecmaVersion: 2021,
    sourceType: 'module',
    globals: {
      ...globals.es2021,
    },
    parserOptions: {
      projectService: true,
      ecmaVersion: 2021,
    },
  },
  plugins: {
    '@stylistic': PluginStylistic,
    'import-x': PluginImportX,
  },
  rules: {
    ...PluginImportXConfigs.recommended.rules,
    ...PluginStylistic.configs.recommended.rules,
    'no-use-before-define': 'off',
    'import-x/no-unresolved': 'error',
    '@stylistic/jsx-curly-brace-presence': ['error', { propElementValues: 'always' }],
    '@typescript-eslint/no-unused-vars': ['error', { argsIgnorePattern: '^_' }],
    '@typescript-eslint/no-use-before-define': 'error',
    '@typescript-eslint/consistent-type-exports': 'error',
    '@typescript-eslint/consistent-type-imports': 'error',
    '@typescript-eslint/no-unnecessary-condition': 'error',
    '@typescript-eslint/prefer-readonly': 'warn',
    '@typescript-eslint/prefer-reduce-type-parameter': 'error',
    '@typescript-eslint/return-await': ['error', 'in-try-catch'],
    '@typescript-eslint/no-restricted-imports': [
      'warn',
      {
        name: 'react-redux',
        importNames: ['useSelector', 'useDispatch'],
        message: 'Use typed hooks `useAppDispatch` and `useAppSelector` instead.',
      },
    ],
    '@typescript-eslint/only-throw-error': [
      'error',
      {
        allow: [
          {
            from: 'package',
            package: '@tanstack/router-core',
            name: 'Redirect',
          },
          {
            from: 'package',
            package: '@tanstack/router-core',
            name: 'NotFoundError',
          },
        ],
      },
    ],
  },
  settings: {
    'import-x/ignore': ['node_modules'],
    'import-x/parsers': {
      '@typescript-eslint/parser': ['*.ts', '*.tsx', '*.html'],
    },
  },
};

export default EslintConfigTypescript;
