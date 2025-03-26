import {
  GraphQLObjectType,
  GraphQLString,
  GraphQLID,
  GraphQLList,
} from "graphql";

import ChannelType from "@app/schema/types/Channel.type";

const CategoryType = new GraphQLObjectType({
  name: "CategoryType",
  fields: () => ({
    id: { type: GraphQLID },
    code: { type: GraphQLString },
    description: { type: GraphQLString },
    channels: { type: new GraphQLList(ChannelType) },
  }),
});

export default CategoryType;
