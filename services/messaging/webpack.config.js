const ForkTsCheckerWebpackPlugin = require('fork-ts-checker-webpack-plugin');
const slsw = require('serverless-webpack');
const path = require('path');

module.exports = {
  entry: slsw.lib.entries,
  mode: slsw.lib.webpack.isLocal ? 'development' : 'production',
  target: 'node',
  output: {
    filename: '[name].js',
    path: path.resolve(__dirname, '.webpack'),
  },
  resolve: {
    extensions: ['.ts', '.js',],
  },
  plugins: [
    new ForkTsCheckerWebpackPlugin()
  ],
  module: {
    rules: [
      {
        test: /\.(ts|js)x?$/,
        exclude: /node_modules/,
        use: ['babel-loader'],
      },
    ],
  }
};
