import { GraphQLObjectType, GraphQLID, GraphQLList, GraphQLNonNull, GraphQLString } from "graphql";

import type { GraphQLFieldConfigMap } from "graphql";

import ChannelType from "@/schemas/types/channel.type";
import BaseType from "@/schemas/types/base.type";

const SourceType = new GraphQLObjectType({
  name: "SourceType",
  fields: (): GraphQLFieldConfigMap<unknown, unknown> => ({
    id: { type: new GraphQLNonNull(GraphQLID) },
    code: { type: new GraphQLNonNull(GraphQLString) },
    description: { type: new GraphQLNonNull(GraphQLString) },
    channels: { type: new GraphQLList(new GraphQLNonNull(ChannelType)) },
    base: { type: BaseType },
  }),
});

export default SourceType;
