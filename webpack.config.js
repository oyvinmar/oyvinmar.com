var path = require('path');
var util = require('util');
var crypto = require('crypto');
var ExtractTextPlugin = require('extract-text-webpack-plugin');
var autoprefixer = require('autoprefixer');
var webpack = require('webpack');
var pkg = require('./package.json');

var DEBUG = process.env.NODE_ENV === 'development';

process.argv.forEach(function (val) {
  if (val === '--production') {
    DEBUG = false;
    process.env.NODE_ENV = 'production';
  }
});

var contextPath = DEBUG ? '' : '';

function md5(str) {
  return crypto.createHash('md5').update(str).digest('hex');
}
var hash = md5((new Date).getTime() + '');
console.log(hash);
var cssBundle = path.join('css', util.format('[name].%s.css', hash));
var jsBundle = path.join('js', util.format('[name].%s.js', hash));

var cssExtractTextPlugin = new ExtractTextPlugin(cssBundle, {
  allChunks: true
});

var plugins = [
  new webpack.optimize.OccurenceOrderPlugin(),
  new webpack.ProvidePlugin({
    $: 'jquery',
    jQuery: 'jquery'
  }),
  cssExtractTextPlugin
];

if (DEBUG) {
  plugins.push(
    new webpack.HotModuleReplacementPlugin(),
    new webpack.NoErrorsPlugin()
  );
} else {
  plugins.push(
    new webpack.optimize.UglifyJsPlugin({
      compressor: {
        warnings: false
      }
    }),
    new webpack.optimize.DedupePlugin(),
    new webpack.DefinePlugin({
      'process.env': {
        NODE_ENV: JSON.stringify('production')
      }
    }),
    new webpack.NoErrorsPlugin()
  );
}

var loaders = [
  {
    test: /\.jsx?|\.js?$/,
    exclude: /node_modules/,
    loaders: ['babel']
  },
  {
    test: /\.css$/,
    loader: ExtractTextPlugin.extract('style-loader', 'css-loader!postcss-loader')
  },
  {
    test: /\.jpe?g$|\.gif$|\.png$|\.ico|\.svg$|\.woff$|\.ttf$/,
    loader: 'file-loader?name=[path][name]-' + hash + '.[ext]'
  },
  {
    test: /\.(woff|woff2)(\?v=[0-9]\.[0-9]\.[0-9])?$/, // handle font-awesome versions
    loader: 'url-loader?limit=10000&minetype=application/font-woff&name=fonts/[name]-[hash].[ext]'
  },
  {
    test: /\.(ttf|eot|svg)(\?v=[0-9]\.[0-9]\.[0-9])?$/, // handle font-awesome versions
    loader: 'file-loader?name=fonts/[name]-[hash].[ext]'
  },
  {
    test: /\.json$/,
    exclude: /node_modules/,
    loaders: ['json-loader']
  },
  {
    test: /\.html$/,
    loader: [
      'file-loader?name=[path][name].[ext]',
      'template-html-loader?' + [
        'raw=true',
        'engine=lodash',
        'hash=' + hash,
        'contextPath=' + contextPath,
        'title=' + pkg.name
      ].join('&')
    ].join('!')
  },
  {
    test: /\.scss$/,
    loader: cssExtractTextPlugin.extract('style-loader', [
      'css-loader?sourceMap',
      'postcss-loader',
      'sass-loader?' + [
        'sourceMap',
        'sourceMapContents=true',
        'outputStyle=expanded',
        'includePaths[]=' + path.resolve(__dirname, './app/scss'),
        'includePaths[]=' + path.resolve(__dirname, './node_modules')
      ].join('&')
    ].join('!'))
  }
];

var entry = {
  app: ['./index.jsx'],
  cv: ['./cv.js']
};

if (DEBUG) {
  entry.app.push('webpack-hot-middleware/client');
}

var config = {
  context: path.join(__dirname, 'src', 'app'),
  cache: DEBUG,
  debug: DEBUG,
  target: 'web',
  devtool: DEBUG ? 'cheap-module-eval-source-map' : false,
  entry: entry,
  output: {
    path: path.resolve(pkg.config.buildDir),
    publicPath: '/' + contextPath,
    filename: jsBundle,
    pathinfo: false
  },
  module: {
    loaders: loaders
  },
  postcss: [
    autoprefixer
  ],
  plugins: plugins,
  resolve: {
    extensions: ['', '.js', '.json', '.jsx']
  }
};

module.exports = config;
