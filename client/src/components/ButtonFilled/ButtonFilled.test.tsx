import { describe, expect, test, vi } from "vitest";
import { render, screen } from "@testing-library/react";
import user from "@testing-library/user-event";

import { ButtonFilled } from "@src/components/ButtonFilled/ButtonFilled";

describe("ButtonFillied.tsx", () => {
  describe("General Tests.", () => {
    const props = {
      ariaLabel: "32",
      type: "button",
      text: "1234",
      onClick: vi.fn(),
    };

    test("It must render the component correctly.", () => {
      render(
        <ButtonFilled ariaLabel={props.ariaLabel} type={props.type as "button"}>
          {props.text}
        </ButtonFilled>
      );

      const button = screen.getByRole("button", {
        name: new RegExp(props.ariaLabel),
      });

      expect(button).toBeInTheDocument();
      expect(button.getAttribute("aria-label")).toEqual(props.ariaLabel);
      expect(button.getAttribute("type")).toEqual(props.type);
      expect(button.textContent).toEqual(props.text);
    });

    test("It must execute the relevant function when clicked.", async () => {
      render(
        <ButtonFilled
          ariaLabel={props.ariaLabel}
          type={props.type as "button"}
          onClick={props.onClick}
        >
          {props.text}
        </ButtonFilled>
      );

      const button = screen.getByRole("button", {
        name: new RegExp(props.ariaLabel),
      });

      await user.click(button);

      expect(props.onClick).toHaveBeenCalledTimes(1);
    });
  });
});
