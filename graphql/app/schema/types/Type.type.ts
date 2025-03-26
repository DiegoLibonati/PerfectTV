import {
  GraphQLObjectType,
  GraphQLString,
  GraphQLID,
  GraphQLList,
} from "graphql";

import ChannelType from "@app/schema/types/Channel.type";

const TypeType = new GraphQLObjectType({
  name: "TypeType",
  fields: () => ({
    id: { type: GraphQLID },
    code: { type: GraphQLString },
    description: { type: GraphQLString },
    channels: { type: new GraphQLList(ChannelType) },
  }),
});

export default TypeType;
