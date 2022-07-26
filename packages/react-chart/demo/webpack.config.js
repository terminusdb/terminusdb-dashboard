const path = require('path');
const webpack = require('webpack');

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
    })
  ],
  resolve: {
    alias: {
      "@terminusdb/terminusdb-react-chart": path.join(__dirname, '..', 'src/index.js'),
       "@terminusdb/terminusdb-client": path.resolve('../terminusdb-client/index.js')
    },
    extensions: ['.js', '.jsx', '.json'],
  },
  module: {
     rules : [{
         test: /\.js$/,
         exclude: /node_modules/,
         loader: 'babel-loader',
         include: [__dirname, path.join(__dirname, '..', 'src')],
      }]
  }
};
