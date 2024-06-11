// eslint.config.cjs

const { defineConfig } = require('eslint-define-config');

module.exports = defineConfig({
    rules: {
        '@typescript-eslint/naming-convention': 'off',
        '@typescript-eslint/ban-ts-comment': 'off',
        '@typescript-eslint/no-explicit-any': 'off',
        '@typescript-eslint/explicit-function-return-types': 'off',
        '@typescript-eslint/explicit-module-boundary-types': 'off',
        'indent': ['error', 2],
        'quotes': ['error', 'single'],
        'semi': ['error', 'always'],
        'prettier/prettier': 'error'
    },
    extends: [
        'plugin:@typescript-eslint/recommended',
        'plugin:import/errors',
        'plugin:import/warnings',
        'plugin:import/typescript',
        'plugin:prettier/recommended'
    ],
    parser: '@typescript-eslint/parser',
    parserOptions: {
        ecmaVersion: 'latest',
        sourceType: 'module'
    },
    env: {
        node: true
    },
    overrides: [
        {
            files: ['*.ts', '*.tsx'],
            rules: {
                // TypeScript-specific rules can go here
            }
        }
    ]
});
