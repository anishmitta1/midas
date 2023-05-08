import { STOP_LOSS_THRESHOLD } from '../constants/StopLoss';
import axios from 'axios';
import type { IHolding } from '../types/holding';

/**
 * Accepts holdings returned by the alpaca api and
 * sanitizes them as per our standard.
 * @param position
 * @returns
 */
const toMidasHolding = (position: any): IHolding => {
  return {
    symbol: position.symbol,
    stopLoss: {
      buyPrice: Number(position.avg_entry_price),
      lastTradedPrice: Number(position.market_value),
      stopLoss: STOP_LOSS_THRESHOLD * position.avg_entry_price,
      currentStopLoss: Math.max(
        STOP_LOSS_THRESHOLD * position.market_value,
        STOP_LOSS_THRESHOLD * position.avg_entry_price
      ),
    },
  };
};

/**
 * Fetches all alpaca holdings
 * @returns `IHolding[]`
 */
const getAllHoldings = async (): Promise<IHolding[]> => {
  const positionsUrl = `${process.env.ALPACA_API_BASE_URL}/v2/positions`;
  const res = await axios({
    method: 'get',
    url: positionsUrl,
    headers: {
      'Apca-Api-Key-Id': process.env.ALPACA_API_KEY,
      'Apca-Api-Secret-Key': process.env.ALPACA_API_SECRET,
      'Content-Type': 'application/json',
    },
  });

  const positions = res.data;

  const alpacaHoldings = positions.map((position: any) =>
    toMidasHolding(position)
  );

  return alpacaHoldings;
};

const syncPortfolio = async () => {
  //
};

export { getAllHoldings, syncPortfolio };
