import "@testing-library/jest-dom";

import { TextDecoder, TextEncoder } from "util";

Object.assign(global, { TextDecoder, TextEncoder });

window.focus = jest.fn();
window.scrollTo = jest.fn();
