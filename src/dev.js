/**
 * @description 调试服务
 */
const webpack = require('webpack');
const middleware = require('webpack-dev-middleware');
const express = require('express');
const getPort = require('get-port');
const chalk = require('chalk');
const app = express();
const path = require('path');
OpenBrowserPlugin = require('open-browser-webpack-plugin');

module.exports = {
  start: function (opt) {
    let compiler = webpack(require('./webpack.dev.config'));
    compiler.apply(new OpenBrowserPlugin({ url: 'http://localhost:3000' }));
    app.use(middleware(compiler, {
      logTime: true,
      logLevel: "info",
      stats: {
        hash: false,
        chunks: false,
        children: false,
        colors: true
      }
    }));
    getPort({
      port: 3000
    }).then(port => {
      console.clear();
      app.listen(port, () => console.log(chalk.green.bold(`\nThe debug service has started the listener port: ${port}\n`)))
    });
  }
}
