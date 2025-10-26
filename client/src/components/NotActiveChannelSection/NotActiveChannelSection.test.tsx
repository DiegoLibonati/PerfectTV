import { describe, expect, test, vi } from "vitest";
import { render, screen } from "@testing-library/react";

import { ClientContext } from "@src/entities/contexts";

import { NotActiveChannelSection } from "@src/components/NotActiveChannelSection/NotActiveChannelSection";

import { useClientContext } from "@src/hooks/useClientContext";

import { languageTexts } from "@src/constants/languageTexts";

vi.mock("@src/hooks/useClientContext");
vi.mock("@src/hooks/useTheme", () => ({
  useTheme: () => ({
    color: "text-white",
  }),
}));

describe("NotActiveChannelSection.tsx", () => {
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

      render(<NotActiveChannelSection />);

      const noActiveHeading = screen.getByRole("heading", {
        name: new RegExp(
          languageTexts[mockClientContext.language].channel.noActive
        ),
      });

      expect(noActiveHeading).toBeInTheDocument();
    });

    test("It must display the correct language text for no active channel.", () => {
      vi.mocked(useClientContext).mockReturnValue(mockClientContext);

      render(<NotActiveChannelSection />);

      const noActiveText =
        languageTexts[mockClientContext.language].channel.noActive;
      const noActiveHeading = screen.getByRole("heading", {
        name: new RegExp(noActiveText),
      });

      expect(noActiveHeading).toBeInTheDocument();
      expect(noActiveHeading.textContent).toBe(noActiveText);
    });

    test("It must render CatSvg component.", () => {
      vi.mocked(useClientContext).mockReturnValue(mockClientContext);

      const { container } = render(<NotActiveChannelSection />);

      const svgElement = container.querySelector<HTMLElement>("svg");

      expect(svgElement).toBeInTheDocument();
    });

    test("It must display no active channel message in Spanish when language is es.", () => {
      vi.mocked(useClientContext).mockReturnValue({
        ...mockClientContext,
        language: "es",
      });

      render(<NotActiveChannelSection />);

      const noActiveText = languageTexts["es"].channel.noActive;
      const noActiveHeading = screen.getByRole("heading", {
        name: new RegExp(noActiveText),
      });

      expect(noActiveHeading).toBeInTheDocument();
      expect(noActiveHeading.textContent).toBe(noActiveText);
    });

    test("It must display no active channel message in English when language is en.", () => {
      vi.mocked(useClientContext).mockReturnValue({
        ...mockClientContext,
        language: "en",
      });

      render(<NotActiveChannelSection />);

      const noActiveText = languageTexts["en"].channel.noActive;
      const noActiveHeading = screen.getByRole("heading", {
        name: new RegExp(noActiveText),
      });

      expect(noActiveHeading).toBeInTheDocument();
      expect(noActiveHeading.textContent).toBe(noActiveText);
    });
  });
});
