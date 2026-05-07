import { getChannelIndexByArrows } from "@/helpers/getChannelIndexByArrows";

describe("getChannelIndexByArrows", () => {
  describe("ArrowRight", () => {
    it("should return the next index when not at the end", () => {
      expect(getChannelIndexByArrows("ArrowRight", 0, 4)).toBe(1);
    });

    it("should wrap to 0 when at the last index", () => {
      expect(getChannelIndexByArrows("ArrowRight", 4, 4)).toBe(0);
    });

    it("should return 1 from index 0 with lastIndex 1", () => {
      expect(getChannelIndexByArrows("ArrowRight", 0, 1)).toBe(1);
    });
  });

  describe("ArrowLeft", () => {
    it("should return the previous index when not at the start", () => {
      expect(getChannelIndexByArrows("ArrowLeft", 3, 4)).toBe(2);
    });

    it("should wrap to lastIndex when at index 0", () => {
      expect(getChannelIndexByArrows("ArrowLeft", 0, 4)).toBe(4);
    });

    it("should return 0 from index 1 with lastIndex 1", () => {
      expect(getChannelIndexByArrows("ArrowLeft", 1, 1)).toBe(0);
    });
  });

  describe("ArrowUp and ArrowDown without className", () => {
    it("should return currentIndex for ArrowDown when no className is provided", () => {
      expect(getChannelIndexByArrows("ArrowDown", 2, 5)).toBe(2);
    });

    it("should return currentIndex for ArrowUp when no className is provided", () => {
      expect(getChannelIndexByArrows("ArrowUp", 2, 5)).toBe(2);
    });

    it("should return currentIndex for ArrowDown when className is empty string", () => {
      expect(getChannelIndexByArrows("ArrowDown", 2, 5, "")).toBe(2);
    });
  });

  describe("ArrowDown and ArrowUp with className but no matching elements", () => {
    it("should return currentIndex when no elements with className exist", () => {
      expect(getChannelIndexByArrows("ArrowDown", 0, 3, "non-existent-class")).toBe(0);
    });

    it("should return currentIndex when no elements with className exist for ArrowUp", () => {
      expect(getChannelIndexByArrows("ArrowUp", 2, 3, "non-existent-class")).toBe(2);
    });
  });

  describe("edge cases", () => {
    it("should handle single element (lastIndex 0) going right", () => {
      expect(getChannelIndexByArrows("ArrowRight", 0, 0)).toBe(0);
    });

    it("should handle single element (lastIndex 0) going left", () => {
      expect(getChannelIndexByArrows("ArrowLeft", 0, 0)).toBe(0);
    });
  });
});
