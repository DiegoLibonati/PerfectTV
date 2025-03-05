import request from "supertest";

import app from "@app/index";
import { responseConstants } from "@app/constants/Response.constants";
import prisma from "@app/database/Prisma.database";

describe("Category.routes.ts", () => {
  const name = "test";
  const prefix = "/category/v1/categories";

  describe("POST Add Category", () => {
    test("It should return that no valid fields were entered.", async () => {
      const res = await request(app).post(`${prefix}/add`).send({ name: "" });

      const data = res.body;
      const statusCode = res.statusCode;

      expect(statusCode).toBe(400);
      expect(data).toEqual({
        code: responseConstants.notValidFields.code,
        message: responseConstants.notValidFields.message,
      });
    });

    test("It must add a new category.", async () => {
      const res = await request(app).post(`${prefix}/add`).send({
        name: name,
      });

      const data = res.body;
      const statusCode = res.statusCode;

      expect(statusCode).toBe(201);
      expect(data).toEqual({
        code: responseConstants.successAddCategory.code,
        message: responseConstants.successAddCategory.message,
        data: {
          id: expect.any(Number),
          name: name,
        },
      });
    });
  });

  describe("GET Categories", () => {
    test("It must return the result success of the categories", async () => {
      const res = await request(app).get(`${prefix}/`);

      const data = res.body;
      const statusCode = res.statusCode;

      expect(statusCode).toBe(200);
      expect(data).toEqual({
        code: responseConstants.successGetCategories.code,
        message: responseConstants.successGetCategories.message,
        data: expect.arrayContaining([
          expect.objectContaining({
            id: expect.any(Number),
            name: expect.any(String),
          }),
        ]),
      });
    });
  });

  describe("DELETE Delete Category", () => {
    const categoryNotExistsId = "100";

    test("It should return that there is no category with the entered id.", async () => {
      const res = await request(app).delete(
        `${prefix}/delete/${categoryNotExistsId}`
      );

      const data = res.body;
      const statusCode = res.statusCode;

      expect(statusCode).toBe(404);
      expect(data).toEqual({
        code: responseConstants.notFoundCategory.code,
        message: responseConstants.notFoundCategory.message,
      });
    });

    test("It must delete the category entered by test.", async () => {
      const categories = await prisma.category.findMany();
      const categoryTest = categories.find(
        (category) => category.name === name
      );

      const res = await request(app).delete(
        `${prefix}/delete/${categoryTest?.id}`
      );

      const data = res.body;
      const statusCode = res.statusCode;

      expect(statusCode).toBe(200);
      expect(data).toEqual({
        code: responseConstants.successDeleteCategory.code,
        message: responseConstants.successDeleteCategory.message,
        data: {
          id: expect.any(Number),
          name: name,
        },
      });
    });
  });
});
