import { describe, expect, test, vi } from "vitest";
import { render, screen } from "@testing-library/react";

import { ClientContext } from "@src/entities/contexts";

import { ErrorChannelsSection } from "@src/components/ErrorChannelsSection/ErrorChannelsSection";

import { useClientContext } from "@src/hooks/useClientContext";

import { languageTexts } from "@src/constants/languageTexts";

vi.mock("@src/hooks/useClientContext");
vi.mock("@src/hooks/useTheme", () => ({
  useTheme: () => ({
    color: "text-white",
  }),
}));

describe("ErrorChannelsSection.tsx", () => {
  describe("General Tests.", () => {
    const mockClientContext: ClientContext = {
      language: "es",
      theme: "dark",
      sideBar: {
        open: false,
      },
      handleSetLanguage: vi.fn(),
      handleSetTheme: vi.fn(),
      handleSetSideBar: vi.fn(),
    };

    const props = {
      errorMessage: "Failed to fetch channels",
    };

    test("It must render the component correctly with error message.", () => {
      vi.mocked(useClientContext).mockReturnValue(mockClientContext);

      render(<ErrorChannelsSection errorMessage={props.errorMessage} />);

      const errorHeading = screen.getByRole("heading", {
        name: new RegExp(props.errorMessage),
      });

      expect(errorHeading).toBeInTheDocument();
      expect(errorHeading.textContent).toContain(props.errorMessage);
    });

    test("It must display the correct language text for error.", () => {
      vi.mocked(useClientContext).mockReturnValue(mockClientContext);

      render(<ErrorChannelsSection errorMessage={props.errorMessage} />);

      const errorText =
        languageTexts[mockClientContext.language].channels.error.obtaining;
      const errorHeading = screen.getByRole("heading", {
        name: new RegExp(errorText),
      });

      expect(errorHeading).toBeInTheDocument();
      expect(errorHeading.textContent).toContain(errorText);
    });

    test("It must render ServerErrorSvg component.", () => {
      vi.mocked(useClientContext).mockReturnValue(mockClientContext);

      const { container } = render(
        <ErrorChannelsSection errorMessage={props.errorMessage} />
      );

      const svgElement = container.querySelector<HTMLElement>("svg");

      expect(svgElement).toBeInTheDocument();
    });

    test("It must display error message in Spanish when language is es.", () => {
      vi.mocked(useClientContext).mockReturnValue({
        ...mockClientContext,
        language: "es",
      });

      render(<ErrorChannelsSection errorMessage={props.errorMessage} />);

      const errorText = languageTexts["es"].channels.error.obtaining;
      const errorHeading = screen.getByRole("heading", {
        name: new RegExp(errorText),
      });

      expect(errorHeading).toBeInTheDocument();
      expect(errorHeading.textContent).toBe(
        `${errorText} - ${props.errorMessage}`
      );
    });

    test("It must display error message in English when language is en.", () => {
      vi.mocked(useClientContext).mockReturnValue({
        ...mockClientContext,
        language: "en",
      });

      render(<ErrorChannelsSection errorMessage={props.errorMessage} />);

      const errorText = languageTexts["en"].channels.error.obtaining;
      const errorHeading = screen.getByRole("heading", {
        name: new RegExp(errorText),
      });

      expect(errorHeading).toBeInTheDocument();
      expect(errorHeading.textContent).toBe(
        `${errorText} - ${props.errorMessage}`
      );
    });
  });
});
