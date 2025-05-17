import { describe, expect, test } from "vitest";

import { getChannelIndexByArrows } from "@src/helpers/getChannelIndexByArrows";

describe("getChannelIndexByArrows.ts", () => {
  describe("If navigating horizontally.", () => {
    test("It should return the correct index when moving right", () => {
      const key = "ArrowRight";
      const currentIndex = 2;
      const lastIndex = 4;

      const result = getChannelIndexByArrows(key, currentIndex, lastIndex);

      expect(result).toBe(3);
    });

    test("It should return index 0 when moving right past the last index", () => {
      const key = "ArrowRight";
      const currentIndex = 4;
      const lastIndex = 4;

      const result = getChannelIndexByArrows(key, currentIndex, lastIndex);

      expect(result).toBe(0);
    });

    test("It should return the correct index when moving left", () => {
      const key = "ArrowLeft";
      const currentIndex = 2;
      const lastIndex = 4;

      const result = getChannelIndexByArrows(key, currentIndex, lastIndex);

      expect(result).toBe(1);
    });

    test("It should return the last index when moving left past the first index", () => {
      const key = "ArrowLeft";
      const currentIndex = 0;
      const lastIndex = 4;

      const result = getChannelIndexByArrows(key, currentIndex, lastIndex);

      expect(result).toBe(4);
    });
  });

//   describe("If navigating vertically.", () => {
//     test("It should return the correct index when moving down within the same column", () => {
//       const key = "ArrowDown";
//       const currentIndex = 0;
//       const lastIndex = 4;
//       const idClassElements = "test-class";

//       document.body.innerHTML = `
//         <div class="test-class">Item 1</div>
//         <div class="test-class">Item 2</div>
//         <div class="test-class">Item 3</div>
//         <div class="test-class">Item 4</div>
//         <div class="test-class">Item 5</div>
//       `;

//       const result = getChannelIndexByArrows(
//         key,
//         currentIndex,
//         lastIndex,
//         idClassElements
//       );

//       expect(result).toBe(1); // Should move to the next element in the same column
//     });

//     test("It should return the correct index when moving up within the same column", () => {
//       const key = "ArrowUp";
//       const currentIndex = 1;
//       const lastIndex = 4;
//       const idClassElements = "test-class";

//       document.body.innerHTML = `
//         <div class="test-class">Item 1</div>
//         <div class="test-class">Item 2</div>
//         <div class="test-class">Item 3</div>
//         <div class="test-class">Item 4</div>
//         <div class="test-class">Item 5</div>
//       `;

//       const result = getChannelIndexByArrows(
//         key,
//         currentIndex,
//         lastIndex,
//         idClassElements
//       );

//       expect(result).toBe(0);
//     });

//     test("It should return undefined if the vertical navigation goes out of bounds", () => {
//       const key = "ArrowDown";
//       const currentIndex = 4;
//       const lastIndex = 4;
//       const idClassElements = "test-class";

//       document.body.innerHTML = `
//         <div class="test-class">Item 1</div>
//         <div class="test-class">Item 2</div>
//         <div class="test-class">Item 3</div>
//         <div class="test-class">Item 4</div>
//         <div class="test-class">Item 5</div>
//       `;

//       const result = getChannelIndexByArrows(
//         key,
//         currentIndex,
//         lastIndex,
//         idClassElements
//       );

//       expect(result).toBe(4);
//     });
//   });
});
