import { Argument, Command } from 'commander';

const command = new Command('greet');

command.addArgument(new Argument('<arg1>')).action((arg) => {
  console.log(`Hello there, ${arg}!`);
});

export default command;
