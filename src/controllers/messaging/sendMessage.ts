import axios from 'axios';
import { Signals } from '../../constants';
import { templateReplace } from '../../utils/string';

const MESSAGE_TEMPLATE = '{signal} signal received for {symbol}';

const sendTelegramMessage = (message: string) => {
  const url = `${process.env.TELEGRAM_API_BASE_URL}${process.env.TELEGRAM_BOT_API_KEY}/sendMessage?chat_id=${process.env.RECIPIENT_CHAT_ID}&text=${message}`;

  axios.get(url);
};

export default (signal: Signals, symbol: string) => {
  try {
    const message = templateReplace(MESSAGE_TEMPLATE, {
      signal,
      symbol,
    });
    sendTelegramMessage(message);
  } catch (e) {
    //
  }
};
