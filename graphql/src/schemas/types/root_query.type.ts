import {
  GraphQLObjectType,
  GraphQLList,
  GraphQLString,
  GraphQLInt,
  GraphQLNonNull,
  GraphQLBoolean,
} from "graphql";

import ChannelType from "@src/schemas/types/channel.type";
import CategoryType from "@src/schemas/types/category.type";

import { QueryResolver } from "@src/resolvers/query.resolver";

const ChannelsResponseType = new GraphQLObjectType({
  name: "ChannelsResponse",
  fields: {
    code: { type: GraphQLString },
    message: { type: GraphQLString },
    data: { type: new GraphQLList(ChannelType) },
  },
});

const CategoriesResponseType = new GraphQLObjectType({
  name: "CategoriesResponse",
  fields: {
    code: { type: GraphQLString },
    message: { type: GraphQLString },
    data: { type: new GraphQLList(CategoryType) },
  },
});

const ChannelResponseType = new GraphQLObjectType({
  name: "ChannelResponse",
  fields: {
    code: { type: GraphQLString },
    message: { type: GraphQLString },
    data: { type: ChannelType },
  },
});

const ChannelsNumberResponseType = new GraphQLObjectType({
  name: "ChannelsNumberResponse",
  fields: {
    code: { type: GraphQLString },
    message: { type: GraphQLString },
    data: { type: new GraphQLList(GraphQLInt) },
  },
});

const RootQueryType = new GraphQLObjectType({
  name: "RootQuery",
  fields: {
    channels: {
      type: ChannelsResponseType,
      resolve: QueryResolver.channels,
    },
    categories: {
      type: CategoriesResponseType,
      resolve: QueryResolver.categories,
    },
    channel: {
      type: ChannelResponseType,
      args: {
        number: { type: new GraphQLNonNull(GraphQLInt) },
        reload: { type: GraphQLBoolean },
      },
      resolve: QueryResolver.channel,
    },
    numbers: {
      type: ChannelsNumberResponseType,
      resolve: QueryResolver.numbers,
    },
  },
});

export default RootQueryType;
