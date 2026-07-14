import globals from 'globals'
import pluginJs from '@eslint/js'
import nextConfig from 'eslint-config-next'

/** @type {import('eslint').Linter.Config[]} */
const config = [
  { languageOptions: { globals: globals.browser } },
  pluginJs.configs.recommended,
  ...nextConfig,
]

export default config
