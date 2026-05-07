import type { ChannelWithRelations } from "@/types/app";
import type { ChannelCreatePayload, ChannelUpdatePayload } from "@/types/payloads";

import { ChannelDAO } from "@/daos/channel.dao";

import { prisma } from "@/configs/prisma.config";

describe("channel.dao", () => {
  let typeId: number;
  let categoryId: number;
  let sourceId: number;

  const buildChannelPayload = (
    overrides: Partial<ChannelCreatePayload> = {}
  ): ChannelCreatePayload => ({
    name: "Test Channel",
    description: "A test channel",
    thumbUrl: "https://example.com/thumb.jpg",
    url: "https://example.com/stream",
    urlRest: null,
    number: 1,
    idType: typeId,
    idCategory: categoryId,
    idSource: sourceId,
    ...overrides,
  });

  beforeEach(async (): Promise<void> => {
    await prisma.channel.deleteMany();
    await prisma.base.deleteMany();
    await prisma.source.deleteMany();
    await prisma.category.deleteMany();
    await prisma.type.deleteMany();

    const type = await prisma.type.create({ data: { code: "public", description: "Public" } });
    const category = await prisma.category.create({ data: { code: "news", description: "News" } });
    const source = await prisma.source.create({
      data: { code: "youtube", description: "YouTube" },
    });

    typeId = type.id;
    categoryId = category.id;
    sourceId = source.id;
  });

  afterAll(async (): Promise<void> => {
    await prisma.$disconnect();
  });

  describe("create", () => {
    it("should insert a channel and return it with relations", async () => {
      const payload: ChannelCreatePayload = buildChannelPayload();

      const result: ChannelWithRelations = await ChannelDAO.create(payload);

      expect(result.id).toEqual(expect.any(Number));
      expect(result.name).toBe(payload.name);
      expect(result.type.id).toBe(typeId);
      expect(result.category.id).toBe(categoryId);
      expect(result.source.id).toBe(sourceId);
    });

    it("should persist the channel to the database", async () => {
      const payload: ChannelCreatePayload = buildChannelPayload();
      const created: ChannelWithRelations = await ChannelDAO.create(payload);

      const fromDb = await prisma.channel.findUnique({ where: { id: created.id } });

      expect(fromDb).not.toBeNull();
      expect(fromDb?.name).toBe(payload.name);
    });
  });

  describe("findMany", () => {
    it("should return empty array when no channels exist", async () => {
      const result: ChannelWithRelations[] = await ChannelDAO.findMany();

      expect(result).toEqual([]);
    });

    it("should return all channels with relations", async () => {
      await prisma.channel.create({ data: buildChannelPayload() });

      const result: ChannelWithRelations[] = await ChannelDAO.findMany();

      expect(result).toHaveLength(1);
      expect(result[0]!.type).toBeDefined();
      expect(result[0]!.category).toBeDefined();
      expect(result[0]!.source).toBeDefined();
    });
  });

  describe("findById", () => {
    it("should return the channel when it exists", async () => {
      const created = await prisma.channel.create({ data: buildChannelPayload() });

      const result: ChannelWithRelations | null = await ChannelDAO.findById(created.id);

      expect(result).not.toBeNull();
      expect(result?.id).toBe(created.id);
    });

    it("should return null when the channel does not exist", async () => {
      const result: ChannelWithRelations | null = await ChannelDAO.findById(99999);

      expect(result).toBeNull();
    });
  });

  describe("findByNumber", () => {
    it("should return the channel when number matches", async () => {
      await prisma.channel.create({ data: buildChannelPayload({ number: 5 }) });

      const result: ChannelWithRelations | null = await ChannelDAO.findByNumber(5);

      expect(result).not.toBeNull();
      expect(result?.number).toBe(5);
    });

    it("should return null when no channel has that number", async () => {
      const result: ChannelWithRelations | null = await ChannelDAO.findByNumber(99999);

      expect(result).toBeNull();
    });
  });

  describe("update", () => {
    it("should update the channel and return the updated record", async () => {
      const created = await prisma.channel.create({ data: buildChannelPayload() });
      const updateData: ChannelUpdatePayload = { name: "Updated Channel" };

      const result: ChannelWithRelations = await ChannelDAO.update(created.id, updateData);

      expect(result.name).toBe("Updated Channel");
      const fromDb = await prisma.channel.findUnique({ where: { id: created.id } });
      expect(fromDb?.name).toBe("Updated Channel");
    });

    it("should throw when updating a non-existent channel", async () => {
      await expect(ChannelDAO.update(99999, { name: "x" })).rejects.toThrow();
    });
  });

  describe("createMany", () => {
    it("should insert multiple channels and return count", async () => {
      const data: ChannelCreatePayload[] = [
        buildChannelPayload({ name: "Channel 1", number: 1 }),
        buildChannelPayload({ name: "Channel 2", number: 2 }),
      ];

      const result: { count: number } = await ChannelDAO.createMany(data);

      expect(result.count).toBe(2);
    });

    it("should skip duplicates", async () => {
      await prisma.channel.create({ data: buildChannelPayload({ name: "Channel 1", number: 1 }) });

      const result: { count: number } = await ChannelDAO.createMany([
        buildChannelPayload({ name: "Channel 1", number: 1 }),
      ]);

      expect(result.count).toBe(0);
    });
  });

  describe("delete", () => {
    it("should delete an existing channel and return it", async () => {
      const created = await prisma.channel.create({ data: buildChannelPayload() });

      const result: ChannelWithRelations = await ChannelDAO.delete(created.id);

      expect(result.id).toBe(created.id);
      const fromDb = await prisma.channel.findUnique({ where: { id: created.id } });
      expect(fromDb).toBeNull();
    });

    it("should throw when deleting a non-existent channel", async () => {
      await expect(ChannelDAO.delete(99999)).rejects.toThrow();
    });
  });
});
