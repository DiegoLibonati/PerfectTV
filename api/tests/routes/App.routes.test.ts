import request from "supertest";

import app from "@app/index";
import { responseConstants } from "@app/constants/Response.constants";

describe("* ROUTES", () => {
  const prefix = "/123412412/v1";

  describe("GET not exists.", () => {
    test("It should return that the path you are trying to access does not exist.", async () => {
      const res = await request(app).get(`${prefix}/not-exists`);

      const data = res.body;
      const statusCode = res.statusCode;

      expect(statusCode).toBe(404);
      expect(data["code"]).toBe(responseConstants.notFoundRoute.code);
      expect(data["message"]).toBe(
        `${responseConstants.notFoundRoute.message} Path: ${prefix}/not-exists`
      );
    });
  });
});

describe("App.routes.ts", () => {
  const prefix = "/app/v1";

  describe("GET Alive - /alive", () => {
    test("It must return the result success of the alive", async () => {
      const res = await request(app).get(`${prefix}/alive`);

      const data = res.body;
      const statusCode = res.statusCode;

      expect(statusCode).toBe(200);
      expect(data["code"]).toBe(responseConstants.successAlive.code);
      expect(data["message"]).toBe(responseConstants.successAlive.message);
      expect(data["author"]).toBe("Diego Martin Libonati");
      expect(data["version"]).toBe("1.0.0");
    });
  });
});
