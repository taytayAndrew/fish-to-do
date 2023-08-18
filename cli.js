#! /usr/bin/env node
const { Command } = require('commander');
const program = new Command();
const api = require('./index')
const pkg = require('./package.json')
program
  .version(pkg.version)

program
  .command('add') //这里如果是用<>得到用户传的值就只能得到第一个单词
  .description('add a task')
  .action((...args) => {
    const a = args.slice(0,-1).join(' ')
    api.add(a)
  });

program
  .command('clear') //这里如果是用<>得到用户传的值就只能得到第一个单词
  .description('clear all tasks')
  .action(() => {
    api.clear()
  });
program.parse(process.argv);
if(process.argv.length === 2 ){
  api.showAll()
}
