import type { AlpacaAssetClass, Broker } from '../constants';

interface IStopLossEntity {
  buyPrice: number;
  stopLoss: number;
  lastTradedPrice: number;
  currentStopLoss: number;
}

interface IAlpacaHolding {
  symbol: string;
  stopLoss: IStopLossEntity;
  quantity: number;
  quantityAvailable: number;
  buyPrice: number;
  lastTradedPrice: number;
  assetClass?: AlpacaAssetClass;
  broker?: Broker.ALPACA;
}

/**
 * In the future we may use different brokers, we'll keep our
 * holding entities generic so that we can extend interfaces
 * and support other brokers easily
 */
type IHolding = IAlpacaHolding;

export type { IStopLossEntity, IHolding };
