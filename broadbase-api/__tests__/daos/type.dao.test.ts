import type { Type } from "@prisma/client";
import type { TypeCreatePayload } from "@/types/payloads";

import { TypeDAO } from "@/daos/type.dao";

import { prisma } from "@/configs/prisma.config";

const validPayload: TypeCreatePayload = { code: "public", description: "Public channels" };

describe("type.dao", () => {
  beforeEach(async (): Promise<void> => {
    await prisma.channel.deleteMany();
    await prisma.type.deleteMany();
  });

  afterAll(async (): Promise<void> => {
    await prisma.$disconnect();
  });

  describe("create", () => {
    it("should insert a type and return it with generated id", async () => {
      const result: Type = await TypeDAO.create(validPayload);

      expect(result.id).toEqual(expect.any(Number));
      expect(result.code).toBe(validPayload.code);
      expect(result.description).toBe(validPayload.description);
    });

    it("should persist the type to the database", async () => {
      const created: Type = await TypeDAO.create(validPayload);

      const fromDb: Type | null = await prisma.type.findUnique({ where: { id: created.id } });

      expect(fromDb).not.toBeNull();
      expect(fromDb?.code).toBe(validPayload.code);
    });
  });

  describe("findMany", () => {
    it("should return empty array when no types exist", async () => {
      const result: Type[] = await TypeDAO.findMany();

      expect(result).toEqual([]);
    });

    it("should return all types", async () => {
      await prisma.type.createMany({
        data: [
          { code: "public", description: "Public" },
          { code: "private", description: "Private" },
        ],
      });

      const result: Type[] = await TypeDAO.findMany();

      expect(result).toHaveLength(2);
    });
  });

  describe("findById", () => {
    it("should return the type when it exists", async () => {
      const created: Type = await prisma.type.create({ data: validPayload });

      const result: Type | null = await TypeDAO.findById(created.id);

      expect(result).not.toBeNull();
      expect(result?.id).toBe(created.id);
      expect(result?.code).toBe(validPayload.code);
    });

    it("should return null when the type does not exist", async () => {
      const result: Type | null = await TypeDAO.findById(99999);

      expect(result).toBeNull();
    });
  });

  describe("findByCode", () => {
    it("should return the type when code matches", async () => {
      await prisma.type.create({ data: validPayload });

      const result: Type | null = await TypeDAO.findByCode("public");

      expect(result).not.toBeNull();
      expect(result?.code).toBe("public");
    });

    it("should return null when code does not match", async () => {
      const result: Type | null = await TypeDAO.findByCode("nonexistent");

      expect(result).toBeNull();
    });
  });

  describe("createMany", () => {
    it("should insert multiple types and return count", async () => {
      const data: TypeCreatePayload[] = [
        { code: "public", description: "Public" },
        { code: "private", description: "Private" },
      ];

      const result: { count: number } = await TypeDAO.createMany(data);

      expect(result.count).toBe(2);
      const all: Type[] = await prisma.type.findMany();
      expect(all).toHaveLength(2);
    });

    it("should skip duplicates with skipDuplicates", async () => {
      await prisma.type.create({ data: validPayload });

      const result: { count: number } = await TypeDAO.createMany([validPayload]);

      expect(result.count).toBe(0);
    });
  });

  describe("delete", () => {
    it("should delete an existing type and return it", async () => {
      const created: Type = await prisma.type.create({ data: validPayload });

      const result: Type = await TypeDAO.delete(created.id);

      expect(result.id).toBe(created.id);
      const fromDb: Type | null = await prisma.type.findUnique({ where: { id: created.id } });
      expect(fromDb).toBeNull();
    });

    it("should throw when deleting a non-existent type", async () => {
      await expect(TypeDAO.delete(99999)).rejects.toThrow();
    });
  });
});
