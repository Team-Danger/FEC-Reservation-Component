module.exports = {
  env: {
    browser: true,
    es6: true,
    node: true,
  },
  extends: [
    'airbnb',
    'plugin:jest/recommended',
    'plugin:react/recommended',
  ],
  parserOptions: {
    ecmaFeatures: {
      jsx: true,
    },
    ecmaVersion: 11,
  },
  plugins: [
    'react',
  ],
  ignorePatterns: ['client/dist/*', 'node_modules/*'],
  rules: {
    "react/destructuring-assignment": [<enabled>, 'always']
  },
};
