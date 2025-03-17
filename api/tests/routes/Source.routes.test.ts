import request from "supertest";

import app from "@app/index";

import {
  responseSuccess,
  responseNotFound,
  responseAlreadyExists,
  responseNotValid,
} from "@app/constants/Response.constants";
import sourceRepository from "@app/models/dataAccess/SourceRepository.model";

describe("Source.routes.ts", () => {
  const code = "test";
  const description = "description test";
  const prefix = "/source/v1/sources";

  describe("POST Add Source", () => {
    test("It should return that no valid fields were entered.", async () => {
      const res = await request(app)
        .post(`${prefix}/add`)
        .send({ code: "", description: "" });

      const data = res.body;
      const statusCode = res.statusCode;

      expect(statusCode).toBe(400);
      expect(data).toEqual({
        code: responseNotValid.fields.code,
        message: responseNotValid.fields.message,
      });
    });

    test("It must add a new source.", async () => {
      const res = await request(app).post(`${prefix}/add`).send({
        code: code,
        description: description,
      });

      const data = res.body;
      const statusCode = res.statusCode;

      expect(statusCode).toBe(201);
      expect(data).toEqual({
        code: responseSuccess.addSource.code,
        message: responseSuccess.addSource.message,
        data: {
          id: expect.any(Number),
          code: code,
          description: description,
        },
      });
    });

    test("It should show that the source to be added already exists.", async () => {
      const res = await request(app).post(`${prefix}/add`).send({
        code: code,
        description: description,
      });

      const data = res.body;
      const statusCode = res.statusCode;

      expect(statusCode).toBe(400);
      expect(data).toEqual({
        code: responseAlreadyExists.source.code,
        message: responseAlreadyExists.source.message,
      });
    });
  });

  describe("GET Sources", () => {
    test("It must return the result success of the sources", async () => {
      const res = await request(app).get(`${prefix}/`);

      const data = res.body;
      const statusCode = res.statusCode;

      expect(statusCode).toBe(200);
      expect(data).toEqual({
        code: responseSuccess.getSources.code,
        message: responseSuccess.getSources.message,
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

  describe("DELETE Delete Source", () => {
    const sourceNotExistsId = "100";

    test("It should return that there is no source with the entered id.", async () => {
      const res = await request(app).delete(
        `${prefix}/delete/${sourceNotExistsId}`
      );

      const data = res.body;
      const statusCode = res.statusCode;

      expect(statusCode).toBe(404);
      expect(data).toEqual({
        code: responseNotFound.source.code,
        message: responseNotFound.source.message,
      });
    });

    test("It must delete the source entered by test.", async () => {
      const sources = await sourceRepository.getSources();
      const sourceTest = sources.find((source) => source.code === code);

      const res = await request(app).delete(
        `${prefix}/delete/${sourceTest?.id}`
      );

      const data = res.body;
      const statusCode = res.statusCode;

      expect(statusCode).toBe(200);
      expect(data).toEqual({
        code: responseSuccess.deleteSource.code,
        message: responseSuccess.deleteSource.message,
        data: {
          id: expect.any(Number),
          code: code,
          description: description,
        },
      });
    });
  });
});
