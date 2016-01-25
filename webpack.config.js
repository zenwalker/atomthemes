const _ = require('lodash');
const path = require('path');
const webpack = require('webpack');
const autoprefixer = require('autoprefixer');
const HtmlPlugin = require('html-webpack-plugin');
const TextPlugin = require('extract-text-webpack-plugin');
const dependencies = Object.keys(require(__dirname + '/package').dependencies);
const configs = {};

/**
 * Global
 */

configs.global = (dirname) => {
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
      extensions: ['', '.js', '.jsx'],
    },
    module: {
      loaders: [
        { test: /\.js$/, loaders: ['react-hot', 'babel'], exclude: /node_modules/ },
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
        inject: true,
      }),
    ],
    postcss: [
      autoprefixer(),
    ],
  };
};

/**
 * Development
 */

configs.development = () => {
  const proxy = {
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
    module: {
      loaders: [
        { test: /\.css$/, loaders: ['style', 'css', 'postcss'] },
      ],
    },
    plugins: [
      new webpack.HotModuleReplacementPlugin(),
    ],
  };
};

/**
 * Production
 */

configs.production = () => {
  return {
    debug: false,
    devtool: 'cheap-source-map',

    module: {
      loaders: [
        { test: /\.css$/, loader: TextPlugin.extract('style', 'css!postcss') },
      ],
    },
    plugins: [
      new TextPlugin('[name].css', {
        allChunks: true,
      }),
      new webpack.optimize.UglifyJsPlugin({
        compress: { warnings: false },
        output: { comments: false },
      }),
    ],
  };
};

const load = (enviroment) => {
  if (!enviroment) throw 'Can\'t find local enviroment variable via process.env.NODE_ENV';
  if (!configs[enviroment]) throw 'Can\'t find enviroments see _congigs object';

  return configs && _.mergeWith(
    configs.global(__dirname),
    configs[enviroment](__dirname),
    (a, b) => {
      if (_.isArray(a)) {
        return a.concat(b);
      }
    }
  );
};

module.exports = load(process.env.NODE_ENV);
