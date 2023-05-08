import express from 'express';
import { Signals } from '../constants';
import { messaging } from '../controllers';
import { logger } from '../instrumentation';

import type { ISignalRequest } from '@/types/signal';

const router = express.Router();

const buySymbol = async (symbol?: string) => {
  if (!symbol) {
    logger.warn('[signalRouter.buySymbol]: Invalid input provided');
    return;
  }

  messaging.sendMessage(Signals.BUY, symbol);
};

const sellSymbol = (symbol?: string) => {
  if (!symbol) {
    logger.warn('[signalRouter.sellSymbol]: Invalid input provided');
    return;
  }

  /**
   * We'll figure out the selling strategy later, after
   * experimenting with a simple moving stop loss strategy
   */
  messaging.sendMessage(Signals.SELL, symbol);
  return;
};

router.post('/', (req: ISignalRequest, res) => {
  const { signal, symbol } = req.body;
  logger.log(
    '[signalRouter/]: Signal recieved with payload : ',
    JSON.stringify(req.body)
  );
  try {
    switch (signal) {
      case Signals.BUY:
        buySymbol(symbol);
        break;
      case Signals.SELL:
        sellSymbol(symbol);
        break;
      default:
        throw new Error('Unknown signal');
    }
  } catch (error) {
    logger.error(error);
    logger.error(
      '[signalRouter/]: Something went wrong handling signal with payload :',
      JSON.stringify(req.body)
    );
    res.sendStatus(500);
  }

  res.sendStatus(200);
});

export default router;
