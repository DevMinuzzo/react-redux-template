const path = require('path')
const webpack = require('webpack')
const merge = require('webpack-merge')
const common = require('./webpack.common')
const FriendlyErrorsWebpackPlugin = require('friendly-errors-webpack-plugin')

module.exports = env => {
  console.log('NODE_ENV: ', env.NODE_ENV);
  return merge(common(env), {
    mode: 'development',
    devtool: 'inline-source-map',
    devServer: {
      inline: true,
      contentBase: path.resolve(__dirname, `dist-${env.NODE_ENV}`)
    },
    plugins: [
      new FriendlyErrorsWebpackPlugin(),
      new webpack.DefinePlugin({
        'process.env.NODE_ENV': JSON.stringify(env.NODE_ENV)
      })
    ],
    module: {
      rules: [{
        test: /\.(s)?css$/,
        use: [
          "style-loader",
          "css-loader",
          "resolve-url-loader",
          "sass-loader?sourceMap"
        ]
      }]
    }
  })
}