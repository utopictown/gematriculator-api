import type { Browser } from "puppeteer";
import type { NextApiRequest, NextApiResponse } from "next";
import chrome from "chrome-aws-lambda";
import pptr from "puppeteer";

const isDev = process.env.NODE_ENV === "development";

type TypeResult = {
  input: string;
  code: string;
  value: string;
  other_value: string[];
  source: string;
  generated_at: number;
};

const submitButtonSelector = "#left > form:nth-child(2) > input:nth-child(3)";
const inputSelector = "#input";
const codeResultSelector = "#sum";
const resultSelector = "#results";

export default async (req: NextApiRequest, res: NextApiResponse) => {
  console.log("loading..");
  let browser: Browser = null;
  let result: TypeResult = {
    input: "",
    code: "",
    value: "",
    other_value: [],
    source: "https://xeno.cx/posts/gematria.html",
    generated_at: 0,
  };

  try {
    if (!req.query.text)
      throw "Please enter text. Example: /api?text=utopictown";
    let text = req.query.text as string;
    text = text.replace("%20", " ");

    const url = "https://xeno.cx/posts/gematria.html";

    browser = await chrome.puppeteer.launch({
      args: isDev ? [] : chrome.args,
      defaultViewport: chrome.defaultViewport,
      executablePath: isDev
        ? pptr.executablePath()
        : await chrome.executablePath,
      headless: isDev ? true : chrome.headless,
      ignoreHTTPSErrors: true,
    });
    const page = await browser.newPage();

    await page.goto(url, {
      waitUntil: "load",
    });

    await page.$eval(
      inputSelector,
      function (element: HTMLInputElement, value) {
        element.value = value;
      },
      text
    );

    await page.click(submitButtonSelector);

    const codeResult = await page.evaluate((selector) => {
      const element = document.querySelector(selector);
      return element.textContent;
    }, codeResultSelector);

    const processedCodeResult = codeResult.split(" = ")[1];

    const textResult = await page.evaluate((selector) => {
      const anchor = document.querySelector(selector);
      return anchor.textContent;
    }, resultSelector);

    const processedTextResult = textResult.substring(2).split(" = ");
    const randomizedPointer = Math.floor(
      Math.random() * processedTextResult.length
    );
    result.input = text;
    result.code = processedCodeResult;
    result.value = processedTextResult[randomizedPointer];
    result.other_value = processedTextResult;
    result.generated_at = Date.now();

    res.send(result);
  } catch (error) {
    console.log(error);
    res.status(500).json({ error });
  } finally {
    console.log("finish.");
    if (browser) {
      await browser.close();
    }
  }
};
