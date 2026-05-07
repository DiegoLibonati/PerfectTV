import type { Request, Response } from "express";
import type { BaseWithRelations } from "@/types/app";

import { BaseController } from "@/controllers/base.controller";

import { BaseService } from "@/services/base.service";

import { mockBaseWithRelations } from "@tests/__mocks__/base.mock";

jest.mock("@/services/base.service");

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

describe("base.controller", () => {
  describe("getBases", () => {
    it("should return 200 with bases", async () => {
      (BaseService.getAllBases as jest.Mock).mockResolvedValue([mockBaseWithRelations]);
      const req = buildReq();
      const res: Response = buildRes();

      await BaseController.getBases(req, res);

      expect(BaseService.getAllBases).toHaveBeenCalledTimes(1);
      expect(res.status).toHaveBeenCalledWith(200);
      expect(res.json).toHaveBeenCalledWith(
        expect.objectContaining({ data: [mockBaseWithRelations] })
      );
    });

    it("should return 500 when service throws", async () => {
      (BaseService.getAllBases as jest.Mock).mockRejectedValue(new Error("DB error"));
      const req = buildReq();
      const res: Response = buildRes();

      await BaseController.getBases(req, res);

      expect(res.status).toHaveBeenCalledWith(500);
    });
  });

  describe("addBase", () => {
    it("should return 201 when base is created", async () => {
      (BaseService.getBaseByIdSource as jest.Mock).mockResolvedValue(null);
      (BaseService.createBase as jest.Mock).mockResolvedValue(mockBaseWithRelations);
      const req = buildReq({
        body: { baseUrl: "https://www.youtube.com/embed/live_stream", idSource: 1 },
      });
      const res: Response = buildRes();

      await BaseController.addBase(req, res);

      expect(BaseService.getBaseByIdSource).toHaveBeenCalledWith(1);
      expect(BaseService.createBase).toHaveBeenCalledWith({
        baseUrl: "https://www.youtube.com/embed/live_stream",
        idSource: 1,
      });
      expect(res.status).toHaveBeenCalledWith(201);
      expect(res.json).toHaveBeenCalledWith(
        expect.objectContaining({ data: mockBaseWithRelations })
      );
    });

    it("should return 400 when baseUrl is missing", async () => {
      const req = buildReq({ body: { idSource: 1 } });
      const res: Response = buildRes();

      await BaseController.addBase(req, res);

      expect(res.status).toHaveBeenCalledWith(400);
      expect(BaseService.createBase).not.toHaveBeenCalled();
    });

    it("should return 400 when idSource is missing", async () => {
      const req = buildReq({ body: { baseUrl: "https://example.com/embed" } });
      const res: Response = buildRes();

      await BaseController.addBase(req, res);

      expect(res.status).toHaveBeenCalledWith(400);
      expect(BaseService.createBase).not.toHaveBeenCalled();
    });

    it("should return 400 when base already exists for this source", async () => {
      (BaseService.getBaseByIdSource as jest.Mock).mockResolvedValue(mockBaseWithRelations);
      const req = buildReq({
        body: { baseUrl: "https://example.com/embed", idSource: 1 },
      });
      const res: Response = buildRes();

      await BaseController.addBase(req, res);

      expect(res.status).toHaveBeenCalledWith(400);
      expect(BaseService.createBase).not.toHaveBeenCalled();
    });

    it("should trim whitespace from baseUrl", async () => {
      (BaseService.getBaseByIdSource as jest.Mock).mockResolvedValue(null);
      (BaseService.createBase as jest.Mock).mockResolvedValue(mockBaseWithRelations);
      const req = buildReq({
        body: { baseUrl: "  https://example.com/embed  ", idSource: 1 },
      });
      const res: Response = buildRes();

      await BaseController.addBase(req, res);

      expect(BaseService.createBase).toHaveBeenCalledWith({
        baseUrl: "https://example.com/embed",
        idSource: 1,
      });
    });

    it("should return 500 when service throws", async () => {
      (BaseService.getBaseByIdSource as jest.Mock).mockRejectedValue(new Error("DB error"));
      const req = buildReq({
        body: { baseUrl: "https://example.com/embed", idSource: 1 },
      });
      const res: Response = buildRes();

      await BaseController.addBase(req, res);

      expect(res.status).toHaveBeenCalledWith(500);
    });
  });

  describe("updateBase", () => {
    it("should return 200 when base is updated", async () => {
      const updatedBase: BaseWithRelations = {
        ...mockBaseWithRelations,
        baseUrl: "https://new.com/embed",
      };
      (BaseService.getBaseById as jest.Mock).mockResolvedValue(mockBaseWithRelations);
      (BaseService.updateBase as jest.Mock).mockResolvedValue(updatedBase);
      const req = buildReq<{ id: string }>({
        params: { id: "1" },
        body: { baseUrl: "https://new.com/embed" },
      });
      const res: Response = buildRes();

      await BaseController.updateBase(req, res);

      expect(BaseService.getBaseById).toHaveBeenCalledWith(1);
      expect(res.status).toHaveBeenCalledWith(200);
      expect(res.json).toHaveBeenCalledWith(expect.objectContaining({ data: updatedBase }));
    });

    it("should return 404 when base does not exist", async () => {
      (BaseService.getBaseById as jest.Mock).mockResolvedValue(null);
      const req = buildReq<{ id: string }>({
        params: { id: "999" },
        body: { baseUrl: "https://x.com" },
      });
      const res: Response = buildRes();

      await BaseController.updateBase(req, res);

      expect(res.status).toHaveBeenCalledWith(404);
      expect(BaseService.updateBase).not.toHaveBeenCalled();
    });

    it("should return 500 when service throws", async () => {
      (BaseService.getBaseById as jest.Mock).mockRejectedValue(new Error("DB error"));
      const req = buildReq<{ id: string }>({ params: { id: "1" } });
      const res: Response = buildRes();

      await BaseController.updateBase(req, res);

      expect(res.status).toHaveBeenCalledWith(500);
    });
  });

  describe("deleteBase", () => {
    it("should return 200 when base is deleted", async () => {
      (BaseService.getBaseById as jest.Mock).mockResolvedValue(mockBaseWithRelations);
      (BaseService.deleteBase as jest.Mock).mockResolvedValue(mockBaseWithRelations);
      const req = buildReq<{ id: string }>({ params: { id: "1" } });
      const res: Response = buildRes();

      await BaseController.deleteBase(req, res);

      expect(BaseService.getBaseById).toHaveBeenCalledWith(1);
      expect(BaseService.deleteBase).toHaveBeenCalledWith(1);
      expect(res.status).toHaveBeenCalledWith(200);
      expect(res.json).toHaveBeenCalledWith(
        expect.objectContaining({ data: mockBaseWithRelations })
      );
    });

    it("should return 404 when base does not exist", async () => {
      (BaseService.getBaseById as jest.Mock).mockResolvedValue(null);
      const req = buildReq<{ id: string }>({ params: { id: "999" } });
      const res: Response = buildRes();

      await BaseController.deleteBase(req, res);

      expect(res.status).toHaveBeenCalledWith(404);
      expect(BaseService.deleteBase).not.toHaveBeenCalled();
    });

    it("should return 500 when service throws", async () => {
      (BaseService.getBaseById as jest.Mock).mockRejectedValue(new Error("DB error"));
      const req = buildReq<{ id: string }>({ params: { id: "1" } });
      const res: Response = buildRes();

      await BaseController.deleteBase(req, res);

      expect(res.status).toHaveBeenCalledWith(500);
    });
  });
});
