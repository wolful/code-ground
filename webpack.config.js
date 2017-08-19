var path = require('path');
var webpack = require('webpack');
var ExtractTextPlugin = require('extract-text-webpack-plugin');
var glob = require('glob');

function getFilesName(path) {
  var files = glob.sync(path);
  var entries = {};
  var key;
  files.forEach(function(item, idx) {
    key = item.substring(item.lastIndexOf('/') + 1, item.lastIndexOf("."));
    entries[key] = item;
  });
  return entries;
}

module.exports = {
  entry: getFilesName('./src/**.jsx'),
  output: {
    path: path.resolve(__dirname, "./assets/"),
    filename: "[name].js"
  },
  module: {
    rules: [
      {
        test: /\/js|jsx?$/,
        loader: 'babel-loader',
        options: {
          presets: ["es2015", "react"]
        }
      },
      {
        test: /\.css$/,
        loader: ExtractTextPlugin.extract({
          fallback: "style-loader",
          use: "css-loader"
        })
      }
    ]
  },
  plugins: [
    new ExtractTextPlugin("[name].css"),
    new webpack.optimize.CommonsChunkPlugin({
      name: 'common',
      minChunks: 2
    })
  ]
};

