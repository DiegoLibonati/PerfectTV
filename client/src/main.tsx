import { createRoot } from "react-dom/client";
import { ApolloClient, ApolloProvider, InMemoryCache } from "@apollo/client";

import PerfectTvApp from "@/src/PerfectTvApp";

import "@/src/index.css";

const client = new ApolloClient({
  uri: `/graphql`,
  cache: new InMemoryCache({ dataIdFromObject: (o) => o.id as string }),
});

createRoot(document.getElementById("root")!).render(
  <ApolloProvider client={client}>
    <PerfectTvApp />
  </ApolloProvider>
);
