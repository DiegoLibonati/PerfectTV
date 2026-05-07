import { useEffect } from "react";
import { render, screen, act } from "@testing-library/react";
import { MemoryRouter } from "react-router-dom";

import type { JSX, ReactNode } from "react";
import type { RenderResult } from "@testing-library/react";

import ViewerChannelSection from "@/components/ViewerChannelSection/ViewerChannelSection";

import { ClientProvider } from "@/contexts/ClientContext/ClientProvider";
import { ChannelProvider } from "@/contexts/ChannelContext/ChannelProvider";

import { useChannelContext } from "@/hooks/useChannelContext";

import { mockChannel } from "@tests/__mocks__/channel.mock";

jest.mock("@/constants/envs", () => ({
  __esModule: true,
  default: {
    GRAPHQL_URL: "http://localhost:4000/graphql",
    CHANNELS_NEEDS_TO_RUN: [],
    CODE_USE_IFRAME: [],
  },
}));

jest.mock("react-player", () => {
  const MockRP = (): JSX.Element => <div data-testid="react-player" />;
  return MockRP;
});

const ChannelInitializer = ({ children }: { children: ReactNode }): JSX.Element => {
  const { handleSetActiveChannel, activeChannel } = useChannelContext();

  useEffect(() => {
    handleSetActiveChannel(mockChannel);
  }, []);

  if (!activeChannel) return <div>initializing</div>;

  return <>{children}</>;
};

const renderComponent = (): RenderResult =>
  render(
    <MemoryRouter>
      <ClientProvider>
        <ChannelProvider>
          <ChannelInitializer>
            <ViewerChannelSection />
          </ChannelInitializer>
        </ChannelProvider>
      </ClientProvider>
    </MemoryRouter>
  );

beforeEach(() => {
  jest.useFakeTimers();
});

afterEach(() => {
  act(() => {
    jest.runAllTimers();
  });
  jest.useRealTimers();
});

describe("ViewerChannelSection", () => {
  describe("rendering", () => {
    it("should render the react-player component after active channel is set", async () => {
      renderComponent();
      expect(await screen.findByTestId("react-player")).toBeInTheDocument();
    });

    it("should render inside a section element", async () => {
      const { container } = renderComponent();
      await screen.findByTestId("react-player");
      expect(container.querySelector<HTMLElement>("section")).toBeInTheDocument();
    });
  });
});
