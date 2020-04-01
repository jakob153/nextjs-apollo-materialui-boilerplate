const OFF = 0;
const ERROR = 2;

module.exports = {
  extends: [
    'react-app',
    'plugin:@typescript-eslint/recommended',
    'plugin:prettier/recommended'
  ],
  rules: {
    '@typescript-eslint/explicit-function-return-type': OFF,
    'no-console': ERROR,
    'prettier/prettier': [ERROR, { singleQuote: true, printWidth: 100, trailingComma: 'none' }]
  }
};
