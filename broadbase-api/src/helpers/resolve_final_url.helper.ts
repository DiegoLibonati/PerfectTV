export const resolveFinalUrl = async (url: string): Promise<string> => {
  const response = await fetch(url, { redirect: "follow" });
  return response.url;
};
