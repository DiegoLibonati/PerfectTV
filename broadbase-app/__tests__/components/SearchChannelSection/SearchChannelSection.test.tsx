import { useEffect } from "react";
import { render, screen, act } from "@testing-library/react";
import { MemoryRouter } from "react-router-dom";

import type { JSX, ReactNode } from "react";
import type { RenderResult } from "@testing-library/react";

import SearchChannelSection from "@/components/SearchChannelSection/SearchChannelSection";

import { ClientProvider } from "@/contexts/ClientContext/ClientProvider";
import { ChannelProvider } from "@/contexts/ChannelContext/ChannelProvider";

import { useChannelContext } from "@/hooks/useChannelContext";

jest.mock("@/constants/envs", () => ({
  __esModule: true,
  default: {
    GRAPHQL_URL: "http://localhost:4000/graphql",
    CHANNELS_NEEDS_TO_RUN: [],
    CODE_USE_IFRAME: [],
  },
}));

const renderComponent = (): RenderResult =>
  render(
    <MemoryRouter>
      <ClientProvider>
        <ChannelProvider>
          <SearchChannelSection />
        </ChannelProvider>
      </ClientProvider>
    </MemoryRouter>
  );

const SearchNumberSetter = ({
  searchNumber,
  children,
}: {
  searchNumber: number;
  children: ReactNode;
}): JSX.Element => {
  const { handleSetSearchNumber } = useChannelContext();

  useEffect(() => {
    handleSetSearchNumber(searchNumber);
  }, []);

  return <>{children}</>;
};

beforeEach(() => {
  jest.useFakeTimers();
});

afterEach(() => {
  act(() => {
    jest.runAllTimers();
  });
  jest.useRealTimers();
});

describe("SearchChannelSection", () => {
  describe("rendering", () => {
    it("should render a section element", () => {
      const { container } = renderComponent();
      expect(container.querySelector<HTMLElement>("section")).toBeInTheDocument();
    });

    it("should render CardSearchChannel with opacity-0 when search is empty", () => {
      const { container } = renderComponent();
      const card = container.querySelector<HTMLDivElement>(".card-root");
      expect(card?.className).toContain("opacity-0");
    });
  });

  describe("with a search number set", () => {
    it("should render the card with the search number", async () => {
      render(
        <MemoryRouter>
          <ClientProvider>
            <ChannelProvider>
              <SearchNumberSetter searchNumber={5}>
                <SearchChannelSection />
              </SearchNumberSetter>
            </ChannelProvider>
          </ClientProvider>
        </MemoryRouter>
      );
      expect(await screen.findByText("5")).toBeInTheDocument();
    });
  });
});
