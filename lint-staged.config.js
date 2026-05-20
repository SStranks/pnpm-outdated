/* eslint-disable unicorn/filename-case */
/* eslint-disable perfectionist/sort-objects */
/**
 * @filename: lint-staged.config.js
 * @type {import('lint-staged').Configuration}
 */

export default {
  '*.{js,ts,jsx,tsx}': ['eslint --max-warnings=0', 'prettier --check'],
  '*.{graphql,html,html,json,jsonc,json5,yml,yaml}': ['eslint', 'prettier --check'],
  '*.{css, scss, sass}': ['stylelint', 'prettier --check'],
  '*.md': ['prettier --check'],
};
