import { render, screen } from "@testing-library/react";

import type { RenderResult } from "@testing-library/react";

import LoadingChannelsSection from "@/components/LoadingChannelsSection/LoadingChannelsSection";

import { ClientProvider } from "@/contexts/ClientContext/ClientProvider";

const renderComponent = (): RenderResult =>
  render(
    <ClientProvider>
      <LoadingChannelsSection />
    </ClientProvider>
  );

describe("LoadingChannelsSection", () => {
  describe("rendering", () => {
    it("should render the loading spinner", () => {
      const { container } = renderComponent();
      expect(container.querySelector<HTMLSpanElement>(".loader")).toBeInTheDocument();
    });

    it("should render the loading heading", () => {
      renderComponent();
      expect(screen.getByRole("heading")).toBeInTheDocument();
    });

    it("should render the english loading channels text when language is en", () => {
      render(
        <ClientProvider defaultLanguage="en">
          <LoadingChannelsSection />
        </ClientProvider>
      );
      expect(screen.getByRole("heading")).toHaveTextContent("Loading channels.");
    });
  });
});
