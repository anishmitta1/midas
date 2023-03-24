#!/usr/bin/env ts-node

import { Command } from 'commander';
import { greetCommand, speakCommand, gitCommands } from './commands';

const program = new Command();

program
  .name('My CLI')
  .description(
    'A simple CLI designed to help with your day to day tasks and makes things quicker.'
  )
  .version('1.0.0')
  .addCommand(greetCommand)
  .addCommand(speakCommand)
  .addCommand(gitCommands.commitPushCommand)
  .addCommand(gitCommands.fixLastCommand);

program.parse(process.argv);
