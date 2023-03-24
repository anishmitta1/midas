import { exec } from 'child_process';
import { Command } from 'commander';

const command = new Command('gitfxl');

command.action(() => {
  exec(`
    MESSAGE=$(git log -1 --pretty=%B)
    git reset --soft HEAD~1
    git add -A
    git commit -m "$MESSAGE"
    git push --force
  `);
});

export default command;
