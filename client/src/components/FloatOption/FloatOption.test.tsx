import { describe, expect, test, vi } from "vitest";
import { render, screen } from "@testing-library/react";
import user from "@testing-library/user-event";

import { FloatOption } from "@/src/components/FloatOption/FloatOption";

describe("FloatOption", () => {
  describe("General Tests.", () => {
    const props = {
      ariaLabel: "32",
      text: "1234",
      onClick: vi.fn(),
    };

    test("It must render the component correctly.", () => {
      render(
        <FloatOption ariaLabel={props.ariaLabel} onClick={props.onClick}>
          {props.text}
        </FloatOption>
      );

      const button = screen.getByRole("button", {
        name: new RegExp(props.ariaLabel),
      });

      expect(button).toBeInTheDocument();
      expect(button.getAttribute("aria-label")).toEqual(props.ariaLabel);
      expect(button.textContent).toEqual(props.text);
    });

    test("It must execute the relevant function when clicked.", async () => {
      render(
        <FloatOption ariaLabel={props.ariaLabel} onClick={props.onClick}>
          {props.text}
        </FloatOption>
      );

      const button = screen.getByRole("button", {
        name: new RegExp(props.ariaLabel),
      });

      await user.click(button);

      expect(props.onClick).toHaveBeenCalledTimes(1);
    });
  });
});
