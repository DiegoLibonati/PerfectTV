export const startPlayerPoster = () => {
  const iframe = document.getElementsByTagName("iframe")[0];
  const iframeDocument =
    iframe?.contentDocument || iframe?.contentWindow?.document;
  const playButton =
    iframeDocument!.querySelector<HTMLButtonElement>(".player-poster");
  playButton!.click();
  window.focus();
};
