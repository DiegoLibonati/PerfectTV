import request from "supertest";

import type { Response } from "supertest";
import type { Express } from "express";
import type { Type } from "@prisma/client";

import app from "@/app";

import { prisma } from "@/configs/prisma.config";

const baseUrl = "/api/v1/types";

describe("type.route", () => {
  beforeEach(async (): Promise<void> => {
    await prisma.channel.deleteMany();
    await prisma.type.deleteMany();
  });

  afterAll(async (): Promise<void> => {
    await prisma.$disconnect();
  });

  describe(`GET ${baseUrl}`, () => {
    it("should return 200 with empty array when no types exist", async () => {
      const response: Response = await request(app as Express).get(baseUrl);

      expect(response.status).toBe(200);
      expect(response.body.data).toEqual([]);
    });

    it("should return 200 with all types", async () => {
      await prisma.type.createMany({
        data: [
          { code: "public", description: "Public" },
          { code: "private", description: "Private" },
        ],
      });

      const response: Response = await request(app as Express).get(baseUrl);

      expect(response.status).toBe(200);
      expect(response.body.data).toHaveLength(2);
    });
  });

  describe(`POST ${baseUrl}`, () => {
    it("should return 201 and create a type", async () => {
      const response: Response = await request(app as Express)
        .post(baseUrl)
        .send({ code: "public", description: "Public channels" });

      expect(response.status).toBe(201);
      expect(response.body.data.code).toBe("public");

      const fromDb: Type | null = await prisma.type.findUnique({
        where: { id: response.body.data.id },
      });
      expect(fromDb).not.toBeNull();
    });

    it("should return 400 when code is missing", async () => {
      const response: Response = await request(app as Express)
        .post(baseUrl)
        .send({ description: "Public channels" });

      expect(response.status).toBe(400);

      const count: number = await prisma.type.count();
      expect(count).toBe(0);
    });

    it("should return 400 when description is missing", async () => {
      const response: Response = await request(app as Express)
        .post(baseUrl)
        .send({ code: "public" });

      expect(response.status).toBe(400);
    });

    it("should return 400 when type code already exists", async () => {
      await prisma.type.create({ data: { code: "public", description: "Public" } });

      const response: Response = await request(app as Express)
        .post(baseUrl)
        .send({ code: "public", description: "Public channels" });

      expect(response.status).toBe(400);

      const count: number = await prisma.type.count();
      expect(count).toBe(1);
    });
  });

  describe(`DELETE ${baseUrl}/:id`, () => {
    it("should return 200 and delete the type", async () => {
      const type: Type = await prisma.type.create({
        data: { code: "public", description: "Public" },
      });

      const response: Response = await request(app as Express).delete(`${baseUrl}/${type.id}`);

      expect(response.status).toBe(200);
      expect(response.body.data.id).toBe(type.id);

      const fromDb: Type | null = await prisma.type.findUnique({ where: { id: type.id } });
      expect(fromDb).toBeNull();
    });

    it("should return 404 when type does not exist", async () => {
      const response: Response = await request(app as Express).delete(`${baseUrl}/99999`);

      expect(response.status).toBe(404);
    });
  });
});
