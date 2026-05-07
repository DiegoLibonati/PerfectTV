import type { CategoryWithRelations } from "@/types/app";
import type { CategoryCreatePayload } from "@/types/payloads";

import { CategoryDAO } from "@/daos/category.dao";

import { prisma } from "@/configs/prisma.config";

const validPayload: CategoryCreatePayload = { code: "news", description: "News channels" };

describe("category.dao", () => {
  beforeEach(async (): Promise<void> => {
    await prisma.channel.deleteMany();
    await prisma.category.deleteMany();
  });

  afterAll(async (): Promise<void> => {
    await prisma.$disconnect();
  });

  describe("create", () => {
    it("should insert a category and return it with channels included", async () => {
      const result: CategoryWithRelations = await CategoryDAO.create(validPayload);

      expect(result.id).toEqual(expect.any(Number));
      expect(result.code).toBe(validPayload.code);
      expect(result.description).toBe(validPayload.description);
      expect(result.channels).toEqual([]);
    });

    it("should persist the category to the database", async () => {
      const created: CategoryWithRelations = await CategoryDAO.create(validPayload);

      const fromDb = await prisma.category.findUnique({ where: { id: created.id } });

      expect(fromDb).not.toBeNull();
      expect(fromDb?.code).toBe(validPayload.code);
    });
  });

  describe("findMany", () => {
    it("should return empty array when no categories exist", async () => {
      const result: CategoryWithRelations[] = await CategoryDAO.findMany();

      expect(result).toEqual([]);
    });

    it("should return all categories with channels", async () => {
      await prisma.category.createMany({
        data: [
          { code: "news", description: "News" },
          { code: "gameplays", description: "Gameplays" },
        ],
      });

      const result: CategoryWithRelations[] = await CategoryDAO.findMany();

      expect(result).toHaveLength(2);
      expect(result[0]!.channels).toBeDefined();
    });
  });

  describe("findById", () => {
    it("should return the category when it exists", async () => {
      const created = await prisma.category.create({ data: validPayload });

      const result: CategoryWithRelations | null = await CategoryDAO.findById(created.id);

      expect(result).not.toBeNull();
      expect(result?.id).toBe(created.id);
    });

    it("should return null when the category does not exist", async () => {
      const result: CategoryWithRelations | null = await CategoryDAO.findById(99999);

      expect(result).toBeNull();
    });
  });

  describe("findByCode", () => {
    it("should return the category when code matches", async () => {
      await prisma.category.create({ data: validPayload });

      const result: CategoryWithRelations | null = await CategoryDAO.findByCode("news");

      expect(result).not.toBeNull();
      expect(result?.code).toBe("news");
    });

    it("should return null when code does not match", async () => {
      const result: CategoryWithRelations | null = await CategoryDAO.findByCode("nonexistent");

      expect(result).toBeNull();
    });
  });

  describe("createMany", () => {
    it("should insert multiple categories and return count", async () => {
      const data: CategoryCreatePayload[] = [
        { code: "news", description: "News" },
        { code: "gameplays", description: "Gameplays" },
      ];

      const result: { count: number } = await CategoryDAO.createMany(data);

      expect(result.count).toBe(2);
    });

    it("should skip duplicates", async () => {
      await prisma.category.create({ data: validPayload });

      const result: { count: number } = await CategoryDAO.createMany([validPayload]);

      expect(result.count).toBe(0);
    });
  });

  describe("delete", () => {
    it("should delete an existing category and return it", async () => {
      const created = await prisma.category.create({ data: validPayload });

      const result: CategoryWithRelations = await CategoryDAO.delete(created.id);

      expect(result.id).toBe(created.id);
      const fromDb = await prisma.category.findUnique({ where: { id: created.id } });
      expect(fromDb).toBeNull();
    });

    it("should throw when deleting a non-existent category", async () => {
      await expect(CategoryDAO.delete(99999)).rejects.toThrow();
    });
  });
});
