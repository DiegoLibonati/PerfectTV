import { describe, vi, beforeEach, expect, test } from "vitest";

import { startPlayerPoster } from "@src/helpers/startPlayerPoster";

describe("startPlayerPoster.ts", () => {
  let iframe: HTMLIFrameElement;
  let iframeDocument: Document;
  let posterPlayButton: HTMLButtonElement;

  describe("General Tests", () => {
    beforeEach(() => {
      iframe = document.createElement("iframe");
      document.body.appendChild(iframe);

      iframeDocument = document.implementation.createHTMLDocument("iframe doc");

      posterPlayButton = iframeDocument.createElement("button");
      posterPlayButton.className = "player-poster";
      iframeDocument.body.appendChild(posterPlayButton);

      Object.defineProperty(iframe, "contentDocument", {
        value: iframeDocument,
        configurable: true,
      });

      vi.spyOn(posterPlayButton, "click");
      vi.spyOn(window, "focus");
    });

    test("It must start the poster player.", () => {
      startPlayerPoster();

      expect(posterPlayButton.click).toHaveBeenCalled();
      expect(window.focus).toHaveBeenCalled();
    });
  });
});
