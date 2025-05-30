import { describe, expect, test, vi, Mock } from "vitest";
import { render, screen } from "@testing-library/react";
import user from "@testing-library/user-event";

import { CardChannel } from "@src/components/CardChannel/CardChannel";

import { ClientProvider } from "@src/contexts/Client/ClientProvider";

import { useRouter } from "@src/hooks/useRouter";

vi.mock("@src/hooks/useRouter");
window.scrollTo = vi.fn();

describe("CardChannel", () => {
  describe("General Tests.", () => {
    const props = {
      id: "pepe",
      active: false,
      thumbUrl: "thumbUrl",
      name: "name",
      description: "description",
      number: 2,
    };

    const handleNavigateToChannel = vi.fn();

    beforeEach(() => {
      (useRouter as unknown as Mock).mockReturnValue({
        handleNavigateToChannel: handleNavigateToChannel,
      });
    });

    test("It must render the component correctly.", () => {
      const { container } = render(
        <ClientProvider>
          <CardChannel
            id={props.id}
            active={props.active}
            description={props.description}
            name={props.name}
            number={props.number}
            thumbUrl={props.thumbUrl}
          ></CardChannel>
        </ClientProvider>
      );

      const cardRoot = container.querySelector(
        ".card-channel"
      ) as HTMLDivElement;
      const img = screen.getByRole("img");
      const nameAndNumber = screen.getByRole("heading", {
        name: new RegExp(`${props.name} - ${props.number}`),
      });
      const description = screen.getByText(props.description);

      expect(cardRoot).toBeInTheDocument();
      expect(cardRoot.id).toEqual(props.id);
      expect(img).toBeInTheDocument();
      expect(img.getAttribute("src")).toEqual(props.thumbUrl);
      expect(img.getAttribute("alt")).toEqual(props.name);
      expect(nameAndNumber).toBeInTheDocument();
      expect(description).toBeInTheDocument();
    });

    test("It must execute the relevant function when you click on the card.", async () => {
      const { container } = render(
        <ClientProvider>
          <CardChannel
            id={props.id}
            active={props.active}
            description={props.description}
            name={props.name}
            number={props.number}
            thumbUrl={props.thumbUrl}
          ></CardChannel>
        </ClientProvider>
      );

      const cardRoot = container.querySelector(
        ".card-channel"
      ) as HTMLDivElement;

      await user.click(cardRoot);

      expect(handleNavigateToChannel).toHaveBeenCalledTimes(1);
      expect(handleNavigateToChannel).toHaveBeenCalledWith(props.number);
    });
  });

  describe("If props key active is true.", () => {
    const props = {
      id: "pepe",
      active: true,
      thumbUrl: "thumbUrl",
      name: "name",
      description: "description",
      number: 2,
    };

    const handleNavigateToChannel = vi.fn();

    beforeEach(() => {
      (useRouter as unknown as Mock).mockReturnValue({
        handleNavigateToChannel: handleNavigateToChannel,
      });
    });

    test("It must render the root of the card with outline and outline-primary.", () => {
      const { container } = render(
        <ClientProvider>
          <CardChannel
            id={props.id}
            active={props.active}
            description={props.description}
            name={props.name}
            number={props.number}
            thumbUrl={props.thumbUrl}
          ></CardChannel>
        </ClientProvider>
      );

      const cardRoot = container.querySelector(
        ".card-channel"
      ) as HTMLDivElement;

      expect(
        cardRoot.className.includes("outline outline-primary")
      ).toBeTruthy();
    });
  });

  describe("If props key active is false.", () => {
    const props = {
      id: "pepe",
      active: false,
      thumbUrl: "thumbUrl",
      name: "name",
      description: "description",
      number: 2,
    };

    const handleNavigateToChannel = vi.fn();

    beforeEach(() => {
      (useRouter as unknown as Mock).mockReturnValue({
        handleNavigateToChannel: handleNavigateToChannel,
      });
    });

    test("It must render the root of the card with not outline and outline-primary.", () => {
      const { container } = render(
        <ClientProvider>
          <CardChannel
            id={props.id}
            active={props.active}
            description={props.description}
            name={props.name}
            number={props.number}
            thumbUrl={props.thumbUrl}
          ></CardChannel>
        </ClientProvider>
      );

      const cardRoot = container.querySelector(
        ".card-channel"
      ) as HTMLDivElement;

      expect(
        cardRoot.className.includes("outline outline-primary")
      ).toBeFalsy();
    });
  });
});
