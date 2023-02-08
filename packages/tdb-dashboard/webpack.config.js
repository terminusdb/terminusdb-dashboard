const path = require('path');
const webpack = require('webpack');
const HtmlWebPackPlugin = require("html-webpack-plugin");
const CopyWebPackPlugin= require("copy-webpack-plugin");
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const Dotenv = require('dotenv-webpack');

module.exports = (env, argv) => ({
  entry: [
    path.join(__dirname, './src/index.js'),
  ],
  output: {
    path: path.resolve(__dirname, 'dist'),
    filename: "assets/[contenthash].js",
    publicPath: '/'
  },
  devtool:argv.mode === 'production' ? false : '#inline-source-map',
  plugins: [
    new Dotenv({path: path.resolve(__dirname, '.env'), systemvars: true}),
    new HtmlWebPackPlugin({
        inject: true,
        title: env.title ? env.title : "TerminusDB",
        template: path.resolve(__dirname, './src/index.html'),
        bundleFileName:"tdb-dashboard.min.js"
      }),
     new MiniCssExtractPlugin({
      filename: 'assets/tdb-dashboard_[contenthash].main.css',
     }),
     new CopyWebPackPlugin({
      patterns: [
        { from: path.resolve(__dirname, "./src/App.css"), to: "assets/App.css", force:true },
        { from: path.resolve(__dirname, "./src/Colors.css"), to: "assets/Colors.css", force:true },
        { from: path.resolve(__dirname, "./src/assets"), to: "assets/", force:true },
        
        
      ]})


  //{ chunks:["contact", "vendor"], template: "src/pages/contact.html",  filename: "contact.html"}
   /*new HtmlWebPackPlugin({
      chunks:["bundle"],
      template: path.join(__dirname, '..' , 'console/index.html'),
      filename: 'index.html'
    }),*/
  ],
  resolve: {
    alias: {
    },
    fallback: { "https": false },
    extensions: ['.js', '.jsx', '.json'],
  },
  module: {
    rules: [
      {
        test: /\.js$/,
        exclude: /node_modules/,
        use: {
          loader:"babel-loader",
          options:{
            presets: [
              ["@babel/preset-env"],
              "@babel/preset-react"
            ],
          }
        },
      },
      {
        test: /\.(css|less)$/,
        use: [
          MiniCssExtractPlugin.loader,
          'css-loader', 'less-loader'
        ],
      },
      {
        test: /\.(svg|jpg|gif|png)$/,
        use: [
          {
            loader: 'file-loader',
            options: {
              name: 'assets/images/[name].[ext]',
            }
          }
        ]
      },
      {
        test: /\.(woff|woff2|eot|ttf|otf)$/,
        use: [
          {
            loader: 'file-loader',
            options: {
              outputPath: (url, resourcePath, context) => {
                return `assets/fonts/${path.basename(resourcePath)}`;
              }
            }
          }
        ]
      }]
    },
    /*optimization: {
      minimize: argv.mode === 'production' ? true : false,
      splitChunks: {
        cacheGroups: {
          vendor: {
            test: /node_modules/,
            chunks: "initial",
            name: "vendor",
            enforce: true
          }
        }
      }
    }*/
});
//      fallback: {"https": false},
//      extensions: ['.js', '.jsx', '.json', '.png'],
 //   },
//}
