const webpack = require('webpack')
const path = require('path')
const UglifyJsPlugin = require('uglifyjs-webpack-plugin')
const BabelPlugin = require('webpack-babel-plugin')

module.exports = {
  entry: './index.js',
  output: {
    path: path.resolve(__dirname, 'dist'),
    filename: 'webpack-bundle.js'
  },
  module: {
  },
  plugins: [
    new webpack.optimize.ModuleConcatenationPlugin(),
    // new webpack.optimize.UglifyJsPlugin({
    //   compress: {
    //     warnings: true,
    //     pure_getters: true
    //   },
    //   mangle: false,
    //   output: {
    //     beautify: true,
    //     indent_level: 2
    //   }
    // }),
    new UglifyJsPlugin({
      uglifyOptions: {
        compress: {
          warnings: true,
          pure_getters: true
        },
        mangle: false,
        output: {
          beautify: true,
          indent_level: 2
        }
      }
    }),
    new BabelPlugin({
      babelOptions: {
        compact: false
      }
    })
  ]
}
