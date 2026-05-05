import { GraphQLObjectType, GraphQLID, GraphQLInt, GraphQLNonNull, GraphQLString } from "graphql";

import type { GraphQLFieldConfigMap } from "graphql";

import SourceType from "@/schemas/types/source.type";

const BaseType = new GraphQLObjectType({
  name: "BaseType",
  fields: (): GraphQLFieldConfigMap<unknown, unknown> => ({
    id: { type: new GraphQLNonNull(GraphQLID) },
    baseUrl: { type: new GraphQLNonNull(GraphQLString) },
    idSource: { type: new GraphQLNonNull(GraphQLInt) },
    source: { type: new GraphQLNonNull(SourceType) },
  }),
});

export default BaseType;
