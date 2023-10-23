import express from "express";
import "dotenv/config";

import { getAccessToken, scrapeStocks } from "./controllers";

import type { Express } from "express";

const app: Express = express();
const PORT_NUMBER = 3000;

app.use((req, res, next) => {
  const startTime = new Date().getTime();

  res.on("finish", () => {
    const timeElapsed = new Date().getTime() - startTime;
    console.log(`Request took ${timeElapsed} ms`);
  });
  next();
});

app.get("/", (req, res) => {
  scrapeStocks();
  res.send("Hello World!!");
});

app.listen(PORT_NUMBER, () => {
  console.log(`Example app listening on port ${PORT_NUMBER}`);
});
