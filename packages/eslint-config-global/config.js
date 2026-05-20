import PluginGithub from 'eslint-plugin-github';
import PluginPerfectionist from 'eslint-plugin-perfectionist';
import PluginPrettier from 'eslint-plugin-prettier';
import PluginUnicorn from 'eslint-plugin-unicorn';

export { default as ConfigPrettier } from 'eslint-config-prettier';

export const EslintConfigGlobal = {
  settings: {},
  plugins: {
    github: PluginGithub,
    perfectionist: PluginPerfectionist,
    prettier: PluginPrettier,
    unicorn: PluginUnicorn,
  },
  rules: {
    ...PluginUnicorn.configs.recommended.rules,
    ...PluginGithub.configs.internal.rules,
    'arrow-body-style': 'off',
    'no-console': 'off',
    'no-undef': 'off',
    'no-underscore-dangle': 'off',
    'no-unused-vars': 'off',
    'no-use-before-define': 'off',
    'perfectionist/sort-named-exports': 'error',
    'perfectionist/sort-named-imports': 'error',
    'prettier/prettier': ['error'],
    'unicorn/expiring-todo-comments': 'off',
    'unicorn/no-array-for-each': 'off',
    'unicorn/no-array-reduce': 'off',
    'unicorn/no-null': 'error',
    'unicorn/prefer-module': 'off',
    'unicorn/prevent-abbreviations': 'off',
    'perfectionist/sort-exports': [
      'error',
      {
        groups: ['type-export', 'value-export'],
      },
    ],
    'perfectionist/sort-imports': [
      'error',
      {
        environment: 'node',
        ignoreCase: true,
        internalPattern: [String.raw`^@[A-Z]\w*`, String.raw`^#[A-Z]\w*`],
        newlinesBetween: 1,
        order: 'asc',
        type: 'alphabetical',
        groups: [
          ['type-external', 'type-builtin'],
          'type-internal',
          ['type-parent', 'type-sibling', 'type-index'],
          'side-effect',
          'external',
          'internal',
          'builtin',
          ['parent', 'sibling', 'index'],
          'unknown',
          'side-effect-style',
          'style',
        ],
      },
    ],
    'perfectionist/sort-objects': [
      'error',
      {
        groups: ['status', 'message', 'data'],
        customGroups: [
          {
            elementNamePattern: '^message$',
            groupName: 'message',
          },
          {
            elementNamePattern: '^status$',
            groupName: 'status',
          },
          {
            elementNamePattern: '^data$',
            groupName: 'data',
          },
        ],
        useConfigurationIf: {
          // Utilized in http response objects
          allNamesMatchPattern: '^(message|status|data)$',
        },
      },
      {
        type: 'unsorted',
        useConfigurationIf: {
          declarationMatchesPattern: { pattern: 'Resolver$', scope: 'deep' }, // graphql resolvers
        },
      },
      {
        // Ignore objects passed to fn calls; regexp name
        type: 'unsorted',
        useConfigurationIf: {
          callingFunctionNamePattern: '^(createSlice|pgTable|findFirst|postgresDB|relations)$',
          objectType: 'non-destructured',
        },
      },
      {
        // Default/Fallback Configuration
        groups: ['top', 'member', 'multiline-member', 'unknown', 'method', 'multiline-method', 'bottom'],
        customGroups: [
          {
            elementNamePattern: ['^id$', '^name$'],
            groupName: 'top',
          },
          {
            elementNamePattern: '.+_metadata$',
            groupName: 'bottom',
          },
        ],
        useConfigurationIf: {
          objectType: 'non-destructured',
        },
      },
    ],
    'unicorn/filename-case': [
      'error',
      {
        ignore: ['index.(js|jsx|ts|tsx)', 'webpack.*', '.d.ts', 'types.ts', '.test.ts', String.raw`use\w*.tsx`],
        cases: {
          camelCase: true,
          pascalCase: true,
        },
      },
    ],
  },
};
