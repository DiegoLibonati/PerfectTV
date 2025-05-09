import { https } from 'follow-redirects';

export const resolveFinalUrl = (initialUrl: string): Promise<string> => {
  return new Promise((resolve, reject) => {
    https.get(initialUrl, (res) => {
      if (res.responseUrl) {
        console.log("✅ Final URL:", res.responseUrl);
        resolve(res.responseUrl);
      } else {
        reject("No se pudo obtener la URL final");
      }
    }).on('error', (err) => {
      console.error("❌ Error:", err.message);
      reject(err);
    });
  });
};
