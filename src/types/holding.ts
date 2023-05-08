interface IStopLossEntity {
  buyPrice: number;
  stopLoss: number;
  lastTradedPrice: number;
  currentStopLoss: number;
}

interface IHolding {
  symbol: string;
  stopLoss: IStopLossEntity;
}

export type { IStopLossEntity, IHolding };
