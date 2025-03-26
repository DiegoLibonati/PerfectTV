import { GraphQLObjectType, GraphQLList, GraphQLString } from "graphql";
import axios from "axios";

import { config } from "@app/config/env.conf";
import ChannelType from "@app/schema/types/Channel.type";

const { API_URL } = config;

const ChannelResponseType = new GraphQLObjectType({
  name: "ChannelResponse",
  fields: {
    code: { type: GraphQLString },
    message: { type: GraphQLString },
    data: { type: new GraphQLList(ChannelType) },
  },
});

const RootQueryType = new GraphQLObjectType({
  name: "RootQueryType",
  fields: {
    channels: {
      type: ChannelResponseType,
      resolve(parentValue, args) {
        return axios.get(`${API_URL}/channel/v1/channels`).then((response) => {
          return {
            code: response.data.code,
            message: response.data.message,
            data: response.data.data,
          };
        });
      },
    },
  },
});

export default RootQueryType;
