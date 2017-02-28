var path = require('path');
var webpack = require("webpack")

module.exports = {
    devtool: 'source-map', //for development
    entry: [
      'babel-polyfill',
      'webpack-hot-middleware/client', // WebpackDevServer host and port
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
          loaders: ['react-hot','babel-loader'],
          test: /\.js$/,
        }
      ]
    },
    plugins: [
      new webpack.HotModuleReplacementPlugin(),
      new webpack.NoErrorsPlugin(),
    ]
};
