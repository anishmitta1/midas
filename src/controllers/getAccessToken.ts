import puppeteer from "puppeteer";
import { authenticator } from "otplib";
import crypto from "crypto";
import axios from "axios";

const kiteLoginUrl = `https://kite.zerodha.com/connect/login?v=3&api_key=${process.env.KITE_API_KEY}`;

const getRequestToken = (url: string) => {
  const urlParams = new URLSearchParams(new URL(url).search);
  return urlParams.get("request_token");
};

const getAccessToken = async () => {
  const browser = await puppeteer.launch();

  const page = await browser.newPage();

  await page.goto(kiteLoginUrl);

  const userIdInputSelector = "#userid";
  const passwordInputSelector = "#password";
  const loginButtonSelector =
    "#container > div > div > div > form > div.actions > button";

  await page.waitForSelector(userIdInputSelector);

  await page.type(userIdInputSelector, process.env.KITE_USERID!);

  await page.waitForSelector(passwordInputSelector);

  await page.type(passwordInputSelector, process.env.KITE_PASSWORD!);

  await page.waitForSelector(loginButtonSelector);

  await page.click(loginButtonSelector);

  await page.waitForNetworkIdle();

  const totpInputSelector = "#userid";

  await page.waitForSelector(totpInputSelector);

  const totp = authenticator.generate(process.env.KITE_TOTP_SECRET!);

  await page.type(totpInputSelector, totp);

  await page.waitForNavigation();

  const redirectedUrl = page.url();

  const requestToken = getRequestToken(redirectedUrl);

  await browser.close();

  if (!requestToken) {
    throw new Error("Request token not found");
  }

  const checksum = crypto
    .createHash("sha256")
    .update(
      `${process.env.KITE_API_KEY}${requestToken}${process.env.KITE_API_SECRET}`
    )
    .digest("hex");

  const url = "https://api.kite.trade/session/token";
  const headers = {
    "X-Kite-Version": "3",
  };

  const data = new URLSearchParams();

  data.append("api_key", process.env.KITE_API_KEY!);
  data.append("request_token", requestToken);
  data.append("checksum", checksum);

  const response = await axios.post(url, data, { headers });

  const accessToken = response.data.data.access_token;

  return accessToken;
};

export default getAccessToken;
