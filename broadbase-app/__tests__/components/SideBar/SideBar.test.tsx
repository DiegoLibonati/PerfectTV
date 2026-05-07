import { render, screen } from "@testing-library/react";

import type { RenderResult } from "@testing-library/react";
import type { SideBarProps } from "@/types/props";

import SideBar from "@/components/SideBar/SideBar";

import { ClientProvider } from "@/contexts/ClientContext/ClientProvider";

const renderComponent = (props: Partial<SideBarProps> = {}): RenderResult => {
  const defaultProps: SideBarProps = {
    isOpen: true,
    title: "Settings",
    ...props,
  };
  return render(
    <ClientProvider>
      <SideBar {...defaultProps}>
        <p>Sidebar content</p>
      </SideBar>
    </ClientProvider>
  );
};

describe("SideBar", () => {
  describe("rendering", () => {
    it("should render the sidebar title", () => {
      renderComponent({ title: "My Settings" });
      expect(screen.getByRole("heading", { name: "My Settings" })).toBeInTheDocument();
    });

    it("should render the children content", () => {
      renderComponent();
      expect(screen.getByText("Sidebar content")).toBeInTheDocument();
    });

    it("should render an aside element", () => {
      const { container } = renderComponent();
      expect(container.querySelector<HTMLElement>("aside")).toBeInTheDocument();
    });
  });

  describe("open/closed state", () => {
    it("should apply open styles when isOpen is true", () => {
      const { container } = renderComponent({ isOpen: true });
      const aside = container.querySelector<HTMLElement>("aside");
      expect(aside?.className).toContain("w-full");
    });

    it("should apply closed styles when isOpen is false", () => {
      const { container } = renderComponent({ isOpen: false });
      const aside = container.querySelector<HTMLElement>("aside");
      expect(aside?.className).toContain("w-0");
    });
  });
});
