import request from "supertest";

import app from "@app/index";

describe("Docs.routes.ts", () => {
  const prefix = "/api/v1/docs";

  describe("GET Docs", () => {
    test("It must return the result success of the docs", async () => {
      const res = await request(app).get(`${prefix}/`);

      const html = res.text;
      const statusCode = res.statusCode;

      expect(statusCode).toBe(200);
      expect(html).toBeTruthy();
    });
  });
});
