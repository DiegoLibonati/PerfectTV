import { afterEach, beforeAll, vi } from "vitest";
import { cleanup } from "@testing-library/react";

import "@testing-library/jest-dom/vitest";

afterEach(() => {
  cleanup();
});

beforeAll(() => {
  window.focus = vi.fn();
  window.scrollTo = vi.fn();
});
