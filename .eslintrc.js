/**
 * Eslint Configuration
 *
 * http://eslint.org/docs/user-guide/configuring
 *
 */

module.exports = {
  parser: 'babel-eslint',

  extends: [
    'airbnb',
    'prettier',
    'prettier/react',
  ],

  plugins: ['prettier', 'react-hooks'],

  globals: {
    __DEV__: true,
  },

  env: {
    es6: true,
    node: true,
    browser: true,
    jest: true,
  },

  rules: {
    'react-hooks/rules-of-hooks': 'error',
    'import/no-extraneous-dependencies': ['error', { packageDir: '.' }],
    // we need to disable it - due to issues with JEST
    // see https://github.com/benmosher/eslint-plugin-import/issues/472
    'import/first': 0,
    'max-len': ['error', { code: 100, ignoreUrls: true }],
    'no-console': [
      'error',
      {
        allow: ['warn', 'error', 'info'],
      },
    ],
    'no-underscore-dangle': 'off',
    'prefer-destructuring': [
      'error',
      {
        VariableDeclarator: {
          array: false,
          object: true,
        },
        AssignmentExpression: {
          array: false,
          object: false,
        },
      },
      {
        enforceForRenamedProperties: false,
      },
    ],
    'jsx-a11y/label-has-for': [
      2,
      {
        components: ['Label'],
        required: {
          every: ['nesting', 'id'],
        },
        allowChildren: true,
      },
    ],
    'jsx-a11y/anchor-is-valid': [
      'error',
      {
        components: ['Link'],
        specialLink: ['to'],
        aspects: ['noHref', 'invalidHref', 'preferButton'],
      },
    ],
    'react/jsx-filename-extension': ['error', { extensions: ['.js', '.jsx'] }],
    'react/prefer-stateless-function': 'off',
    'prettier/prettier': 'error',
  },
  settings: {
    'import/resolver': {
      node: {
        moduleDirectory: ['node_modules', 'src'],
      },
    },
  },
};
