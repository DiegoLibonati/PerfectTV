import { render, screen } from "@testing-library/react";

import type { RenderResult } from "@testing-library/react";

import NotActiveChannelSection from "@/components/NotActiveChannelSection/NotActiveChannelSection";

import { ClientProvider } from "@/contexts/ClientContext/ClientProvider";

const renderComponent = (): RenderResult =>
  render(
    <ClientProvider>
      <NotActiveChannelSection />
    </ClientProvider>
  );

describe("NotActiveChannelSection", () => {
  describe("rendering", () => {
    it("should render the cat svg illustration", () => {
      renderComponent();
      expect(screen.getByRole("img")).toBeInTheDocument();
    });

    it("should render the no-active-channel heading", () => {
      renderComponent();
      expect(screen.getByRole("heading")).toBeInTheDocument();
    });

    it("should render the english no-active text when language is en", () => {
      render(
        <ClientProvider defaultLanguage="en">
          <NotActiveChannelSection />
        </ClientProvider>
      );
      expect(screen.getByRole("heading")).toHaveTextContent(
        "There is no active channel to display."
      );
    });
  });
});
