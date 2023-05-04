import express from 'express';
import { Signals } from '../constants';
import { messaging } from '../controllers';

import type { ISignalRequest } from '@/types/signal';

const router = express.Router();

const buySymbol = async (symbol?: string) => {
  if (!symbol) {
    console.log('Invalid input provided');
    return;
  }

  messaging.sendMessage(Signals.BUY, symbol);
};

const sellSymbol = (symbol?: string) => {
  if (!symbol) {
    console.log('Invalid input provided');
    return;
  }

  /**
   * We'll figure out the selling strategy later, after
   * experimenting with a simple moving stop loss strategy
   */
  messaging.sendMessage(Signals.SELL, symbol);
  return;
};

router.post('/tradingView', (req: ISignalRequest, res) => {
  const { signal, symbol } = req.body;

  switch (signal) {
    case Signals.BUY:
      buySymbol(symbol);
      break;
    case Signals.SELL:
      sellSymbol(symbol);
      break;
    default:
      res.sendStatus(500);
  }

  res.sendStatus(200);
});

export default router;
