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
      "@terminusdb-live/react-worker":path.resolve('../react-worker/src/index.js'),
      "@terminusdb-live/tdb-react-layout": path.join(__dirname, '..', 'src/index.js'),
     // "@terminusdb/terminusdb-react-chart": path.resolve('../../../terminusdb-react-chart/src/index.js'),
      react: path.resolve('./node_modules/react')
    },
    extensions: ['.js', '.jsx', '.json', '.css'],
  },
  module: {
     rules : [{
         test: /\.js$/,
         exclude: /node_modules/,
         loader: 'babel-loader',
         include: [__dirname, path.join(__dirname, '..', 'src')],
      },
      {
        test: /\.css$/,
        exclude: /node_modules/,
        use: ['style-loader', 'css-loader'],
      }]
  }
};
