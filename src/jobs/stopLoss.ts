import { portfolioService, stopLossService } from '../services';
import { db } from '../firebase';

import type { IHolding } from '../types/holding';

const updateStopLosses = async () => {
  const currentFirestoreHoldings =
    await portfolioService.getFirestoreHoldings();

  const alpacaHoldingPrices = await portfolioService.getHoldingPrices();

  if (!currentFirestoreHoldings) {
    return;
  }

  const updatedFirestoreHoldings: any = {};

  Object.keys(alpacaHoldingPrices).forEach((key) => {
    const currentHolding = currentFirestoreHoldings[key];
    const { stopLoss } = currentHolding;
    const currentPrice = alpacaHoldingPrices[key];
    const newStopLoss = stopLossService.transformStopLoss(
      stopLoss,
      currentPrice
    );

    updatedFirestoreHoldings[key] = {
      ...currentHolding,
      stopLoss: newStopLoss,
      lastUpdatedAt: new Date().toUTCString(),
      lastTradedPrice: currentPrice,
    } as IHolding;
  });

  const alpacaHoldingsRef = db.collection('holdings').doc('alpacaHoldings');
  alpacaHoldingsRef.update(updatedFirestoreHoldings);
};

export { updateStopLosses };
