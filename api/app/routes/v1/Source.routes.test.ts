import request from "supertest";

import { Source } from "@app/entities/models";

import app from "@app/index";

import {
  responseSuccess,
  responseNotFound,
  responseAlreadyExists,
  responseNotValid,
} from "@app/constants/Response.constants";

import sourceRepository from "@app/models/dataAccess/SourceRepository.model";

describe("Source.routes.ts", () => {
  const prefix = "/api/v1/sources";

  const sourceToAdd: Pick<Source, "code" | "description"> = {
    code: "test",
    description: "description test",
  };

  describe("POST Add Source", () => {
    test("It should return that no valid fields were entered.", async () => {
      const res = await request(app)
        .post(`${prefix}/`)
        .send({ code: "", description: "" });

      const data = res.body;
      const statusCode = res.statusCode;

      expect(statusCode).toBe(400);
      expect(data).toEqual({
        code: responseNotValid.fields.code,
      });
    });

    test("It must add a new source.", async () => {
      const res = await request(app).post(`${prefix}/`).send({
        code: sourceToAdd.code,
        description: sourceToAdd.description,
      });

      const data = res.body;
      const statusCode = res.statusCode;

      expect(statusCode).toBe(201);
      expect(data).toEqual({
        code: responseSuccess.addSource.code,
        data: expect.objectContaining({
          id: expect.any(Number),
          code: sourceToAdd.code,
          description: sourceToAdd.description,
          base: null,
        }),
      });
    });

    test("It should show that the source to be added already exists.", async () => {
      const res = await request(app).post(`${prefix}/`).send({
        code: sourceToAdd.code,
        description: sourceToAdd.description,
      });

      const data = res.body;
      const statusCode = res.statusCode;

      expect(statusCode).toBe(400);
      expect(data).toEqual({
        code: responseAlreadyExists.source.code,
      });
    });
  });

  describe("GET Sources", () => {
    test("It must return the result success of the sources", async () => {
      const res = await request(app).get(`${prefix}/`);

      const data = res.body;
      const statusCode = res.statusCode;

      expect(statusCode).toBe(200);
      expect(data.code).toBe(responseSuccess.getSources.code);
      expect(Array.isArray(data.data)).toBe(true);

      data.data.forEach((s: Source) => {
        expect(s.id).toEqual(expect.any(Number));
        expect(s.code).toEqual(expect.any(String));
        expect(s.description).toEqual(expect.any(String));
        expect(s.base === null || typeof s.base === "object").toBe(true);
      });
    });
  });

  describe("DELETE Delete Source", () => {
    const sourceNotExistsId = "100";

    test("It should return that there is no source with the entered id.", async () => {
      const res = await request(app).delete(`${prefix}/${sourceNotExistsId}`);

      const data = res.body;
      const statusCode = res.statusCode;

      expect(statusCode).toBe(404);
      expect(data).toEqual({
        code: responseNotFound.source.code,
      });
    });

    test("It must delete the source entered by test.", async () => {
      const source = await sourceRepository.getSourceByCode(sourceToAdd.code);

      const res = await request(app).delete(`${prefix}/${source?.id}`);

      const data = res.body;
      const statusCode = res.statusCode;

      expect(statusCode).toBe(200);
      expect(data).toEqual({
        code: responseSuccess.deleteSource.code,
        data: expect.objectContaining({
          id: expect.any(Number),
          code: source?.code,
          description: source?.description,
          base: null,
        }),
      });
    });
  });
});
