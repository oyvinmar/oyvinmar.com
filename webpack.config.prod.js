/**
 * PRODUCTION WEBPACK CONFIGURATION
 */

const webpack = require('webpack');
const ExtractTextPlugin = require('extract-text-webpack-plugin');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const BundleAnalyzerPlugin = require('webpack-bundle-analyzer').BundleAnalyzerPlugin;

module.exports = require('./webpack.config.base')({
  // In production, we skip all hot-reloading stuff
  entry: {
    app: [],
    cv: [],
  },

  // Utilize long-term caching by adding content hashes (not compilation hashes) to compiled assets
  output: {
    filename: '[name].[chunkhash].js',
  },

  rules: [
    {
      test: /\.scss$/,
      loader: ExtractTextPlugin.extract(
        {
          fallback: 'style-loader',
          use: ['css-loader', 'postcss-loader', 'sass-loader']
        })
    },
  ],

  // Use hashes in prod to anbale caching
  fileLoader: 'file-loader?name=[name]-[hash].[ext]',

  plugins: [
    // Minify and optimize the JavaScript
    new webpack.optimize.UglifyJsPlugin({
      compress: {
        warnings: false, // ...but do not show warnings in the console (there is a lot of them)
        screw_ie8: true, // drop IE 6-8 specific optimizations
      },
    }),
    // new BundleAnalyzerPlugin(
    //   {
    //     analyzerMode: 'static',
    //     openAnalyzer: false,
    //     reportFilename: 'bundle-analyzer-report.html',
    //   }),
    // new ManifestPlugin({ fileName: 'assets.json' }),
    new HtmlWebpackPlugin({
      template: 'index.html',
      filename: 'index.html',
      excludeChunks: ['cv'],
      inject: true,
    }),
    new HtmlWebpackPlugin({
      template: 'cv.html',
      filename: 'cv.html',
      excludeChunks: ['app'],
      inject: true,
    }),
    new BundleAnalyzerPlugin(
      {
        analyzerMode: 'static',
        openAnalyzer: false,
        reportFilename: 'bundle-analyzer-report.html',
      }),

    // Extract the CSS into a separate file
    new ExtractTextPlugin('[name].[contenthash].css'),
  ],
});
