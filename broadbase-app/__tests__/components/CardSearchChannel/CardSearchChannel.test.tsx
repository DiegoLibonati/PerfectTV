import { render, screen } from "@testing-library/react";

import type { RenderResult } from "@testing-library/react";

import CardSearchChannel from "@/components/CardSearchChannel/CardSearchChannel";

import { ClientProvider } from "@/contexts/ClientContext/ClientProvider";

const renderComponent = (search: string): RenderResult =>
  render(
    <ClientProvider>
      <CardSearchChannel search={search} />
    </ClientProvider>
  );

describe("CardSearchChannel", () => {
  describe("rendering", () => {
    it("should render the search number when provided", () => {
      renderComponent("42");
      expect(screen.getByText("42")).toBeInTheDocument();
    });

    it("should render the card root when search is empty", () => {
      const { container } = renderComponent("");
      expect(container.querySelector<HTMLDivElement>(".card-root")).toBeInTheDocument();
    });
  });

  describe("visibility", () => {
    it("should have opacity-100 class when search is non-empty", () => {
      const { container } = renderComponent("7");
      const card = container.querySelector<HTMLDivElement>(".card-root");
      expect(card?.className).toContain("opacity-100");
    });

    it("should have opacity-0 class when search is empty", () => {
      const { container } = renderComponent("");
      const card = container.querySelector<HTMLDivElement>(".card-root");
      expect(card?.className).toContain("opacity-0");
    });
  });
});
