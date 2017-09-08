const path = require('path')
const webpack = require("webpack")
const ExtractTextPlugin = require('extract-text-webpack-plugin')

const plugins = [
  new ExtractTextPlugin("main.css"),
]

if (
  typeof process.env.nocompress === 'undefined' ||
  process.env.nocompress === ''
) {
  plugins.push(new webpack.optimize.UglifyJsPlugin({
    compress: { warnings: false }
  }))
}
module.exports = {
  entry: ['./src/main.jsx', './src/css/main.css'],
  resolve: {
    extensions: ['.js', '.jsx'],
  },
  module: {
    rules: [
      {
        test: /\.jsx?$/,
        exclude: /node_modules/,
        loader: 'babel-loader',
        query: {
          presets: ['es2015', 'react', 'stage-3'],
          plugins: ['transform-runtime']
        }
      },
      {
        test: /\.css$/,
        use: ExtractTextPlugin.extract({
          use: [
            {
              loader: 'css-loader',
              options: { importLoaders: 1 },
            },
            'postcss-loader',
          ],
        })
      }
    ]
  },
  externals: {
    'react': 'React',
    'react-dom': 'ReactDOM',
  },
  output: {
    filename: 'main.js',
    path: path.resolve(__dirname, 'build')
  },
  plugins: plugins
}
