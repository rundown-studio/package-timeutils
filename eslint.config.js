import globals from 'globals'
import pluginJs from '@eslint/js'
// import tseslint from 'typescript-eslint'
import stylistic from '@stylistic/eslint-plugin'
import tseslint from 'typescript-eslint'

export default [
  {
    languageOptions: { globals: globals.browser },
    plugins: {
      '@stylistic': stylistic,
    },
  },
  ...tseslint.configs.recommended,
  // pluginJs.configs.recommended,
  // stylistic.configs['recommended-flat'],
  {
    files: [
      'src/**/*.js',
      'src/**/*.ts',
    ],
    rules: {
      ...pluginJs.configs.recommended.rules,
      ...stylistic.configs['recommended-flat'].rules,
      '@stylistic/quotes': ['warn', 'single'],
      '@stylistic/semi': ['warn', 'never'],
      '@stylistic/indent': ['warn', 2, { SwitchCase: 1 }],
      '@stylistic/comma-dangle': ['warn', 'always-multiline'],
      '@stylistic/space-before-function-paren': ['warn', 'always'],
      '@stylistic/object-curly-spacing': ['warn', 'always'],
    },
  },

  // Global ignore patterns
  {
    ignores: [
      '**/.*',
      '**/*.DEPRECATED.js',
      '**/*.OBSOLETE.js',
      '**/*.TEMP.js',
      'dist/*',
    ],
  },
]
