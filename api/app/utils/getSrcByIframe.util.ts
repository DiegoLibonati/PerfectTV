import puppeteer from "puppeteer";

import { config } from "@app/config/env.conf";

export const getSrcByIframe = async (url: string): Promise<string> => {
  const browser = await puppeteer.launch({
    headless: true,
    args: ["--no-sandbox", "--disable-setuid-sandbox"],
    executablePath: config.PUPPETEER_EXECUTABLE_PATH || undefined,
  });

  const page = await browser.newPage();

  await page.goto(url, { waitUntil: "networkidle2", timeout: 0 });

  // Esperar a que el iframe esté en el DOM
  const iframeElementHandle = await page.waitForSelector("iframe");

  // Obtener el iframe como un frame de Puppeteer
  const iframe = await iframeElementHandle?.contentFrame();

  // Esperar que el `src` del iframe esté definido
  await page.waitForFunction(
    (iframeSelector) => {
      const iframe = document.querySelector(
        iframeSelector
      ) as HTMLIFrameElement;
      return iframe && iframe.src && iframe.src.trim();
    },
    {}, // Opciones de espera (vacío para usar valores por defecto)
    "iframe" // Selector del iframe
  );

  // Obtener el `src` del iframe
  const iframeSrc = await page.evaluate(
    (iframeSelector) =>
      (document.querySelector(iframeSelector) as HTMLIFrameElement)!.src,
    "iframe" // Selector del iframe
  );

  await browser.close();

  return iframeSrc;
};
