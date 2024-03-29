const path = require('path');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');

module.exports = {
    mode: 'production',
    entry: {
       'terminusdb-documents-ui': path.join(__dirname, 'src/index.js')
    },
    devtool: false,
    output: {
        path: path.resolve(__dirname, 'dist'),
        filename: '[name].min.js',
        sourceMapFilename: '[name].min.js.map',
        library: 'TerminusDBDocumentsUI',
        libraryTarget: 'umd',
        publicPath:'/'
    },
    plugins: [
      new MiniCssExtractPlugin({
        filename: 'terminusdb-documents-ui-main.css',
      })
    ],
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
           /* {
              test: /\.s?css$/,
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
                {
                  loader: 'sass-loader',
                  options: {
                    sourceMap: true,
                  },
                },
              ],
            },*/
            {
              test: /\.(css|less)$/,
              use: [
                MiniCssExtractPlugin.loader,
                'css-loader', 'less-loader', 'style-loader'

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
}
