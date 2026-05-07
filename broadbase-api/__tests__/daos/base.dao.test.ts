import type { BaseWithRelations } from "@/types/app";
import type { BaseCreatePayload, BaseUpdatePayload } from "@/types/payloads";

import { BaseDAO } from "@/daos/base.dao";

import { prisma } from "@/configs/prisma.config";

describe("base.dao", () => {
  let sourceId: number;

  beforeEach(async (): Promise<void> => {
    await prisma.channel.deleteMany();
    await prisma.base.deleteMany();
    await prisma.source.deleteMany();

    const source = await prisma.source.create({
      data: { code: "youtube", description: "YouTube" },
    });
    sourceId = source.id;
  });

  afterAll(async (): Promise<void> => {
    await prisma.$disconnect();
  });

  describe("create", () => {
    it("should insert a base and return it with source included", async () => {
      const payload: BaseCreatePayload = {
        baseUrl: "https://www.youtube.com/embed/live_stream",
        idSource: sourceId,
      };

      const result: BaseWithRelations = await BaseDAO.create(payload);

      expect(result.id).toEqual(expect.any(Number));
      expect(result.baseUrl).toBe(payload.baseUrl);
      expect(result.idSource).toBe(sourceId);
      expect(result.source.id).toBe(sourceId);
    });

    it("should persist the base to the database", async () => {
      const payload: BaseCreatePayload = {
        baseUrl: "https://www.youtube.com/embed/live_stream",
        idSource: sourceId,
      };
      const created: BaseWithRelations = await BaseDAO.create(payload);

      const fromDb = await prisma.base.findUnique({ where: { id: created.id } });

      expect(fromDb).not.toBeNull();
      expect(fromDb?.baseUrl).toBe(payload.baseUrl);
    });
  });

  describe("findMany", () => {
    it("should return empty array when no bases exist", async () => {
      const result: BaseWithRelations[] = await BaseDAO.findMany();

      expect(result).toEqual([]);
    });

    it("should return all bases with their sources", async () => {
      await prisma.base.create({
        data: { baseUrl: "https://www.youtube.com/embed/live_stream", idSource: sourceId },
      });

      const result: BaseWithRelations[] = await BaseDAO.findMany();

      expect(result).toHaveLength(1);
      expect(result[0]!.source.id).toBe(sourceId);
    });
  });

  describe("findById", () => {
    it("should return the base when it exists", async () => {
      const created = await prisma.base.create({
        data: { baseUrl: "https://example.com/embed", idSource: sourceId },
      });

      const result: BaseWithRelations | null = await BaseDAO.findById(created.id);

      expect(result).not.toBeNull();
      expect(result?.id).toBe(created.id);
    });

    it("should return null when the base does not exist", async () => {
      const result: BaseWithRelations | null = await BaseDAO.findById(99999);

      expect(result).toBeNull();
    });
  });

  describe("findByIdSource", () => {
    it("should return the base when source ID matches", async () => {
      await prisma.base.create({
        data: { baseUrl: "https://example.com/embed", idSource: sourceId },
      });

      const result: BaseWithRelations | null = await BaseDAO.findByIdSource(sourceId);

      expect(result).not.toBeNull();
      expect(result?.idSource).toBe(sourceId);
    });

    it("should return null when no base matches the source ID", async () => {
      const result: BaseWithRelations | null = await BaseDAO.findByIdSource(99999);

      expect(result).toBeNull();
    });
  });

  describe("update", () => {
    it("should update the base URL and return updated base", async () => {
      const created = await prisma.base.create({
        data: { baseUrl: "https://old.com/embed", idSource: sourceId },
      });
      const updateData: BaseUpdatePayload = { baseUrl: "https://new.com/embed" };

      const result: BaseWithRelations = await BaseDAO.update(created.id, updateData);

      expect(result.baseUrl).toBe("https://new.com/embed");
      const fromDb = await prisma.base.findUnique({ where: { id: created.id } });
      expect(fromDb?.baseUrl).toBe("https://new.com/embed");
    });

    it("should throw when updating a non-existent base", async () => {
      await expect(BaseDAO.update(99999, { baseUrl: "https://x.com" })).rejects.toThrow();
    });
  });

  describe("upsertByIdSource", () => {
    it("should create a new base when none exists for the source", async () => {
      const result: BaseWithRelations = await BaseDAO.upsertByIdSource(
        sourceId,
        "https://new.com/embed"
      );

      expect(result.idSource).toBe(sourceId);
      expect(result.baseUrl).toBe("https://new.com/embed");
    });

    it("should update the existing base URL when one already exists", async () => {
      await prisma.base.create({
        data: { baseUrl: "https://old.com/embed", idSource: sourceId },
      });

      const result: BaseWithRelations = await BaseDAO.upsertByIdSource(
        sourceId,
        "https://updated.com/embed"
      );

      expect(result.baseUrl).toBe("https://updated.com/embed");
      const count: number = await prisma.base.count();
      expect(count).toBe(1);
    });
  });

  describe("delete", () => {
    it("should delete an existing base and return it", async () => {
      const created = await prisma.base.create({
        data: { baseUrl: "https://example.com/embed", idSource: sourceId },
      });

      const result: BaseWithRelations = await BaseDAO.delete(created.id);

      expect(result.id).toBe(created.id);
      const fromDb = await prisma.base.findUnique({ where: { id: created.id } });
      expect(fromDb).toBeNull();
    });

    it("should throw when deleting a non-existent base", async () => {
      await expect(BaseDAO.delete(99999)).rejects.toThrow();
    });
  });
});
