import { describe, expect, test } from "vitest";
import { render, screen } from "@testing-library/react";

import { SideBar } from "@/src/components/SideBar/SideBar";

import { ClientProvider } from "@/src/contexts/Client/ClientProvider";

describe("SideBar", () => {
  describe("General Tests.", () => {
    const props = {
      isOpen: false,
      title: "1234",
    };

    test("It must render the component correctly.", () => {
      const { container } = render(
        <ClientProvider>
          <SideBar isOpen={props.isOpen} title={props.title}>
            <p>Hola</p>
          </SideBar>
        </ClientProvider>
      );

      const aside = container.querySelector("aside");
      const title = screen.getByRole("heading", {
        name: new RegExp(props.title),
      });
      const paragraph = screen.getByText("Hola");

      expect(aside).toBeInTheDocument();
      expect(title).toBeInTheDocument();
      expect(paragraph).toBeInTheDocument();
    });
  });

  describe("If key isOpen is true", () => {
    const props = {
      isOpen: true,
      title: "1234",
    };

    test("It must open the sidebar.", () => {
      const { container } = render(
        <ClientProvider>
          <SideBar isOpen={props.isOpen} title={props.title}>
            <p>Hola</p>
          </SideBar>
        </ClientProvider>
      );

      const aside = container.querySelector("aside");

      expect(aside).toBeInTheDocument();
      expect(aside?.className.includes("w-full p-4 lg:w-[35%]"));
    });
  });

  describe("If key isOpen is false", () => {
    const props = {
      isOpen: true,
      title: "1234",
    };

    test("It must close the sidebar.", () => {
      const { container } = render(
        <ClientProvider>
          <SideBar isOpen={props.isOpen} title={props.title}>
            <p>Hola</p>
          </SideBar>
        </ClientProvider>
      );

      const aside = container.querySelector("aside");

      expect(aside).toBeInTheDocument();
      expect(aside?.className.includes("w-0 p-0 lg:w-0"));
    });
  });
});
