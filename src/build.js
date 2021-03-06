/**
 * @description 构建资源
 */

const webpack = require('webpack');
const path = require('path');
const webpackConfig = require('./webpack.build.config');

module.exports = {
  start: function (opt) {
    let compiler = webpack(webpackConfig);
    compiler.run((err, stats) => {
      if (!err) {
        console.log('\n' + stats.toString({
          hash: false,
          chunks: false,
          children: false,
          colors: true
        }));
      } else {
        console.log(chalk.red(err));
      }
    });
  }
}
