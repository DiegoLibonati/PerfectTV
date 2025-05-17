import { describe, expect, test, vi, Mock } from "vitest";
import { render, screen } from "@testing-library/react";
import user from "@testing-library/user-event";

import { FormSettings } from "@src/components/FormSettings/FormSettings";

import { useClientContext } from "@src/contexts/Client/ClientProvider";

import { useLocalStorage } from "@src/hooks/useLocalStorage";

import { languageTexts } from "@src/constants/languageTexts";
import { LS_KEY_NAME_LANG, LS_KEY_NAME_THEME } from "@src/constants/general";

vi.mock("@src/hooks/useLocalStorage");
vi.mock("@src/contexts/Client/ClientProvider");

describe("FormSettings", () => {
  describe("General Tests.", () => {
    const setLocalStorage = vi.fn();
    const getLocalStorage = vi.fn();

    const language = "es";
    const handleSetSideBar = vi.fn();
    const handleSetLanguage = vi.fn();
    const handleSetTheme = vi.fn();

    beforeEach(() => {
      (useLocalStorage as unknown as Mock).mockReturnValue({
        set: setLocalStorage,
        get: getLocalStorage,
      });

      (useClientContext as unknown as Mock).mockReturnValue({
        language: language,
        handleSetSideBar: handleSetSideBar,
        handleSetLanguage: handleSetLanguage,
        handleSetTheme: handleSetTheme,
      });
    });

    test("It must render the component correctly.", () => {
      const { container } = render(<FormSettings></FormSettings>);

      const form = container.querySelector("form") as HTMLFormElement;
      const headingLanguage = screen.getByRole("heading", {
        name: languageTexts[language].settings.language.title,
      });
      const selectLanguage = container.querySelector(
        ".select-language"
      ) as HTMLSelectElement;
      const headingTheme = screen.getByRole("heading", {
        name: languageTexts[language].settings.theme.title,
      });
      const selectTheme = container.querySelector(
        ".select-theme"
      ) as HTMLSelectElement;
      const btnSubmit = screen.getByRole("button", { name: /Save changes/i });

      expect(form).toBeInTheDocument();
      expect(headingLanguage).toBeInTheDocument();
      expect(selectLanguage).toBeInTheDocument();
      expect(headingTheme).toBeInTheDocument();
      expect(selectTheme).toBeInTheDocument();
      expect(btnSubmit).toBeInTheDocument();
    });

    test("It must execute the relevant functions if you click submit.", async () => {
      const { container } = render(<FormSettings></FormSettings>);

      const selectLanguage = container.querySelector(
        ".select-language"
      ) as HTMLSelectElement;
      const selectTheme = container.querySelector(
        ".select-theme"
      ) as HTMLSelectElement;
      const btnSubmit = screen.getByRole("button", { name: /Save changes/i });

      await user.click(btnSubmit);

      expect(setLocalStorage).toHaveBeenCalledTimes(2);
      expect(setLocalStorage).toHaveBeenCalledWith(
        LS_KEY_NAME_LANG,
        selectLanguage.value
      );
      expect(setLocalStorage).toHaveBeenCalledWith(
        LS_KEY_NAME_THEME,
        selectTheme.value
      );

      expect(handleSetLanguage).toHaveBeenCalledTimes(1);
      expect(handleSetLanguage).toHaveBeenCalledWith(selectLanguage.value);

      expect(handleSetTheme).toHaveBeenCalledTimes(1);
      expect(handleSetTheme).toHaveBeenCalledWith(selectTheme.value);

      expect(handleSetSideBar).toHaveBeenCalledTimes(1);
      expect(handleSetSideBar).toHaveBeenCalledWith({ open: false });
    });
  });
});
