import globals from 'globals'
import pluginJs from '@eslint/js'
import stylistic from '@stylistic/eslint-plugin'
import tseslint from 'typescript-eslint'

export default [
  {
    name: 'global/base',
    languageOptions: { globals: globals.browser },
    plugins: {
      '@stylistic': stylistic,
    },
  },

  // Typescript sepcific
  ...tseslint.configs.recommended,

  // JavaScript specific
  {
    name: 'eslint/js/recommended',
    files: ['src/**/*.js'],
    rules: {
      ...pluginJs.configs.recommended.rules,
    }
  },

  // Stylistic rules for js + ts
  {
    name: 'global/stylistic',
    files: [
      'src/**/*.js',
      'src/**/*.ts',
    ],
    rules: {
      ...stylistic.configs['recommended-flat'].rules,
      '@stylistic/quotes': ['warn', 'single'],
      '@stylistic/semi': ['warn', 'never'],
      '@stylistic/indent': ['warn', 2, { SwitchCase: 1 }],
      '@stylistic/comma-dangle': ['warn', 'always-multiline'],
      '@stylistic/space-before-function-paren': ['warn', 'always'],
      '@stylistic/object-curly-spacing': ['warn', 'always'],
      '@stylistic/brace-style': ['warn', '1tbs'],
    },
  },

  // Special rules for tests
  {
    name: 'eslint/tests',
    files: ['tests/**/*.js', 'tests/**/*.ts'],
    rules: {
      '@typescript-eslint/no-unused-expressions': 'off',
    },
  },

  // Global ignore patterns
  {
    name: 'global/ignore',
    ignores: [
      '**/.*',
      '**/*.DEPRECATED.*',
      '**/*.OBSOLETE.*',
      '**/*.TEMP.*',
      'dist/*',
    ],
  },
]
