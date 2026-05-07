import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { MemoryRouter } from "react-router-dom";

import type { RenderResult } from "@testing-library/react";

import FloatOptions from "@/components/FloatOptions/FloatOptions";

import { ClientProvider } from "@/contexts/ClientContext/ClientProvider";

const renderComponent = (children?: React.ReactNode): RenderResult =>
  render(
    <MemoryRouter>
      <ClientProvider>
        <FloatOptions>{children}</FloatOptions>
      </ClientProvider>
    </MemoryRouter>
  );

describe("FloatOptions", () => {
  describe("rendering", () => {
    it("should render the open settings button", () => {
      renderComponent();
      expect(screen.getByRole("button", { name: "open settings" })).toBeInTheDocument();
    });

    it("should render the reload page button", () => {
      renderComponent();
      expect(screen.getByRole("button", { name: "reload page" })).toBeInTheDocument();
    });

    it("should render additional children buttons", () => {
      renderComponent(<button aria-label="extra button">Extra</button>);
      expect(screen.getByRole("button", { name: "extra button" })).toBeInTheDocument();
    });

    it("should render the float-options container", () => {
      const { container } = renderComponent();
      expect(container.querySelector<HTMLDivElement>(".float-options")).toBeInTheDocument();
    });
  });

  describe("behavior", () => {
    it("should render a clickable reload page button", () => {
      renderComponent();
      const reloadBtn = screen.getByRole("button", { name: "reload page" });
      expect(reloadBtn).not.toBeDisabled();
    });

    it("should render a clickable open settings button", async () => {
      const user = userEvent.setup();
      renderComponent();
      await expect(
        user.click(screen.getByRole("button", { name: "open settings" }))
      ).resolves.not.toThrow();
    });
  });
});
