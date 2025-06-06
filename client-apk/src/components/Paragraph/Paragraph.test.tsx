import { describe, expect, test } from "vitest";
import { render, screen } from "@testing-library/react";

import { Paragraph } from "@src/components/Paragraph/Paragraph";

describe("Paragraph", () => {
  describe("General Tests.", () => {
    const props = {
      className: "12345",
      text: "1234",
    };

    test("It must render the component correctly.", () => {
      render(<Paragraph className={props.className}>{props.text}</Paragraph>);

      const description = screen.getByText(props.text);

      expect(description).toBeInTheDocument();
      expect(description.className.includes(props.className)).toBeTruthy();
      expect(description.textContent).toEqual(props.text);
    });
  });
});
