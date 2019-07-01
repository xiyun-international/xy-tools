#!/usr/bin/env node

const chalk = require("chalk");
const assert = require("assert");
const signale = require("signale");
const yParser = require("yargs-parser");
const args = yParser(process.argv.slice(2));

if (args.v || args.version) {
  console.log(require("./package").version);
  process.exit(0);
}
// https://www.npmjs.com/package/update-notifier
const updater = require("update-notifier");
const pkg = require("../package.json");
updater({ pkg }).notify({ defer: true });

const cwd = process.cwd();

switch (args._[0]) {
  case "build":
    build();
    break;
  case "docs":
    docs();
    break;
  case "test":
    test();
    break;
  case undefined:
    help();
    break;
  default:
    console.error(chalk.red(`Unsupported command ${args._[0]}`));
    process.exit(1);
}

async function build() {
  const cmd = args._[1];
  assert.ok(["theme", "component", "typescript"].includes(cmd), `Invalid subCommand ${cmd}`);

  require("../lib/build")
    .default({
      cwd,
      cmd,
      args,
    })
    .catch(e => {
      signale.error(e);
      process.exit(1);
    });
}

async function docs() {
  const cmd = args._[1];
  assert.ok(["dev", "build"].includes(cmd), `Invalid subCommand ${cmd}`);

  require("../lib/docs")
    .default({
      cwd,
      cmd,
    })
    .catch(e => {
      signale.error(e);
      process.exit(1);
    });
}

function help() {
  console.log(`
  Usage: xy-tools <command> [options]
  Commands:
    ${chalk.green("build theme")}       build theme
    ${chalk.green("build component")}   build component
  `);
}

async function test() {
  const cmd = yParser(process.argv.slice(3));
  require("../lib/jest")
    .default({
      cwd,
      cmd,
    })
    .catch(e => {
      signale.error(e);
      process.exit(1);
    });
}
