import { act, render, screen } from "@testing-library/react";
import { MemoryRouter, Route, Routes } from "react-router-dom";
import { useQuery } from "@apollo/client";

import type { JSX } from "react";
import type { RenderResult } from "@testing-library/react";

import ChannelPage from "@/pages/ChannelPage/ChannelPage";

import { ClientProvider } from "@/contexts/ClientContext/ClientProvider";
import { ChannelProvider } from "@/contexts/ChannelContext/ChannelProvider";

import { mockChannel } from "@tests/__mocks__/channel.mock";

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

jest.mock("react-player", () => {
  const MockRP = (): JSX.Element => <div data-testid="react-player" />;
  return MockRP;
});

jest.mock("@/constants/envs", () => ({
  __esModule: true,
  default: {
    GRAPHQL_URL: "http://localhost:4000/graphql",
    CHANNELS_NEEDS_TO_RUN: [],
    CODE_USE_IFRAME: [],
  },
}));

const renderPage = (initialRoute = "/channel/1"): RenderResult =>
  render(
    <MemoryRouter initialEntries={[initialRoute]}>
      <ClientProvider>
        <ChannelProvider>
          <Routes>
            <Route path="/channel/:number" element={<ChannelPage />} />
          </Routes>
        </ChannelProvider>
      </ClientProvider>
    </MemoryRouter>
  );

beforeEach(() => {
  jest.useFakeTimers();
  localStorage.clear();
  localStorage.setItem("lang", "es");
  localStorage.setItem("theme", "dark");
});

afterEach(() => {
  act(() => {
    jest.runAllTimers();
  });
  jest.useRealTimers();
});

describe("ChannelPage", () => {
  describe("loading state", () => {
    it("should render the loading section when data is loading", () => {
      mockUseQuery.mockReturnValue({
        loading: true,
        data: undefined,
        error: undefined,
        refetch: jest.fn(),
      });
      renderPage();
      expect(screen.getByRole("heading")).toBeInTheDocument();
    });
  });

  describe("not active channel state", () => {
    it("should render the cat svg illustration when there is no active channel", () => {
      mockUseQuery.mockReturnValue({
        loading: false,
        data: { channel: { data: null }, numbers: { data: [] } },
        error: undefined,
        refetch: jest.fn(),
      });
      renderPage();
      expect(screen.getByRole("img")).toBeInTheDocument();
    });
  });

  describe("error state without active channel", () => {
    it("should render the error section when query errors and no channel is active", () => {
      mockUseQuery.mockReturnValue({
        loading: false,
        data: undefined,
        error: { message: "Network error" },
        refetch: jest.fn(),
      });
      renderPage();
      expect(screen.getByRole("img")).toBeInTheDocument();
      expect(screen.getByText(/Network error/)).toBeInTheDocument();
    });
  });

  describe("active channel state", () => {
    it("should render the react-player after receiving channel data", async () => {
      mockUseQuery.mockReturnValue({
        loading: false,
        data: {
          channel: { data: mockChannel },
          numbers: { data: [1, 2, 3] },
        },
        error: undefined,
        refetch: jest.fn(),
      });
      renderPage();
      expect(await screen.findByTestId("react-player")).toBeInTheDocument();
    });

    it("should render the float options panel", async () => {
      mockUseQuery.mockReturnValue({
        loading: false,
        data: {
          channel: { data: mockChannel },
          numbers: { data: [1] },
        },
        error: undefined,
        refetch: jest.fn(),
      });
      renderPage();
      await screen.findByTestId("react-player");
      expect(screen.getByRole("button", { name: "open settings" })).toBeInTheDocument();
    });
  });

  describe("float options always visible", () => {
    it("should render the force reload channel button", () => {
      mockUseQuery.mockReturnValue({
        loading: false,
        data: { channel: { data: null }, numbers: { data: [] } },
        error: undefined,
        refetch: jest.fn(),
      });
      renderPage();
      expect(screen.getByRole("button", { name: "force reload channel" })).toBeInTheDocument();
    });

    it("should render the go to grid channels button", () => {
      mockUseQuery.mockReturnValue({
        loading: false,
        data: { channel: { data: null }, numbers: { data: [] } },
        error: undefined,
        refetch: jest.fn(),
      });
      renderPage();
      expect(screen.getByRole("button", { name: "go to grid channels page" })).toBeInTheDocument();
    });
  });
});
