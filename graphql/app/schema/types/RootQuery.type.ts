import {
  GraphQLObjectType,
  GraphQLList,
  GraphQLString,
  GraphQLBoolean,
  GraphQLInt,
} from "graphql";
import axios from "axios";

import { config } from "@app/config/env.conf";
import ChannelType from "@app/schema/types/Channel.type";
import CategoryType from "@app/schema/types/Category.type";

const { API_URL } = config;

const ChannelsResponseType = new GraphQLObjectType({
  name: "ChannelsResponse",
  fields: {
    code: { type: GraphQLString },
    data: { type: new GraphQLList(ChannelType) },
  },
});

const ChannelsNumberResponseType = new GraphQLObjectType({
  name: "ChannelsNumberResponse",
  fields: {
    code: { type: GraphQLString },
    data: { type: new GraphQLList(GraphQLInt) },
  },
});

const CategoriesResponseType = new GraphQLObjectType({
  name: "CategoriesResponse",
  fields: {
    code: { type: GraphQLString },
    data: { type: new GraphQLList(CategoryType) },
  },
});

const ChannelResponseType = new GraphQLObjectType({
  name: "ChannelResponse",
  fields: {
    code: { type: GraphQLString },
    data: { type: ChannelType },
  },
});

const RootQueryType = new GraphQLObjectType({
  name: "RootQueryType",
  fields: {
    channels: {
      type: ChannelsResponseType,
      args: { reload: { type: GraphQLBoolean } },
      resolve(parentValue, args) {
        const { reload } = args;

        return axios
          .get(`${API_URL}/channels`, {
            params: { reload: reload },
          })
          .then((response) => {
            return {
              code: response.data.code,
              data: response.data.data,
            };
          });
      },
    },
    categories: {
      type: CategoriesResponseType,
      args: {},
      resolve(parentValue, args) {
        return axios.get(`${API_URL}/categories`).then((response) => {
          return {
            code: response.data.code,
            data: response.data.data,
          };
        });
      },
    },
    channel: {
      type: ChannelResponseType,
      args: {
        numberChannel: { type: GraphQLInt },
        reload: { type: GraphQLBoolean },
      },
      resolve(parentValue, args) {
        const { numberChannel, reload } = args;

        return axios
          .get(`${API_URL}/channels/${numberChannel}`, {
            params: { reload: reload },
          })
          .then((response) => {
            return {
              code: response.data.code,
              data: response.data.data,
            };
          });
      },
    },
    numbers: {
      type: ChannelsNumberResponseType,
      args: {},
      resolve(parentValue, args) {
        return axios.get(`${API_URL}/channels/numbers`).then((response) => {
          return {
            code: response.data.code,
            data: response.data.data,
          };
        });
      },
    },
  },
});

export default RootQueryType;
