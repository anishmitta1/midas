import { logger } from '../instrumentation';
import { db } from '../firebase';
import { portfolioService } from '../services';

import type { IHolding } from '../types/holding';

const updateHoldingsInFirestore = async (holdings: IHolding[]) => {
  const alpacaHoldingsRef = db.collection('holdings').doc('alpacaHoldings');
  const holdingsObject: any = {};
  holdings.forEach((holding) => {
    holdingsObject[holding.symbol] = holding;
  });
  alpacaHoldingsRef.update(holdingsObject);
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
