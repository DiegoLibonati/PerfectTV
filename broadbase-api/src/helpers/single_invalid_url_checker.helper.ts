export const singleInvalidUrlChecker = (url: string): boolean => {
  return url.startsWith("https://") || url.startsWith("http://");
};
