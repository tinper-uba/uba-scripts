/**
 * @description 入口
 */

const chalk = require('chalk');
const log = console.log;

module.exports = {
  start: function (opt) {
    let cmd = opt._[0];

    if (opt._.length == 0) {
      log(chalk.green('Help:'));
      log(chalk.green('development:   ', chalk.green.bold('uba-scripts dev')));
      log(chalk.green('production:    ', chalk.green.bold('uba-scripts build')));
      process.exit(0);
    }

    switch (cmd) {
      case 'dev':
      case 'build':
        require(`./${cmd}`).start();
      break;
      default:
      log(chalk.red('command not found'));
        break;
    }
  }
}
