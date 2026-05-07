import type { NextFunction, Request, Response } from "express";

import { errorHandler } from "@/middlewares/error_handler.middleware";

import { CODES_ERROR } from "@/constants/codes.constant";
import { MESSAGES_ERROR } from "@/constants/messages.constant";

const buildReq = (): Partial<Request> => ({});

const buildRes = (): Partial<Response> => {
  const res: Partial<Response> = {};
  res.status = jest.fn().mockReturnValue(res);
  res.json = jest.fn().mockReturnValue(res);
  return res;
};

describe("error_handler.middleware", () => {
  it("should respond with status 500", () => {
    const err: Error = new Error("unexpected error");
    const req: Request = buildReq() as Request;
    const res: Response = buildRes() as Response;
    const next: NextFunction = jest.fn();

    errorHandler(err, req, res, next);

    expect(res.status).toHaveBeenCalledWith(500);
    expect(res.status).toHaveBeenCalledTimes(1);
  });

  it("should respond with the generic error code and message", () => {
    const err: Error = new Error("unexpected error");
    const req: Request = buildReq() as Request;
    const res: Response = buildRes() as Response;
    const next: NextFunction = jest.fn();

    errorHandler(err, req, res, next);

    expect(res.json).toHaveBeenCalledWith({
      code: CODES_ERROR.generic,
      message: MESSAGES_ERROR.generic,
    });
  });

  it("should not call next", () => {
    const err: Error = new Error("unexpected error");
    const req: Request = buildReq() as Request;
    const res: Response = buildRes() as Response;
    const next: NextFunction = jest.fn();

    errorHandler(err, req, res, next);

    expect(next).not.toHaveBeenCalled();
  });

  it("should log the error stack when stack is available", () => {
    const consoleErrorSpy = jest.spyOn(console, "error").mockImplementation(() => {
      // Empty fn
    });
    const err: Error = new Error("boom");
    err.stack = "Error: boom\n    at test.ts:1";
    const req: Request = buildReq() as Request;
    const res: Response = buildRes() as Response;
    const next: NextFunction = jest.fn();

    errorHandler(err, req, res, next);

    expect(consoleErrorSpy).toHaveBeenCalledWith("Error: boom\n    at test.ts:1");
  });

  it("should log the error message when stack is not available", () => {
    const consoleErrorSpy = jest.spyOn(console, "error").mockImplementation(() => {
      // Empty fn
    });
    const err: Error = new Error("boom");
    err.stack = undefined!;
    const req: Request = buildReq() as Request;
    const res: Response = buildRes() as Response;
    const next: NextFunction = jest.fn();

    errorHandler(err, req, res, next);

    expect(consoleErrorSpy).toHaveBeenCalledWith("boom");
  });
});
