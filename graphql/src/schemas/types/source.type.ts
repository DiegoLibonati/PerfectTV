import {
  GraphQLObjectType,
  GraphQLString,
  GraphQLID,
  GraphQLList,
} from "graphql";

import ChannelType from "@src/schemas/types/channel.type";
import BaseType from "@src/schemas/types/base.type";

const SourceType = new GraphQLObjectType({
  name: "SourceType",
  fields: () => ({
    id: { type: GraphQLID },
    code: { type: GraphQLString },
    description: { type: GraphQLString },
    channels: { type: new GraphQLList(ChannelType) },
    base: {
      type: BaseType,
    },
  }),
});

export default SourceType;
