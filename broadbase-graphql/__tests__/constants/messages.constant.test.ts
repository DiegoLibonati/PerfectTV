import { MESSAGES_ERROR, MESSAGES_NOT, MESSAGES_SUCCESS } from "@/constants/messages.constant";

describe("messages.constant", () => {
  describe("MESSAGES_SUCCESS", () => {
    it("should be an empty object", () => {
      expect(MESSAGES_SUCCESS).toEqual({});
    });
  });

  describe("MESSAGES_ERROR", () => {
    it("should have generic as the expected error message", () => {
      expect(MESSAGES_ERROR.generic).toBe("[GraphQL] Something went wrong!");
    });
  });

  describe("MESSAGES_NOT", () => {
    it("should have foundRoute as the expected not found message", () => {
      expect(MESSAGES_NOT.foundRoute).toBe("[GraphQL] Route not found.");
    });
  });
});
