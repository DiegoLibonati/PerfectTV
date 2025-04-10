import { describe, expect, test } from "vitest";
import { render } from "@testing-library/react";

import { Iframe } from "@/src/components/Iframe/Iframe";

describe("Iframe", () => {
  describe("General Tests.", () => {
    const props = {
      title: `iframe to view: name`,
      url: "urlcito",
      sizes: { width: 10, height: 10 },
      className: "12345",
      text: "1234",
      allow: "autoplay; fullscreen; encrypted-media",
    };

    test("It must render the component correctly.", () => {
      const { container } = render(
        <Iframe
          url={props.url}
          sizes={props.sizes}
          title={props.title}
          className={props.className}
          allow={props.allow}
        >
          {props.text}
        </Iframe>
      );

      const iframe = container.querySelector("iframe") as HTMLIFrameElement;

      expect(iframe).toBeInTheDocument();
      expect(iframe.src).toEqual(`http://localhost:3000/${props.url}`);
      expect(iframe.width).toEqual(String(props.sizes.width));
      expect(iframe.height).toEqual(String(props.sizes.height));
      expect(iframe.title).toEqual(props.title);
      //   expect(iframe.allow).toEqual("autoplay; fullscreen; encrypted-media");
    });
  });
});
