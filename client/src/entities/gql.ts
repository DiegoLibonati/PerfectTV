import { ApolloError } from "@apollo/client";

export type GraphQL<T> = {
  status: { loading: boolean; error: ApolloError | undefined };
  data: T;
};
