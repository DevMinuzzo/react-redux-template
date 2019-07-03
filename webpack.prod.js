const webpack = require('webpack')
const merge = require('webpack-merge')
const common = require('./webpack.common')
const MinifyPlugin = require('babel-minify-webpack-plugin')
const MiniCssExtractPlugin = require("mini-css-extract-plugin")
const OptimizeCSSAssetsPlugin = require("optimize-css-assets-webpack-plugin")

module.exports = env => {
  console.log('NODE_ENV: ', env.NODE_ENV);
  return merge(common(env), {
    mode: 'production',
    optimization: {
      minimizer: [
        new OptimizeCSSAssetsPlugin({})
      ]
    },
    plugins: [
      new MinifyPlugin({
        removeConsole: true
      }, {
          test: /\.js(x)?$/i,
          exclude: /node_modules/
        }),
      new webpack.DefinePlugin({
        'process.env.NODE_ENV': JSON.stringify('prd')
      }),
      new MiniCssExtractPlugin({
        filename: "[hash].[name].css"
      })
    ],
    module: {
      rules: [{
        test: /\.(s)?css$/,
        use: [
          MiniCssExtractPlugin.loader,
          "css-loader",
          "resolve-url-loader",
          "sass-loader?sourceMap"
        ]
      }]
    }
  })
}