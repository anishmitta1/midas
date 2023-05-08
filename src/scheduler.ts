import { schedule } from 'node-cron';

import { portfolioJobs, stopLossJobs } from './jobs';

const updateStopLossJob = schedule('* * * * *', stopLossJobs.updateStopLosses);

const syncPortfolioJob = schedule('* * * * *', portfolioJobs.syncPortfolio);

const allJobs = [updateStopLossJob, syncPortfolioJob];

const startJobs = () => {
  allJobs.forEach((job) => {
    job.start();
  });
};

const initialiseScheduler = () => {
  startJobs();
};

export { initialiseScheduler };
