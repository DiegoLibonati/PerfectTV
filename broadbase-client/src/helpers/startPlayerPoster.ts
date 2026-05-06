export const startPlayerPoster = (): void => {
  const iframe = document.getElementsByTagName("iframe")[0];
  const iframeDocument = iframe?.contentDocument ?? iframe?.contentWindow?.document;
  const playButton = iframeDocument?.querySelector<HTMLButtonElement>(".player-poster");

  if (!playButton) return;

  playButton.click();
  window.focus();
};
