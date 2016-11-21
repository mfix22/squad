var webpackMerge = require('webpack-merge')
var ExtractTextPlugin = require('extract-text-webpack-plugin')
var commonConfig = require('./webpack.common.js')
var helpers = require('./helpers')

module.exports = webpackMerge(commonConfig, {
  devtool: 'source-map',

  entry: {
    app: './client/index.jsx',
    index: './public/js/index.js'
  },

  output: {
    path: helpers.root('public'),
    publicPath: 'http://localhost:8080/',
    filename: 'scripts/[name].js',
    chunkFilename: 'scripts/[id].chunk.js'
  }
})
