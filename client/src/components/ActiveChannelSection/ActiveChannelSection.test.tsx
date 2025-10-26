import { describe, expect, test, vi } from "vitest";
import { render, screen } from "@testing-library/react";

import { ChannelContext } from "@src/entities/contexts";

import { ActiveChannelSection } from "@src/components/ActiveChannelSection/ActiveChannelSection";

import { useChannelContext } from "@src/hooks/useChannelContext";

vi.mock("@src/hooks/useChannelContext");
vi.mock("@src/hooks/useTheme", () => ({
  useTheme: () => ({
    color: "text-white",
    bg: "bg-black",
  }),
}));

describe("ActiveChannelSection.tsx", () => {
  describe("General Tests.", () => {
    const mockChannelContext: ChannelContext = {
      activeChannel: {
        name: "HBO",
        description: "Premium entertainment channel",
        thumbUrl: "https://example.com/hbo.jpg",
        number: 501,
        urlRest: "https://example.com",
        id: 1,
        url: "https://example.com/stream",
        category: {
          id: 1,
          code: "premium",
          description: "Premium Channels",
          channels: [],
        },
        source: {
          id: 1,
          base: null,
          code: "cable",
          description: "Cable Source",
        },
        type: {
          id: 1,
          code: "entertainment",
          description: "Entertainment",
        },
      },
      channelChange: true,
      searchNumber: "",
      numbersUsed: [],
      handleSetActiveChannel: vi.fn(),
      handleClearActiveChannel: vi.fn(),
      handleSetSearchNumber: vi.fn(),
      handleClearSearchNumber: vi.fn(),
      handleSearchChannelWithNumbers: vi.fn(),
      handleChangeChannelWithArrows: vi.fn(),
      handleSetNumbersUsed: vi.fn(),
    };

    test("It must render the component correctly with active channel.", () => {
      vi.mocked(useChannelContext).mockReturnValue(mockChannelContext);

      render(<ActiveChannelSection />);

      const channelName = screen.getByRole("heading", {
        name: /HBO - 501/i,
      });
      const channelImage = screen.getByRole("img", {
        name: /HBO/i,
      });
      const channelDescription = screen.getByText(
        /Premium entertainment channel/i
      );

      expect(channelName).toBeInTheDocument();
      expect(channelImage).toBeInTheDocument();
      expect(channelImage.getAttribute("src")).toEqual(
        mockChannelContext.activeChannel?.thumbUrl
      );
      expect(channelDescription).toBeInTheDocument();
    });

    test("It must render with opacity-100 when channelChange is true.", () => {
      vi.mocked(useChannelContext).mockReturnValue(mockChannelContext);

      const { container } = render(<ActiveChannelSection />);

      const cardRoot = container.querySelector<HTMLDivElement>(".opacity-100");

      expect(cardRoot).toBeInTheDocument();
    });

    test("It must render with opacity-0 when channelChange is false.", () => {
      vi.mocked(useChannelContext).mockReturnValue({
        ...mockChannelContext,
        channelChange: false,
      });

      const { container } = render(<ActiveChannelSection />);

      const cardRoot = container.querySelector<HTMLDivElement>(".opacity-0");

      expect(cardRoot).toBeInTheDocument();
    });

    test("It must pass correct props to CardActiveChannel.", () => {
      vi.mocked(useChannelContext).mockReturnValue(mockChannelContext);

      render(<ActiveChannelSection />);

      const channelName = screen.getByRole("heading", {
        name: new RegExp(
          `${mockChannelContext.activeChannel?.name} - ${mockChannelContext.activeChannel?.number}`
        ),
      });

      expect(channelName).toBeInTheDocument();
    });
  });
});
