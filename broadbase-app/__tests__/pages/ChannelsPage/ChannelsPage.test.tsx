import { render, screen } from "@testing-library/react";
import { MemoryRouter } from "react-router-dom";
import { useQuery } from "@apollo/client";

import type { RenderResult } from "@testing-library/react";

import ChannelsPage from "@/pages/ChannelsPage/ChannelsPage";

import { ClientProvider } from "@/contexts/ClientContext/ClientProvider";
import { ChannelsProvider } from "@/contexts/ChannelsContext/ChannelsProvider";

import { mockChannel, mockChannel2 } from "@tests/__mocks__/channel.mock";
import { mockCategory } from "@tests/__mocks__/category.mock";

const mockUseQuery = useQuery as jest.Mock;

jest.mock("@apollo/client", () => {
  const actual = jest.requireActual("@apollo/client");
  return {
    ...actual,
    useQuery: jest.fn(),
  };
});

jest.mock("usekeyboard-react", () => ({
  useKeyboard: jest.fn(),
}));

const renderPage = (): RenderResult =>
  render(
    <MemoryRouter initialEntries={["/channels"]}>
      <ClientProvider>
        <ChannelsProvider>
          <ChannelsPage />
        </ChannelsProvider>
      </ClientProvider>
    </MemoryRouter>
  );

beforeEach(() => {
  localStorage.clear();
  localStorage.setItem("lang", "es");
  localStorage.setItem("theme", "dark");
});

describe("ChannelsPage", () => {
  describe("loading state", () => {
    it("should render the loading channels section when data is loading", () => {
      mockUseQuery.mockReturnValue({
        loading: true,
        data: undefined,
        error: undefined,
      });
      renderPage();
      expect(screen.getByRole("heading")).toBeInTheDocument();
    });
  });

  describe("error state", () => {
    it("should render the error section when query fails", () => {
      mockUseQuery.mockReturnValue({
        loading: false,
        data: undefined,
        error: { message: "Failed to fetch" },
      });
      renderPage();
      expect(screen.getByRole("img")).toBeInTheDocument();
      expect(screen.getByText(/Failed to fetch/)).toBeInTheDocument();
    });
  });

  describe("empty state", () => {
    it("should render the not-channels section when there are no categories", () => {
      mockUseQuery.mockReturnValue({
        loading: false,
        data: { categories: { data: [] } },
        error: undefined,
      });
      renderPage();
      expect(screen.getByRole("img")).toBeInTheDocument();
    });
  });

  describe("channels loaded state", () => {
    it("should render category sections after receiving data", async () => {
      mockUseQuery.mockReturnValue({
        loading: false,
        data: {
          categories: {
            data: [
              {
                ...mockCategory,
                channels: [mockChannel, mockChannel2],
              },
            ],
          },
        },
        error: undefined,
      });
      renderPage();
      expect(await screen.findByText("Test Channel - 1")).toBeInTheDocument();
      expect(await screen.findByText("Second Channel - 3")).toBeInTheDocument();
    });

    it("should render the open settings button", async () => {
      mockUseQuery.mockReturnValue({
        loading: false,
        data: {
          categories: {
            data: [{ ...mockCategory, channels: [mockChannel] }],
          },
        },
        error: undefined,
      });
      renderPage();
      await screen.findByText("Test Channel - 1");
      expect(screen.getByRole("button", { name: "open settings" })).toBeInTheDocument();
    });
  });
});
