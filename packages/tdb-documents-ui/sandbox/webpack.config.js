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

  /*devtool: '#inline-source-map',
  entry: [
    './index.js',
  ],*/
  output: {
    path: path.resolve(__dirname, 'build'),
    filename: 'bundle.js',
  },
  devServer: {
    static: path.resolve(__dirname, 'build'),
    compress: true,
    historyApiFallback: false,
    port: 3032
  },
  plugins: [
    new Dotenv({path: path.resolve(__dirname, '.env'), systemvars: true}),
    new webpack.LoaderOptionsPlugin({
      debug: true
    })
  ],
  resolve: {
    alias: {
      "@terminusdb/terminusdb-documents-ui": path.resolve('./src/index.js')
      //"@terminusdb/terminusdb-documents-ui": path.join(__dirname, '..', 'src/index.js'),
      //"@rjsf/core": path.resolve('../react-jsonschema-form/packages/core/src/index.js'),
      //"@rjsf/core": path.join(__dirname, '..', src, '/index.js'),
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
        //test: /\.s[ac]ss$/i, 
        test: /\.s?css$/,
        use: [
          // Creates `style` nodes from JS strings
          "style-loader",
          // Translates CSS into CommonJS
          "css-loader",
          // Compiles Sass to CSS
          "sass-loader",
        ],
      },
      /*{ 
        test: /\.css$/,
        exclude: /node_modules/,
        use: ['style-loader', 'css-loader'],
      }*/]
  }
};