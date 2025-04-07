import request from "supertest";

import app from "@app/index";
import {
  responseSuccess,
  responseNotFound,
  responseAlreadyExists,
  responseNotValid,
} from "@app/constants/Response.constants";

import typeRepository from "@app/models/dataAccess/TypeRepository.model";

describe("Type.routes.ts", () => {
  const code = "test";
  const description = "description test";
  const prefix = "/type/v1/types";

  describe("POST Add Type", () => {
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

    test("It must add a new type.", async () => {
      const res = await request(app).post(`${prefix}/add`).send({
        code: code,
        description: description,
      });

      const data = res.body;
      const statusCode = res.statusCode;

      expect(statusCode).toBe(201);
      expect(data).toEqual({
        code: responseSuccess.addType.code,
        data: {
          id: expect.any(Number),
          code: code,
          description: description,
        },
      });
    });

    test("It should show that the type to be added already exists.", async () => {
      const res = await request(app).post(`${prefix}/add`).send({
        code: code,
        description: description,
      });

      const data = res.body;
      const statusCode = res.statusCode;

      expect(statusCode).toBe(400);
      expect(data).toEqual({
        code: responseAlreadyExists.type.code,
      });
    });
  });

  describe("GET Types", () => {
    test("It must return the result success of the types", async () => {
      const res = await request(app).get(`${prefix}/`);

      const data = res.body;
      const statusCode = res.statusCode;

      expect(statusCode).toBe(200);
      expect(data).toEqual({
        code: responseSuccess.getTypes.code,
        data: expect.arrayContaining([
          {
            id: expect.any(Number),
            code: expect.any(String),
            description: expect.any(String),
          },
        ]),
      });
    });
  });

  describe("DELETE Delete Type", () => {
    const typeNotExistsId = "100";

    test("It should return that there is no type with the entered id.", async () => {
      const res = await request(app).delete(
        `${prefix}/delete/${typeNotExistsId}`
      );

      const data = res.body;
      const statusCode = res.statusCode;

      expect(statusCode).toBe(404);
      expect(data).toEqual({
        code: responseNotFound.type.code,
      });
    });

    test("It must delete the type entered by test.", async () => {
      const types = await typeRepository.getTypes();
      const typeTest = types.find((type) => type.code === code);

      const res = await request(app).delete(`${prefix}/delete/${typeTest?.id}`);

      const data = res.body;
      const statusCode = res.statusCode;

      expect(statusCode).toBe(200);
      expect(data).toEqual({
        code: responseSuccess.deleteType.code,
        data: {
          id: expect.any(Number),
          code: code,
          description: description,
        },
      });
    });
  });
});
