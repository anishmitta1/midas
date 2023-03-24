import { Argument, Command } from 'commander';
import { exec } from 'child_process';

const command = new Command('gitcmp');

command.addArgument(new Argument('<message>')).action((message) => {
  exec(
    `git add -A && git commit -m "${message}" && git push`,
    (err, stdout, stderr) => {
      if (err) {
        console.log(err);
        return;
      }

      console.log('Successfully pushed to github');
    }
  );
});

export default command;
