import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { MemoryRouter } from "react-router-dom";

import type { RenderResult } from "@testing-library/react";

import SideBarSettings from "@/components/SideBarSettings/SideBarSettings";

import { ClientProvider } from "@/contexts/ClientContext/ClientProvider";

const renderComponent = (): RenderResult =>
  render(
    <MemoryRouter>
      <ClientProvider>
        <SideBarSettings />
      </ClientProvider>
    </MemoryRouter>
  );

beforeEach(() => {
  localStorage.clear();
  localStorage.setItem("lang", "es");
  localStorage.setItem("theme", "dark");
});

describe("SideBarSettings", () => {
  describe("rendering when sidebar is closed", () => {
    it("should render the sidebar in closed state by default", () => {
      const { container } = renderComponent();
      const aside = container.querySelector<HTMLElement>("aside");
      expect(aside?.className).toContain("w-0");
    });
  });

  describe("rendering when sidebar is open", () => {
    it("should show the settings title when sidebar is opened via FloatOptions", async () => {
      const user = userEvent.setup();
      render(
        <MemoryRouter>
          <ClientProvider>
            <SideBarSettings />
            <button
              onClick={() => {
                document.dispatchEvent(new CustomEvent("open-settings"));
              }}
            >
              Trigger
            </button>
          </ClientProvider>
        </MemoryRouter>
      );
      const aside = screen.getAllByRole("complementary")[0];
      expect(aside).toBeInTheDocument();
      await user.click(screen.getByRole("button", { name: "Trigger" }));
    });

    it("should render the close button", () => {
      renderComponent();
      expect(screen.getByRole("button", { name: "close sidebar settings" })).toBeInTheDocument();
    });

    it("should render the settings form", () => {
      renderComponent();
      expect(screen.getByRole("button", { name: "Save changes" })).toBeInTheDocument();
    });
  });
});
