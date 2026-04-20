module.exports = {
  root: true,
  env: { node: true, es2020: true, jest: true },
  extends: ['eslint:recommended', 'prettier'],
  parserOptions: { ecmaVersion: 'latest' },
  rules: {
    'no-unused-vars': ['error', { argsIgnorePattern: '^_' }],
    'no-console': ['warn', { allow: ['log', 'warn', 'error'] }],
  },
};
