import request from "supertest";

import { Source } from "@app/entities/models";

import app from "@app/index";

import {
  responseSuccess,
  responseNotFound,
  responseAlreadyExists,
  responseNotValid,
} from "@app/constants/Response.constants";
import baseRepository from "@app/models/dataAccess/BaseRepository.model";
import sourceRepository from "@app/models/dataAccess/SourceRepository.model";

describe("Base.routes.ts", () => {
  let source: Source;

  const sourceTest: Pick<Source, "code" | "description"> = {
    code: "sourci1234test",
    description: "dsaq",
  };
  const baseUrl: string = "https://hodasdasdasdasla3.com";
  const newBaseUrl: string = "https://hodasdsdsla32.com";
  const prefix = "/base/v1/bases";

  beforeAll(async () => {
    source = await sourceRepository.createSource(
      sourceTest.code,
      sourceTest.description
    );
  });

  describe("POST Add Base", () => {
    test("It should return that no valid fields were entered.", async () => {
      const res = await request(app)
        .post(`${prefix}/add`)
        .send({ baseUrl: "", idSource: source.id });

      const data = res.body;
      const statusCode = res.statusCode;

      expect(statusCode).toBe(400);
      expect(data).toEqual({
        code: responseNotValid.fields.code,
      });
    });

    test("It must add a new base.", async () => {
      const res = await request(app).post(`${prefix}/add`).send({
        baseUrl: baseUrl,
        idSource: source.id,
      });

      const data = res.body;
      const statusCode = res.statusCode;

      expect(statusCode).toBe(201);
      expect(data).toEqual({
        code: responseSuccess.addBase.code,
        data: {
          id: expect.any(Number),
          baseUrl: baseUrl,
          source: {
            id: expect.any(Number),
            code: expect.any(String),
            description: expect.any(String),
          },
        },
      });
    });

    test("It should show that the base to be added already exists.", async () => {
      const res = await request(app).post(`${prefix}/add`).send({
        baseUrl: baseUrl,
        idSource: source.id,
      });

      const data = res.body;
      const statusCode = res.statusCode;

      expect(statusCode).toBe(400);
      expect(data).toEqual({
        code: responseAlreadyExists.base.code,
      });
    });
  });

  describe("GET Bases", () => {
    test("It must return the result success of the bases", async () => {
      const res = await request(app).get(`${prefix}/`);

      const data = res.body;
      const statusCode = res.statusCode;

      expect(statusCode).toBe(200);
      expect(data).toEqual({
        code: responseSuccess.getBases.code,
        data: expect.arrayContaining([
          {
            id: expect.any(Number),
            baseUrl: expect.any(String),
            source: {
              id: expect.any(Number),
              code: expect.any(String),
              description: expect.any(String),
            },
          },
        ]),
      });
    });
  });

  describe("PATCH Update Base", () => {
    const baseNotExistsId = "100";

    test("It should return that there is no base with the entered id.", async () => {
      const res = await request(app).patch(
        `${prefix}/update/${baseNotExistsId}`
      );

      const data = res.body;
      const statusCode = res.statusCode;

      expect(statusCode).toBe(404);
      expect(data).toEqual({
        code: responseNotFound.base.code,
      });
    });

    test("It must make an update of a base with the properties entered.", async () => {
      const base = await baseRepository.getBaseByIdSource(source.id);

      const res = await request(app)
        .patch(`${prefix}/update/${base?.id}`)
        .send({ baseUrl: newBaseUrl });

      const data = res.body;
      const statusCode = res.statusCode;

      expect(statusCode).toBe(200);
      expect(data).toEqual({
        code: responseSuccess.updateBase.code,
        data: {
          id: expect.any(Number),
          baseUrl: newBaseUrl,
          source: {
            id: expect.any(Number),
            code: expect.any(String),
            description: expect.any(String),
          },
        },
      });
    });
  });

  describe("DELETE Delete Base", () => {
    const baseNotExistsId = "100";

    test("It should return that there is no base with the entered id.", async () => {
      const res = await request(app).delete(
        `${prefix}/delete/${baseNotExistsId}`
      );

      const data = res.body;
      const statusCode = res.statusCode;

      expect(statusCode).toBe(404);
      expect(data).toEqual({
        code: responseNotFound.base.code,
      });
    });

    test("It must delete the base entered by test.", async () => {
      const base = await baseRepository.getBaseByIdSource(source.id);

      const res = await request(app).delete(`${prefix}/delete/${base?.id}`);
      await sourceRepository.deleteSource(source.id);

      const data = res.body;
      const statusCode = res.statusCode;

      expect(statusCode).toBe(200);
      expect(data).toEqual({
        code: responseSuccess.deleteBase.code,
        data: {
          id: expect.any(Number),
          baseUrl: newBaseUrl,
          source: {
            id: expect.any(Number),
            code: expect.any(String),
            description: expect.any(String),
          },
        },
      });
    });
  });
});
