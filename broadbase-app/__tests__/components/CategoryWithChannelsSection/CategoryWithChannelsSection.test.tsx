import { render, screen } from "@testing-library/react";
import { MemoryRouter } from "react-router-dom";

import type { RenderResult } from "@testing-library/react";
import type { CategoryWithChannelsSectionProps } from "@/types/props";

import CategoryWithChannelsSection from "@/components/CategoryWithChannelsSection/CategoryWithChannelsSection";

import { ClientProvider } from "@/contexts/ClientContext/ClientProvider";
import { ChannelsProvider } from "@/contexts/ChannelsContext/ChannelsProvider";

import { mockChannel, mockChannel2, mockChannel3 } from "@tests/__mocks__/channel.mock";

const renderComponent = (props: Partial<CategoryWithChannelsSectionProps> = {}): RenderResult => {
  const defaultProps: CategoryWithChannelsSectionProps = {
    nameCategory: "News",
    channelsCategory: [mockChannel, mockChannel2, mockChannel3],
    ...props,
  };
  return render(
    <MemoryRouter>
      <ClientProvider>
        <ChannelsProvider>
          <CategoryWithChannelsSection {...defaultProps} />
        </ChannelsProvider>
      </ClientProvider>
    </MemoryRouter>
  );
};

describe("CategoryWithChannelsSection", () => {
  describe("rendering", () => {
    it("should render the category name as a heading", () => {
      renderComponent({ nameCategory: "Sports" });
      expect(screen.getByRole("heading", { name: "Sports" })).toBeInTheDocument();
    });

    it("should render all provided channels", () => {
      renderComponent();
      expect(screen.getByText("Test Channel - 1")).toBeInTheDocument();
      expect(screen.getByText("Second Channel - 3")).toBeInTheDocument();
      expect(screen.getByText("Third Channel - 2")).toBeInTheDocument();
    });

    it("should render channels sorted by number", () => {
      renderComponent();
      const headings = screen.getAllByRole("heading", { level: 2 });
      const channelHeadings = headings.filter((h) => /\d+$/.exec(h.textContent || ""));
      const numbers = channelHeadings.map((h) => {
        const match = /(\d+)$/.exec(h.textContent || "");
        return match ? Number(match[1]) : 0;
      });
      expect(numbers).toEqual([...numbers].sort((a, b) => a - b));
    });

    it("should render a separator element", () => {
      const { container } = renderComponent();
      expect(container.querySelector<HTMLHRElement>("hr")).toBeInTheDocument();
    });

    it("should render a section element", () => {
      const { container } = renderComponent();
      expect(container.querySelector<HTMLElement>("section")).toBeInTheDocument();
    });
  });

  describe("with empty channels", () => {
    it("should render the category name without any channel cards", () => {
      renderComponent({ channelsCategory: [] });
      expect(screen.getByRole("heading", { name: "News" })).toBeInTheDocument();
      expect(screen.queryByText("Test Channel - 1")).not.toBeInTheDocument();
    });
  });
});
