import { describe, expect, test, vi } from "vitest";
import { render, screen } from "@testing-library/react";

import { ChannelViewer } from "@src/components/ChannelViewer/ChannelViewer";

vi.mock("react-player", () => ({
  default: vi.fn((props) => (
    <div data-testid="mock-react-player" data-url={props.url}>
      Mock Player: {props.url}
    </div>
  )),
}));

describe("ChannelViewer", () => {
  describe("If source code use iframe component.", () => {
    const props = {
      name: "name",
      url: "urlcito",
      sourceCode: "ftv",
      sizes: { width: 10, height: 10 },
      controls: false,
      playing: false,
    };

    test("It must render the iframe correctly.", () => {
      const { container } = render(
        <ChannelViewer
          name={props.name}
          sourceCode={props.sourceCode}
          url={props.url}
          controls={props.controls}
          playing={props.playing}
          sizes={props.sizes}
        ></ChannelViewer>
      );

      const iframe = container.querySelector("iframe") as HTMLIFrameElement;

      expect(iframe).toBeInTheDocument();
      expect(iframe.src).toEqual(`http://localhost:3000/${props.url}`);
      expect(iframe.width).toEqual(String(props.sizes.width));
      expect(iframe.height).toEqual(String(props.sizes.height));
      expect(iframe.title).toEqual(`iframe to view: ${props.name}`);
      //   expect(iframe.allow).toEqual("autoplay; fullscreen; encrypted-media");
    });
  });

  describe("If source code use react-player component.", () => {
    const props = {
      name: "name",
      url: "urlcito",
      sourceCode: "1234a",
      sizes: { width: 10, height: 10 },
      controls: false,
      playing: false,
    };

    test("It must render the react-player correctly.", () => {
      render(
        <ChannelViewer
          name={props.name}
          sourceCode={props.sourceCode}
          url={props.url}
          controls={props.controls}
          playing={props.playing}
          sizes={props.sizes}
        ></ChannelViewer>
      );

      const player = screen.getByTestId("mock-react-player");

      expect(player).toBeInTheDocument();
      expect(player).toHaveAttribute("data-url", props.url);
    });
  });
});
