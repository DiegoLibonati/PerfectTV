export const whichPlayerToUseBySourceCode = (sourceCode: string): boolean => {
  const useIframe = ["ftv"];
  const code = sourceCode.toLowerCase();

  if (useIframe.includes(code)) return true;
  return false;
};
