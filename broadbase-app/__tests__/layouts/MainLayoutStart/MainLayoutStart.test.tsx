import { render, screen } from "@testing-library/react";

import type { RenderResult } from "@testing-library/react";

import MainLayoutStart from "@/layouts/MainLayoutStart/MainLayoutStart";

import { ClientProvider } from "@/contexts/ClientContext/ClientProvider";

const renderComponent = (className?: string): RenderResult =>
  render(
    <ClientProvider>
      <MainLayoutStart className={className!}>Layout content</MainLayoutStart>
    </ClientProvider>
  );

describe("MainLayoutStart", () => {
  describe("rendering", () => {
    it("should render as a main element", () => {
      renderComponent();
      expect(screen.getByRole("main")).toBeInTheDocument();
    });

    it("should render the provided children", () => {
      renderComponent();
      expect(screen.getByText("Layout content")).toBeInTheDocument();
    });

    it("should apply the provided className", () => {
      renderComponent("flex-col gap-6");
      expect(screen.getByRole("main")).toHaveClass("flex-col");
      expect(screen.getByRole("main")).toHaveClass("gap-6");
    });

    it("should include flexbox start alignment classes", () => {
      renderComponent();
      const main = screen.getByRole("main");
      expect(main).toHaveClass("flex");
      expect(main).toHaveClass("items-start");
      expect(main).toHaveClass("justify-start");
    });
  });

  describe("theme integration", () => {
    it("should apply dark background class by default", () => {
      renderComponent();
      expect(screen.getByRole("main")).toHaveClass("bg-black");
    });

    it("should apply light background class when theme is light", () => {
      render(
        <ClientProvider defaultTheme="light">
          <MainLayoutStart>content</MainLayoutStart>
        </ClientProvider>
      );
      expect(screen.getByRole("main")).toHaveClass("bg-white");
    });
  });
});
