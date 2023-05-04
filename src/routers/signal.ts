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

  console.log(`Attempting to buy ${symbol}`);
  messaging.sendMessage(Signals.BUY, '');
};

const sellSymbol = (symbol?: string) => {
  /**
   * We'll figure out the selling strategy later, after
   * experimenting with a simple moving stop loss strategy
   */
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
      res.send(500);
  }

  res.send(200);
});

export default router;
