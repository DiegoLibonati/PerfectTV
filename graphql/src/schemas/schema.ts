import { GraphQLSchema } from "graphql";

import RootQueryType from "@src/schemas/types/root_query.type";

export const schema = new GraphQLSchema({
  query: RootQueryType,
});
