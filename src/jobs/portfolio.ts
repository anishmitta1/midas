import { logger } from '../instrumentation';
import { db } from '../firebase';
import { portfolioService, stopLossService } from '../services';

import type { IHolding } from '../types/holding';

const updateHoldingsInFirestore = async (updatedHoldings: IHolding[]) => {
  const alpacaHoldingsRef = db.collection('holdings').doc('alpacaHoldings');
  const currentFirestoreHoldings = (await alpacaHoldingsRef.get()).data();

  if (!currentFirestoreHoldings) {
    throw new Error('Got an empty firestore document');
  }

  const updatedHoldingsObject: any = {};

  updatedHoldings.forEach((updatedHolding) => {
    const currentHolding = currentFirestoreHoldings[updatedHolding.symbol];

    if (!currentHolding) {
      updatedHoldingsObject[updatedHolding.symbol] = {
        ...updatedHolding,
        lastUpdatedAt: new Date().toUTCString(),
      };
      return;
    }

    const newStopLoss = stopLossService.transformStopLoss(
      currentHolding.stopLoss,
      updatedHolding.lastTradedPrice
    );

    updatedHoldingsObject[updatedHolding.symbol] = {
      ...updatedHolding,
      stopLoss: newStopLoss,
      lastUpdatedAt: new Date().toUTCString(),
    };
  });

  alpacaHoldingsRef.update(updatedHoldingsObject);
};

const syncPortfolio = async () => {
  try {
    const alpacaHoldings = await portfolioService.getAllHoldings();
    await updateHoldingsInFirestore(alpacaHoldings);
  } catch (e) {
    logger.error(e);
    logger.error(
      '[syncPortfolio]: Something went wrong syncing portfolio to firestore'
    );
  }
};

export { syncPortfolio };
