import { Signals } from '../../constants';
import { templateReplace } from '../../utils/string';

const DEFAULT_MESSAGE_TEMPLATE = '{signal} indication received for {symbol}';

const sendMessage = (
  signal: Signals,
  symbol: string,
  template = DEFAULT_MESSAGE_TEMPLATE
) => {
  const message = templateReplace(template, { signal, symbol });
};

export default sendMessage;
