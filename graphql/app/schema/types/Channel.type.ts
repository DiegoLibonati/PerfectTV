import {
  GraphQLFieldConfigMap,
  GraphQLObjectType,
  GraphQLString,
  GraphQLID,
  GraphQLInt,
} from "graphql";

import TypeType from "@app/schema/types/Type.type";
import CategoryType from "@app/schema/types/Category.type";
import SourceType from "@app/schema/types/Source.type";

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
