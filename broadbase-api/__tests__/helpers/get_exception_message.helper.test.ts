import { Prisma } from "@prisma/client";

import type { ExceptionInfo } from "@/types/helpers";

import { getExceptionMessage } from "@/helpers/get_exception_message.helper";

import { CODES_ERROR, CODES_NOT } from "@/constants/codes.constant";
import { MESSAGES_ERROR, MESSAGES_NOT } from "@/constants/messages.constant";

describe("get_exception_message.helper", () => {
  it("should return 404 for PrismaClientKnownRequestError with code P2025", () => {
    const error: Prisma.PrismaClientKnownRequestError = new Prisma.PrismaClientKnownRequestError(
      "Record not found",
      { code: "P2025", clientVersion: "5.0.0" }
    );

    const result: ExceptionInfo = getExceptionMessage(error);

    expect(result.status).toBe(404);
    expect(result.code).toBe(CODES_NOT.foundResource);
    expect(result.message).toBe(MESSAGES_NOT.foundResource);
  });

  it("should return 500 for PrismaClientKnownRequestError with code P2002", () => {
    const error: Prisma.PrismaClientKnownRequestError = new Prisma.PrismaClientKnownRequestError(
      "Unique constraint failed",
      { code: "P2002", clientVersion: "5.0.0" }
    );

    const result: ExceptionInfo = getExceptionMessage(error);

    expect(result.status).toBe(500);
    expect(result.code).toBe(CODES_ERROR.generic);
    expect(result.message).toBe(MESSAGES_ERROR.generic);
  });

  it("should return 500 for a generic Error", () => {
    const error: Error = new Error("Something went wrong");

    const result: ExceptionInfo = getExceptionMessage(error);

    expect(result.status).toBe(500);
    expect(result.code).toBe(CODES_ERROR.generic);
    expect(result.message).toBe(MESSAGES_ERROR.generic);
  });

  it("should return 500 for a non-Error throwable string", () => {
    const result: ExceptionInfo = getExceptionMessage("string error");

    expect(result.status).toBe(500);
    expect(result.code).toBe(CODES_ERROR.generic);
    expect(result.message).toBe(MESSAGES_ERROR.generic);
  });

  it("should return 500 for null", () => {
    const result: ExceptionInfo = getExceptionMessage(null);

    expect(result.status).toBe(500);
    expect(result.code).toBe(CODES_ERROR.generic);
  });
});
