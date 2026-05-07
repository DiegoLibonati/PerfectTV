import { render, screen } from "@testing-library/react";

import type { RenderResult } from "@testing-library/react";

import MainLayoutCenter from "@/layouts/MainLayoutCenter/MainLayoutCenter";

import { ClientProvider } from "@/contexts/ClientContext/ClientProvider";

const renderComponent = (className?: string): RenderResult =>
  render(
    <ClientProvider>
      <MainLayoutCenter className={className!}>Test content</MainLayoutCenter>
    </ClientProvider>
  );

describe("MainLayoutCenter", () => {
  describe("rendering", () => {
    it("should render as a main element", () => {
      renderComponent();
      expect(screen.getByRole("main")).toBeInTheDocument();
    });

    it("should render the provided children", () => {
      renderComponent();
      expect(screen.getByText("Test content")).toBeInTheDocument();
    });

    it("should apply the provided className", () => {
      renderComponent("relative");
      expect(screen.getByRole("main")).toHaveClass("relative");
    });

    it("should include flexbox centering classes", () => {
      renderComponent();
      const main = screen.getByRole("main");
      expect(main).toHaveClass("flex");
      expect(main).toHaveClass("items-center");
      expect(main).toHaveClass("justify-center");
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
          <MainLayoutCenter>content</MainLayoutCenter>
        </ClientProvider>
      );
      expect(screen.getByRole("main")).toHaveClass("bg-white");
    });
  });
});
