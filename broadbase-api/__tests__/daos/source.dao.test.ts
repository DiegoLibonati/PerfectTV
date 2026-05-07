import type { SourceWithRelations } from "@/types/app";
import type { SourceCreatePayload } from "@/types/payloads";

import { SourceDAO } from "@/daos/source.dao";

import { prisma } from "@/configs/prisma.config";

const validPayload: SourceCreatePayload = { code: "youtube", description: "YouTube" };

describe("source.dao", () => {
  beforeEach(async (): Promise<void> => {
    await prisma.channel.deleteMany();
    await prisma.base.deleteMany();
    await prisma.source.deleteMany();
  });

  afterAll(async (): Promise<void> => {
    await prisma.$disconnect();
  });

  describe("create", () => {
    it("should insert a source and return it with base included", async () => {
      const result: SourceWithRelations = await SourceDAO.create(validPayload);

      expect(result.id).toEqual(expect.any(Number));
      expect(result.code).toBe(validPayload.code);
      expect(result.description).toBe(validPayload.description);
      expect(result.base).toBeNull();
    });

    it("should persist the source to the database", async () => {
      const created: SourceWithRelations = await SourceDAO.create(validPayload);

      const fromDb = await prisma.source.findUnique({ where: { id: created.id } });

      expect(fromDb).not.toBeNull();
      expect(fromDb?.code).toBe(validPayload.code);
    });
  });

  describe("findMany", () => {
    it("should return empty array when no sources exist", async () => {
      const result: SourceWithRelations[] = await SourceDAO.findMany();

      expect(result).toEqual([]);
    });

    it("should return all sources", async () => {
      await prisma.source.createMany({
        data: [
          { code: "youtube", description: "YouTube" },
          { code: "twitch", description: "Twitch" },
        ],
      });

      const result: SourceWithRelations[] = await SourceDAO.findMany();

      expect(result).toHaveLength(2);
    });
  });

  describe("findById", () => {
    it("should return the source when it exists", async () => {
      const created = await prisma.source.create({ data: validPayload });

      const result: SourceWithRelations | null = await SourceDAO.findById(created.id);

      expect(result).not.toBeNull();
      expect(result?.id).toBe(created.id);
    });

    it("should return null when the source does not exist", async () => {
      const result: SourceWithRelations | null = await SourceDAO.findById(99999);

      expect(result).toBeNull();
    });
  });

  describe("findByCode", () => {
    it("should return the source when code matches", async () => {
      await prisma.source.create({ data: validPayload });

      const result: SourceWithRelations | null = await SourceDAO.findByCode("youtube");

      expect(result).not.toBeNull();
      expect(result?.code).toBe("youtube");
    });

    it("should return null when code does not match", async () => {
      const result: SourceWithRelations | null = await SourceDAO.findByCode("nonexistent");

      expect(result).toBeNull();
    });
  });

  describe("findByCodes", () => {
    it("should return sources matching the provided codes", async () => {
      await prisma.source.createMany({
        data: [
          { code: "youtube", description: "YouTube" },
          { code: "twitch", description: "Twitch" },
          { code: "ftv", description: "FTV" },
        ],
      });

      const result: SourceWithRelations[] = await SourceDAO.findByCodes(["youtube", "twitch"]);

      expect(result).toHaveLength(2);
      expect(result.map((s) => s.code).sort()).toEqual(["twitch", "youtube"]);
    });

    it("should return empty array when no codes match", async () => {
      const result: SourceWithRelations[] = await SourceDAO.findByCodes(["nonexistent"]);

      expect(result).toEqual([]);
    });
  });

  describe("createMany", () => {
    it("should insert multiple sources and return count", async () => {
      const data: SourceCreatePayload[] = [
        { code: "youtube", description: "YouTube" },
        { code: "twitch", description: "Twitch" },
      ];

      const result: { count: number } = await SourceDAO.createMany(data);

      expect(result.count).toBe(2);
    });

    it("should skip duplicates", async () => {
      await prisma.source.create({ data: validPayload });

      const result: { count: number } = await SourceDAO.createMany([validPayload]);

      expect(result.count).toBe(0);
    });
  });

  describe("delete", () => {
    it("should delete an existing source and return it", async () => {
      const created = await prisma.source.create({ data: validPayload });

      const result: SourceWithRelations = await SourceDAO.delete(created.id);

      expect(result.id).toBe(created.id);
      const fromDb = await prisma.source.findUnique({ where: { id: created.id } });
      expect(fromDb).toBeNull();
    });

    it("should throw when deleting a non-existent source", async () => {
      await expect(SourceDAO.delete(99999)).rejects.toThrow();
    });
  });
});
