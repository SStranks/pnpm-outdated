import PluginEslintYAML from 'eslint-plugin-yml';
import * as ParserEslintYAML from 'yaml-eslint-parser';
export { default as PluginEslintYAML } from 'eslint-plugin-yml';

const EslintConfigYAML = {
  languageOptions: {
    parser: ParserEslintYAML,
  },
  plugins: {
    yml: PluginEslintYAML,
  },
};

export default EslintConfigYAML;
