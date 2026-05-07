import { startJwPlayer } from "@/helpers/startJwPlayer";

describe("startJwPlayer", () => {
  let iframe: HTMLIFrameElement;

  beforeEach(() => {
    iframe = document.createElement("iframe");
    document.body.appendChild(iframe);
  });

  afterEach(() => {
    document.body.removeChild(iframe);
  });

  describe("when the play button exists inside the iframe", () => {
    it("should click the play button", () => {
      const button = iframe.contentDocument!.createElement("button");
      button.setAttribute("aria-label", "Play");
      const mockClick = jest.fn();
      button.click = mockClick;
      iframe.contentDocument!.body.appendChild(button);

      startJwPlayer();

      expect(mockClick).toHaveBeenCalledTimes(1);
    });
  });

  describe("when the play button does not exist inside the iframe", () => {
    it("should not throw", () => {
      expect(() => {
        startJwPlayer();
      }).not.toThrow();
    });
  });

  describe("when there is no iframe in the document", () => {
    it("should not throw", () => {
      document.body.removeChild(iframe);

      expect(() => {
        startJwPlayer();
      }).not.toThrow();

      iframe = document.createElement("iframe");
      document.body.appendChild(iframe);
    });
  });
});
