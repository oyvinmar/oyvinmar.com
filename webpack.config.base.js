var path = require('path');
var crypto = require('crypto');
var webpack = require('webpack');
var pkg = require('./package.json');


var entry = {
  app: ['./Index.jsx'],
  cv: ['./CVIndex.jsx']
};

module.exports = options => ({
  entry: Object.assign(entry, {
    app: options.entry.app.concat(entry.app),
    cv: options.entry.cv.concat(entry.cv),
  }),

  output: Object.assign({
    path: path.resolve(pkg.config.buildDir) + '/assets',
    publicPath: '/assets/',
  }, options.output), // Merge with env dependent settings

  module: {
    rules: options.rules.concat([
      {
        test: /\.jsx?|\.js?$/,
        exclude: /node_modules/,
        loaders: ['babel-loader']
      },
      {
        test: /\.jpe?g$|\.gif$|\.png$|\.ico|\.svg$|\.woff$|\.ttf$/,
        loader: 'file-loader?name=[path][name].[ext]'
      },
      {
        test: /\.(woff|woff2)(\?v=[0-9]\.[0-9]\.[0-9])?$/, // handle font-awesome versions
        loader: 'url-loader?limit=10000&minetype=application/font-woff&name=[path]/[name]-[hash].[ext]'
      },
      {
        test: /\.(ttf|eot|svg)(\?v=[0-9]\.[0-9]\.[0-9])?$/, // handle font-awesome versions
        loader: 'file-loader?name=[path][name]-[hash].[ext]'
      },
      {
        test: /\.json$/,
        exclude: /node_modules/,
        loaders: ['json-loader']
      },
    ]),
  },
  plugins: options.plugins.concat([
    new webpack.ProvidePlugin({
      $: 'jquery',
      jQuery: 'jquery'
    }),
    new webpack.DefinePlugin({
      'process.env': {
        NODE_ENV: JSON.stringify(process.env.NODE_ENV),
      },
    }),
  ]),

  context: path.join(__dirname, 'src', 'app'),
  resolve: {
    modules: [path.resolve(__dirname, 'src'), 'node_modules'],
    extensions: [
      '.js',
      '.json',
      '.jsx',
      '.css',
      '.scss',
    ],
    mainFields: [
      'jsnext:main',
      'browser',
      'main',
    ],
  },
});
