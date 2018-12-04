const path = require('path');
const webpack = require('webpack');
const Dotenv = require('dotenv-webpack');

// paths
const buildDir = path.resolve(__dirname, 'build');
const srcDir = path.resolve(__dirname, 'src');

// plugins
const HtmlWebPackPlugin = require('html-webpack-plugin');
const CleanWebpackPlugin = require('clean-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const autoprefixer = require('autoprefixer');

const minimizeCssOptions = { discardComments: { removeAll: true } };

module.exports = env => {
  const isProduction = !!(env && env.production);
  const staticAssetName = isProduction
    ? '[hash:8].[ext]'
    : '[path][name].[ext]?[hash:8]';

  return {
    entry: {
      app: './src/app.js'
    },
    resolve: {
      modules: ['node_modules', 'src'],
      extensions: ['.js', '.jsx']
    },
    output: {
      publicPath: '/',
      filename: isProduction ? '[name].[hash:8].bundle.js' : '[name].bundle.js',
      chunkFilename: isProduction
        ? '[name].[hash:8].chunk.js'
        : '[name].chunk.js',
      path: buildDir
    },
    target: 'web',
    mode: isProduction ? 'production' : 'development',
    module: {
      strictExportPresence: true,
      rules: [
        {
          test: /\.(js|jsx)$/,
          exclude: /node_modules/,
          use: {
            loader: 'babel-loader',
            options: {
              cacheDirectory: !isProduction // speeds up the build on dev by caching
            }
          }
        },
        {
          test: /\.(css|scss|sass)$/,
          rules: [
            {
              loader: isProduction
                ? [MiniCssExtractPlugin.loader]
                : ['css-hot-loader', MiniCssExtractPlugin.loader]
            },
            {
              exclude: srcDir,
              loader: 'css-loader',
              options: {
                sourceMap: !isProduction,
                minimize: isProduction ? minimizeCssOptions : false
              }
            },
            {
              include: srcDir,
              loader: 'css-loader',
              options: {
                // CSS Loader https://github.com/webpack/css-loader
                importLoaders: 2,
                sourceMap: !isProduction,
                // CSS Modules https://github.com/css-modules/css-modules
                modules: false,
                localIdentName: '[local]',
                // CSS Nano http://cssnano.co/
                minimize: isProduction ? minimizeCssOptions : false
              }
            },
            {
              test: /\.(scss|sass)$/,
              loader: 'sass-loader'
            },
            {
              loader: 'postcss-loader',
              options: {
                plugins: () => [
                  autoprefixer({
                    browsers: [
                      '>1%',
                      'last 4 versions',
                      'Firefox ESR',
                      'not ie < 11'
                    ],
                    flexbox: 'no-2009'
                  })
                ]
              }
            }
          ]
        },
        {
          test: /\.(bmp|gif|jpg|jpeg|png|svg)$/,
          oneOf: [
            {
              issuer: /\.(css|scss|sass)$/,
              oneOf: [
                // inline lightweight SVGs as UTF-8 encoded DataUrl string
                {
                  test: /\.svg$/,
                  loader: 'svg-url-loader',
                  options: {
                    name: staticAssetName,
                    limit: 4096 // 4kb
                  }
                },

                // inline lightweight images as Base64 encoded DataUrl string
                {
                  loader: 'url-loader',
                  options: {
                    name: staticAssetName,
                    limit: 4096 // 4kb
                  }
                }
              ]
            },

            // or return public URL to image resource
            {
              loader: 'file-loader',
              options: {
                name: staticAssetName
              }
            }
          ]
        },
        // return public URL for all assets unless explicitly excluded
        // DO'NT FORGET to update `exclude` list when you're adding a new loader
        {
          exclude: [
            /\.(js|jsx)$/,
            /\.(css|scss|sass)$/,
            /\.(bmp|gif|jpg|jpeg|png|svg)$/,
            /\.json$/,
            /\.html$/
          ],
          loader: 'file-loader',
          options: {
            name: staticAssetName
          }
        }
      ]
    },
    optimization: {
      splitChunks: {
        cacheGroups: {
          commons: {
            test: /[\\/]node_modules[\\/]/,
            name: 'vendors',
            chunks: 'all'
          }
        }
      },
      // keep the runtime chunk seperated to enable long term caching
      // https://twitter.com/wSokra/status/969679223278505985
      runtimeChunk: true
    },
    devServer: {
      contentBase: buildDir,
      historyApiFallback: true,
      open: true,
      port: 3000,
      watchOptions: {
        ignored: '/node_modules/'
      }
    },
    bail: isProduction,
    cache: !isProduction,
    devtool: isProduction ? 'source-map' : 'cheap-module-inline-source-map',
    plugins: [
      isProduction ? false : new webpack.HotModuleReplacementPlugin(),
      new CleanWebpackPlugin(['build']),
      new Dotenv({
        safe: true
      }),
      new MiniCssExtractPlugin({
        filename: isProduction ? '[name].[hash].css' : '[name].css',
        chunkFilename: isProduction ? '[id].[hash].css' : '[id].css'
      }),
      new HtmlWebPackPlugin({
        template: './src/index.html',
        filename: './index.html',
        inject: true
      })
    ].filter(Boolean)
  };
};
