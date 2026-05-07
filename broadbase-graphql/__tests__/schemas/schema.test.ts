import { schema } from "@/schemas/schema";

jest.mock("@/configs/env.config", () => ({
  envs: { API_URL: "http://test-api.com" },
}));

describe("schema", () => {
  it("should expose a query type named RootQuery", () => {
    const queryType = schema.getQueryType();

    expect(queryType).toBeDefined();
    expect(queryType?.name).toBe("RootQuery");
  });

  it("should not expose a mutation type", () => {
    const mutationType = schema.getMutationType();

    expect(mutationType).toBeUndefined();
  });

  it("should not expose a subscription type", () => {
    const subscriptionType = schema.getSubscriptionType();

    expect(subscriptionType).toBeUndefined();
  });

  it("should expose the expected query field names", () => {
    const queryType = schema.getQueryType();
    const fields = queryType?.getFields() ?? {};

    expect(Object.keys(fields).sort()).toEqual(["categories", "channel", "channels", "numbers"]);
  });
});
