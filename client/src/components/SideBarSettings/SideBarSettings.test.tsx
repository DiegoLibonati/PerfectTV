import { describe, expect, test, vi, Mock, beforeEach } from "vitest";
import { render, screen } from "@testing-library/react";

import { SideBarSettings } from "@src/components/SideBarSettings/SideBarSettings";

import { useClientContext } from "@src/hooks/useClientContext";

import { languageTexts } from "@src/constants/languageTexts";

vi.mock("@src/hooks/useClientContext");

describe("SideBarSettings.tsx", () => {
  describe("General Tests.", () => {
    const language = "es";
    const sideBar = { open: false };
    const handleSetSideBar = vi.fn();

    beforeEach(() => {
      (useClientContext as unknown as Mock).mockReturnValue({
        language: language,
        sideBar: sideBar,
        handleSetSideBar: handleSetSideBar,
      });
    });

    test("It must render the component correctly.", () => {
      const { container } = render(<SideBarSettings></SideBarSettings>);

      const aside = container.querySelector<HTMLElement>("aside");
      const title = screen.getByRole("heading", {
        name: new RegExp(languageTexts[language].settings.title),
      });
      const form = container.querySelector<HTMLFormElement>("form");
      const btnCloseSettings = screen.getByRole("button", {
        name: /close sidebar settings/i,
      });

      expect(aside).toBeInTheDocument();
      expect(title).toBeInTheDocument();
      expect(form).toBeInTheDocument();
      expect(btnCloseSettings).toBeInTheDocument();
    });
  });

  describe("If key isOpen is true", () => {
    const language = "es";
    const sideBar = { open: true };
    const handleSetSideBar = vi.fn();

    beforeEach(() => {
      (useClientContext as unknown as Mock).mockReturnValue({
        language: language,
        sideBar: sideBar,
        handleSetSideBar: handleSetSideBar,
      });
    });

    test("It must open the sidebar.", () => {
      const { container } = render(<SideBarSettings></SideBarSettings>);

      const aside = container.querySelector<HTMLElement>("aside");

      expect(aside).toBeInTheDocument();
      expect(aside?.className.includes("w-full p-4 lg:w-[35%]"));
    });
  });

  describe("If key isOpen is false", () => {
    const language = "es";
    const sideBar = { open: false };
    const handleSetSideBar = vi.fn();

    beforeEach(() => {
      (useClientContext as unknown as Mock).mockReturnValue({
        language: language,
        sideBar: sideBar,
        handleSetSideBar: handleSetSideBar,
      });
    });

    test("It must close the sidebar.", () => {
      const { container } = render(<SideBarSettings></SideBarSettings>);

      const aside = container.querySelector<HTMLElement>("aside");

      expect(aside).toBeInTheDocument();
      expect(aside?.className.includes("w-0 p-0 lg:w-0"));
    });
  });
});
