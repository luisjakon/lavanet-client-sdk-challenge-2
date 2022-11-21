const webpack = require('webpack');
const path = require('path');
const fs = require('fs');

module.exports = {
  // NOTE: Reuse same codebase as the api_client example as the entrypoint for demo purposes...
  entry: '../api_client/main.ts',
  mode: 'development',
  devtool: 'inline-source-map',
  module: {
    rules: [
      {
        test: /\.ts?$/,
        use: 'ts-loader',
        exclude: /node_modules/,
      },
    ],
  },
  resolve: {
    extensions: ['.tsx', '.ts', '.js', '.css'],
    fallback: {
      path: require.resolve('path-browserify'),
      stream: require.resolve('stream-browserify'),
      crypto: require.resolve('crypto-browserify'),
    },
  },
  output: {
    filename: 'bundle.js',
    path: path.resolve(__dirname, 'dist'),
  },
  plugins: [
    new webpack.ProvidePlugin({
      Buffer: ['buffer', 'Buffer'],
    }),
  ],
  devServer: {
    static: path.join(__dirname, 'dist'),
    compress: true,
    https: {
      key: fs.readFileSync('./ec_key.pem'),
      cert: fs.readFileSync('./ec_crt.pem'),
    },
    headers: {
      'Access-Control-Allow-Origin': '*',
      'Access-Control-Allow-Methods': 'GET, POST, PUT, DELETE, PATCH, OPTIONS',
      'Access-Control-Allow-Headers': 'X-Requested-With, Authorization, Content-Type, Content-Length, Content-Range',
      'Access-Control-Allow-Credentials': true,
      'Access-Control-Allow-Private-Network': true,
    },
    port: 4000,
    open: {
      target: 'https://localhost:4000/',
    },
  },
};
