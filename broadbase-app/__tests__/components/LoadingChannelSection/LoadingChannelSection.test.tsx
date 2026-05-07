import { render, screen } from "@testing-library/react";

import type { RenderResult } from "@testing-library/react";

import LoadingChannelSection from "@/components/LoadingChannelSection/LoadingChannelSection";

import { ClientProvider } from "@/contexts/ClientContext/ClientProvider";

const renderComponent = (): RenderResult =>
  render(
    <ClientProvider>
      <LoadingChannelSection />
    </ClientProvider>
  );

describe("LoadingChannelSection", () => {
  describe("rendering", () => {
    it("should render the loading spinner", () => {
      const { container } = renderComponent();
      expect(container.querySelector<HTMLSpanElement>(".loader")).toBeInTheDocument();
    });

    it("should render the loading heading", () => {
      renderComponent();
      expect(screen.getByRole("heading")).toBeInTheDocument();
    });

    it("should render the spanish loading text by default", () => {
      renderComponent();
      const heading = screen.getByRole("heading");
      expect(heading.textContent.length).toBeGreaterThan(0);
    });

    it("should render the english loading text when language is en", () => {
      render(
        <ClientProvider defaultLanguage="en">
          <LoadingChannelSection />
        </ClientProvider>
      );
      expect(screen.getByRole("heading")).toHaveTextContent("Loading channel.");
    });
  });
});
