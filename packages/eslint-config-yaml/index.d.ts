import type { Linter } from 'eslint';

export { default as PluginEslintYAML } from 'eslint-plugin-yml';

declare const EslintConfigYAML: Linter.Config;
export default EslintConfigYAML;
