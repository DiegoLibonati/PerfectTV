import { createRoot } from "react-dom/client";
import { ApolloClient, ApolloProvider, InMemoryCache } from "@apollo/client";

import PerfectTvApp from "@src/PerfectTvApp";

import { envs } from "@src/config/envs";

import "@src/index.css";

const client = new ApolloClient({
  uri: `${envs.GRAPHQL_URL}/graphql`,
  cache: new InMemoryCache({ dataIdFromObject: (o) => o.id as string }),
});

createRoot(document.getElementById("root")!).render(
  <ApolloProvider client={client}>
    <PerfectTvApp />
  </ApolloProvider>
);
