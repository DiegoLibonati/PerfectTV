import type { Request, Response } from "express";

import { CategoryController } from "@/controllers/category.controller";

import { CategoryService } from "@/services/category.service";

import { mockCategoryWithRelations } from "@tests/__mocks__/category.mock";

jest.mock("@/services/category.service");

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

describe("category.controller", () => {
  describe("getCategories", () => {
    it("should return 200 with categories", async () => {
      (CategoryService.getAllCategories as jest.Mock).mockResolvedValue([
        mockCategoryWithRelations,
      ]);
      const req = buildReq();
      const res: Response = buildRes();

      await CategoryController.getCategories(req, res);

      expect(CategoryService.getAllCategories).toHaveBeenCalledTimes(1);
      expect(res.status).toHaveBeenCalledWith(200);
      expect(res.json).toHaveBeenCalledWith(
        expect.objectContaining({ data: [mockCategoryWithRelations] })
      );
    });

    it("should return 500 when service throws", async () => {
      (CategoryService.getAllCategories as jest.Mock).mockRejectedValue(new Error("DB error"));
      const req = buildReq();
      const res: Response = buildRes();

      await CategoryController.getCategories(req, res);

      expect(res.status).toHaveBeenCalledWith(500);
    });
  });

  describe("addCategory", () => {
    it("should return 201 when category is created", async () => {
      (CategoryService.getCategoryByCode as jest.Mock).mockResolvedValue(null);
      (CategoryService.createCategory as jest.Mock).mockResolvedValue(mockCategoryWithRelations);
      const req = buildReq({ body: { code: "news", description: "News channels" } });
      const res: Response = buildRes();

      await CategoryController.addCategory(req, res);

      expect(CategoryService.getCategoryByCode).toHaveBeenCalledWith("news");
      expect(CategoryService.createCategory).toHaveBeenCalledWith({
        code: "news",
        description: "News channels",
      });
      expect(res.status).toHaveBeenCalledWith(201);
      expect(res.json).toHaveBeenCalledWith(
        expect.objectContaining({ data: mockCategoryWithRelations })
      );
    });

    it("should return 400 when code is missing", async () => {
      const req = buildReq({ body: { description: "News channels" } });
      const res: Response = buildRes();

      await CategoryController.addCategory(req, res);

      expect(res.status).toHaveBeenCalledWith(400);
      expect(CategoryService.createCategory).not.toHaveBeenCalled();
    });

    it("should return 400 when description is missing", async () => {
      const req = buildReq({ body: { code: "news" } });
      const res: Response = buildRes();

      await CategoryController.addCategory(req, res);

      expect(res.status).toHaveBeenCalledWith(400);
      expect(CategoryService.createCategory).not.toHaveBeenCalled();
    });

    it("should return 400 when category already exists", async () => {
      (CategoryService.getCategoryByCode as jest.Mock).mockResolvedValue(mockCategoryWithRelations);
      const req = buildReq({ body: { code: "news", description: "News channels" } });
      const res: Response = buildRes();

      await CategoryController.addCategory(req, res);

      expect(res.status).toHaveBeenCalledWith(400);
      expect(CategoryService.createCategory).not.toHaveBeenCalled();
    });

    it("should trim whitespace from code and description", async () => {
      (CategoryService.getCategoryByCode as jest.Mock).mockResolvedValue(null);
      (CategoryService.createCategory as jest.Mock).mockResolvedValue(mockCategoryWithRelations);
      const req = buildReq({
        body: { code: "  news  ", description: "  News channels  " },
      });
      const res: Response = buildRes();

      await CategoryController.addCategory(req, res);

      expect(CategoryService.getCategoryByCode).toHaveBeenCalledWith("news");
      expect(CategoryService.createCategory).toHaveBeenCalledWith({
        code: "news",
        description: "News channels",
      });
    });

    it("should return 500 when service throws", async () => {
      (CategoryService.getCategoryByCode as jest.Mock).mockRejectedValue(new Error("DB error"));
      const req = buildReq({ body: { code: "news", description: "News" } });
      const res: Response = buildRes();

      await CategoryController.addCategory(req, res);

      expect(res.status).toHaveBeenCalledWith(500);
    });
  });

  describe("deleteCategory", () => {
    it("should return 200 when category is deleted", async () => {
      (CategoryService.getCategoryById as jest.Mock).mockResolvedValue(mockCategoryWithRelations);
      (CategoryService.deleteCategory as jest.Mock).mockResolvedValue(mockCategoryWithRelations);
      const req = buildReq<{ id: string }>({ params: { id: "1" } });
      const res: Response = buildRes();

      await CategoryController.deleteCategory(req, res);

      expect(CategoryService.getCategoryById).toHaveBeenCalledWith(1);
      expect(CategoryService.deleteCategory).toHaveBeenCalledWith(1);
      expect(res.status).toHaveBeenCalledWith(200);
      expect(res.json).toHaveBeenCalledWith(
        expect.objectContaining({ data: mockCategoryWithRelations })
      );
    });

    it("should return 404 when category does not exist", async () => {
      (CategoryService.getCategoryById as jest.Mock).mockResolvedValue(null);
      const req = buildReq<{ id: string }>({ params: { id: "999" } });
      const res: Response = buildRes();

      await CategoryController.deleteCategory(req, res);

      expect(res.status).toHaveBeenCalledWith(404);
      expect(CategoryService.deleteCategory).not.toHaveBeenCalled();
    });

    it("should return 500 when service throws", async () => {
      (CategoryService.getCategoryById as jest.Mock).mockRejectedValue(new Error("DB error"));
      const req = buildReq<{ id: string }>({ params: { id: "1" } });
      const res: Response = buildRes();

      await CategoryController.deleteCategory(req, res);

      expect(res.status).toHaveBeenCalledWith(500);
    });
  });
});
