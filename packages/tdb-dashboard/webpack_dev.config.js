const path = require('path')
const webpack = require('webpack')
const Dotenv = require('dotenv-webpack')
const HtmlWebPackPlugin = require("html-webpack-plugin");

module.exports = (env, argv) => ({
  mode: 'development',
  context: __dirname,
  //devtool: 'inline-source-map',
  devtool: 'source-map',
  entry: [
    './src/index.js',
  ],
  output: {
    path: path.resolve(__dirname,  'dev'),
    filename: 'bundle.js',
    publicPath: '/'
  },
  devServer: {
    compress: true,
    historyApiFallback: true,
    port: 3030
  },
  plugins: [
    new HtmlWebPackPlugin({
      inject: true,
      title: env.title ? env.title : "TerminusDB",
      template: path.resolve(__dirname, './src/index.html'),
      bundleFileName:"bundle.js"
    }),
    new Dotenv({path: path.resolve(__dirname, '.env'), systemvars: true}),
    new webpack.LoaderOptionsPlugin({
      debug: true
    })
  ],
  resolve: {
    alias: {
      "@terminusdb/terminusdb-client": path.resolve('../../../terminusdb-client/index.js'),
      "@codemirror/state": path.resolve('../../node_modules/@codemirror/state/dist/index.js'),     
      'handlebars': path.resolve('../../node_modules/handlebars/dist/handlebars.js')   
    },
    fallback: { "https": false , 
            "fs": false,
    "os": false,
    "path": false},
    extensions: [ '.js', '.jsx', '.json','.cjs'],
  },
  module: {
     rules : [
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
        test: /\.(scss)$/,
        use: [{
          loader: 'style-loader', // inject CSS to page
        }, {
          loader: 'css-loader', // translates CSS into CommonJS modules
        }, 
        {
          loader: 'postcss-loader', // Run post css actions
          options: {
            plugins: function () { // post css plugins, can be exported to postcss.config.js
              return [
                require('precss'),
                require('autoprefixer')
              ];
            }
          }
        }, {
          loader: 'sass-loader' // compiles Sass to CSS
        }]
      },
      {
        test: /\.(css)$/,
        use: [{
            loader: 'style-loader',
          },
          {
            loader: 'css-loader', // translates CSS into CommonJS modules
          },
          ]
      },
      {
        test: /\.(less)$/,
        use: [{
            loader: 'style-loader',
           },
           {
            loader: 'css-loader', // translates CSS into CommonJS modules
          },
          {
            loader: 'less-loader',
            options: {
              sourceMap: true,
            },
          },
        ],
      },
      {
        test: /\.(svg|jpg|gif|png)$/,
        use: [
          {
            loader: 'file-loader',
            options: {
              name: '[name].[ext]',
              //outputPath: "images",
              //publicPath: "images"
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
                //if(argv.mode === 'development') {
                  const relativePath = path.relative(context, resourcePath);
                  return `/${relativePath}`;
                //}
                //return `/assets/fonts/${path.basename(resourcePath)}`;
              }
            }
          }
        ]
      }
     ]
  }
})

