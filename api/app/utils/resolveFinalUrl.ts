import { https } from "follow-redirects";

export const resolveFinalUrl = (initialUrl: string): Promise<string> => {
  console.log("entrando en funcion resolveFinalUrl");
  return new Promise((resolve, reject) => {
    https
      .get(initialUrl, (res) => {
        if (res.responseUrl) {
          console.log("✅ Final URL - resolveFinalUrl:", res.responseUrl);
          resolve(res.responseUrl);
        } else {
          reject("No se pudo obtener la URL final");
        }
      })
      .on("error", (err) => {
        console.error("❌ Error:", err.message);
        reject(err);
      });
  });
};

export const waitForFinalUrl = async (
  url: string,
  retryDelayMs: number = 3000
): Promise<string> => {
  while (true) {
    try {
      console.log("🔁 Intentando obtener final URL...");
      const finalUrl = await resolveFinalUrl(url);
      console.log("✅ FINAL URL - waitForFinalUrl:", finalUrl);
      return finalUrl;
    } catch (err) {
      console.warn("⚠️ Error temporal en resolveFinalUrl:", err);
      await new Promise((res) => setTimeout(res, retryDelayMs));
    }
  }
};
