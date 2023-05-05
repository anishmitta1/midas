import express from 'express';
import bodyParser from 'body-parser';
import * as dotenv from 'dotenv';
import { signalRouter } from './routers';
import { logger } from './instrumentation';

import type { Express } from 'express';

dotenv.config();
const app: Express = express();
const PORT_NUMBER = 8080;

app.use(bodyParser.json());

app.use((req, res, next) => {
  const startTime = new Date().getTime();

  res.on('finish', () => {
    const timeElapsed = new Date().getTime() - startTime;
    logger.log(`Request took ${timeElapsed} ms`);
  });
  next();
});

app.get('/', (_, res) => {
  res.send('Hello World!!');
});

app.get('/healthcheck', (_, res) => {
  res.sendStatus(200);
});

app.use('/signal', signalRouter);

app.listen(PORT_NUMBER, () => {
  logger.log(`Example app listening on port ${PORT_NUMBER}`);
});
