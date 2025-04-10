import { describe, expect, test } from "vitest";
import { render, screen } from "@testing-library/react";

import { CardActiveChannel } from "@/src/components/CardActiveChannel/CardActiveChannel";

import { ClientProvider } from "@/src/contexts/Client/ClientProvider";

describe("CardActiveChannel", () => {
  describe("General Tests.", () => {
    const props = {
      active: false,
      thumbUrl: "thumbUrl",
      name: "name",
      description: "description",
      number: 2,
    };

    test("It must render the component correctly.", () => {
      const { container } = render(
        <ClientProvider>
          <CardActiveChannel
            active={props.active}
            description={props.description}
            name={props.name}
            number={props.number}
            thumbUrl={props.thumbUrl}
          ></CardActiveChannel>
        </ClientProvider>
      );

      const cardRoot = container.querySelector(".card-root") as HTMLDivElement;
      const img = screen.getByRole("img");
      const nameAndNumber = screen.getByRole("heading", {
        name: new RegExp(`${props.name} - ${props.number}`),
      });
      const description = screen.getByText(props.description);

      expect(cardRoot).toBeInTheDocument();
      expect(img).toBeInTheDocument();
      expect(img.getAttribute("src")).toEqual(props.thumbUrl);
      expect(img.getAttribute("alt")).toEqual(props.name);
      expect(nameAndNumber).toBeInTheDocument();
      expect(description).toBeInTheDocument();
    });
  });

  describe("If props key active is true.", () => {
    const props = {
      active: true,
      thumbUrl: "thumbUrl",
      name: "name",
      description: "description",
      number: 2,
    };

    test("It must render the root of the card with opacity-100.", () => {
      const { container } = render(
        <ClientProvider>
          <CardActiveChannel
            active={props.active}
            description={props.description}
            name={props.name}
            number={props.number}
            thumbUrl={props.thumbUrl}
          ></CardActiveChannel>
        </ClientProvider>
      );

      const cardRoot = container.querySelector(".card-root") as HTMLDivElement;

      expect(cardRoot.className.includes("opacity-100")).toBeTruthy();
    });
  });

  describe("If props key active is false.", () => {
    const props = {
      active: false,
      thumbUrl: "thumbUrl",
      name: "name",
      description: "description",
      number: 2,
    };

    test("It must render the root of the card with opacity-0.", () => {
      const { container } = render(
        <ClientProvider>
          <CardActiveChannel
            active={props.active}
            description={props.description}
            name={props.name}
            number={props.number}
            thumbUrl={props.thumbUrl}
          ></CardActiveChannel>
        </ClientProvider>
      );

      const cardRoot = container.querySelector(".card-root") as HTMLDivElement;

      expect(cardRoot.className.includes("opacity-0")).toBeTruthy();
    });
  });
});
