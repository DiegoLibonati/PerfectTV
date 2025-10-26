import { describe, expect, test } from "vitest";
import { render, screen } from "@testing-library/react";

import { CardSearchChannel } from "@src/components/CardSearchChannel/CardSearchChannel";

import { ClientProvider } from "@src/contexts/ClientContext/ClientContext";

describe("CardSearchChannel.tsx", () => {
  describe("General Tests.", () => {
    const props = {
      search: "1234",
    };

    test("It must render the component correctly.", () => {
      const { container } = render(
        <ClientProvider>
          <CardSearchChannel search={props.search}></CardSearchChannel>
        </ClientProvider>
      );

      const cardRoot = container.querySelector<HTMLDivElement>(".card-root");
      const search = screen.getByText(props.search);

      expect(cardRoot).toBeInTheDocument();
      expect(search).toBeInTheDocument();
    });
  });

  describe("If props key search has content.", () => {
    const props = {
      search: "1234",
    };

    test("It must render the root of the card with opacity-100.", () => {
      const { container } = render(
        <ClientProvider>
          <CardSearchChannel search={props.search}></CardSearchChannel>
        </ClientProvider>
      );

      const cardRoot = container.querySelector<HTMLDivElement>(".card-root");

      expect(cardRoot?.className.includes("opacity-100")).toBeTruthy();
    });
  });

  describe("If props key search has not content.", () => {
    const props = {
      search: "",
    };

    test("It must render the root of the card with not opacity-0.", () => {
      const { container } = render(
        <ClientProvider>
          <CardSearchChannel search={props.search}></CardSearchChannel>
        </ClientProvider>
      );

      const cardRoot = container.querySelector<HTMLDivElement>(".card-root");

      expect(cardRoot?.className.includes("opacity-0")).toBeTruthy();
    });
  });
});
