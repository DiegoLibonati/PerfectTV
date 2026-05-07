import type { GraphQLObjectType, GraphQLFieldMap } from "graphql";

import CategoryType from "@/schemas/types/category.type";

describe("category.type", () => {
  it("should have name CategoryType", () => {
    expect((CategoryType as GraphQLObjectType).name).toBe("CategoryType");
  });

  it("should expose the expected field names", () => {
    const fields: GraphQLFieldMap<unknown, unknown> = (
      CategoryType as GraphQLObjectType
    ).getFields();

    expect(Object.keys(fields).sort()).toEqual(["channels", "code", "description", "id"]);
  });

  it("should mark id as non-null ID", () => {
    const fields: GraphQLFieldMap<unknown, unknown> = (
      CategoryType as GraphQLObjectType
    ).getFields();

    expect(fields.id!.type.toString()).toBe("ID!");
  });

  it("should mark code as non-null String", () => {
    const fields: GraphQLFieldMap<unknown, unknown> = (
      CategoryType as GraphQLObjectType
    ).getFields();

    expect(fields.code!.type.toString()).toBe("String!");
  });

  it("should mark description as non-null String", () => {
    const fields: GraphQLFieldMap<unknown, unknown> = (
      CategoryType as GraphQLObjectType
    ).getFields();

    expect(fields.description!.type.toString()).toBe("String!");
  });

  it("should mark channels as nullable list of non-null ChannelType", () => {
    const fields: GraphQLFieldMap<unknown, unknown> = (
      CategoryType as GraphQLObjectType
    ).getFields();

    expect(fields.channels!.type.toString()).toBe("[ChannelType!]");
  });
});
