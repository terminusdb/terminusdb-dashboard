const path = require('path');
const MiniCssExtractPlugin = require("mini-css-extract-plugin");
const HtmlWebPackPlugin = require("html-webpack-plugin");

module.exports = (env, argv) => ({
    plugins: [new MiniCssExtractPlugin()],
    entry: './src/index.js',
    module: {
        rules: [
            {
                test: /\.js$/,
                use:{
                    loader: "babel-loader",
                },
                include: path.resolve(__dirname, "src"),
                exclude: /node_modules/,
            },
        ]
    },
    devtool: argv.mode === 'production' ? false : '#inline-source-map',
    output: {
        path: path.resolve(__dirname, 'dist'),
        filename: 'terminusdb-react-table.min.js',
        sourceMapFilename: 'terminusdb-react-table.min.js.map',
        library: 'TerminusDBTable',
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
          test: /\.(css)$/,
          use: [
            MiniCssExtractPlugin.loader,
            'css-loader',
          ],
        },
        {
          test: /\.(less)$/,
          use: [
            MiniCssExtractPlugin.loader,
            'less-loader',
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
    externals: {
    
    react: {
      root: 'React',
      commonjs2: 'react',
      commonjs: 'react',
      amd: 'react',
    },
    'react-dom': {
      root: 'ReactDOM',
      commonjs2: 'react-dom',
      commonjs: 'react-dom',
      amd: 'react-dom'
    },
    'prop-types': {
      root: 'PropTypes',
      commonjs2: 'prop-types',
      commonjs: 'prop-types',
      amd: 'prop-types',
    }
  },
  target: 'node'
});
