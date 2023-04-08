import express from 'express';
import dotenv from 'dotenv';
import bodyParser from 'body-parser';
import multer from 'multer';
import { imageRouter } from './routers';

import type { Express } from 'express';

dotenv.config();

const app: Express = express();
const PORT_NUMBER = process.env.APP_PORT_NUMBER;

const upload = multer();

app.use(bodyParser.json());

app.use(express.static('public'));

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

app.use('/image', imageRouter);

app.listen(PORT_NUMBER, () => {
  console.log(`Example app listening on port ${PORT_NUMBER}`);
});
