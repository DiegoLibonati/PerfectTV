import { useEffect } from "react";
import { render, screen, act } from "@testing-library/react";
import { MemoryRouter } from "react-router-dom";

import type { JSX, ReactNode } from "react";
import type { RenderResult } from "@testing-library/react";

import ActiveChannelSection from "@/components/ActiveChannelSection/ActiveChannelSection";

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
            <ActiveChannelSection />
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

describe("ActiveChannelSection", () => {
  describe("rendering", () => {
    it("should render the channel name and number", async () => {
      renderComponent();
      expect(
        await screen.findByText(`${mockChannel.name} - ${mockChannel.number}`)
      ).toBeInTheDocument();
    });

    it("should render the channel description", async () => {
      renderComponent();
      expect(await screen.findByText(mockChannel.description)).toBeInTheDocument();
    });

    it("should render the channel thumbnail image", async () => {
      renderComponent();
      expect(await screen.findByAltText(mockChannel.name)).toBeInTheDocument();
    });

    it("should render inside a section element", async () => {
      const { container } = renderComponent();
      await screen.findByText(`${mockChannel.name} - ${mockChannel.number}`);
      expect(container.querySelector<HTMLElement>("section")).toBeInTheDocument();
    });
  });
});
