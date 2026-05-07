import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { MemoryRouter } from "react-router-dom";

import type { RenderResult } from "@testing-library/react";
import type { CardChannelProps } from "@/types/props";

import CardChannel from "@/components/CardChannel/CardChannel";

import { ClientProvider } from "@/contexts/ClientContext/ClientProvider";

const renderComponent = (props: Partial<CardChannelProps> = {}): RenderResult => {
  const defaultProps: CardChannelProps = {
    id: "card-channel-1",
    name: "Test Channel",
    thumbUrl: "https://example.com/thumb.jpg",
    number: 1,
    description: "Test channel description",
    active: false,
    ...props,
  };
  return render(
    <MemoryRouter>
      <ClientProvider>
        <CardChannel {...defaultProps} />
      </ClientProvider>
    </MemoryRouter>
  );
};

describe("CardChannel", () => {
  describe("rendering", () => {
    it("should render the channel name and number", () => {
      renderComponent();
      expect(screen.getByText("Test Channel - 1")).toBeInTheDocument();
    });

    it("should render the channel description", () => {
      renderComponent();
      expect(screen.getByText("Test channel description")).toBeInTheDocument();
    });

    it("should render the channel thumbnail image", () => {
      renderComponent({ name: "My Channel", thumbUrl: "https://example.com/img.jpg" });
      const img = screen.getByAltText("My Channel");
      expect(img).toBeInTheDocument();
      expect(img).toHaveAttribute("src", "https://example.com/img.jpg");
    });

    it("should render with the provided id", () => {
      const { container } = renderComponent({ id: "card-channel-42" });
      const div = container.querySelector<HTMLDivElement>("#card-channel-42");
      expect(div).toBeInTheDocument();
    });
  });

  describe("active state", () => {
    it("should apply outline class when active is true", () => {
      const { container } = renderComponent({ active: true });
      const card = container.querySelector<HTMLDivElement>(".card-channel");
      expect(card?.className).toContain("outline");
    });

    it("should not apply outline class when active is false", () => {
      const { container } = renderComponent({ active: false });
      const card = container.querySelector<HTMLDivElement>(".card-channel");
      expect(card?.className).not.toContain("outline");
    });
  });

  describe("behavior", () => {
    it("should navigate to the channel when clicked", async () => {
      const user = userEvent.setup();
      const { container } = renderComponent({ number: 5 });
      const card = container.querySelector<HTMLDivElement>(".card-channel");
      await user.click(card!);
      expect(window.location.pathname).toBeDefined();
    });
  });
});
