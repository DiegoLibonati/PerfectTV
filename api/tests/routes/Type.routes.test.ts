import request from "supertest";

import app from "@app/index";
import {
  responseSuccess,
  responseNotFound,
  responseAlreadyExists,
  responseNotValid,
} from "@app/constants/Response.constants";
import prisma from "@app/database/Prisma.database";

describe("Type.routes.ts", () => {
  const name = "test";
  const prefix = "/type/v1/types";

  describe("POST Add Type", () => {
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

    test("It must add a new type.", async () => {
      const res = await request(app).post(`${prefix}/add`).send({
        name: name,
      });

      const data = res.body;
      const statusCode = res.statusCode;

      expect(statusCode).toBe(201);
      expect(data).toEqual({
        code: responseSuccess.addType.code,
        message: responseSuccess.addType.message,
        data: {
          id: expect.any(Number),
          name: name,
        },
      });
    });

    test("It should show that the type to be added already exists.", async () => {
      const res = await request(app).post(`${prefix}/add`).send({
        name: name,
      });

      const data = res.body;
      const statusCode = res.statusCode;

      expect(statusCode).toBe(400);
      expect(data).toEqual({
        code: responseAlreadyExists.type.code,
        message: responseAlreadyExists.type.message,
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
        message: responseSuccess.getTypes.message,
        data: expect.arrayContaining([
          expect.objectContaining({
            id: expect.any(Number),
            name: expect.any(String),
          }),
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
        message: responseNotFound.type.message,
      });
    });

    test("It must delete the type entered by test.", async () => {
      const types = await prisma.type.findMany();
      const typeTest = types.find((type) => type.name === name);

      const res = await request(app).delete(`${prefix}/delete/${typeTest?.id}`);

      const data = res.body;
      const statusCode = res.statusCode;

      expect(statusCode).toBe(200);
      expect(data).toEqual({
        code: responseSuccess.deleteType.code,
        message: responseSuccess.deleteType.message,
        data: {
          id: expect.any(Number),
          name: name,
        },
      });
    });
  });
});
