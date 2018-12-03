/**
 * Babel Configuration
 *
 * https://babeljs.io/docs/usage/api/
 *
 */

module.exports = (api) => {
  // check if it's a production build usin envName
  const isProduction = api.env('production');
  // config
  return {
  comments: !isProduction, // no comments in production
  presets: [
    '@babel/flow',
    [
      '@babel/preset-env',
      {
        targets: {
          // last version of internet explorer supported by microsoft
          ie: 11
        },
        // do not add polyfills automatically per file
        useBuiltIns: false,
        // do not transform modules to CJS
        modules: false,
        // exclude transforms that make all code slower (from CRA)
        exclude: ['transform-typeof-symbol']
      }
    ],
    [
      '@babel/preset-react',
      {
        // import error messages from react
        development: !isProduction,
        // use the native built-in modules instead of trying to polyfill
        useBuiltIns: true
      }
    ]
  ],
  env: {
    test: {
      presets: [['@babel/preset-env'], '@babel/preset-react']
    }
  },
  // ignore nodule modules and build folder
  ignore: ['node_modules', 'build'],
  // ESNext plugins
  plugins: [
    // use arrow functions as class properties
    // enable loose mode to use assignment instead of defineProperty
    // https://babeljs.io/docs/en/next/babel-plugin-proposal-class-properties.html
    ['@babel/plugin-proposal-class-properties', { loose: true }],
    // use Object.assign instead of babel extends helper
    // https://babeljs.io/docs/en/next/babel-plugin-proposal-object-rest-spread.html
    ['@babel/plugin-proposal-object-rest-spread', { useBuiltIns: true }],
    // polyfills required for async/await and generators in runtime
    // https://babeljs.io/docs/en/babel-plugin-transform-runtime
    ['@babel/plugin-transform-runtime'],
    // wrap throw expressions in an IIFE
    // https://babeljs.io/docs/en/next/babel-plugin-proposal-throw-expressions.html
    ['@babel/plugin-proposal-throw-expressions'],
    // remove React propTypes from the production build, as they are only used in development
    // https://www.npmjs.com/package/babel-plugin-transform-react-remove-prop-types
    ['transform-react-remove-prop-types', { removeImport: true }]
  ]
};
};
