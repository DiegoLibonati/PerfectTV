import { describe, expect, test } from "vitest";
import { render } from "@testing-library/react";

import { SeparatorText } from "@src/components/SeparatorText/SeparatorText";

describe("SeparatorText.tsx", () => {
  describe("General Tests.", () => {
    test("It must render the component correctly.", () => {
      const { container } = render(<SeparatorText></SeparatorText>);

      const hr = container.querySelector<HTMLHRElement>("hr");

      expect(hr).toBeInTheDocument();
    });
  });
});
