import { ApolloError } from "@apollo/client";

export type Sizes = {
  width: number;
  height: number;
};

export type Language = "es" | "en";

export type Theme = "light" | "dark";

export type SideBar = {
  open: boolean;
};

export type GraphQL<T> = {
  status: { loading: boolean; error: ApolloError | undefined };
  data: T;
};
