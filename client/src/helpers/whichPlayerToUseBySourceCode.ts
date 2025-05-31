export const whichPlayerToUseBySourceCode = (
  sourceCode: string
): "iframe" | "react-player" => {
  const useIframe = ["ftv", "vmfedgeapps", "youtube", "la12hd"];
  const code = sourceCode.toLowerCase();

  if (useIframe.includes(code)) return "iframe";
  return "react-player";
};
