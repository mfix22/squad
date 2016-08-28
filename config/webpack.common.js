var webpack = require('webpack');
var helpers = require('./helpers');
var ExtractTextPlugin = require('extract-text-webpack-plugin');

var extractCSS = new ExtractTextPlugin('styles/[name].css');

const sassLoaders = [
  'css-loader',
  'sass-loader'
]

module.exports = {
  entry: {
    'app': './client-app/index.js'
  },
  resolve: {
    extensions: ['', '.js', '.jsx', '.css', '.sass', '.scss']
  },

  module: {
    loaders: [
      {
        test: /\.jsx?$/,
        loader: 'babel',
        exclude: /node_modules/,
        query: {
          cacheDirectory: true,
          presets: ['react', 'es2015']
        }
      },
      {
        test: /\.html$/,
        loader: 'html'
      },
      {
        test: /\.(png|jpe?g|gif|svg|woff|woff2|ttf|eot|ico)$/,
        loader: 'file?name=assets/[name].[hash].[ext]'
      },
      // {
      //   test: /\.scss$/,
      //   loader: ['style', 'css', 'sass']
      // },
      {
        test: /\.sass$/,
        loader: ExtractTextPlugin.extract('style-loader', sassLoaders.join('!'))
      }
    ]
  },
  // sassLoader : {
  //   includePaths: [path.resolve(__dirname, "./some-folder")]
  // }

  plugins: [
    new webpack.optimize.CommonsChunkPlugin({
      name: ['app']
    }),
    new webpack.ProvidePlugin({
       $: "jquery",
       jQuery: "jquery",
       React : 'react'
   }),
   extractCSS
  ]
};
