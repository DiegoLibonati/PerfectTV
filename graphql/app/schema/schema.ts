import { GraphQLSchema } from "graphql";

import RootQueryType from "@app/schema/types/RootQuery.type";

// const mutations = require("./mutations");

export default new GraphQLSchema({
  query: RootQueryType,
});
