import {
  GraphQLObjectType,
  GraphQLString,
  GraphQLID,
  GraphQLFieldConfigMap,
} from "graphql";

import SourceType from "@src/schemas/types/source.type";

const BaseType = new GraphQLObjectType({
  name: "BaseType",
  fields: (): GraphQLFieldConfigMap<any, any> => ({
    id: { type: GraphQLID },
    baseUrl: { type: GraphQLString },
    source: { type: SourceType },
  }),
});

export default BaseType;
