import { describe, expect, test } from "vitest";
import { render } from "@testing-library/react";

import { CatSvg } from "@src/components/Svgs/CatSvg/CatSvg";

describe("CatSvg.tsx", () => {
  describe("General Tests.", () => {
    test("It must render the component correctly.", () => {
      const { container } = render(<CatSvg></CatSvg>);

      const description = container.querySelector<HTMLElement>("svg");

      expect(description).toBeInTheDocument();
    });
  });
});
