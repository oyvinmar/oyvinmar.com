/**
 * DEVELOPMENT WEBPACK CONFIGURATION
 */

const path = require('path');
const fs = require('fs');
const webpack = require('webpack');
const HtmlWebpackPlugin = require('html-webpack-plugin');

function templateContent(name) {
  const html = fs.readFileSync(
    path.resolve(process.cwd(), `src/app/${name}`)
  ).toString();
  return html;
}

const plugins = [
  new HtmlWebpackPlugin({
    filename: 'index.html',
    templateContent: templateContent('index.html'),
    excludeChunks: ['cv'],
    inject: true,
  }),
  new HtmlWebpackPlugin({
    filename: 'cv.html',
    templateContent: templateContent('cv.html'),
    excludeChunks: ['app'],
    inject: true,
  }),
  new webpack.HotModuleReplacementPlugin(),
  new webpack.NoEmitOnErrorsPlugin(),
];

module.exports = require('./webpack.config.base')({
  hash: '',
  entry: {
    app: ['webpack-hot-middleware/client?path=/__webpack_hmr&timeout=20000&reload=true&quiet=true'],
    cv: ['webpack-hot-middleware/client?path=/__webpack_hmr&timeout=20000&reload=true&quiet=true'],
  },

  // Don't use hashes in dev mode for better performance
  output: {
    filename: '[name].js',
  },

  rules: [
    {
      test: /\.css$/,
      loader: ['style-loader', 'css-loader', 'postcss-loader'],
    },
    {
      test: /\.scss$/,
      loader: ['style-loader', 'css-loader', 'postcss-loader','sass-loader'],
    }
  ],

  // Add development plugins
  plugins,

  // Load files without hash in development
  // fileLoader: 'file-loader?name=[name].[ext]',

  // Emit a source map for easier debugging
  devtool: 'cheap-module-eval-source-map',
});


