import { CODES_ERROR, CODES_NOT, CODES_SUCCESS } from "@/constants/codes.constant";

describe("codes.constant", () => {
  describe("CODES_SUCCESS", () => {
    it("should be an empty object", () => {
      expect(CODES_SUCCESS).toEqual({});
    });
  });

  describe("CODES_ERROR", () => {
    it("should have generic as ERROR_GENERIC", () => {
      expect(CODES_ERROR.generic).toBe("ERROR_GENERIC");
    });
  });

  describe("CODES_NOT", () => {
    it("should have foundRoute as NOT_FOUND_ROUTE", () => {
      expect(CODES_NOT.foundRoute).toBe("NOT_FOUND_ROUTE");
    });
  });
});
