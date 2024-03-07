module.exports = {
  parser: '@typescript-eslint/parser',
  plugins: ['react', '@typescript-eslint'],
  extends: [
    'eslint:recommended',
    'plugin:react/recommended',
    'plugin:@typescript-eslint/recommended',
  ],
  rules: {
    'no-unused-vars': 'warn',
    quotes: ['warn', 'single'],
    'jsx-quotes': ['warn', 'prefer-double'],
    'prefer-const': 'warn',
    'linebreak-style': 'off',
    'prefer-promise-reject-errors': 'off',
    'no-underscore-dangle': 'off',
    'class-methods-use-this': 'off',
    'no-nested-ternary': 'off'
  },
};
