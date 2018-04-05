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
const OpenBrowserPlugin = require('open-browser-webpack-plugin');

const dev = (opt) => {
  let compiler = webpack(require('./webpack.dev.config'));
  compiler.apply(new OpenBrowserPlugin({
    url: `http://localhost:${opt.port}`
  }));
  app.use(require("webpack-hot-middleware")(compiler));
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
  app.listen(opt.port, () => console.log(chalk.green.bold(`\nThe debug service has started the listener port: ${opt.port}\n`)))

}

module.exports = {
  start: function (opt) {
    getPort({
      port: 3000
    }).then(port => {
      console.clear();
      dev({
        port
      })
    });
  }
}
