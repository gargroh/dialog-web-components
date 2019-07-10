/*
 * Copyright 2018 dialog LLC <info@dlg.im>
 */

const fs = require('fs');
const path = require('path');
const CopyWebpackPlugin = require('copy-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const OptimizeCSSAssetsPlugin = require('optimize-css-assets-webpack-plugin');

function resolve(...paths) {
  return fs.realpathSync(path.join(__dirname, ...paths));
}

const whitelist = [
  resolve('src'),
  resolve('node_modules/@dlghq/markdown'),
  resolve('node_modules/@dlghq/react-l10n'),
  resolve('node_modules/@dlghq/dialog-types'),
  resolve('node_modules/@dlghq/dialog-utils'),
  resolve('node_modules/@dlghq/country-codes'),
  resolve('node_modules/@dlghq/emoji'),
];

const globalStyles = [
  resolve('src/styles/global.css'),
  resolve('src/components/MessageMediaInteractive/example/CodeMirror.css'),
  resolve('src/styleguide/styles.css'),
];

module.exports = {
  mode: 'development',
  resolve: {
    alias: {
      react: resolve('node_modules/react'),
    },
  },
  module: {
    rules: [
      {
        test: /\.js$/,
        include: whitelist,
        use: [
          {
            loader: 'babel-loader',
            options: {
              babelrc: false,
              cacheDirectory: true,
              presets: [
                [
                  '@dlghq/babel-preset-dialog',
                  {
                    modules: false,
                    runtime: false,
                    development: true,
                  },
                ],
              ],
            },
          },
        ],
      },
      {
        test: /\.css$/,
        use: [
          {
            loader: MiniCssExtractPlugin.loader,
          },
          {
            loader: 'css-loader',
            options: {
              modules: false,
              importLoaders: 1,
            },
          },
          {
            loader: 'postcss-loader',
          },
        ],
        include: globalStyles,
      },
      {
        test: /\.css$/,
        include: whitelist,
        exclude: globalStyles,
        use: [
          {
            loader: MiniCssExtractPlugin.loader,
          },
          {
            loader: 'css-loader',
            options: {
              modules: {
                localIdentName: 'DialogComponents__[name]__[local]',
              },
              importLoaders: 1,
            },
          },
          {
            loader: 'postcss-loader',
          },
        ],
      },
      {
        test: /\.yml$/,
        include: whitelist,
        use: ['yml-loader'],
      },
      {
        test: /\.(jpg|png|svg|gif)$/,
        exclude: resolve('src/components/Icon/svg'),
        use: ['file-loader'],
      },
      {
        test: /\.(svg)$/,
        include: resolve('src/components/Icon/svg'),
        use: ['svg-sprite-loader'],
      },
      {
        test: /\.txt$/,
        include: whitelist,
        use: ['raw-loader'],
      },
    ],
  },
  plugins: [
    new CopyWebpackPlugin([
      {
        from: './node_modules/opus-recorder/dist/encoderWorker.min.js',
        to: 'encoderWorker.min.js',
      },
      {
        from: './node_modules/opus-recorder/dist/encoderWorker.min.wasm',
        to: 'encoderWorker.min.wasm',
      },
    ]),
    new MiniCssExtractPlugin({
      filename: '[name].css',
    }),
    new OptimizeCSSAssetsPlugin(),
  ],
};
