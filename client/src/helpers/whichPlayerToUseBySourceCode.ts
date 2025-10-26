import envs from "@src/constants/envs";

export const whichPlayerToUseBySourceCode = (
  sourceCode: string
): "iframe" | "react-player" => {
  const useIframe = envs.CODE_USE_IFRAME;
  const code = sourceCode.toLowerCase();

  if (useIframe.includes(code)) return "iframe";
  return "react-player";
};
