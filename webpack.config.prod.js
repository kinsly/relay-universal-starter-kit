var path = require('path');
var webpack = require("webpack")

module.exports = {
/*    devtool: 'source-map', //for development*/
    entry: [
      'babel-polyfill',
       path.resolve(__dirname,'src', 'client.js'),
    ],
    output: {
        filename: 'app.js',
        path: path.resolve(__dirname, 'dist'),
    },
    module: {
      loaders: [
        {
          exclude: /node_modules/,
          loaders: ['babel-loader'],
          test: /\.js$/,
        }
      ]
    },
    plugins: [
      new webpack.DefinePlugin({
        "process.env": {
          NODE_ENV: JSON.stringify("production")
          }
      }),
      new webpack.optimize.UglifyJsPlugin({
        compress: { warnings: false },
        minimize: true
      }),
      new webpack.optimize.MinChunkSizePlugin({minChunkSize: 10000}),
      new webpack.optimize.LimitChunkCountPlugin({maxChunks: 15}),
      new webpack.optimize.DedupePlugin()
      ]
};
