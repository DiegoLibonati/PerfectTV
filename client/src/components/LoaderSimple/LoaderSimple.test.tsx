import { describe, expect, test } from "vitest";
import { render } from "@testing-library/react";

import { LoaderSimple } from "@/src/components/LoaderSimple/LoaderSimple";

describe("LoaderSimple", () => {
  describe("General Tests.", () => {
    test("It must render the component correctly.", () => {
      const { container } = render(<LoaderSimple></LoaderSimple>);

      const loader = container.querySelector(".loader") as HTMLDivElement;

      expect(loader).toBeInTheDocument();
    });
  });
});
