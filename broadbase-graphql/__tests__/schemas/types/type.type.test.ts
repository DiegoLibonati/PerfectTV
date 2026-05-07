import type { GraphQLObjectType, GraphQLFieldMap } from "graphql";

import TypeType from "@/schemas/types/type.type";

describe("type.type", () => {
  it("should have name TypeType", () => {
    expect((TypeType as GraphQLObjectType).name).toBe("TypeType");
  });

  it("should expose the expected field names", () => {
    const fields: GraphQLFieldMap<unknown, unknown> = (TypeType as GraphQLObjectType).getFields();

    expect(Object.keys(fields).sort()).toEqual(["channels", "code", "description", "id"]);
  });

  it("should mark id as non-null ID", () => {
    const fields: GraphQLFieldMap<unknown, unknown> = (TypeType as GraphQLObjectType).getFields();

    expect(fields.id!.type.toString()).toBe("ID!");
  });

  it("should mark code as non-null String", () => {
    const fields: GraphQLFieldMap<unknown, unknown> = (TypeType as GraphQLObjectType).getFields();

    expect(fields.code!.type.toString()).toBe("String!");
  });

  it("should mark description as non-null String", () => {
    const fields: GraphQLFieldMap<unknown, unknown> = (TypeType as GraphQLObjectType).getFields();

    expect(fields.description!.type.toString()).toBe("String!");
  });

  it("should mark channels as nullable list of non-null ChannelType", () => {
    const fields: GraphQLFieldMap<unknown, unknown> = (TypeType as GraphQLObjectType).getFields();

    expect(fields.channels!.type.toString()).toBe("[ChannelType!]");
  });
});
