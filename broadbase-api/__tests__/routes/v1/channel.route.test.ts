import request from "supertest";

import type { Response } from "supertest";
import type { Express } from "express";

import app from "@/app";

import { prisma } from "@/configs/prisma.config";

const baseUrl = "/api/v1/channels";

describe("channel.route", () => {
  let typeId: number;
  let categoryId: number;
  let sourceId: number;

  const buildChannelBody = (overrides: Record<string, unknown> = {}): Record<string, unknown> => ({
    name: "Test Channel",
    description: "A test channel",
    thumbUrl: "https://example.com/thumb.jpg",
    url: "https://www.youtube.com/embed/live_stream?channel=abc",
    urlRest: "?channel=abc",
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

  describe(`GET ${baseUrl}`, () => {
    it("should return 200 with empty array when no channels exist", async () => {
      const response: Response = await request(app as Express).get(baseUrl);

      expect(response.status).toBe(200);
      expect(response.body.data).toEqual([]);
    });

    it("should return 200 with all channels", async () => {
      await prisma.channel.create({
        data: {
          name: "Test Channel",
          description: "Test",
          thumbUrl: "https://example.com/thumb.jpg",
          url: "https://example.com/stream",
          urlRest: null,
          number: 1,
          idType: typeId,
          idCategory: categoryId,
          idSource: sourceId,
        },
      });

      const response: Response = await request(app as Express).get(baseUrl);

      expect(response.status).toBe(200);
      expect(response.body.data).toHaveLength(1);
    });
  });

  describe(`GET ${baseUrl}/numbers`, () => {
    it("should return 200 with sorted channel numbers", async () => {
      await prisma.channel.createMany({
        data: [
          {
            name: "Channel 3",
            description: "C",
            thumbUrl: "https://example.com/t.jpg",
            url: "https://example.com/3",
            urlRest: null,
            number: 3,
            idType: typeId,
            idCategory: categoryId,
            idSource: sourceId,
          },
          {
            name: "Channel 1",
            description: "A",
            thumbUrl: "https://example.com/t.jpg",
            url: "https://example.com/1",
            urlRest: null,
            number: 1,
            idType: typeId,
            idCategory: categoryId,
            idSource: sourceId,
          },
        ],
      });

      const response: Response = await request(app as Express).get(`${baseUrl}/numbers`);

      expect(response.status).toBe(200);
      expect(response.body.data).toEqual([1, 3]);
    });

    it("should return 200 with empty array when no channels exist", async () => {
      const response: Response = await request(app as Express).get(`${baseUrl}/numbers`);

      expect(response.status).toBe(200);
      expect(response.body.data).toEqual([]);
    });
  });

  describe(`GET ${baseUrl}/:number`, () => {
    it("should return 200 with the channel when it exists", async () => {
      const channel = await prisma.channel.create({
        data: {
          name: "Test Channel",
          description: "Test",
          thumbUrl: "https://example.com/thumb.jpg",
          url: "https://www.youtube.com/embed/live_stream",
          urlRest: null,
          number: 5,
          idType: typeId,
          idCategory: categoryId,
          idSource: sourceId,
        },
      });

      const response: Response = await request(app as Express).get(`${baseUrl}/${channel.number}`);

      expect(response.status).toBe(200);
      expect(response.body.data.id).toBe(channel.id);
      expect(response.body.data.number).toBe(5);
    });

    it("should return 404 when channel does not exist", async () => {
      const response: Response = await request(app as Express).get(`${baseUrl}/99999`);

      expect(response.status).toBe(404);
    });
  });

  describe(`POST ${baseUrl}`, () => {
    it("should return 201 and create a channel", async () => {
      const response: Response = await request(app as Express)
        .post(baseUrl)
        .send(buildChannelBody());

      expect(response.status).toBe(201);
      expect(response.body.data.name).toBe("Test Channel");
      expect(response.body.data.number).toBe(1);

      const fromDb = await prisma.channel.findUnique({ where: { id: response.body.data.id } });
      expect(fromDb).not.toBeNull();
    });

    it("should return 400 when required fields are missing", async () => {
      const response: Response = await request(app as Express)
        .post(baseUrl)
        .send({ name: "Test Channel" });

      expect(response.status).toBe(400);

      const count: number = await prisma.channel.count();
      expect(count).toBe(0);
    });

    it("should return 400 when channel already exists", async () => {
      await prisma.channel.create({
        data: {
          name: "Test Channel",
          description: "Test",
          thumbUrl: "https://example.com/thumb.jpg",
          url: "https://example.com/stream",
          urlRest: null,
          number: 1,
          idType: typeId,
          idCategory: categoryId,
          idSource: sourceId,
        },
      });

      const response: Response = await request(app as Express)
        .post(baseUrl)
        .send(buildChannelBody());

      expect(response.status).toBe(400);

      const count: number = await prisma.channel.count();
      expect(count).toBe(1);
    });

    it("should return 404 when type does not exist", async () => {
      const response: Response = await request(app as Express)
        .post(baseUrl)
        .send(buildChannelBody({ idType: 99999 }));

      expect(response.status).toBe(404);
    });

    it("should return 404 when category does not exist", async () => {
      const response: Response = await request(app as Express)
        .post(baseUrl)
        .send(buildChannelBody({ idCategory: 99999 }));

      expect(response.status).toBe(404);
    });

    it("should return 404 when source does not exist", async () => {
      const response: Response = await request(app as Express)
        .post(baseUrl)
        .send(buildChannelBody({ idSource: 99999 }));

      expect(response.status).toBe(404);
    });
  });

  describe(`PATCH ${baseUrl}/:id`, () => {
    it("should return 200 and update the channel", async () => {
      const channel = await prisma.channel.create({
        data: {
          name: "Original Name",
          description: "Test",
          thumbUrl: "https://example.com/thumb.jpg",
          url: "https://example.com/stream",
          urlRest: null,
          number: 1,
          idType: typeId,
          idCategory: categoryId,
          idSource: sourceId,
        },
      });

      const response: Response = await request(app as Express)
        .patch(`${baseUrl}/${channel.id}`)
        .send({ name: "Updated Name" });

      expect(response.status).toBe(200);
      expect(response.body.data.name).toBe("Updated Name");

      const fromDb = await prisma.channel.findUnique({ where: { id: channel.id } });
      expect(fromDb?.name).toBe("Updated Name");
    });

    it("should return 404 when channel does not exist", async () => {
      const response: Response = await request(app as Express)
        .patch(`${baseUrl}/99999`)
        .send({ name: "x" });

      expect(response.status).toBe(404);
    });
  });

  describe(`DELETE ${baseUrl}/:id`, () => {
    it("should return 200 and delete the channel", async () => {
      const channel = await prisma.channel.create({
        data: {
          name: "Test Channel",
          description: "Test",
          thumbUrl: "https://example.com/thumb.jpg",
          url: "https://example.com/stream",
          urlRest: null,
          number: 1,
          idType: typeId,
          idCategory: categoryId,
          idSource: sourceId,
        },
      });

      const response: Response = await request(app as Express).delete(`${baseUrl}/${channel.id}`);

      expect(response.status).toBe(200);
      expect(response.body.data.id).toBe(channel.id);

      const fromDb = await prisma.channel.findUnique({ where: { id: channel.id } });
      expect(fromDb).toBeNull();
    });

    it("should return 404 when channel does not exist", async () => {
      const response: Response = await request(app as Express).delete(`${baseUrl}/99999`);

      expect(response.status).toBe(404);
    });
  });
});
