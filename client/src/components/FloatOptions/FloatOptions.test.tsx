import { describe, expect, test, vi, Mock } from "vitest";
import { render, screen } from "@testing-library/react";
import user from "@testing-library/user-event";

import { FloatOptions } from "@src/components/FloatOptions/FloatOptions";

import { useClientContext } from "@src/contexts/Client/ClientProvider";

import { useWindow } from "@src/hooks/useWindow";

vi.mock("@src/hooks/useWindow");
vi.mock("@src/contexts/Client/ClientProvider");

describe("FloatOptions", () => {
  describe("General Tests.", () => {
    const ariaLabelButtonChildren = "1234";
    const btnChildrenFn = vi.fn();

    const handleReloadWindow = vi.fn();
    const handleSetSideBar = vi.fn();

    beforeEach(() => {
      (useWindow as unknown as Mock).mockReturnValue({
        handleReloadWindow: handleReloadWindow,
      });

      (useClientContext as unknown as Mock).mockReturnValue({
        handleSetSideBar: handleSetSideBar,
      });
    });

    test("It must render the component correctly.", () => {
      const { container } = render(
        <FloatOptions>
          <button
            type="button"
            aria-label={ariaLabelButtonChildren}
            onClick={btnChildrenFn}
          ></button>
        </FloatOptions>
      );

      const root = container.querySelector(".float-options") as HTMLDivElement;
      const btnOpenSettings = screen.getByRole("button", {
        name: /open settings/i,
      });
      const btnReloadPage = screen.getByRole("button", {
        name: /reload page/i,
      });
      const btnChildren = screen.getByRole("button", {
        name: new RegExp(ariaLabelButtonChildren),
      });

      expect(root).toBeInTheDocument();
      expect(btnOpenSettings).toBeInTheDocument();
      expect(btnReloadPage).toBeInTheDocument();
      expect(btnChildren).toBeInTheDocument();
    });

    test("It must execute the relevant functions of the FloatOptions buttons.", async () => {
      render(
        <FloatOptions>
          <button
            type="button"
            aria-label={ariaLabelButtonChildren}
            onClick={btnChildrenFn}
          ></button>
        </FloatOptions>
      );

      const btnOpenSettings = screen.getByRole("button", {
        name: /open settings/i,
      });
      const btnReloadPage = screen.getByRole("button", {
        name: /reload page/i,
      });
      const btnChildren = screen.getByRole("button", {
        name: new RegExp(ariaLabelButtonChildren),
      });

      await user.click(btnOpenSettings);

      expect(handleSetSideBar).toHaveBeenCalledTimes(1);
      expect(handleSetSideBar).toHaveBeenCalledWith({ open: true });

      await user.click(btnReloadPage);

      expect(handleReloadWindow).toHaveBeenCalledTimes(1);

      await user.click(btnChildren);

      expect(btnChildrenFn).toHaveBeenCalledTimes(1);
    });
  });
});
