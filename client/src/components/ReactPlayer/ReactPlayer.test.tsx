import { render, screen } from "@testing-library/react";
import { describe, vi, expect } from "vitest";

import { ReactPlayer } from "@/src/components/ReactPlayer/ReactPlayer";

vi.mock("react-player", () => ({
  default: vi.fn((props) => (
    <div data-testid="mock-react-player" data-url={props.url}>
      Mock Player: {props.url}
    </div>
  )),
}));

describe("ReactPlayer", () => {
  describe("General Tests.", () => {
    test("It must render the component correctly.", () => {
      render(
        <ReactPlayer
          url="https://example.com/video.mp4"
          sizes={{ width: 100, height: 100 }}
          playing={true}
          controls={true}
        />
      );

      const player = screen.getByTestId("mock-react-player");

      expect(player).toBeInTheDocument();
      expect(player).toHaveAttribute(
        "data-url",
        "https://example.com/video.mp4"
      );
    });
  });
});
