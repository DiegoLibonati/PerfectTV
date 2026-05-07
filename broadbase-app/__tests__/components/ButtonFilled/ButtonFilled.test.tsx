import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";

import type { RenderResult } from "@testing-library/react";
import type { ButtonFilledProps } from "@/types/props";

import ButtonFilled from "@/components/ButtonFilled/ButtonFilled";

const mockOnClick = jest.fn();

const renderComponent = (props: Partial<ButtonFilledProps> = {}): RenderResult => {
  const defaultProps: ButtonFilledProps = {
    ariaLabel: "test button",
    type: "button",
    children: "Click me",
    onClick: mockOnClick,
    ...props,
  };
  return render(<ButtonFilled {...defaultProps} />);
};

describe("ButtonFilled", () => {
  describe("rendering", () => {
    it("should render a button element", () => {
      renderComponent();
      expect(screen.getByRole("button")).toBeInTheDocument();
    });

    it("should render the provided children", () => {
      renderComponent({ children: "Save" });
      expect(screen.getByRole("button")).toHaveTextContent("Save");
    });

    it("should render with the provided aria-label", () => {
      renderComponent({ ariaLabel: "close dialog" });
      expect(screen.getByRole("button", { name: "close dialog" })).toBeInTheDocument();
    });

    it("should render with type button", () => {
      renderComponent({ type: "button" });
      expect(screen.getByRole("button")).toHaveAttribute("type", "button");
    });

    it("should render with type submit", () => {
      renderComponent({ type: "submit" });
      expect(screen.getByRole("button")).toHaveAttribute("type", "submit");
    });

    it("should apply the provided className", () => {
      renderComponent({ className: "custom-class" });
      expect(screen.getByRole("button")).toHaveClass("custom-class");
    });
  });

  describe("behavior", () => {
    it("should call onClick when clicked", async () => {
      const user = userEvent.setup();
      renderComponent();
      await user.click(screen.getByRole("button"));
      expect(mockOnClick).toHaveBeenCalledTimes(1);
    });

    it("should not throw when onClick is not provided", async () => {
      const user = userEvent.setup();
      renderComponent({ onClick: undefined! });
      await expect(user.click(screen.getByRole("button"))).resolves.not.toThrow();
    });
  });

  describe("accessibility", () => {
    it("should have an accessible aria-label", () => {
      renderComponent({ ariaLabel: "submit form" });
      expect(screen.getByRole("button", { name: "submit form" })).toBeInTheDocument();
    });
  });
});
