import {
  GraphQLObjectType,
  GraphQLString,
  GraphQLID,
  GraphQLList,
} from "graphql";

import BaseType from "@app/schema/types/Base.type";
import ChannelType from "@app/schema/types/Channel.type";

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
