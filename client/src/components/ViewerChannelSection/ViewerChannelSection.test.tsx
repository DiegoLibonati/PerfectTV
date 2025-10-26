import { describe, expect, test, vi, beforeEach } from "vitest";
import { render, screen } from "@testing-library/react";

import { ChannelContext } from "@src/entities/contexts";

import { ViewerChannelSection } from "@src/components/ViewerChannelSection/ViewerChannelSection";

import { useChannelContext } from "@src/hooks/useChannelContext";
import { whichPlayerToUseBySourceCode } from "@src/helpers/whichPlayerToUseBySourceCode";

vi.mock("@src/hooks/useChannelContext");
vi.mock("@src/hooks/useTheme", () => ({
  useTheme: () => ({
    bg: "bg-black",
  }),
}));
vi.mock("@src/helpers/whichPlayerToUseBySourceCode");
vi.mock("react-player", () => ({
  default: vi.fn((props) => (
    <div data-testid="mock-react-player" data-url={props.url}>
      Mock Player: {props.url}
    </div>
  )),
}));

describe("ViewerChannelSection.tsx", () => {
  describe("General Tests.", () => {
    const mockChannelContext: ChannelContext = {
      activeChannel: {
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
          code: "m3u8",
          description: "M3U8 Source",
        },
        type: {
          id: 1,
          code: "entertainment",
          description: "Entertainment",
        },
      },
      channelChange: false,
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

    beforeEach(() => {
      Object.defineProperty(window, "innerHeight", {
        writable: true,
        configurable: true,
        value: 1080,
      });
      Object.defineProperty(window, "innerWidth", {
        writable: true,
        configurable: true,
        value: 1920,
      });
    });

    test("It must render the component correctly with active channel.", () => {
      vi.mocked(useChannelContext).mockReturnValue(mockChannelContext);
      vi.mocked(whichPlayerToUseBySourceCode).mockReturnValue("react-player");

      const { container } = render(<ViewerChannelSection />);

      const section = container.querySelector<HTMLElement>("section");

      expect(section).toBeInTheDocument();
      expect(section?.className).toContain("bg-black");
    });

    test("It must render Iframe when sourceCode requires iframe player.", () => {
      vi.mocked(useChannelContext).mockReturnValue(mockChannelContext);
      vi.mocked(whichPlayerToUseBySourceCode).mockReturnValue("iframe");

      render(<ViewerChannelSection />);

      const iframe = screen.getByTitle(
        `iframe to view: ${mockChannelContext.activeChannel!.name}`
      );

      expect(iframe).toBeInTheDocument();
      expect(iframe.tagName).toBe("IFRAME");
    });

    test("It must render ReactPlayer when sourceCode requires react player.", () => {
      vi.mocked(useChannelContext).mockReturnValue(mockChannelContext);
      vi.mocked(whichPlayerToUseBySourceCode).mockReturnValue("react-player");

      const { container } = render(<ViewerChannelSection />);

      const iframe = container.querySelector<HTMLIFrameElement>(
        `iframe[title="iframe to view: ${
          mockChannelContext.activeChannel!.name
        }"]`
      );

      expect(iframe).not.toBeInTheDocument();
    });

    test("It must pass correct props to ChannelViewer.", () => {
      vi.mocked(useChannelContext).mockReturnValue(mockChannelContext);
      vi.mocked(whichPlayerToUseBySourceCode).mockReturnValue("iframe");

      render(<ViewerChannelSection />);

      const iframe = screen.getByTitle(
        `iframe to view: ${mockChannelContext.activeChannel!.name}`
      );

      expect(iframe).toBeInTheDocument();
      expect(iframe.getAttribute("src")).toBe(
        mockChannelContext.activeChannel!.url
      );
    });

    test("It must pass correct window sizes to ChannelViewer.", () => {
      vi.mocked(useChannelContext).mockReturnValue(mockChannelContext);
      vi.mocked(whichPlayerToUseBySourceCode).mockReturnValue("iframe");

      render(<ViewerChannelSection />);

      const iframe = screen.getByTitle(
        `iframe to view: ${mockChannelContext.activeChannel!.name}`
      );

      expect(iframe).toBeInTheDocument();
      expect(iframe.getAttribute("height")).toBe(window.innerHeight.toString());
      expect(iframe.getAttribute("width")).toBe(window.innerWidth.toString());
    });

    test("It must call whichPlayerToUseBySourceCode with correct source code.", () => {
      vi.mocked(useChannelContext).mockReturnValue(mockChannelContext);
      vi.mocked(whichPlayerToUseBySourceCode).mockReturnValue("iframe");

      render(<ViewerChannelSection />);

      expect(whichPlayerToUseBySourceCode).toHaveBeenCalledWith(
        mockChannelContext.activeChannel!.source.code
      );
    });
  });
});
