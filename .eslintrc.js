module.exports = {
  env: {
    browser: true,
    es2021: true,
    node: true,
  },
  extends: ['eslint:recommended', 'plugin:react/recommended'],
  overrides: [],
  parserOptions: {
    ecmaVersion: 'latest',
    sourceType: 'module',
  },
  plugins: ['react'],

  rules: {
    'react/prop-types': 'off',
  },

  settings: {
    react: {
      version: 'detect',
    },
  },
};
