var _ = require('lodash');
var path = require('path');
var webpack = require('webpack');
var extend = require('util')._extend;
var autoprefixer = require('autoprefixer');
var HtmlPlugin = require('html-webpack-plugin');
var TextPlugin = require('extract-text-webpack-plugin');
var dependencies = Object.keys(require(__dirname + '/package').dependencies);
var configs = {};

/**
 * Global
 */

configs.global = function(dirname) {
  return {
    context: dirname,
    entry: {
      vendor: dependencies,
      app: 'webapp',
    },
    output: {
      path: path.join(dirname, 'public'),
      filename: '[name].js',
    },
    resolve: {
      root: dirname,
      extensions: ['', '.js', '.jsx']
    },
    module: {
      loaders: [
        { test: /\.js$/, loaders: ['react-hot', 'babel'], exclude: /node_modules/ },
        { test: /\.css$/, loaders: ['style', 'css', 'postcss'] },
        { test: /\.(jpg|png|woff)$/, loader: 'url?limit=10000' },
        { test: /\.json$/, loader: 'json' },
      ],
    },
    plugins: [
      new webpack.optimize.CommonsChunkPlugin('vendor', 'vendor.js'),
      new webpack.NoErrorsPlugin(),
      new webpack.DefinePlugin({
        'process.env': {
          'NODE_ENV': JSON.stringify(process.env.NODE_ENV),
        },
      }),
      new HtmlPlugin({
        template: path.join(dirname, 'webapp', 'index.html'),
        chunks: ['app', 'vendor'],
        filename: 'index.html',
        inject: true
      }),
    ],
    postcss: [
      autoprefixer()
    ],
  };
};

/**
 * Development
 */

configs.development = function(dirname) {
  var webpack = require('webpack');

  var proxy = {
    local: {
      '/api/*': {
        target: 'http://localhost:8000',
      },
    },
  };

  return {
    devServer: {
      historyApiFallback: true,
      proxy: proxy.local,
      inline: true,
      info: true,
    },
    plugins: [
      new webpack.HotModuleReplacementPlugin(),
    ]
  };
};

/**
 * Production
 */

configs.production = function(dirname) {
  return {
    debug: false,
    devtool: 'cheap-source-map',

    module: {
      loaders: [
        { test: /\.css$/, loader: TextPlugin.extract('style', 'css!postcss') },
      ]
    },
    plugins: [
      new TextPlugin('[name].css', {
        allChunks: true
      }),
      new webpack.optimize.UglifyJsPlugin({
        compress: { warnings: false },
        output: { comments: false }
      }),
    ],
  };
};

var load = function(enviroment) {
  if (!enviroment) throw 'Can\'t find local enviroment variable via process.env.NODE_ENV';
  if (!configs[enviroment]) throw 'Can\'t find enviroments see _congigs object';

  return configs && _.merge(
    configs['global'](__dirname),
    configs[enviroment](__dirname)
  );
}

module.exports = load(process.env.NODE_ENV);
console.log(module.exports.module.loaders);
