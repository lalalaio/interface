const path = require('path')
const webpack = require("webpack")
const ExtractTextPlugin = require('extract-text-webpack-plugin')

module.exports = {
  entry: ['./src/main.jsx', './src/css/main.css'],
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
  plugins: [
    new webpack.optimize.UglifyJsPlugin({
      compress: { warnings: false }
    }),
    new ExtractTextPlugin("main.css"),
  ],
}
