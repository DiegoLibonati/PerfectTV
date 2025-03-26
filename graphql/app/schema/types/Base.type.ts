import {
  GraphQLFieldConfigMap,
  GraphQLObjectType,
  GraphQLString,
  GraphQLID,
} from "graphql";

import SourceType from "@app/schema/types/Source.type";

const BaseType = new GraphQLObjectType({
  name: "BaseType",
  fields: (): GraphQLFieldConfigMap<any, any> => ({
    id: { type: GraphQLID },
    baseUrl: { type: GraphQLString },
    source: { type: SourceType },
  }),
});

export default BaseType;
