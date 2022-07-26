const path = require('path');
const webpack = require('webpack');
const Dotenv = require('dotenv-webpack');

module.exports = {
  mode: 'development',
  context: __dirname,
  devtool: '#inline-source-map',
  entry: [
    './index.js',
  ],
  output: {
    path: path.resolve(__dirname, 'build'),
    filename: 'bundle.js',
  },
  plugins: [
    new webpack.LoaderOptionsPlugin({
      debug: true
    }),
    new Dotenv({path: path.resolve(__dirname, './.env'),})
  ],
  resolve: {
    alias: {
      "@terminusdb-live/tdb-react-components": path.join(__dirname, '..', 'src/index.js'),
      "@terminusdb/terminusdb-client": path.resolve('../../../terminusdb-client/index.js'), 
      "@terminusdb-live/tdb-react-layout": path.resolve('../tdb-react-layout/src/index.js')
    },
    extensions: ['.js', '.jsx', '.json'],
  },
  module: {
     rules : [
     {
         test: /\.js$/,
         exclude: /node_modules/,
         loader: 'babel-loader',
         include: [__dirname, path.join(__dirname, '..', 'src')],
      },
      {
        test: /\.(css|less)$/,
        use: [
          'style-loader',
          {
            loader: 'css-loader',
            options: {
              sourceMap: true,
            },
          },
          {
            loader: 'less-loader',
            options: {
              sourceMap: true,
            },
          },
        ],
      }]
  }
};
