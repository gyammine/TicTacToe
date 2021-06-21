module.exports = {
  extends: [
    'airbnb',
    'plugin:prettier/recommended',
    'prettier/react',
    'plugin:react-hooks/recommended',
  ],
  parser: '@typescript-eslint/parser',
  env: {
    browser: true,
    commonjs: true,
    es6: true,
    jest: true,
    node: true,
  },
  settings: {
    'import/resolver': {
      node: {
        extensions: ['.js', '.jsx', '.ts', '.tsx'],
      },
    },
  },
  rules: {
    'import/prefer-default-export': 'off',
    'react/prefer-stateless-function': 'off',
    'class-methods-use-this': ['off'],
    'no-unused-vars': ['off'],
    'no-use-before-define': ['off'],
    'no-underscore-dangle': ['off'],
    'jsx-a11y/href-no-hash': ['off'],
    'react/static-property-placement': ['off'],
    'react/sort-comp': ['off'],
    'react/jsx-filename-extension': [
      'warn',
      {extensions: ['.js', '.jsx', '.ts', '.tsx']},
    ],
    'react/destructuring-assignment': 'off',
    'react/state-in-constructor': 'off',
    'lines-between-class-members': 'off',
    'no-await-in-loop': 'off',
    camelcase: 'off',
    'react/prop-types': ['off'],
    'import/extensions': [
      'error',
      'ignorePackages',
      {
        js: 'never',
        jsx: 'never',
        ts: 'never',
        tsx: 'never',
      },
    ],
    'max-len': [
      'warn',
      {
        code: 100,
        tabWidth: 2,
        comments: 100,
        ignoreComments: false,
        ignoreTrailingComments: true,
        ignoreUrls: true,
        ignoreStrings: true,
        ignoreTemplateLiterals: true,
        ignoreRegExpLiterals: true,
      },
    ],
  },
  root: true,
};
