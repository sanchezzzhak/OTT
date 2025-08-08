#!/usr/bin/env node
require('dotenv').config({ path: __dirname + '/.env' });

const fs = require('node:fs');
const { Command } = require('commander');

const program = new Command();

fs.readdirSync(__dirname + '/commands', {
  withFileTypes: true
}).forEach((file) => {

  const {
    action,
    name,
    description,
    version,
    opts,
    args
  } = require(`${file.path}/${file.name}`);

  const task = program
    .command(name)
    .description(description)
    .version(version ?? '');

  opts.forEach(opt => {
    task.addOption(opt);
  });
  args.forEach(arg => {
    task.addArgument(arg);
  });
  task.action(action);
});

program.parse();
