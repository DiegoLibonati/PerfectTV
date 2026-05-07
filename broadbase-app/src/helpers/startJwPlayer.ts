export const startJwPlayer = (): void => {
  const iframe = document.getElementsByTagName("iframe")[0];
  const iframeDocument = iframe?.contentDocument ?? iframe?.contentWindow?.document;
  const jwButtonPlay = iframeDocument?.querySelector<HTMLButtonElement>('[aria-label="Play"]');

  if (!jwButtonPlay) return;

  jwButtonPlay.click();
  window.focus();
};
