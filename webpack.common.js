const path = require('path')
const CleanWebpackPlugin = require('clean-webpack-plugin')
const HtmlWebpackPlugin = require('html-webpack-plugin')

module.exports = env => {
  const dist = env && env.NODE_ENV ? (env.NODE_ENV === 'prd' ? 'dist' : `dist-${env.NODE_ENV}`) : 'dist'
  return {
    entry: ['@babel/polyfill', './src/index.js'],
    plugins: [
      new CleanWebpackPlugin([dist]),
      new HtmlWebpackPlugin({
        template: path.relative(__dirname, 'index.html'),
        favicon: path.relative(__dirname, './favicon.ico'),
        minify: {
          collapseWhitespace: true,
          removeComments: true
        }
      })
    ],
    resolve: {
      extensions: ['.js', '.jsx']
    },
    output: {
      filename: '[hash].[name].bundle.js',
      path: path.resolve(__dirname, dist)
    },
    module: {
      rules: [{
        test: /\.js(x)?$/,
        exclude: /node_modules/,
        loader: 'babel-loader',
        options: {
          presets: ['@babel/preset-env', '@babel/preset-react'],
          plugins: [
            '@babel/plugin-syntax-object-rest-spread',
            '@babel/plugin-transform-runtime',
            '@babel/plugin-transform-async-to-generator',
            '@babel/plugin-transform-object-assign'
          ]
        }
      }, {
        test: /\.(png|jp(e)?g|gif)$/,
        use: [
          {
            loader: 'file-loader',
            options: {
              outputPath: 'assets/img/'
            }
          }
        ]
      },
      {
        test: /\.(woff|woff2|eot|ttf|otf|svg)$/,
        use: [
          {
            loader: "file-loader",
            options: {
              outputPath: 'assets/fonts/'
            }
          }
        ]
      }]
    }
  }
}