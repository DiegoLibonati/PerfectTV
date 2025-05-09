import puppeteer from "puppeteer";

import { config } from "@app/config/env.conf";

import { resolveFinalUrl } from "@app/utils/resolveFinalUrl";

export const getSrcByIframe = async (url: string): Promise<string> => {
  const finalUrl = await resolveFinalUrl(url);
  console.log("FINAL URL: ", finalUrl)
  return "a"
  // const browser = await puppeteer.launch({
  //   headless: true,
  //   args: ["--no-sandbox", "--disable-setuid-sandbox"],
  //   executablePath: config.PUPPETEER_EXECUTABLE_PATH || undefined,
  // });

  // try {
  //   const page = await browser.newPage();
  //   const finalUrl = await resolveFinalUrl(url);

  //   await page.goto(finalUrl, { waitUntil: "networkidle2", timeout: 0 });

  //   // Esperar a que el iframe esté en el DOM
  //   const iframeElementHandle = await page.waitForSelector("iframe");

  //   // Obtener el iframe como un frame de Puppeteer
  //   const iframe = await iframeElementHandle?.contentFrame();

  //   // Esperar que el `src` del iframe esté definido
  //   await page.waitForFunction(
  //     (iframeSelector) => {
  //       const iframe = document.querySelector(
  //         iframeSelector
  //       ) as HTMLIFrameElement;
  //       return iframe && iframe.src && iframe.src.trim();
  //     },
  //     {}, // Opciones de espera (vacío para usar valores por defecto)
  //     "iframe" // Selector del iframe
  //   );

  //   // Obtener el `src` del iframe
  //   const iframeSrc = await page.evaluate(
  //     (iframeSelector) =>
  //       (document.querySelector(iframeSelector) as HTMLIFrameElement)!.src,
  //     "iframe" // Selector del iframe
  //   );

  //   return iframeSrc;
  // } catch (error) {
  //   console.error("Error al obtener el iframe src:", error);
  //   throw error;
  // } finally {
  //   await browser.close();
  // }
};
