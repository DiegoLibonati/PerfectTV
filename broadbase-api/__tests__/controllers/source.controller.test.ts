import type { Request, Response } from "express";

import { SourceController } from "@/controllers/source.controller";

import { SourceService } from "@/services/source.service";

import { mockSourceWithRelations } from "@tests/__mocks__/source.mock";

jest.mock("@/services/source.service");

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

describe("source.controller", () => {
  describe("getSources", () => {
    it("should return 200 with sources", async () => {
      (SourceService.getAllSources as jest.Mock).mockResolvedValue([mockSourceWithRelations]);
      const req = buildReq();
      const res: Response = buildRes();

      await SourceController.getSources(req, res);

      expect(SourceService.getAllSources).toHaveBeenCalledTimes(1);
      expect(res.status).toHaveBeenCalledWith(200);
      expect(res.json).toHaveBeenCalledWith(
        expect.objectContaining({ data: [mockSourceWithRelations] })
      );
    });

    it("should return 500 when service throws", async () => {
      (SourceService.getAllSources as jest.Mock).mockRejectedValue(new Error("DB error"));
      const req = buildReq();
      const res: Response = buildRes();

      await SourceController.getSources(req, res);

      expect(res.status).toHaveBeenCalledWith(500);
    });
  });

  describe("addSource", () => {
    it("should return 201 when source is created", async () => {
      (SourceService.getSourceByCode as jest.Mock).mockResolvedValue(null);
      (SourceService.createSource as jest.Mock).mockResolvedValue(mockSourceWithRelations);
      const req = buildReq({ body: { code: "youtube", description: "YouTube" } });
      const res: Response = buildRes();

      await SourceController.addSource(req, res);

      expect(SourceService.getSourceByCode).toHaveBeenCalledWith("youtube");
      expect(SourceService.createSource).toHaveBeenCalledWith({
        code: "youtube",
        description: "YouTube",
      });
      expect(res.status).toHaveBeenCalledWith(201);
      expect(res.json).toHaveBeenCalledWith(
        expect.objectContaining({ data: mockSourceWithRelations })
      );
    });

    it("should return 400 when code is missing", async () => {
      const req = buildReq({ body: { description: "YouTube" } });
      const res: Response = buildRes();

      await SourceController.addSource(req, res);

      expect(res.status).toHaveBeenCalledWith(400);
      expect(SourceService.createSource).not.toHaveBeenCalled();
    });

    it("should return 400 when description is missing", async () => {
      const req = buildReq({ body: { code: "youtube" } });
      const res: Response = buildRes();

      await SourceController.addSource(req, res);

      expect(res.status).toHaveBeenCalledWith(400);
      expect(SourceService.createSource).not.toHaveBeenCalled();
    });

    it("should return 400 when source already exists", async () => {
      (SourceService.getSourceByCode as jest.Mock).mockResolvedValue(mockSourceWithRelations);
      const req = buildReq({ body: { code: "youtube", description: "YouTube" } });
      const res: Response = buildRes();

      await SourceController.addSource(req, res);

      expect(res.status).toHaveBeenCalledWith(400);
      expect(SourceService.createSource).not.toHaveBeenCalled();
    });

    it("should trim whitespace from code and description", async () => {
      (SourceService.getSourceByCode as jest.Mock).mockResolvedValue(null);
      (SourceService.createSource as jest.Mock).mockResolvedValue(mockSourceWithRelations);
      const req = buildReq({
        body: { code: "  youtube  ", description: "  YouTube  " },
      });
      const res: Response = buildRes();

      await SourceController.addSource(req, res);

      expect(SourceService.getSourceByCode).toHaveBeenCalledWith("youtube");
      expect(SourceService.createSource).toHaveBeenCalledWith({
        code: "youtube",
        description: "YouTube",
      });
    });

    it("should return 500 when service throws", async () => {
      (SourceService.getSourceByCode as jest.Mock).mockRejectedValue(new Error("DB error"));
      const req = buildReq({ body: { code: "youtube", description: "YouTube" } });
      const res: Response = buildRes();

      await SourceController.addSource(req, res);

      expect(res.status).toHaveBeenCalledWith(500);
    });
  });

  describe("deleteSource", () => {
    it("should return 200 when source is deleted", async () => {
      (SourceService.getSourceById as jest.Mock).mockResolvedValue(mockSourceWithRelations);
      (SourceService.deleteSource as jest.Mock).mockResolvedValue(mockSourceWithRelations);
      const req = buildReq<{ id: string }>({ params: { id: "1" } });
      const res: Response = buildRes();

      await SourceController.deleteSource(req, res);

      expect(SourceService.getSourceById).toHaveBeenCalledWith(1);
      expect(SourceService.deleteSource).toHaveBeenCalledWith(1);
      expect(res.status).toHaveBeenCalledWith(200);
      expect(res.json).toHaveBeenCalledWith(
        expect.objectContaining({ data: mockSourceWithRelations })
      );
    });

    it("should return 404 when source does not exist", async () => {
      (SourceService.getSourceById as jest.Mock).mockResolvedValue(null);
      const req = buildReq<{ id: string }>({ params: { id: "999" } });
      const res: Response = buildRes();

      await SourceController.deleteSource(req, res);

      expect(res.status).toHaveBeenCalledWith(404);
      expect(SourceService.deleteSource).not.toHaveBeenCalled();
    });

    it("should return 500 when service throws", async () => {
      (SourceService.getSourceById as jest.Mock).mockRejectedValue(new Error("DB error"));
      const req = buildReq<{ id: string }>({ params: { id: "1" } });
      const res: Response = buildRes();

      await SourceController.deleteSource(req, res);

      expect(res.status).toHaveBeenCalledWith(500);
    });
  });
});
