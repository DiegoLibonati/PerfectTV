import type { GraphQLObjectType, GraphQLFieldMap } from "graphql";

import RootQueryType from "@/schemas/types/root_query.type";

jest.mock("@/configs/env.config", () => ({
  envs: { API_URL: "http://test-api.com" },
}));

describe("root_query.type", () => {
  it("should have name RootQuery", () => {
    expect((RootQueryType as GraphQLObjectType).name).toBe("RootQuery");
  });

  it("should expose the expected field names", () => {
    const fields: GraphQLFieldMap<unknown, unknown> = (
      RootQueryType as GraphQLObjectType
    ).getFields();

    expect(Object.keys(fields).sort()).toEqual(["categories", "channel", "channels", "numbers"]);
  });

  it("should mark channels field return type as non-null ChannelsResponse", () => {
    const fields: GraphQLFieldMap<unknown, unknown> = (
      RootQueryType as GraphQLObjectType
    ).getFields();

    expect(fields.channels!.type.toString()).toBe("ChannelsResponse!");
  });

  it("should mark categories field return type as non-null CategoriesResponse", () => {
    const fields: GraphQLFieldMap<unknown, unknown> = (
      RootQueryType as GraphQLObjectType
    ).getFields();

    expect(fields.categories!.type.toString()).toBe("CategoriesResponse!");
  });

  it("should mark channel field return type as non-null ChannelResponse", () => {
    const fields: GraphQLFieldMap<unknown, unknown> = (
      RootQueryType as GraphQLObjectType
    ).getFields();

    expect(fields.channel!.type.toString()).toBe("ChannelResponse!");
  });

  it("should mark numbers field return type as non-null ChannelsNumberResponse", () => {
    const fields: GraphQLFieldMap<unknown, unknown> = (
      RootQueryType as GraphQLObjectType
    ).getFields();

    expect(fields.numbers!.type.toString()).toBe("ChannelsNumberResponse!");
  });

  it("should require number as non-null Int argument on channel field", () => {
    const fields: GraphQLFieldMap<unknown, unknown> = (
      RootQueryType as GraphQLObjectType
    ).getFields();
    const numberArg = fields.channel!.args.find((a) => a.name === "number");

    expect(numberArg).toBeDefined();
    expect(numberArg?.type.toString()).toBe("Int!");
  });

  it("should accept reload as nullable Boolean argument on channel field", () => {
    const fields: GraphQLFieldMap<unknown, unknown> = (
      RootQueryType as GraphQLObjectType
    ).getFields();
    const reloadArg = fields.channel!.args.find((a) => a.name === "reload");

    expect(reloadArg).toBeDefined();
    expect(reloadArg?.type.toString()).toBe("Boolean");
  });

  it("should expose the resolve function for channels field", () => {
    const fields: GraphQLFieldMap<unknown, unknown> = (
      RootQueryType as GraphQLObjectType
    ).getFields();

    expect(fields.channels!.resolve).toBeDefined();
  });

  it("should expose the resolve function for categories field", () => {
    const fields: GraphQLFieldMap<unknown, unknown> = (
      RootQueryType as GraphQLObjectType
    ).getFields();

    expect(fields.categories!.resolve).toBeDefined();
  });
});
