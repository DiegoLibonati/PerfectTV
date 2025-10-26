import { describe, expect, test, vi } from "vitest";
import { render, screen } from "@testing-library/react";

import { ChannelContext } from "@src/entities/contexts";

import { SearchChannelSection } from "@src/components/SearchChannelSection/SearchChannelSection";

import { useChannelContext } from "@src/hooks/useChannelContext";

vi.mock("@src/hooks/useChannelContext");
vi.mock("@src/hooks/useTheme", () => ({
  useTheme: () => ({
    color: "text-white",
    bg: "bg-black",
  }),
}));

describe("SearchChannelSection.tsx", () => {
  describe("General Tests.", () => {
    const mockChannelContext: ChannelContext = {
      activeChannel: null,
      channelChange: false,
      searchNumber: "123",
      numbersUsed: [],
      handleSetActiveChannel: vi.fn(),
      handleClearActiveChannel: vi.fn(),
      handleSetSearchNumber: vi.fn(),
      handleClearSearchNumber: vi.fn(),
      handleSearchChannelWithNumbers: vi.fn(),
      handleChangeChannelWithArrows: vi.fn(),
      handleSetNumbersUsed: vi.fn(),
    };

    test("It must render the component correctly with search number.", () => {
      vi.mocked(useChannelContext).mockReturnValue(mockChannelContext);

      render(<SearchChannelSection />);

      const searchNumber = screen.getByText(mockChannelContext.searchNumber);

      expect(searchNumber).toBeInTheDocument();
      expect(searchNumber.textContent).toBe(mockChannelContext.searchNumber);
    });

    test("It must render with opacity-100 when searchNumber is not empty.", () => {
      vi.mocked(useChannelContext).mockReturnValue(mockChannelContext);

      const { container } = render(<SearchChannelSection />);

      const cardRoot = container.querySelector<HTMLDivElement>(".opacity-100");

      expect(cardRoot).toBeInTheDocument();
    });

    test("It must render with opacity-0 when searchNumber is empty.", () => {
      vi.mocked(useChannelContext).mockReturnValue({
        ...mockChannelContext,
        searchNumber: "",
      });

      const { container } = render(<SearchChannelSection />);

      const cardRoot = container.querySelector<HTMLDivElement>(".opacity-0");

      expect(cardRoot).toBeInTheDocument();
    });

    test("It must pass correct search prop to CardSearchChannel.", () => {
      vi.mocked(useChannelContext).mockReturnValue(mockChannelContext);

      render(<SearchChannelSection />);

      const searchText = screen.getByText(mockChannelContext.searchNumber);

      expect(searchText).toBeInTheDocument();
      expect(searchText.textContent).toBe(mockChannelContext.searchNumber);
    });

    test("It must display different search numbers correctly.", () => {
      const differentSearchNumber = "456";
      vi.mocked(useChannelContext).mockReturnValue({
        ...mockChannelContext,
        searchNumber: differentSearchNumber,
      });

      render(<SearchChannelSection />);

      const searchText = screen.getByText(differentSearchNumber);

      expect(searchText).toBeInTheDocument();
      expect(searchText.textContent).toBe(differentSearchNumber);
    });
  });
});
