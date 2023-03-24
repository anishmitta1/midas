#!/usr/bin/env node

import { Command } from 'commander';

const program = new Command();

program
  .version('0.0.0')
  .description('A simple CLI')
  .option('-n, --name <name>', 'Your name')
  .option('-g, --greet [greeting]', 'Greeting', 'Hello')
  .action(({ name, greet }) => {
    console.log(`${greet}, ${name}!`);
  });

program.parse(process.argv);
