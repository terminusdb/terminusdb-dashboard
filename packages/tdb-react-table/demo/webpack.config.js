const path = require('path');
const webpack = require('webpack');
const Dotenv = require('dotenv-webpack');

module.exports = {
  mode: 'development',
  context: __dirname,

  devtool: 'source-map',
  entry: [
    './index.js',
  ],

  output: {
    path: path.resolve(__dirname, 'build'),
    filename: 'bundle.js',
  },
  devServer: {
    static: path.resolve(__dirname, 'build'),
    compress: true,
    historyApiFallback: false,
    port: 3000
  },
  plugins: [
    new webpack.LoaderOptionsPlugin({
      debug: true
    })
  ],
  resolve: {
    alias: {
      //"@terminusdb/terminusdb-react-table": path.join(__dirname, '..', 'src/index.js'),
      "@terminusdb/terminusdb-client": path.resolve('../../../terminusdb-client/index.js'),
      //react: path.resolve('./node_modules/react')
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
        test: /\.js$/,
        exclude: /node_modules/,
        use: {
          loader:"babel-loader",
          options:{
            sourceType: "unambiguous",
            presets: [
              ["@babel/preset-env"],
              "@babel/preset-react"
            ],
            plugins: [[
             "@babel/plugin-proposal-class-properties",
              {
                "loose": true
              }
            ],"@babel/plugin-transform-react-jsx",
              "@babel/plugin-proposal-export-default-from","@babel/plugin-transform-regenerator",
            ["@babel/plugin-transform-runtime"]
            ]
          }
        },
      },
      {
        test: /\.css$/,
        exclude: /node_modules/,
        use: ['style-loader', 'css-loader'],
      }]
  }
};


/*module.exports = {
  mode: 'development',
  context: __dirname,
  devtool: 'source-map',
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
      "@terminusdb/terminusdb-react-table": path.join(__dirname, '..', 'src/index.js'),
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
};*/
