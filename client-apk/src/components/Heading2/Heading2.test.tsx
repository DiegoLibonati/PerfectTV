import { describe, expect, test } from "vitest";
import { render, screen } from "@testing-library/react";

import { Heading2 } from "@src/components/Heading2/Heading2";

describe("Heading2", () => {
  describe("General Tests.", () => {
    const props = {
      className: "12345",
      text: "1234",
    };

    test("It must render the component correctly.", () => {
      render(<Heading2 className={props.className}>{props.text}</Heading2>);

      const heading = screen.getByRole("heading", { name: props.text });

      expect(heading).toBeInTheDocument();
      expect(heading.className.includes(props.className)).toBeTruthy();
      expect(heading.textContent).toEqual(props.text);
    });
  });
});
