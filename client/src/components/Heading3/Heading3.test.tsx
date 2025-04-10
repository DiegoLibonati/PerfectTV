import { describe, expect, test } from "vitest";
import { render, screen } from "@testing-library/react";

import { Heading3 } from "@/src/components/Heading3/Heading3";

describe("Heading3", () => {
  describe("General Tests.", () => {
    const props = {
      className: "12345",
      text: "1234",
    };

    test("It must render the component correctly.", () => {
      render(<Heading3 className={props.className}>{props.text}</Heading3>);

      const heading = screen.getByRole("heading", { name: props.text });

      expect(heading).toBeInTheDocument();
      expect(heading.className.includes(props.className)).toBeTruthy();
      expect(heading.textContent).toEqual(props.text);
    });
  });
});
