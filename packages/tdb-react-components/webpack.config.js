const path = require('path');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');

module.exports = {
    mode: 'production',
    entry: {
       'tbd-react-components': path.join(__dirname, 'src/index.js'),
       'terminusdb-d3-graph': path.join(__dirname, 'src/indexGraph.js')
    },
    devtool: false,    
    output: {
        path: path.resolve(__dirname, 'dist'),
        filename: '[name].min.js',
        sourceMapFilename: '[name].min.js.map',
        library: 'TerminusDBComponents',
        libraryTarget: 'umd',
        publicPath:'/'
    },
    plugins: [
      new MiniCssExtractPlugin({
        filename: 'tbd-react-components-main.css',
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
   /* externals: {
    '@terminusdb/terminusdb-client': {
        root: 'TerminusDBClient',
        commonjs2: '@terminusdb/terminusdb-client',
        commonjs: '@terminusdb/terminusdb-client',
        amd: 'TerminusDBClient',
    },
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
  },*/
  //target: 'node'
};
