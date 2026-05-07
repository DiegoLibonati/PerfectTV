import request from "supertest";

import type { Response } from "supertest";
import type { Express } from "express";

import app from "@/app";

import { prisma } from "@/configs/prisma.config";

const baseUrl = "/api/v1/sources";

describe("source.route", () => {
  beforeEach(async (): Promise<void> => {
    await prisma.channel.deleteMany();
    await prisma.base.deleteMany();
    await prisma.source.deleteMany();
  });

  afterAll(async (): Promise<void> => {
    await prisma.$disconnect();
  });

  describe(`GET ${baseUrl}`, () => {
    it("should return 200 with empty array when no sources exist", async () => {
      const response: Response = await request(app as Express).get(baseUrl);

      expect(response.status).toBe(200);
      expect(response.body.data).toEqual([]);
    });

    it("should return 200 with all sources", async () => {
      await prisma.source.createMany({
        data: [
          { code: "youtube", description: "YouTube" },
          { code: "twitch", description: "Twitch" },
        ],
      });

      const response: Response = await request(app as Express).get(baseUrl);

      expect(response.status).toBe(200);
      expect(response.body.data).toHaveLength(2);
    });
  });

  describe(`POST ${baseUrl}`, () => {
    it("should return 201 and create a source", async () => {
      const response: Response = await request(app as Express)
        .post(baseUrl)
        .send({ code: "youtube", description: "YouTube" });

      expect(response.status).toBe(201);
      expect(response.body.data.code).toBe("youtube");

      const fromDb = await prisma.source.findUnique({ where: { id: response.body.data.id } });
      expect(fromDb).not.toBeNull();
    });

    it("should return 400 when code is missing", async () => {
      const response: Response = await request(app as Express)
        .post(baseUrl)
        .send({ description: "YouTube" });

      expect(response.status).toBe(400);

      const count: number = await prisma.source.count();
      expect(count).toBe(0);
    });

    it("should return 400 when description is missing", async () => {
      const response: Response = await request(app as Express)
        .post(baseUrl)
        .send({ code: "youtube" });

      expect(response.status).toBe(400);
    });

    it("should return 400 when source code already exists", async () => {
      await prisma.source.create({ data: { code: "youtube", description: "YouTube" } });

      const response: Response = await request(app as Express)
        .post(baseUrl)
        .send({ code: "youtube", description: "YouTube channels" });

      expect(response.status).toBe(400);

      const count: number = await prisma.source.count();
      expect(count).toBe(1);
    });
  });

  describe(`DELETE ${baseUrl}/:id`, () => {
    it("should return 200 and delete the source", async () => {
      const source = await prisma.source.create({
        data: { code: "youtube", description: "YouTube" },
      });

      const response: Response = await request(app as Express).delete(`${baseUrl}/${source.id}`);

      expect(response.status).toBe(200);
      expect(response.body.data.id).toBe(source.id);

      const fromDb = await prisma.source.findUnique({ where: { id: source.id } });
      expect(fromDb).toBeNull();
    });

    it("should return 404 when source does not exist", async () => {
      const response: Response = await request(app as Express).delete(`${baseUrl}/99999`);

      expect(response.status).toBe(404);
    });
  });
});
