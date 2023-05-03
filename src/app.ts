import express from 'express';
import { signalRouter } from './routers';
import bodyParser from 'body-parser';

import type { Express } from 'express';

const app: Express = express();
const PORT_NUMBER = 3000;

app.use(bodyParser.json());

app.use((req, res, next) => {
  const startTime = new Date().getTime();

  res.on('finish', () => {
    const timeElapsed = new Date().getTime() - startTime;
    console.log(`Request took ${timeElapsed} ms`);
  });
  next();
});

app.get('/', (req, res) => {
  res.send('Hello World!!');
});

app.use('/signal', signalRouter);

app.listen(PORT_NUMBER, () => {
  console.log(`Example app listening on port ${PORT_NUMBER}`);
});
