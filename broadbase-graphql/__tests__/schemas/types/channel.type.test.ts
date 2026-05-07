import type { GraphQLObjectType, GraphQLFieldMap } from "graphql";

import ChannelType from "@/schemas/types/channel.type";

describe("channel.type", () => {
  it("should have name ChannelType", () => {
    expect((ChannelType as GraphQLObjectType).name).toBe("ChannelType");
  });

  it("should expose the expected field names", () => {
    const fields: GraphQLFieldMap<unknown, unknown> = ChannelType.getFields();

    expect(Object.keys(fields).sort()).toEqual([
      "category",
      "description",
      "id",
      "idCategory",
      "idSource",
      "idType",
      "name",
      "number",
      "source",
      "thumbUrl",
      "type",
      "url",
      "urlRest",
    ]);
  });

  it("should mark id as non-null ID", () => {
    const fields: GraphQLFieldMap<unknown, unknown> = (
      ChannelType as GraphQLObjectType
    ).getFields();

    expect(fields.id!.type.toString()).toBe("ID!");
  });

  it("should mark name as non-null String", () => {
    const fields: GraphQLFieldMap<unknown, unknown> = (
      ChannelType as GraphQLObjectType
    ).getFields();

    expect(fields.name!.type.toString()).toBe("String!");
  });

  it("should mark description as non-null String", () => {
    const fields: GraphQLFieldMap<unknown, unknown> = (
      ChannelType as GraphQLObjectType
    ).getFields();

    expect(fields.description!.type.toString()).toBe("String!");
  });

  it("should mark url as non-null String", () => {
    const fields: GraphQLFieldMap<unknown, unknown> = (
      ChannelType as GraphQLObjectType
    ).getFields();

    expect(fields.url!.type.toString()).toBe("String!");
  });

  it("should mark urlRest as nullable String", () => {
    const fields: GraphQLFieldMap<unknown, unknown> = (
      ChannelType as GraphQLObjectType
    ).getFields();

    expect(fields.urlRest!.type.toString()).toBe("String");
  });

  it("should mark number as non-null Int", () => {
    const fields: GraphQLFieldMap<unknown, unknown> = (
      ChannelType as GraphQLObjectType
    ).getFields();

    expect(fields.number!.type.toString()).toBe("Int!");
  });

  it("should mark idType as non-null Int", () => {
    const fields: GraphQLFieldMap<unknown, unknown> = (
      ChannelType as GraphQLObjectType
    ).getFields();

    expect(fields.idType!.type.toString()).toBe("Int!");
  });

  it("should mark idCategory as non-null Int", () => {
    const fields: GraphQLFieldMap<unknown, unknown> = (
      ChannelType as GraphQLObjectType
    ).getFields();

    expect(fields.idCategory!.type.toString()).toBe("Int!");
  });

  it("should mark idSource as non-null Int", () => {
    const fields: GraphQLFieldMap<unknown, unknown> = (
      ChannelType as GraphQLObjectType
    ).getFields();

    expect(fields.idSource!.type.toString()).toBe("Int!");
  });

  it("should mark type as non-null TypeType", () => {
    const fields: GraphQLFieldMap<unknown, unknown> = (
      ChannelType as GraphQLObjectType
    ).getFields();

    expect(fields.type!.type.toString()).toBe("TypeType!");
  });

  it("should mark category as non-null CategoryType", () => {
    const fields: GraphQLFieldMap<unknown, unknown> = (
      ChannelType as GraphQLObjectType
    ).getFields();

    expect(fields.category!.type.toString()).toBe("CategoryType!");
  });

  it("should mark source as non-null SourceType", () => {
    const fields: GraphQLFieldMap<unknown, unknown> = (
      ChannelType as GraphQLObjectType
    ).getFields();

    expect(fields.source!.type.toString()).toBe("SourceType!");
  });
});
