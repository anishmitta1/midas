enum AlpacaAssetClass {
  CRYPTO = 'crypto',
  US_EQUITY = 'us_equity',
}

enum Broker {
  ALPACA = 'ALPACA',
}

const alpacaSymbolMapping: { [key: string]: string } = {
  SOLUSD: 'SOL/USD',
};

export { AlpacaAssetClass, Broker, alpacaSymbolMapping };
