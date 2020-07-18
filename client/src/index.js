import React from "react";
import ReactDOM from "react-dom";
import App from "./App";
import * as serviceWorker from "./serviceWorker";
import ApolloClient from "apollo-client";
import { InMemoryCache } from "apollo-cache-inmemory";
import { createHttpLink } from "apollo-link-http";
import { ApolloProvider } from "react-apollo";
import { onError } from "apollo-link-error";
import { ApolloLink } from "apollo-link";
import Mutations from "./graphql/mutations";
const { VERIFY_USER } = Mutations;

let cache;
let client;

async function setupClient() {
  cache = new InMemoryCache({
    dataIdFromObject: (object) => object._id || null,
  });

  let uri;
  if (process.env.NODE_ENV === "production") {
    uri = `/graphql`;
  } else {
    uri = "http://localhost:5000/graphql";
    // uri = `/graphql`;
  }

  const httpLink = createHttpLink({
    uri,
    headers: {
      // pass our token into the header of each request
      authorization: localStorage.getItem("auth-token"),
    },
  });

  const errorLink = onError(({ graphQLErrors }) => {
    if (graphQLErrors) graphQLErrors.map(({ message }) => console.log(message));
  });

  client = new ApolloClient({
    link: ApolloLink.from([errorLink, httpLink]),
    cache,
    onError: ({ networkError, graphQLErrors }) => {
      console.log("graphQLErrors", graphQLErrors);
      console.log("networkError", networkError);
    },
  });
}

async function populateCache() {
  const token = localStorage.getItem("auth-token");
  // //debugger

  await cache.writeData({
    data: {
      isLoggedIn: Boolean(token),
    },
  });

  if (token) {
    await client
      .mutate({ mutation: VERIFY_USER, variables: { token } })
      .then(({ data }) => {
        // //debugger
        cache.writeData({
          data: {
            isLoggedIn: data.verifyUser.loggedIn,
            currentUserId: data.verifyUser._id,
          },
        });
      })
      .catch((err) => {
        cache.writeData({
          data: {
            isLoggedIn: false,
            currentUserId: null,
          },
        });
      });
  }
}

setupClient()
  .then(() => populateCache())
  .then(() => {
    const Root = () => {
      // //debugger
      return (
        <ApolloProvider client={client}>
          <App />
        </ApolloProvider>
      );
    };

    ReactDOM.render(<Root />, document.getElementById("root"));
  });

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
