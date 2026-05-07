import { startPlayerPoster } from "@/helpers/startPlayerPoster";

describe("startPlayerPoster", () => {
  let iframe: HTMLIFrameElement;

  beforeEach(() => {
    iframe = document.createElement("iframe");
    document.body.appendChild(iframe);
  });

  afterEach(() => {
    document.body.removeChild(iframe);
  });

  describe("when the player-poster button exists inside the iframe", () => {
    it("should click the player-poster button", () => {
      const button = iframe.contentDocument!.createElement("button");
      button.className = "player-poster";
      const mockClick = jest.fn();
      button.click = mockClick;
      iframe.contentDocument!.body.appendChild(button);

      startPlayerPoster();

      expect(mockClick).toHaveBeenCalledTimes(1);
    });
  });

  describe("when the player-poster button does not exist inside the iframe", () => {
    it("should not throw", () => {
      expect(() => {
        startPlayerPoster();
      }).not.toThrow();
    });
  });

  describe("when there is no iframe in the document", () => {
    it("should not throw", () => {
      document.body.removeChild(iframe);

      expect(() => {
        startPlayerPoster();
      }).not.toThrow();

      iframe = document.createElement("iframe");
      document.body.appendChild(iframe);
    });
  });
});
