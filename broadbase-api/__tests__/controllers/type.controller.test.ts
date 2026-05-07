import type { Request, Response } from "express";

import { TypeController } from "@/controllers/type.controller";

import { TypeService } from "@/services/type.service";

import { mockType } from "@tests/__mocks__/type.mock";

jest.mock("@/services/type.service");

const buildReq = <
  P extends Record<string, string> = Record<string, string>,
  B extends object = object,
>(
  overrides: { params?: P; body?: B; query?: Record<string, string> } = {}
): Request<P, object, B> =>
  ({ params: {} as P, query: {}, body: {} as B, ...overrides }) as unknown as Request<P, object, B>;

const buildRes = (): Response => {
  const res: Partial<Response> = {};
  res.status = jest.fn().mockReturnValue(res);
  res.json = jest.fn().mockReturnValue(res);
  return res as Response;
};

describe("type.controller", () => {
  describe("getTypes", () => {
    it("should return 200 with types", async () => {
      (TypeService.getAllTypes as jest.Mock).mockResolvedValue([mockType]);
      const req = buildReq();
      const res: Response = buildRes();

      await TypeController.getTypes(req, res);

      expect(TypeService.getAllTypes).toHaveBeenCalledTimes(1);
      expect(res.status).toHaveBeenCalledWith(200);
      expect(res.json).toHaveBeenCalledWith(expect.objectContaining({ data: [mockType] }));
    });

    it("should return 500 when service throws", async () => {
      (TypeService.getAllTypes as jest.Mock).mockRejectedValue(new Error("DB error"));
      const req = buildReq();
      const res: Response = buildRes();

      await TypeController.getTypes(req, res);

      expect(res.status).toHaveBeenCalledWith(500);
    });
  });

  describe("addType", () => {
    it("should return 201 when type is created", async () => {
      (TypeService.getTypeByCode as jest.Mock).mockResolvedValue(null);
      (TypeService.createType as jest.Mock).mockResolvedValue(mockType);
      const req = buildReq({ body: { code: "public", description: "Public channels" } });
      const res: Response = buildRes();

      await TypeController.addType(req, res);

      expect(TypeService.getTypeByCode).toHaveBeenCalledWith("public");
      expect(TypeService.createType).toHaveBeenCalledWith({
        code: "public",
        description: "Public channels",
      });
      expect(res.status).toHaveBeenCalledWith(201);
      expect(res.json).toHaveBeenCalledWith(expect.objectContaining({ data: mockType }));
    });

    it("should return 400 when code is missing", async () => {
      const req = buildReq({ body: { description: "Public channels" } });
      const res: Response = buildRes();

      await TypeController.addType(req, res);

      expect(res.status).toHaveBeenCalledWith(400);
      expect(TypeService.createType).not.toHaveBeenCalled();
    });

    it("should return 400 when description is missing", async () => {
      const req = buildReq({ body: { code: "public" } });
      const res: Response = buildRes();

      await TypeController.addType(req, res);

      expect(res.status).toHaveBeenCalledWith(400);
      expect(TypeService.createType).not.toHaveBeenCalled();
    });

    it("should return 400 when type already exists", async () => {
      (TypeService.getTypeByCode as jest.Mock).mockResolvedValue(mockType);
      const req = buildReq({ body: { code: "public", description: "Public channels" } });
      const res: Response = buildRes();

      await TypeController.addType(req, res);

      expect(res.status).toHaveBeenCalledWith(400);
      expect(TypeService.createType).not.toHaveBeenCalled();
    });

    it("should trim whitespace from code and description", async () => {
      (TypeService.getTypeByCode as jest.Mock).mockResolvedValue(null);
      (TypeService.createType as jest.Mock).mockResolvedValue(mockType);
      const req = buildReq({
        body: { code: "  public  ", description: "  Public channels  " },
      });
      const res: Response = buildRes();

      await TypeController.addType(req, res);

      expect(TypeService.getTypeByCode).toHaveBeenCalledWith("public");
      expect(TypeService.createType).toHaveBeenCalledWith({
        code: "public",
        description: "Public channels",
      });
    });

    it("should return 500 when service throws", async () => {
      (TypeService.getTypeByCode as jest.Mock).mockRejectedValue(new Error("DB error"));
      const req = buildReq({ body: { code: "public", description: "Public" } });
      const res: Response = buildRes();

      await TypeController.addType(req, res);

      expect(res.status).toHaveBeenCalledWith(500);
    });
  });

  describe("deleteType", () => {
    it("should return 200 when type is deleted", async () => {
      (TypeService.getTypeById as jest.Mock).mockResolvedValue(mockType);
      (TypeService.deleteType as jest.Mock).mockResolvedValue(mockType);
      const req = buildReq<{ id: string }>({ params: { id: "1" } });
      const res: Response = buildRes();

      await TypeController.deleteType(req, res);

      expect(TypeService.getTypeById).toHaveBeenCalledWith(1);
      expect(TypeService.deleteType).toHaveBeenCalledWith(1);
      expect(res.status).toHaveBeenCalledWith(200);
      expect(res.json).toHaveBeenCalledWith(expect.objectContaining({ data: mockType }));
    });

    it("should return 404 when type does not exist", async () => {
      (TypeService.getTypeById as jest.Mock).mockResolvedValue(null);
      const req = buildReq<{ id: string }>({ params: { id: "999" } });
      const res: Response = buildRes();

      await TypeController.deleteType(req, res);

      expect(res.status).toHaveBeenCalledWith(404);
      expect(TypeService.deleteType).not.toHaveBeenCalled();
    });

    it("should return 500 when service throws", async () => {
      (TypeService.getTypeById as jest.Mock).mockRejectedValue(new Error("DB error"));
      const req = buildReq<{ id: string }>({ params: { id: "1" } });
      const res: Response = buildRes();

      await TypeController.deleteType(req, res);

      expect(res.status).toHaveBeenCalledWith(500);
    });
  });
});
