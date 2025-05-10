export const resolveFinalUrl = async (url: string): Promise<string> => {
  const { got } = await import("got");

  const response = await got(url, {
    followRedirect: true,
  });
  return response.url;
};
