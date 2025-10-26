import { describe, expect, test, vi } from "vitest";
import { render, screen } from "@testing-library/react";

import { ClientContext } from "@src/entities/contexts";

import { LoadingChannelsSection } from "@src/components/LoadingChannelsSection/LoadingChannelsSection";

import { useClientContext } from "@src/hooks/useClientContext";

import { languageTexts } from "@src/constants/languageTexts";

vi.mock("@src/hooks/useClientContext");
vi.mock("@src/hooks/useTheme", () => ({
  useTheme: () => ({
    color: "text-white",
    borderTop: "border-t-blue-500",
  }),
}));

describe("LoadingChannelsSection.tsx", () => {
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

      render(<LoadingChannelsSection />);

      const loadingHeading = screen.getByRole("heading", {
        name: new RegExp(
          languageTexts[mockClientContext.language].channels.loading
        ),
      });

      expect(loadingHeading).toBeInTheDocument();
    });

    test("It must display the correct language text for loading.", () => {
      vi.mocked(useClientContext).mockReturnValue(mockClientContext);

      render(<LoadingChannelsSection />);

      const loadingText =
        languageTexts[mockClientContext.language].channels.loading;
      const loadingHeading = screen.getByRole("heading", {
        name: new RegExp(loadingText),
      });

      expect(loadingHeading).toBeInTheDocument();
      expect(loadingHeading.textContent).toBe(loadingText);
    });

    test("It must render LoaderSimple component.", () => {
      vi.mocked(useClientContext).mockReturnValue(mockClientContext);

      const { container } = render(<LoadingChannelsSection />);

      const loaderElement =
        container.querySelector<HTMLSpanElement>(".border-t-blue-500");

      expect(loaderElement).toBeInTheDocument();
    });

    test("It must display loading message in Spanish when language is es.", () => {
      vi.mocked(useClientContext).mockReturnValue({
        ...mockClientContext,
        language: "es",
      });

      render(<LoadingChannelsSection />);

      const loadingText = languageTexts["es"].channels.loading;
      const loadingHeading = screen.getByRole("heading", {
        name: new RegExp(loadingText),
      });

      expect(loadingHeading).toBeInTheDocument();
      expect(loadingHeading.textContent).toBe(loadingText);
    });

    test("It must display loading message in English when language is en.", () => {
      vi.mocked(useClientContext).mockReturnValue({
        ...mockClientContext,
        language: "en",
      });

      render(<LoadingChannelsSection />);

      const loadingText = languageTexts["en"].channels.loading;
      const loadingHeading = screen.getByRole("heading", {
        name: new RegExp(loadingText),
      });

      expect(loadingHeading).toBeInTheDocument();
      expect(loadingHeading.textContent).toBe(loadingText);
    });
  });
});
