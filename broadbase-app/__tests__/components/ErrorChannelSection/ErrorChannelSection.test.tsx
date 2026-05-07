import { render, screen } from "@testing-library/react";

import type { RenderResult } from "@testing-library/react";

import ErrorChannelSection from "@/components/ErrorChannelSection/ErrorChannelSection";

import { ClientProvider } from "@/contexts/ClientContext/ClientProvider";

const renderComponent = (errorMessage = "Something went wrong"): RenderResult =>
  render(
    <ClientProvider>
      <ErrorChannelSection errorMessage={errorMessage} />
    </ClientProvider>
  );

describe("ErrorChannelSection", () => {
  describe("rendering", () => {
    it("should render the error message", () => {
      renderComponent("Network error");
      expect(screen.getByText(/Network error/)).toBeInTheDocument();
    });

    it("should render the server error svg", () => {
      renderComponent();
      expect(screen.getByRole("img")).toBeInTheDocument();
    });

    it("should display the error obtaining text from language constants", () => {
      renderComponent("timeout");
      const heading = screen.getByRole("heading");
      expect(heading).toBeInTheDocument();
      expect(heading.textContent).toContain("timeout");
    });

    it("should render with english error text when language is en", () => {
      render(
        <ClientProvider defaultLanguage="en">
          <ErrorChannelSection errorMessage="404" />
        </ClientProvider>
      );
      const heading = screen.getByRole("heading");
      expect(heading.textContent).toContain("An error occurred while obtaining a channel");
      expect(heading.textContent).toContain("404");
    });
  });
});
