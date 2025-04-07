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

const { API_URL } = config;

const ChannelsResponseType = new GraphQLObjectType({
  name: "ChannelsResponse",
  fields: {
    code: { type: GraphQLString },
    data: { type: new GraphQLList(ChannelType) },
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
    channel: {
      type: ChannelResponseType,
      args: {
        numberChannel: { type: GraphQLInt },
      },
      resolve(parentValue, args) {
        const { numberChannel } = args;

        return axios
          .get(`${API_URL}/channel/v1/channels/number/${numberChannel}`)
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
