import { ConfigPrettier, EslintConfigGlobal } from '@packages/eslint-config-global';
import EslintConfigJavascript from '@packages/eslint-config-javascript';
import EslintConfigTypescript, { createTypeScriptImportResolver, TSEslint } from '@packages/eslint-config-typescript';
import EslintConfigYAML, { PluginEslintYAML } from '@packages/eslint-config-yaml';
import { defineConfig } from 'eslint/config';

export default defineConfig([
  {
    name: 'Global Ignores',
    ignores: [
      '**/node_modules',
      '**/dist',
      '**/__snapshots__',
      '**/mocks',
      '**/coverage',
      '**/private.*',
      '**/private/*',
      'pnpm-lock.yaml',
      'pnpm-lock.*.yaml',
      'pnpm-workspace.yaml',
      'package-lock.json',
    ],
  },
  {
    name: 'Global Configuration',
    languageOptions: { ...EslintConfigGlobal.languageOptions },
    plugins: { ...EslintConfigGlobal.plugins },
    rules: { ...EslintConfigGlobal.rules },
    settings: {
      ...EslintConfigGlobal.settings,
      'import-x/resolver-next': [
        createTypeScriptImportResolver({
          alwaysTryTypes: true,
          extensions: ['.js', '.ts'],
          project: ['apps/pnpm-outdated/tsconfig.json'],
        }),
      ],
    },
  },
  {
    name: 'Javascript Configuration',
    files: ['**/*.js'],
    languageOptions: { ...EslintConfigJavascript.languageOptions },
    plugins: { ...EslintConfigJavascript.plugins },
    rules: { ...EslintConfigJavascript.rules },
    settings: { ...EslintConfigJavascript.settings },
  },
  {
    name: 'Typescript Configuration',
    extends: [TSEslint.configs.recommendedTypeChecked],
    files: ['**/*.ts'],
    languageOptions: { ...EslintConfigTypescript.languageOptions },
    plugins: { ...EslintConfigTypescript.plugins },
    rules: { ...EslintConfigTypescript.rules },
    settings: { ...EslintConfigTypescript.settings },
  },
  {
    name: 'YAML Configuration',
    extends: [PluginEslintYAML.configs.standard, PluginEslintYAML.configs.prettier],
    files: ['**/*.yaml', '**/*.yml'],
    languageOptions: { ...EslintConfigYAML.languageOptions },
    plugins: { ...EslintConfigYAML.plugins },
    rules: { ...EslintConfigYAML.rules },
  },
  ConfigPrettier,
]);
