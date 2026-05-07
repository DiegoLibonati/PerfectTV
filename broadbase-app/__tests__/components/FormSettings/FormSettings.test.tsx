import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { MemoryRouter } from "react-router-dom";

import type { RenderResult } from "@testing-library/react";

import FormSettings from "@/components/FormSettings/FormSettings";

import { ClientProvider } from "@/contexts/ClientContext/ClientProvider";

const renderComponent = (): RenderResult =>
  render(
    <MemoryRouter>
      <ClientProvider>
        <FormSettings />
      </ClientProvider>
    </MemoryRouter>
  );

beforeEach(() => {
  localStorage.clear();
  localStorage.setItem("lang", "es");
  localStorage.setItem("theme", "dark");
});

describe("FormSettings", () => {
  describe("rendering", () => {
    it("should render two select elements", () => {
      renderComponent();
      expect(screen.getAllByRole("combobox")).toHaveLength(2);
    });

    it("should render the language select with id language", () => {
      const { container } = renderComponent();
      expect(container.querySelector<HTMLSelectElement>("#language")).toBeInTheDocument();
    });

    it("should render the theme select with id theme", () => {
      const { container } = renderComponent();
      expect(container.querySelector<HTMLSelectElement>("#theme")).toBeInTheDocument();
    });

    it("should render the save button", () => {
      renderComponent();
      expect(screen.getByRole("button", { name: "Save changes" })).toBeInTheDocument();
    });

    it("should render Spanish and English as language options", () => {
      renderComponent();
      expect(screen.getByRole("option", { name: "Spanish" })).toBeInTheDocument();
      expect(screen.getByRole("option", { name: "English" })).toBeInTheDocument();
    });

    it("should render Light and Dark as theme options", () => {
      renderComponent();
      expect(screen.getByRole("option", { name: "Light" })).toBeInTheDocument();
      expect(screen.getByRole("option", { name: "Dark" })).toBeInTheDocument();
    });
  });

  describe("behavior", () => {
    it("should save language to localStorage on submit", async () => {
      const user = userEvent.setup();
      const { container } = renderComponent();
      const langSelect = container.querySelector<HTMLSelectElement>("#language")!;
      await user.selectOptions(langSelect, "en");
      await user.click(screen.getByRole("button", { name: "Save changes" }));
      expect(localStorage.getItem("lang")).toBe("en");
    });

    it("should save theme to localStorage on submit", async () => {
      const user = userEvent.setup();
      const { container } = renderComponent();
      const themeSelect = container.querySelector<HTMLSelectElement>("#theme")!;
      await user.selectOptions(themeSelect, "light");
      await user.click(screen.getByRole("button", { name: "Save changes" }));
      expect(localStorage.getItem("theme")).toBe("light");
    });
  });
});
