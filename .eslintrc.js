module.exports = {
  root: true,
  extends: '@react-native-community',
  rules: {
    'react/react-in-jsx-scope': 'off',
    'react-hooks/rules-of-hooks': 'error',
    'react-hooks/exhaustive-deps': 0,
    'react-native/no-inline-styles': 'off',
    'no-extra-boolean-cast': true,
    "prettier/prettier": [
      "error",
      {
          "printWidth": 80,
          "tabWidth": 4,
          "singleQuote": true,
          "trailingComma": "es5"
      }
  ],
  },
};