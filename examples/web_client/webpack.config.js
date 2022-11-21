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
      {
        test: /\.(sass|css|scss)$/,
        use: [
          'style-loader',
          'css-loader',
          {
            loader: 'postcss-loader',
            options: {
              plugins: () => [require('autoprefixer')()],
            },
          },
          'sass-loader',
        ],
      },
      {
        test: /\.(eot|ttf|woff|woff2)$/,
        use: {
          loader: 'file-loader',
          options: {
            name: '[name].[ext]',
            publicPath: 'fonts',
            outputPath: 'fonts',
          },
        },
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
      // cacert: fs.readFileSync("./ca.crt"),
    },
    headers: {
      'Access-Control-Allow-Origin': '*',
      'Access-Control-Allow-Methods': 'GET, POST, PUT, DELETE, PATCH, OPTIONS',
      'Access-Control-Allow-Headers': 'X-Requested-With, Authorization, Content-Type, Content-Length, Content-Range',
      // 'Access-Control-Allow-Headers': 'Accept,Cache-Control,Content-Type,DNT,If-Modified-Since,Keep-Alive,Origin,User-Agent,X-Requested-With',
      // 'Access-Control-Max-Age': '1728000',
      'Access-Control-Allow-Credentials': true,
      'Access-Control-Allow-Private-Network': true,
    },
    port: 4000,
    open: {
      target: 'https://localhost:4000/',
    },
  },
};
