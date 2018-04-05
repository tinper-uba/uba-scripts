/**
 * @description 调试配置
 */

const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const merge = require('webpack-merge');
const base = require('./webpack.base.config');


const config = {
  devtool: "cheap-module-eval-source-map",
  mode: 'development',
  plugins: [
    new HtmlWebpackPlugin({
      template: './src/index.html',
    })
  ]
}
module.exports = merge.smart(base, config);
