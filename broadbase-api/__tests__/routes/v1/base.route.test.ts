import request from "supertest";

import type { Response } from "supertest";
import type { Express } from "express";

import app from "@/app";

import { prisma } from "@/configs/prisma.config";

const baseUrl = "/api/v1/bases";

describe("base.route", () => {
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

  describe(`GET ${baseUrl}`, () => {
    it("should return 200 with empty array when no bases exist", async () => {
      const response: Response = await request(app as Express).get(baseUrl);

      expect(response.status).toBe(200);
      expect(response.body.data).toEqual([]);
    });

    it("should return 200 with all bases", async () => {
      await prisma.base.create({
        data: { baseUrl: "https://example.com/embed", idSource: sourceId },
      });

      const response: Response = await request(app as Express).get(baseUrl);

      expect(response.status).toBe(200);
      expect(response.body.data).toHaveLength(1);
    });
  });

  describe(`POST ${baseUrl}`, () => {
    it("should return 201 and create a base", async () => {
      const response: Response = await request(app as Express)
        .post(baseUrl)
        .send({ baseUrl: "https://www.youtube.com/embed/live_stream", idSource: sourceId });

      expect(response.status).toBe(201);
      expect(response.body.data.baseUrl).toBe("https://www.youtube.com/embed/live_stream");
      expect(response.body.data.idSource).toBe(sourceId);

      const fromDb = await prisma.base.findUnique({ where: { id: response.body.data.id } });
      expect(fromDb).not.toBeNull();
    });

    it("should return 400 when baseUrl is missing", async () => {
      const response: Response = await request(app as Express)
        .post(baseUrl)
        .send({ idSource: sourceId });

      expect(response.status).toBe(400);

      const count: number = await prisma.base.count();
      expect(count).toBe(0);
    });

    it("should return 400 when idSource is missing", async () => {
      const response: Response = await request(app as Express)
        .post(baseUrl)
        .send({ baseUrl: "https://example.com/embed" });

      expect(response.status).toBe(400);
    });

    it("should return 400 when a base already exists for that source", async () => {
      await prisma.base.create({
        data: { baseUrl: "https://old.com/embed", idSource: sourceId },
      });

      const response: Response = await request(app as Express)
        .post(baseUrl)
        .send({ baseUrl: "https://new.com/embed", idSource: sourceId });

      expect(response.status).toBe(400);

      const count: number = await prisma.base.count();
      expect(count).toBe(1);
    });
  });

  describe(`PATCH ${baseUrl}/:id`, () => {
    it("should return 200 and update the base", async () => {
      const base = await prisma.base.create({
        data: { baseUrl: "https://old.com/embed", idSource: sourceId },
      });

      const response: Response = await request(app as Express)
        .patch(`${baseUrl}/${base.id}`)
        .send({ baseUrl: "https://new.com/embed" });

      expect(response.status).toBe(200);
      expect(response.body.data.baseUrl).toBe("https://new.com/embed");

      const fromDb = await prisma.base.findUnique({ where: { id: base.id } });
      expect(fromDb?.baseUrl).toBe("https://new.com/embed");
    });

    it("should return 404 when base does not exist", async () => {
      const response: Response = await request(app as Express)
        .patch(`${baseUrl}/99999`)
        .send({ baseUrl: "https://new.com/embed" });

      expect(response.status).toBe(404);
    });
  });

  describe(`DELETE ${baseUrl}/:id`, () => {
    it("should return 200 and delete the base", async () => {
      const base = await prisma.base.create({
        data: { baseUrl: "https://example.com/embed", idSource: sourceId },
      });

      const response: Response = await request(app as Express).delete(`${baseUrl}/${base.id}`);

      expect(response.status).toBe(200);
      expect(response.body.data.id).toBe(base.id);

      const fromDb = await prisma.base.findUnique({ where: { id: base.id } });
      expect(fromDb).toBeNull();
    });

    it("should return 404 when base does not exist", async () => {
      const response: Response = await request(app as Express).delete(`${baseUrl}/99999`);

      expect(response.status).toBe(404);
    });
  });
});
