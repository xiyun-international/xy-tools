#!/usr/bin/env node

const chalk = require('chalk');
const assert = require('assert');
const signale = require('signale');
const yParser = require('yargs-parser');
const args = yParser(process.argv.slice(2));

if (args.v || args.version) {
  console.log(require('./package').version);
  process.exit(0);
}

// https://www.npmjs.com/package/update-notifier
const updater = require('update-notifier');
const pkg = require('../package.json');
updater({ pkg }).notify({ defer: true });

// 检测类型
const cwd = process.cwd();

switch (args._[0]) {
  case "build":
    build()
    break;
  case undefined:
    help();
    break;
  default:
    console.error(chalk.red(`Unsupported command ${args._[0]}`));
    process.exit(1);


  // case 'theme':
  //   require('../lib/gulp').default({
  //     cwd,
  //   }).catch(e => {
  //     signale.error(e);
  //     process.exit(1);
  //   });
  //   break;
  // case 'component':
  //   require('../lib/components').default({
  //     cwd,
  //   }).catch(e => {
  //     signale.error(e);
  //     process.exit(1);
  //   });
  //   break;
  // default:
  //   signale.error(chalk.red(`Unsupported command ${args._[0]}`))
  //   break;
}

async function build() {
  const cmd = args._[1];
  assert.ok(
    ['theme', 'component'].includes(cmd),
    `Invalid subCommand ${cmd}`,
  );

  require('../lib/build').default({
    cwd,
    cmd,
  }).catch(e => {
    signale.error(e);
    process.exit(1);
  });
}

function help() {
  console.log(`
  Usage: xy-tools <command> [options]
  Commands:
    ${chalk.green('build theme')}       build theme
    ${chalk.green('build component')}   build component
  `);
}
