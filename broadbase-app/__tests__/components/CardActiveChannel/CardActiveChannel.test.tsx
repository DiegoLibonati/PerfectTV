import { render, screen } from "@testing-library/react";

import type { RenderResult } from "@testing-library/react";
import type { CardActiveChannelProps } from "@/types/props";

import CardActiveChannel from "@/components/CardActiveChannel/CardActiveChannel";

import { ClientProvider } from "@/contexts/ClientContext/ClientProvider";

const renderComponent = (props: Partial<CardActiveChannelProps> = {}): RenderResult => {
  const defaultProps: CardActiveChannelProps = {
    active: true,
    thumbUrl: "https://example.com/thumb.jpg",
    name: "Test Channel",
    description: "Test description",
    number: 42,
    ...props,
  };
  return render(
    <ClientProvider>
      <CardActiveChannel {...defaultProps} />
    </ClientProvider>
  );
};

describe("CardActiveChannel", () => {
  describe("rendering", () => {
    it("should render the channel name and number", () => {
      renderComponent();
      expect(screen.getByText("Test Channel - 42")).toBeInTheDocument();
    });

    it("should render the channel description", () => {
      renderComponent();
      expect(screen.getByText("Test description")).toBeInTheDocument();
    });

    it("should render the channel thumbnail image", () => {
      renderComponent({ thumbUrl: "https://example.com/img.jpg", name: "My Channel" });
      const img = screen.getByAltText("My Channel");
      expect(img).toBeInTheDocument();
      expect(img).toHaveAttribute("src", "https://example.com/img.jpg");
    });
  });

  describe("visibility", () => {
    it("should have opacity-100 class when active is true", () => {
      const { container } = renderComponent({ active: true });
      const card = container.querySelector<HTMLDivElement>(".card-root");
      expect(card?.className).toContain("opacity-100");
    });

    it("should have opacity-0 class when active is false", () => {
      const { container } = renderComponent({ active: false });
      const card = container.querySelector<HTMLDivElement>(".card-root");
      expect(card?.className).toContain("opacity-0");
    });
  });
});
