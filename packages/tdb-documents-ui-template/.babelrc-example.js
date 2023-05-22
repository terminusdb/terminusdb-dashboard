const { BABEL_ENV } = process.env
const cjs = BABEL_ENV === 'commonjs'

console.log("process",cjs)

module.exports = {
  presets: [
    [
      '@babel/preset-env',
      {
        targets: {
          esmodules: true,
        },
        // Use the equivalent of `babel-preset-modules`
        bugfixes: true,
        modules: false,
        loose: true,
      },
    ],
    '@babel/preset-react',
  ],
  plugins: [
    '@babel/transform-react-jsx',
    ['@babel/plugin-proposal-class-properties', { loose: true }],
    [ "@babel/plugin-proposal-export-default-from"],
    cjs && ['@babel/transform-modules-commonjs']
  ].filter(Boolean),
  assumptions: {
    enumerableModuleMeta: true,
  },
}
