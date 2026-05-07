import { createRoot } from "react-dom/client";
import { ApolloClient, ApolloProvider, InMemoryCache } from "@apollo/client";

import App from "@/App";

import "@/index.css";

const client = new ApolloClient({
  uri: `/graphql`,
  cache: new InMemoryCache({ dataIdFromObject: (o): string => o.id as string }),
});

createRoot(document.getElementById("root")!).render(
  <ApolloProvider client={client}>
    <App />
  </ApolloProvider>
);
