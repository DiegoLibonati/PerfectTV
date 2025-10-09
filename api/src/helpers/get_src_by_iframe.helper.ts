import puppeteer from "puppeteer-core";

import { envs } from "@src/configs/env.config";

import { resolveFinalUrl } from "@src/helpers/resolve_final_url.helper";

export const getSrcByIframe = async (url: string): Promise<string> => {
  const finalUrl = await resolveFinalUrl(url);

  console.log("ResolveFinalUrl: ", finalUrl);

  const browser = await puppeteer.launch({
    headless: true,
    args: [
      "--no-sandbox",
      "--disable-setuid-sandbox",
      "--single-process",
      "--disable-gpu",
    ],
    executablePath: envs.PUPPETEER_EXECUTABLE_PATH || undefined,
  });

  try {
    const page = await browser.newPage();
    await page.goto(finalUrl, { waitUntil: "networkidle2", timeout: 0 });

    const iframeElementHandle = await page.waitForSelector("iframe");
    const iframe = await iframeElementHandle?.contentFrame();

    await page.waitForFunction(
      (iframeSelector) => {
        const iframe = document.querySelector(
          iframeSelector
        ) as HTMLIFrameElement;
        return iframe && iframe.src && iframe.src.trim();
      },
      {},
      "iframe"
    );

    const iframeSrc = await page.evaluate(
      (iframeSelector) =>
        (document.querySelector(iframeSelector) as HTMLIFrameElement)!.src,
      "iframe"
    );

    return iframeSrc;
  } catch (error) {
    console.error("Error al obtener el iframe src:", error);
    throw error;
  } finally {
    await browser.close();
  }
};
