import { describe, expect, test, vi } from "vitest";
import { render, screen } from "@testing-library/react";

import { ClientContext } from "@src/entities/contexts";

import { NotChannelsSection } from "@src/components/NotChannelsSection/NotChannelsSection";

import { useClientContext } from "@src/hooks/useClientContext";

import { languageTexts } from "@src/constants/languageTexts";

vi.mock("@src/hooks/useClientContext");
vi.mock("@src/hooks/useTheme", () => ({
  useTheme: () => ({
    color: "text-white",
  }),
}));

describe("NotChannelsSection.tsx", () => {
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

    test("It must render the component correctly.", () => {
      vi.mocked(useClientContext).mockReturnValue(mockClientContext);

      render(<NotChannelsSection />);

      const notChannelsHeading = screen.getByRole("heading", {
        name: new RegExp(
          languageTexts[mockClientContext.language].channels.notChannels
        ),
      });

      expect(notChannelsHeading).toBeInTheDocument();
    });

    test("It must display the correct language text for no channels.", () => {
      vi.mocked(useClientContext).mockReturnValue(mockClientContext);

      render(<NotChannelsSection />);

      const notChannelsText =
        languageTexts[mockClientContext.language].channels.notChannels;
      const notChannelsHeading = screen.getByRole("heading", {
        name: new RegExp(notChannelsText),
      });

      expect(notChannelsHeading).toBeInTheDocument();
      expect(notChannelsHeading.textContent).toBe(notChannelsText);
    });

    test("It must render CatSvg component.", () => {
      vi.mocked(useClientContext).mockReturnValue(mockClientContext);

      const { container } = render(<NotChannelsSection />);

      const svgElement = container.querySelector<HTMLElement>("svg");

      expect(svgElement).toBeInTheDocument();
    });

    test("It must display no channels message in Spanish when language is es.", () => {
      vi.mocked(useClientContext).mockReturnValue({
        ...mockClientContext,
        language: "es",
      });

      render(<NotChannelsSection />);

      const notChannelsText = languageTexts["es"].channels.notChannels;
      const notChannelsHeading = screen.getByRole("heading", {
        name: new RegExp(notChannelsText),
      });

      expect(notChannelsHeading).toBeInTheDocument();
      expect(notChannelsHeading.textContent).toBe(notChannelsText);
    });

    test("It must display no channels message in English when language is en.", () => {
      vi.mocked(useClientContext).mockReturnValue({
        ...mockClientContext,
        language: "en",
      });

      render(<NotChannelsSection />);

      const notChannelsText = languageTexts["en"].channels.notChannels;
      const notChannelsHeading = screen.getByRole("heading", {
        name: new RegExp(notChannelsText),
      });

      expect(notChannelsHeading).toBeInTheDocument();
      expect(notChannelsHeading.textContent).toBe(notChannelsText);
    });
  });
});
