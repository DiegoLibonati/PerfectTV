import type { Request, Response } from "express";

import { notFoundHandler } from "@/middlewares/not_found_handler.middleware";

import { CODES_NOT } from "@/constants/codes.constant";
import { MESSAGES_NOT } from "@/constants/messages.constant";

const buildReq = (): Partial<Request> => ({});

const buildRes = (): Partial<Response> => {
  const res: Partial<Response> = {};
  res.status = jest.fn().mockReturnValue(res);
  res.json = jest.fn().mockReturnValue(res);
  return res;
};

describe("not_found_handler.middleware", () => {
  it("should respond with status 404", () => {
    const req: Request = buildReq() as Request;
    const res: Response = buildRes() as Response;

    notFoundHandler(req, res);

    expect(res.status).toHaveBeenCalledWith(404);
    expect(res.status).toHaveBeenCalledTimes(1);
  });

  it("should respond with the not found code and message", () => {
    const req: Request = buildReq() as Request;
    const res: Response = buildRes() as Response;

    notFoundHandler(req, res);

    expect(res.json).toHaveBeenCalledWith({
      code: CODES_NOT.foundRoute,
      message: MESSAGES_NOT.foundRoute,
    });
  });

  it("should call status and json exactly once each", () => {
    const req: Request = buildReq() as Request;
    const res: Response = buildRes() as Response;

    notFoundHandler(req, res);

    expect(res.status).toHaveBeenCalledTimes(1);
    expect(res.json).toHaveBeenCalledTimes(1);
  });
});
