import { STOP_LOSS_THRESHOLD } from '../constants';

import type { IStopLossEntity } from '../types/holding';

const calculateStopLoss = (price: number): number =>
  Math.floor(STOP_LOSS_THRESHOLD * price);

/**
 *
 * @param stopLoss The current stop loss object
 * @param latestPrice The new trading price
 * @returns a new stop loss object which
 * factors in the new trading price.
 */
const transformStopLoss = (
  stopLoss: IStopLossEntity,
  latestPrice: number
): IStopLossEntity => {
  const { currentStopLoss } = stopLoss;
  const newStopLoss = Math.max(calculateStopLoss(latestPrice), currentStopLoss);
  return { ...stopLoss, currentStopLoss: newStopLoss };
};

export { transformStopLoss };
