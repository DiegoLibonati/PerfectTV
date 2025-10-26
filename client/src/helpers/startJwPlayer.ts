export const startJwPlayer = () => {
  const iframe = document.getElementsByTagName("iframe")[0];
  const iframeDocument =
    iframe?.contentDocument || iframe?.contentWindow?.document;
  const jwButtonPlay = iframeDocument!.querySelector<HTMLButtonElement>(
    '[aria-label="Play"]'
  );
  jwButtonPlay!.click();
  window.focus();
};
