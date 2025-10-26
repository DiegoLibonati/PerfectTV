import { describe, expect, test } from "vitest";
import { render } from "@testing-library/react";

import { LoaderSimple } from "@src/components/LoaderSimple/LoaderSimple";

describe("LoaderSimple.tsx", () => {
  describe("General Tests.", () => {
    test("It must render the component correctly.", () => {
      const { container } = render(<LoaderSimple></LoaderSimple>);

      const loader = container.querySelector<HTMLDivElement>(".loader");

      expect(loader).toBeInTheDocument();
    });
  });
});
