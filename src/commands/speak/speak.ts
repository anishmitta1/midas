import { Command } from 'commander';

const command = new Command('speak');

command.action(() => {
  console.log(`I'm awkward, I dont know what to talk about.`);
});

export default command;
