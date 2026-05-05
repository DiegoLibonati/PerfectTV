import puppeteer from "puppeteer-core";

import { envs } from "@/configs/env.config";

import { resolveFinalUrl } from "@/helpers/resolve_final_url.helper";

export const getSrcByIframe = async (url: string): Promise<string> => {
  const finalUrl = await resolveFinalUrl(url);

  const browser = await puppeteer.launch({
    headless: true,
    args: ["--no-sandbox", "--disable-setuid-sandbox", "--single-process", "--disable-gpu"],
    ...(envs.PUPPETEER_EXECUTABLE_PATH ? { executablePath: envs.PUPPETEER_EXECUTABLE_PATH } : {}),
  });

  try {
    const page = await browser.newPage();
    await page.goto(finalUrl, { waitUntil: "networkidle2", timeout: 0 });

    await page.waitForSelector("iframe");
    await page.waitForFunction(
      "document.querySelector('iframe') && !!document.querySelector('iframe').src?.trim()"
    );

    return (await page.evaluate("document.querySelector('iframe').src")) as string;
  } finally {
    await browser.close();
  }
};
