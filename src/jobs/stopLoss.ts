import { portfolioService } from '../services';
import { IStopLossEntity } from '../types/holding';
import { logger } from '../instrumentation';

const STOP_LOSS_THRESHOLD = 0.98;

const calculateStopLoss = (price: number): number =>
  Math.floor(STOP_LOSS_THRESHOLD * price);

const transformStopLoss = (
  stopLoss: IStopLossEntity,
  latestPrice: number
): IStopLossEntity => {
  const { currentStopLoss } = stopLoss;
  const newStopLoss = Math.max(calculateStopLoss(latestPrice), currentStopLoss);
  return { ...stopLoss, currentStopLoss: newStopLoss };
};

const updateStopLosses = async () => {
  logger.log('Updating the stop loss...');

  const allHoldings = await portfolioService.getAllHoldings();
};

export { updateStopLosses };
