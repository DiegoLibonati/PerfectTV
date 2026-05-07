import { render, screen } from "@testing-library/react";

import type { JSX } from "react";
import type { RenderResult } from "@testing-library/react";
import type { ChannelViewerProps } from "@/types/props";

import ChannelViewer from "@/components/ChannelViewer/ChannelViewer";

jest.mock("@/constants/envs", () => ({
  __esModule: true,
  default: {
    GRAPHQL_URL: "http://localhost:4000/graphql",
    CHANNELS_NEEDS_TO_RUN: [],
    CODE_USE_IFRAME: ["ftv"],
  },
}));

jest.mock("react-player", () => {
  const MockRP = (): JSX.Element => <div data-testid="react-player" />;
  return MockRP;
});

const renderComponent = (props: Partial<ChannelViewerProps> = {}): RenderResult => {
  const defaultProps: ChannelViewerProps = {
    name: "Test Channel",
    url: "https://example.com/stream",
    sourceCode: "youtube",
    sizes: { height: 720, width: 1280 },
    controls: true,
    playing: false,
    ...props,
  };
  return render(<ChannelViewer {...defaultProps} />);
};

describe("ChannelViewer", () => {
  describe("when source code is not in the iframe list", () => {
    it("should render the ReactPlayer component", () => {
      renderComponent({ sourceCode: "youtube" });
      expect(screen.getByTestId("react-player")).toBeInTheDocument();
    });

    it("should not render an iframe", () => {
      const { container } = renderComponent({ sourceCode: "youtube" });
      expect(container.querySelector<HTMLIFrameElement>("iframe")).not.toBeInTheDocument();
    });
  });

  describe("when source code is in the iframe list", () => {
    it("should render an iframe element", () => {
      const { container } = renderComponent({ sourceCode: "ftv" });
      expect(container.querySelector<HTMLIFrameElement>("iframe")).toBeInTheDocument();
    });

    it("should not render the ReactPlayer component", () => {
      renderComponent({ sourceCode: "ftv" });
      expect(screen.queryByTestId("react-player")).not.toBeInTheDocument();
    });

    it("should set the iframe src to the provided url", () => {
      const { container } = renderComponent({
        sourceCode: "ftv",
        url: "https://ftv.example.com/live",
      });
      const iframe = container.querySelector<HTMLIFrameElement>("iframe");
      expect(iframe).toHaveAttribute("src", "https://ftv.example.com/live");
    });

    it("should set the iframe title including the channel name", () => {
      const { container } = renderComponent({ sourceCode: "ftv", name: "FTV Channel" });
      const iframe = container.querySelector<HTMLIFrameElement>("iframe");
      expect(iframe).toHaveAttribute("title", "iframe to view: FTV Channel");
    });
  });
});
