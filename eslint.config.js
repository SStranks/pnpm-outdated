import { EslintConfig, ConfigPrettier } from '@packages/eslint-config';

export default [
  {
    ignores: ['**/node_modules', '**/dist', '**/__snapshots__', '**/mocks', '**/coverage', 'pnpm-lock.yaml'],
  },
  {
    files: ['src/**.[jt]s'],
    languageOptions: {
      ...EslintConfig.languageOptions,
      parserOptions: { project: ['tsconfig.json'] },
    },
    plugins: { ...EslintConfig.plugins },
    rules: { ...EslintConfig.rules },
    settings: { ...EslintConfig.settings },
  },
  ConfigPrettier,
];
