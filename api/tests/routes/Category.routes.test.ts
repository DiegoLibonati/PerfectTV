import request from "supertest";

import app from "@app/index";

import {
  responseSuccess,
  responseNotFound,
  responseAlreadyExists,
  responseNotValid,
} from "@app/constants/Response.constants";
import categoryRepository from "@app/models/dataAccess/CategoryRepository.model";

describe("Category.routes.ts", () => {
  const code = "test";
  const description = "description test";
  const prefix = "/category/v1/categories";

  describe("POST Add Category", () => {
    test("It should return that no valid fields were entered.", async () => {
      const res = await request(app)
        .post(`${prefix}/add`)
        .send({ code: "", description: "" });

      const data = res.body;
      const statusCode = res.statusCode;

      expect(statusCode).toBe(400);
      expect(data).toEqual({
        code: responseNotValid.fields.code,
      });
    });

    test("It must add a new category.", async () => {
      const res = await request(app).post(`${prefix}/add`).send({
        code: code,
        description: description,
      });

      const data = res.body;
      const statusCode = res.statusCode;

      expect(statusCode).toBe(201);

      expect(data).toEqual({
        code: responseSuccess.addCategory.code,
        data: {
          id: expect.any(Number),
          code: code,
          description: description,
          channels: expect.any(Array),
        },
      });
    });

    test("It should show that the category to be added already exists.", async () => {
      const res = await request(app).post(`${prefix}/add`).send({
        code: code,
        description: description,
      });

      const data = res.body;
      const statusCode = res.statusCode;

      expect(statusCode).toBe(400);
      expect(data).toEqual({
        code: responseAlreadyExists.category.code,
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
        data: expect.arrayContaining([
          {
            id: expect.any(Number),
            code: expect.any(String),
            description: expect.any(String),
            channels: expect.any(Array),
          },
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
      });
    });

    test("It must delete the category entered by test.", async () => {
      const categories = await categoryRepository.getCategories();
      const categoryTest = categories.find(
        (category) => category.code === code
      );

      const res = await request(app).delete(
        `${prefix}/delete/${categoryTest?.id}`
      );

      const data = res.body;
      const statusCode = res.statusCode;

      expect(statusCode).toBe(200);
      expect(data).toEqual({
        code: responseSuccess.deleteCategory.code,
        data: {
          id: expect.any(Number),
          code: code,
          description: description,
          channels: expect.any(Array),
        },
      });
    });
  });
});
