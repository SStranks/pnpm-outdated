// @ts-check
import RecommendedEslint from '@eslint/js';
import PluginStylistic from '@stylistic/eslint-plugin';
import PluginImportX, { flatConfigs as PluginImportXConfigs } from 'eslint-plugin-import-x';
import globals from 'globals';

const EslintConfigJavascript = {
  languageOptions: {
    ecmaVersion: 2021,
    sourceType: 'module',
    globals: {
      ...globals.es2021,
    },
  },
  plugins: {
    '@stylistic': PluginStylistic,
    'import-x': PluginImportX,
  },
  rules: {
    ...PluginImportXConfigs.recommended.rules,
    ...PluginStylistic.configs.recommended.rules,
    ...RecommendedEslint.configs.recommended.rules,
    '@stylistic/jsx-curly-brace-presence': ['error', { propElementValues: 'always' }],
    'import-x/no-unresolved': 'error',
  },
  settings: {
    'import-x/ignore': ['node_modules'],
    'import-x/parsers': {},
  },
};

export default EslintConfigJavascript;
