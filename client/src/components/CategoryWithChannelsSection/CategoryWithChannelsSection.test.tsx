import { describe, expect, test, vi } from "vitest";
import { render, screen } from "@testing-library/react";

import { ChannelsContext } from "@src/entities/contexts";
import { Channel } from "@src/entities/app";

import { CategoryWithChannelsSection } from "@src/components/CategoryWithChannelsSection/CategoryWithChannelsSection";

import { useChannelsContext } from "@src/hooks/useChannelsContext";

import { getChannelsSortByNumber } from "@src/helpers/getChannelsSortByNumber";

vi.mock("@src/hooks/useChannelsContext");
vi.mock("@src/hooks/useTheme", () => ({
  useTheme: () => ({
    color: "text-white",
    bg: "bg-black",
    border: "border-white",
    bgOut: "bg-gray-800",
    outlinePrimary: "outline-blue-500",
  }),
}));
vi.mock("@src/hooks/useRouter", () => ({
  useRouter: () => ({
    handleNavigateToChannel: vi.fn(),
  }),
}));
vi.mock("@src/helpers/getChannelsSortByNumber");

describe("CategoryWithChannelsSection.tsx", () => {
  describe("General Tests.", () => {
    const mockChannels: Channel[] = [
      {
        id: 1,
        name: "HBO",
        description: "Premium entertainment channel",
        thumbUrl: "https://example.com/hbo.jpg",
        number: 501,
        url: "https://example.com/stream/hbo",
        urlRest: "https://example.com/rest/hbo",
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
      {
        id: 2,
        name: "ESPN",
        description: "Sports channel",
        thumbUrl: "https://example.com/espn.jpg",
        number: 502,
        url: "https://example.com/stream/espn",
        urlRest: "https://example.com/rest/espn",
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
          id: 2,
          code: "sports",
          description: "Sports",
        },
      },
    ];

    const mockChannelsContext: ChannelsContext = {
      allChannels: mockChannels,
      allChannelsSortByNumber: mockChannels,
      channelSelected: mockChannels[0],
      categories: [],
      handleSetCategories: vi.fn(),
      handleSetAllChannels: vi.fn(),
      handleSetChannelsSortByNumber: vi.fn(),
      handleSetChannelSelected: vi.fn(),
      handleChangeChannelSelectedWithArrows: vi.fn(),
      handleEnterChannelSelected: vi.fn(),
    };

    const props = {
      nameCategory: "Premium Channels",
      channelsCategory: mockChannels,
    };

    test("It must render the component correctly with category name.", () => {
      vi.mocked(useChannelsContext).mockReturnValue(mockChannelsContext);
      vi.mocked(getChannelsSortByNumber).mockReturnValue(mockChannels);

      render(
        <CategoryWithChannelsSection
          nameCategory={props.nameCategory}
          channelsCategory={props.channelsCategory}
        />
      );

      const categoryHeading = screen.getByRole("heading", {
        name: new RegExp(props.nameCategory),
      });

      expect(categoryHeading).toBeInTheDocument();
      expect(categoryHeading.textContent).toEqual(props.nameCategory);
    });

    test("It must render all channels from the category.", () => {
      vi.mocked(useChannelsContext).mockReturnValue(mockChannelsContext);
      vi.mocked(getChannelsSortByNumber).mockReturnValue(mockChannels);

      render(
        <CategoryWithChannelsSection
          nameCategory={props.nameCategory}
          channelsCategory={props.channelsCategory}
        />
      );

      const hboChannel = screen.getByRole("heading", {
        name: /HBO - 501/i,
      });
      const espnChannel = screen.getByRole("heading", {
        name: /ESPN - 502/i,
      });

      expect(hboChannel).toBeInTheDocument();
      expect(espnChannel).toBeInTheDocument();
    });

    test("It must call getChannelsSortByNumber with correct channels.", () => {
      vi.mocked(useChannelsContext).mockReturnValue(mockChannelsContext);
      vi.mocked(getChannelsSortByNumber).mockReturnValue(mockChannels);

      render(
        <CategoryWithChannelsSection
          nameCategory={props.nameCategory}
          channelsCategory={props.channelsCategory}
        />
      );

      expect(getChannelsSortByNumber).toHaveBeenCalledWith(
        props.channelsCategory
      );
    });

    test("It must mark the selected channel as active.", () => {
      vi.mocked(useChannelsContext).mockReturnValue(mockChannelsContext);
      vi.mocked(getChannelsSortByNumber).mockReturnValue(mockChannels);

      const { container } = render(
        <CategoryWithChannelsSection
          nameCategory={props.nameCategory}
          channelsCategory={props.channelsCategory}
        />
      );

      const activeCard = container.querySelector<HTMLDivElement>(
        `#card-channel-${mockChannels[0].number}`
      );

      expect(activeCard).toBeInTheDocument();
      expect(activeCard?.className).toContain("outline");
    });

    test("It must render channel images with correct src and alt.", () => {
      vi.mocked(useChannelsContext).mockReturnValue(mockChannelsContext);
      vi.mocked(getChannelsSortByNumber).mockReturnValue(mockChannels);

      render(
        <CategoryWithChannelsSection
          nameCategory={props.nameCategory}
          channelsCategory={props.channelsCategory}
        />
      );

      const hboImage = screen.getByRole("img", {
        name: /HBO/i,
      });
      const espnImage = screen.getByRole("img", {
        name: /ESPN/i,
      });

      expect(hboImage).toBeInTheDocument();
      expect(hboImage.getAttribute("src")).toEqual(mockChannels[0].thumbUrl);
      expect(espnImage).toBeInTheDocument();
      expect(espnImage.getAttribute("src")).toEqual(mockChannels[1].thumbUrl);
    });
  });
});
