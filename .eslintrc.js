module.exports = {
  env: {
    node: true,
    es6: true,
  },
  parserOptions: {
    ecmaVersion: 2018,
    sourceType: 'module',
  },
  extends: ['eslint:recommended', 'prettier', 'prettier/react'],
  rules: {
    'no-console': 'off',
  },
};
