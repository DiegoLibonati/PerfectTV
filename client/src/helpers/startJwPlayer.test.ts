import { describe, vi, beforeEach, expect } from "vitest";

import { startJwPlayer } from "@src/helpers/startJwPlayer";

describe("startJwPlayer.ts", () => {
  let iframe: HTMLIFrameElement;
  let iframeDocument: Document;
  let jwPlayButton: HTMLButtonElement;

  describe("General Tests", () => {
    beforeEach(() => {
      iframe = document.createElement("iframe");
      document.body.appendChild(iframe);

      iframeDocument = document.implementation.createHTMLDocument("iframe doc");
      jwPlayButton = iframeDocument.createElement("button");
      jwPlayButton.setAttribute("aria-label", "Play");
      iframeDocument.body.appendChild(jwPlayButton);

      Object.defineProperty(iframe, "contentDocument", {
        value: iframeDocument,
        configurable: true,
      });

      vi.spyOn(jwPlayButton, "click");
      vi.spyOn(window, "focus");
    });

    test("It must start the jw player.", () => {
      startJwPlayer();

      expect(jwPlayButton.click).toHaveBeenCalled();
      expect(window.focus).toHaveBeenCalled();
    });
  });
});
