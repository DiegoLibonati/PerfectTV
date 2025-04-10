import { describe, expect, test } from "vitest";
import { render } from "@testing-library/react";

import { SelectOption } from "@/src/components/SelectOption/SelectOption";

describe("SelectOption", () => {
  describe("General Tests.", () => {
    const props = {
      value: "123",
      text: "1234",
    };

    test("It must render the component correctly.", () => {
      const { container } = render(
        <SelectOption value={props.value}>{props.text}</SelectOption>
      );

      const option = container.querySelector("option") as HTMLOptionElement;

      expect(option).toBeInTheDocument();
      expect(option.value).toEqual(props.value);
      expect(option.textContent).toEqual(props.text);
    });
  });
});
