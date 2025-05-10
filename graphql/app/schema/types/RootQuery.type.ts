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
          .get(`${API_URL}/channel/v1/channels`, {
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
        return axios
          .get(`${API_URL}/category/v1/categories`)
          .then((response) => {
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
          .get(`${API_URL}/channel/v1/channels/number/${numberChannel}`, {
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
  },
});

export default RootQueryType;
