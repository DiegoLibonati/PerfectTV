import type { GraphQLObjectType, GraphQLFieldMap } from "graphql";

import BaseType from "@/schemas/types/base.type";

describe("base.type", () => {
  it("should have name BaseType", () => {
    expect((BaseType as GraphQLObjectType).name).toBe("BaseType");
  });

  it("should expose the expected field names", () => {
    const fields: GraphQLFieldMap<unknown, unknown> = (BaseType as GraphQLObjectType).getFields();

    expect(Object.keys(fields).sort()).toEqual(["baseUrl", "id", "idSource", "source"]);
  });

  it("should mark id as non-null ID", () => {
    const fields: GraphQLFieldMap<unknown, unknown> = (BaseType as GraphQLObjectType).getFields();

    expect(fields.id!.type.toString()).toBe("ID!");
  });

  it("should mark baseUrl as non-null String", () => {
    const fields: GraphQLFieldMap<unknown, unknown> = (BaseType as GraphQLObjectType).getFields();

    expect(fields.baseUrl!.type.toString()).toBe("String!");
  });

  it("should mark idSource as non-null Int", () => {
    const fields: GraphQLFieldMap<unknown, unknown> = (BaseType as GraphQLObjectType).getFields();

    expect(fields.idSource!.type.toString()).toBe("Int!");
  });

  it("should mark source as non-null SourceType", () => {
    const fields: GraphQLFieldMap<unknown, unknown> = (BaseType as GraphQLObjectType).getFields();

    expect(fields.source!.type.toString()).toBe("SourceType!");
  });
});
