import {
  GraphQLObjectType,
  GraphQLString,
  GraphQLID,
  GraphQLInt,
  GraphQLFieldConfigMap,
} from "graphql";

import TypeType from "@src/schemas/types/type.type";
import CategoryType from "@src/schemas/types/category.type";
import SourceType from "@src/schemas/types/source.type";

const ChannelType = new GraphQLObjectType({
  name: "ChannelType",
  fields: (): GraphQLFieldConfigMap<any, any> => ({
    id: { type: GraphQLID },
    name: { type: GraphQLString },
    description: { type: GraphQLString },
    thumbUrl: { type: GraphQLString },
    url: { type: GraphQLString },
    urlRest: { type: GraphQLString },
    number: { type: GraphQLInt },
    type: { type: TypeType },
    category: { type: CategoryType },
    source: { type: SourceType },
  }),
});

export default ChannelType;
