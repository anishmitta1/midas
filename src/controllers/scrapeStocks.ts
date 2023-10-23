import puppeteer from "puppeteer";

const screenerUrl = "https://www.screener.in/login";

const screenerQuery2Url =
  "https://www.screener.in/screen/raw/?sort=return+over+1week&order=desc&source=&query=Return+over+1week+%3E+0+AND%0D%0AMarket+capitalization+%3E+2000%0D%0A";

const urlRegex = /\/company/;

const getRelevantAnchors = (
  anchorTags: {
    href: string;
    text: string | null;
  }[]
) => {
  return anchorTags.filter((anchor) => urlRegex.test(anchor.href)).slice(0, 5);
};

const inferSymbolFromAnchors = (
  anchorTags: {
    href: string;
    text: string | null;
  }[]
) => {
  let symbol = "";
  anchorTags.forEach((anchor) => {
    if (anchor.href.includes("https://www.nseindia.com/get-quotes")) {
      const urlObj = new URL(anchor.href);
      symbol = urlObj.searchParams.get("symbol") || "";
    }
  });

  return symbol;
};

const scrapeStocks = async () => {
  const browser = await puppeteer.launch();
  const page = await browser.newPage();

  await page.goto(screenerUrl);

  const emailIdInputSelector = "#id_username";
  const passwordInputSelector = "#id_password";
  const submitButtonSelector =
    "body > main > div.flex.flex-space-between.flex-column-tablet.flex-gap-32 > div:nth-child(2) > form > button";

  await page.waitForSelector(emailIdInputSelector);
  await page.type(emailIdInputSelector, process.env.SCREENER_USERID!);
  await page.waitForSelector(passwordInputSelector);
  await page.type(passwordInputSelector, process.env.SCREENER_PASSWORD!);
  await page.click(submitButtonSelector);

  await page.waitForNetworkIdle();

  await page.goto(screenerQuery2Url);

  await page.waitForNetworkIdle();

  const anchorTags = await page.evaluate(() => {
    const anchors = Array.from(document.querySelectorAll("a"));
    return anchors.map((anchor) => ({
      href: anchor.href,
      text: anchor.textContent,
    }));
  });

  const relevantAnchors = getRelevantAnchors(anchorTags);

  if (relevantAnchors.length === 0) {
    await page.screenshot({ path: "screenshot.png" });
    return;
  }

  const symbolsScraped = [];

  for (let i = 0; i < relevantAnchors.length; i++) {
    await page.goto(relevantAnchors[i].href);
    await page.waitForNetworkIdle();
    const pageAnchorTags = await page.evaluate(() => {
      const anchors = Array.from(document.querySelectorAll("a"));
      return anchors.map((anchor) => ({
        href: anchor.href,
        text: anchor.textContent,
      }));
    });

    const symbol = inferSymbolFromAnchors(pageAnchorTags);
    if (symbol) {
      symbolsScraped.push(symbol);
    }
  }

  console.log({ symbolsScraped });

  await browser.close();
};

export default scrapeStocks;
