import request from "supertest";

import type { Response } from "supertest";
import type { Express } from "express";

import app from "@/app";

import { prisma } from "@/configs/prisma.config";

const baseUrl = "/api/v1/categories";

describe("category.route", () => {
  beforeEach(async (): Promise<void> => {
    await prisma.channel.deleteMany();
    await prisma.category.deleteMany();
  });

  afterAll(async (): Promise<void> => {
    await prisma.$disconnect();
  });

  describe(`GET ${baseUrl}`, () => {
    it("should return 200 with empty array when no categories exist", async () => {
      const response: Response = await request(app as Express).get(baseUrl);

      expect(response.status).toBe(200);
      expect(response.body.data).toEqual([]);
    });

    it("should return 200 with all categories", async () => {
      await prisma.category.createMany({
        data: [
          { code: "news", description: "News" },
          { code: "gameplays", description: "Gameplays" },
        ],
      });

      const response: Response = await request(app as Express).get(baseUrl);

      expect(response.status).toBe(200);
      expect(response.body.data).toHaveLength(2);
    });
  });

  describe(`POST ${baseUrl}`, () => {
    it("should return 201 and create a category", async () => {
      const response: Response = await request(app as Express)
        .post(baseUrl)
        .send({ code: "news", description: "News channels" });

      expect(response.status).toBe(201);
      expect(response.body.data.code).toBe("news");

      const fromDb = await prisma.category.findUnique({ where: { id: response.body.data.id } });
      expect(fromDb).not.toBeNull();
    });

    it("should return 400 when code is missing", async () => {
      const response: Response = await request(app as Express)
        .post(baseUrl)
        .send({ description: "News channels" });

      expect(response.status).toBe(400);

      const count: number = await prisma.category.count();
      expect(count).toBe(0);
    });

    it("should return 400 when description is missing", async () => {
      const response: Response = await request(app as Express)
        .post(baseUrl)
        .send({ code: "news" });

      expect(response.status).toBe(400);
    });

    it("should return 400 when category code already exists", async () => {
      await prisma.category.create({ data: { code: "news", description: "News" } });

      const response: Response = await request(app as Express)
        .post(baseUrl)
        .send({ code: "news", description: "News channels" });

      expect(response.status).toBe(400);

      const count: number = await prisma.category.count();
      expect(count).toBe(1);
    });
  });

  describe(`DELETE ${baseUrl}/:id`, () => {
    it("should return 200 and delete the category", async () => {
      const category = await prisma.category.create({
        data: { code: "news", description: "News" },
      });

      const response: Response = await request(app as Express).delete(`${baseUrl}/${category.id}`);

      expect(response.status).toBe(200);
      expect(response.body.data.id).toBe(category.id);

      const fromDb = await prisma.category.findUnique({ where: { id: category.id } });
      expect(fromDb).toBeNull();
    });

    it("should return 404 when category does not exist", async () => {
      const response: Response = await request(app as Express).delete(`${baseUrl}/99999`);

      expect(response.status).toBe(404);
    });
  });
});
