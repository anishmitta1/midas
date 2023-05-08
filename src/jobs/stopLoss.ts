import { portfolioService } from '../services';
import { IStopLossEntity } from '../types/holding';
import { logger } from '../instrumentation';
import { STOP_LOSS_THRESHOLD } from '../constants';

const updateStopLosses = async () => {
  logger.log('Updating the stop loss...');

  const allHoldings = await portfolioService.getAllHoldings();
};

export { updateStopLosses };
