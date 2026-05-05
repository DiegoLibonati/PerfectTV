import {
  GraphQLObjectType,
  GraphQLList,
  GraphQLString,
  GraphQLInt,
  GraphQLNonNull,
  GraphQLBoolean,
} from "graphql";

import ChannelType from "@/schemas/types/channel.type";
import CategoryType from "@/schemas/types/category.type";

import { QueryResolver } from "@/resolvers/query.resolver";

const ChannelsResponseType = new GraphQLObjectType({
  name: "ChannelsResponse",
  fields: {
    code: { type: new GraphQLNonNull(GraphQLString) },
    message: { type: new GraphQLNonNull(GraphQLString) },
    data: { type: new GraphQLList(new GraphQLNonNull(ChannelType)) },
  },
});

const CategoriesResponseType = new GraphQLObjectType({
  name: "CategoriesResponse",
  fields: {
    code: { type: new GraphQLNonNull(GraphQLString) },
    message: { type: new GraphQLNonNull(GraphQLString) },
    data: { type: new GraphQLList(new GraphQLNonNull(CategoryType)) },
  },
});

const ChannelResponseType = new GraphQLObjectType({
  name: "ChannelResponse",
  fields: {
    code: { type: new GraphQLNonNull(GraphQLString) },
    message: { type: new GraphQLNonNull(GraphQLString) },
    data: { type: ChannelType },
  },
});

const ChannelsNumberResponseType = new GraphQLObjectType({
  name: "ChannelsNumberResponse",
  fields: {
    code: { type: new GraphQLNonNull(GraphQLString) },
    message: { type: new GraphQLNonNull(GraphQLString) },
    data: { type: new GraphQLList(new GraphQLNonNull(GraphQLInt)) },
  },
});

const RootQueryType = new GraphQLObjectType({
  name: "RootQuery",
  fields: {
    channels: {
      type: new GraphQLNonNull(ChannelsResponseType),
      resolve: QueryResolver.channels,
    },
    categories: {
      type: new GraphQLNonNull(CategoriesResponseType),
      resolve: QueryResolver.categories,
    },
    channel: {
      type: new GraphQLNonNull(ChannelResponseType),
      args: {
        number: { type: new GraphQLNonNull(GraphQLInt) },
        reload: { type: GraphQLBoolean },
      },
      resolve: QueryResolver.channel,
    },
    numbers: {
      type: new GraphQLNonNull(ChannelsNumberResponseType),
      resolve: QueryResolver.numbers,
    },
  },
});

export default RootQueryType;
