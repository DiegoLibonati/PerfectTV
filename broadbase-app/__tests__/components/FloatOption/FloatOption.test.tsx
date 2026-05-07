import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";

import type { RenderResult } from "@testing-library/react";
import type { FloatOptionProps } from "@/types/props";

import FloatOption from "@/components/FloatOption/FloatOption";

import { ClientProvider } from "@/contexts/ClientContext/ClientProvider";

const mockOnClick = jest.fn();

const renderComponent = (props: Partial<FloatOptionProps> = {}): RenderResult => {
  const defaultProps: FloatOptionProps = {
    ariaLabel: "test option",
    onClick: mockOnClick,
    children: "Option",
    ...props,
  };
  return render(
    <ClientProvider>
      <FloatOption {...defaultProps} />
    </ClientProvider>
  );
};

describe("FloatOption", () => {
  describe("rendering", () => {
    it("should render a button with the provided aria-label", () => {
      renderComponent({ ariaLabel: "reload page" });
      expect(screen.getByRole("button", { name: "reload page" })).toBeInTheDocument();
    });

    it("should render the provided children", () => {
      renderComponent({ children: "Go" });
      expect(screen.getByRole("button", { name: "test option" })).toBeInTheDocument();
    });
  });

  describe("behavior", () => {
    it("should call onClick when clicked", async () => {
      const user = userEvent.setup();
      renderComponent();
      await user.click(screen.getByRole("button", { name: "test option" }));
      expect(mockOnClick).toHaveBeenCalledTimes(1);
    });
  });
});
