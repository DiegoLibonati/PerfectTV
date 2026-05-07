import { render, screen } from "@testing-library/react";

import type { RenderResult } from "@testing-library/react";

import NotChannelsSection from "@/components/NotChannelsSection/NotChannelsSection";

import { ClientProvider } from "@/contexts/ClientContext/ClientProvider";

const renderComponent = (): RenderResult =>
  render(
    <ClientProvider>
      <NotChannelsSection />
    </ClientProvider>
  );

describe("NotChannelsSection", () => {
  describe("rendering", () => {
    it("should render the cat svg illustration", () => {
      renderComponent();
      expect(screen.getByRole("img")).toBeInTheDocument();
    });

    it("should render the no-channels heading", () => {
      renderComponent();
      expect(screen.getByRole("heading")).toBeInTheDocument();
    });

    it("should render the english no-channels text when language is en", () => {
      render(
        <ClientProvider defaultLanguage="en">
          <NotChannelsSection />
        </ClientProvider>
      );
      expect(screen.getByRole("heading")).toHaveTextContent("There are no channels to display.");
    });
  });
});
