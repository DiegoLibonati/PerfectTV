import { render, screen } from "@testing-library/react";

import type { JSX } from "react";
import type { RenderResult } from "@testing-library/react";
import type { ReactPlayerProps } from "@/types/props";

import ReactPlayer from "@/components/ReactPlayer/ReactPlayer";

jest.mock("react-player", () => {
  const MockRP = ({
    url,
    height,
    width,
  }: {
    url: string;
    height: number;
    width: number;
    playing: boolean;
    controls: boolean;
  }): JSX.Element => (
    <div data-testid="react-player" data-url={url} data-height={height} data-width={width} />
  );
  return MockRP;
});

const renderComponent = (props: Partial<ReactPlayerProps> = {}): RenderResult => {
  const defaultProps: ReactPlayerProps = {
    url: "https://example.com/stream",
    sizes: { height: 400, width: 600 },
    playing: false,
    controls: true,
    ...props,
  };
  return render(<ReactPlayer {...defaultProps} />);
};

describe("ReactPlayer", () => {
  describe("rendering", () => {
    it("should render the react-player component", () => {
      renderComponent();
      expect(screen.getByTestId("react-player")).toBeInTheDocument();
    });

    it("should pass the url to the underlying player", () => {
      renderComponent({ url: "https://example.com/video" });
      expect(screen.getByTestId("react-player")).toHaveAttribute(
        "data-url",
        "https://example.com/video"
      );
    });

    it("should pass the height from sizes", () => {
      renderComponent({ sizes: { height: 720, width: 1280 } });
      expect(screen.getByTestId("react-player")).toHaveAttribute("data-height", "720");
    });

    it("should pass the width from sizes", () => {
      renderComponent({ sizes: { height: 720, width: 1280 } });
      expect(screen.getByTestId("react-player")).toHaveAttribute("data-width", "1280");
    });
  });
});
