import { GraphQLSchema } from "graphql";

import RootQueryType from "@/schemas/types/root_query.type";

export const schema = new GraphQLSchema({
  query: RootQueryType,
});
