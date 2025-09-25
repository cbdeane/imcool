const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const { CleanWebpackPlugin } = require('clean-webpack-plugin');
const CopyWebpackPlugin = require('copy-webpack-plugin');

module.exports = {
  mode: process.env.NODE_ENV === 'production' ? 'production' : 'development',
  entry: {
    main: './src/index.js',
    portfolio: './src/portfolio.js',
    resume: './src/resume.js'
  },
  output: {
    path: path.resolve(__dirname, 'dist'),
    filename: '[name].[contenthash].js',
    assetModuleFilename: 'assets/[hash][ext][query]'
  },
  module: {
    rules: [
      {
        test: /\.css$/i,
        use: ['style-loader', 'css-loader']
      },
      {
        test: /\.(png|svg|jpg|jpeg|gif)$/i,
        type: 'asset/resource'
      },
      {
        test: /\.(woff|woff2|eot|ttf|otf)$/i,
        type: 'asset/resource'
      }
    ]
  },
  plugins: [
    new CleanWebpackPlugin(),
    new HtmlWebpackPlugin({
      template: './src/index.html',
      filename: 'index.html',
      chunks: ['main']
    }),
    new HtmlWebpackPlugin({
      template: './src/portfolio.html',
      filename: 'portfolio.html',
      chunks: ['portfolio']
    }),
    new HtmlWebpackPlugin({
      template: './src/resume.html',
      filename: 'resume.html',
      chunks: ['resume']
    }),
    new CopyWebpackPlugin({
      patterns: [
        {
          from: 'assets/images',
          to: 'assets/images'
        }
      ]
    })
  ],
  devServer: {
    static: './dist',
    open: true,
    hot: true,
    port: 3000
  },
  optimization: {
    splitChunks: {
      chunks: 'all'
    }
  },
  performance: {
    hints: 'warning',
    maxAssetSize: 100000000,
    maxEntrypointSize: 100000000
  }
};