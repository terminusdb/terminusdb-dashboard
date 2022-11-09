const path = require('path');

module.exports = (env, argv) => ({
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
