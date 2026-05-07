import { render, screen } from "@testing-library/react";

import type { RenderResult } from "@testing-library/react";

import ErrorChannelsSection from "@/components/ErrorChannelsSection/ErrorChannelsSection";

import { ClientProvider } from "@/contexts/ClientContext/ClientProvider";

const renderComponent = (errorMessage = "Something went wrong"): RenderResult =>
  render(
    <ClientProvider>
      <ErrorChannelsSection errorMessage={errorMessage} />
    </ClientProvider>
  );

describe("ErrorChannelsSection", () => {
  describe("rendering", () => {
    it("should render the error message", () => {
      renderComponent("Network error");
      expect(screen.getByText(/Network error/)).toBeInTheDocument();
    });

    it("should render the server error svg", () => {
      renderComponent();
      expect(screen.getByRole("img")).toBeInTheDocument();
    });

    it("should display the channels error obtaining text", () => {
      renderComponent("timeout");
      const heading = screen.getByRole("heading");
      expect(heading.textContent).toContain("timeout");
    });

    it("should render with english channels error text when language is en", () => {
      render(
        <ClientProvider defaultLanguage="en">
          <ErrorChannelsSection errorMessage="503" />
        </ClientProvider>
      );
      const heading = screen.getByRole("heading");
      expect(heading.textContent).toContain("An error occurred while obtaining channels");
      expect(heading.textContent).toContain("503");
    });
  });
});
