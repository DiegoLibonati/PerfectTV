import type { ApolloError } from "@apollo/client";

export interface GraphQL<T> {
  status: { loading: boolean; error: ApolloError | undefined };
  data: T;
}
