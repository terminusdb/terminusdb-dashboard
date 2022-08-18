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
      "@terminusdb/terminusdb-client": path.resolve('../../../terminusdb-client/index.js')
    },
    fallback: { "https": false },
    extensions: ['.js', '.jsx', '.json'],
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

/*"@terminusdb/terminusdb-react-components": path.resolve('../../../terminusdb-react-components/src/index.js'),*/

/*const HtmlWebPackPlugin = require("html-webpack-plugin");
module.exports = (env, argv) => ({
  mode: 'development',
  entry: [
    path.join(__dirname, './index.js'),
  ],
  output: {
    path: path.resolve(__dirname, 'dist'),
    filename: "demo.min.js",
    publicPath: '/'
  },
  devtool:'source-map',
  devServer: {
    historyApiFallback: true,
  },
  plugins: [
    new HtmlWebPackPlugin({
        inject: true,
        template: path.resolve(__dirname, './index.html'),
        bundleFileName:"demo.min.js"
      })
  ],
  resolve: {
    alias: {
      "@terminusdb-live/react-worker":path.resolve('../react-worker/src/index.js'),
      "@terminusdb-live/tdb-react-group": path.join(__dirname, '..', 'src/index.js'),
      "@terminusdb-live/react-chart": path.resolve('../react-chart/src/index.js'),
      "@terminusdb-live/react-pretty-print": path.resolve('../react-pretty-print/src/index.js'),
      "@terminusdb-live/tdb-react-layout": path.resolve('../tdb-react-layout/src/index.js'),
      react: path.resolve('./node_modules/react')
    },
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
      /*{
        test: /\.(css|less)$/,
        use: [
          'style-loader',
          {
            loader: 'css-loader',
            options: {
              sourceMap: true,
            },
          }
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
      }]
    },
});*/
