const { resolve, join } = require('path');
const webpack = require('webpack');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const ExtractTextPlugin = require('extract-text-webpack-plugin');
const WebpackCleanupPlugin = require('webpack-cleanup-plugin');

const { getIfUtils, removeEmpty } = require('webpack-config-utils');

const nodeEnv = process.env.NODE_ENV || 'development';
const { ifDevelopment, ifProduction } = getIfUtils(nodeEnv);

module.exports = {
  context: resolve(__dirname, 'demo', 'src'),

  entry: removeEmpty([
    ifDevelopment('react-hot-loader/patch'),
    // activate HMR for React

    ifDevelopment('webpack-dev-server/client?http://0.0.0.0:8080'),
    // bundle the client for webpack-dev-server
    // and connect to the provided endpoint

    ifDevelopment('webpack/hot/only-dev-server'),
    // bundle the client for hot reloading
    // only- means to only hot reload for successful updates

    './index.js'
    // the entry point of our app
  ]),

  output: {
    filename: ifProduction('[name]-bundle-[hash].js', '[name]-bundle.js'),
    // the output bundle

    path: resolve(__dirname, 'demo', 'dist'),

    publicPath: '/'
    // necessary for HMR to know where to load the hot update chunks
  },

  devtool: ifDevelopment('eval-source-map', 'source-map'),

  devServer: ifDevelopment({
    hot: true,
    // enable HMR on the server

    contentBase: resolve(__dirname, 'demo', 'dist'),
    // match the output path

    publicPath: '/',
    // match the output `publicPath`

    host: '0.0.0.0',
    disableHostCheck: true
    // possible to reach in local network
  }),

  module: {
    rules: [
      {
        test: /\.html$/,
        use: [
          'html-loader'
        ]
      },
      {
        test: /\.js?$/,
        use: [
          'babel-loader'
        ],
        exclude: /node_modules/
      },
      {
        test: /\.css$/,
        use: ifDevelopment([
          'style-loader',
          'css-loader'
        ], ExtractTextPlugin.extract({
            fallback: 'style-loader',
            use: ['css-loader']
          })
        ),
      },
      {
        test: /\.scss$/,
        use: ifDevelopment([
          'style-loader',
          'css-loader',
          'sass-loader'
        ], ExtractTextPlugin.extract({
            fallback: 'style-loader',
            use: ['css-loader', 'sass-loader']
          })
        )
      },
      {
        test: /\.(gif|png|jpe?g|svg)$/i,
        use: [
          'file-loader',
          {
            loader: 'img-loader',
            options: {
              mozjpeg: {
                progressive: true,
                arithmetic: false
              }
            }
          }
        ]
      }
    ],
  },

  plugins: removeEmpty([
    new WebpackCleanupPlugin(),

    new HtmlWebpackPlugin({
      filename: 'index.html',
      template: './index.html'
    }),

    ifDevelopment(new webpack.HotModuleReplacementPlugin()),
    // enable HMR globally

    ifDevelopment(new webpack.NamedModulesPlugin()),
    // prints more readable module names in the browser console on HMR updates

    ifProduction(new webpack.LoaderOptionsPlugin({
      minimize: true,
      quiet: true,
    })),

    ifProduction(new webpack.DefinePlugin({
      'process.env': {
        NODE_ENV: '"production"',
      },
    })),

    ifProduction(new webpack.optimize.UglifyJsPlugin({
      beautify: false,
      mangle: {
        screw_ie8: true,
        keep_fnames: true
      },
      compress: {
        screw_ie8: true
      },
      comments: false
    })),

    ifProduction(new ExtractTextPlugin('style.css'))
  ]),
};
