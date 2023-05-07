import cron from 'node-cron';

import { stopLossJobs } from './jobs';

const updateStopLossCron = cron.schedule(
  '* * * * *',
  stopLossJobs.updateStopLoss
);

const allJobs = [updateStopLossCron];

const startJobs = () => {
  allJobs.forEach((job) => {
    job.start();
  });
};

export { startJobs };
