import { describe, expect, test } from "vitest";
import { render } from "@testing-library/react";

import { CardRoot } from "@src/components/CardRoot/CardRoot";

describe("CardRoot", () => {
  describe("General Tests.", () => {
    const props = {
      className: "12345",
      text: "1234",
    };

    test("It must render the component correctly.", () => {
      const { container } = render(
        <CardRoot className={props.className}>{props.text}</CardRoot>
      );

      const cardRoot = container.querySelector(".card-root") as HTMLDivElement;

      expect(cardRoot).toBeInTheDocument();
      expect(cardRoot.className.includes(props.className)).toBeTruthy();
      expect(cardRoot.textContent).toEqual(props.text);
    });
  });
});
