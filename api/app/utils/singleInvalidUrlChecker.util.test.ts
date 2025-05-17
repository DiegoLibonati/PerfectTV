import { singleInvalidUrlChecker } from "@app/utils/singleInvalidUrlChecker.util";

describe("singleInvalidUrlChecker.util.ts", () => {
  describe("If url is valid.", () => {
    const url = "https://hola.com";

    test("It must return true.", () => {
      const urlValid = singleInvalidUrlChecker(url);

      expect(urlValid).toBeTruthy();
    });
  });

  describe("If url is invalid.", () => {
    const url = "http://hola.com";

    test("It must return false.", () => {
      const urlValid = singleInvalidUrlChecker(url);

      expect(urlValid).toBeFalsy();
    });
  });
});
