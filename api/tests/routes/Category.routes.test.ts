import request from "supertest";

import app from "@app/index";
import { responseSuccess, responseNotFound, responseAlreadyExists, responseNotValid } from "@app/constants/Response.constants";
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
        code: responseNotValid.fields.code,
        message: responseNotValid.fields.message,
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
        code: responseSuccess.addCategory.code,
        message: responseSuccess.addCategory.message,
        data: {
          id: expect.any(Number),
          name: name,
        },
      });
    });

    test("It should show that the category to be added already exists.", async () => {
      const res = await request(app).post(`${prefix}/add`).send({
        name: name,
      });

      const data = res.body;
      const statusCode = res.statusCode;

      expect(statusCode).toBe(400);
      expect(data).toEqual({
        code: responseAlreadyExists.category.code,
        message: responseAlreadyExists.category.message,
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
        code: responseSuccess.getCategories.code,
        message: responseSuccess.getCategories.message,
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
        code: responseNotFound.category.code,
        message: responseNotFound.category.message,
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
        code: responseSuccess.deleteCategory.code,
        message: responseSuccess.deleteCategory.message,
        data: {
          id: expect.any(Number),
          name: name,
        },
      });
    });
  });
});
