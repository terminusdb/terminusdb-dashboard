import React, {useState, useEffect} from "react"
import ReactDOM from "react-dom";
import { ApolloClient,ApolloLink, concat, InMemoryCache, ApolloProvider, gql, HttpLink, Query } from '@apollo/client';
import {ComponentTest} from "./TableqlTest"

const httpLink = new HttpLink({ uri: "http://localhost:6363/api/graphql/terminuscms/lego" });


const authMiddleware = new ApolloLink((operation, forward) => {
  // add the authorization to the headers
  operation.setContext(({ headers = {} }) => ({
    headers: {
      ...headers,
      authorization: "Basic Y29sbGFib3JhdG9yOmRlbW9fcGFzc3dvcmQ="
    }

    
  }));
console.log(operation)
  return forward(operation);
})




const cache = new InMemoryCache({
  addTypename: false,
  typePolicies: {
    Query: {
      fields: {
      ColorQuery: {
          merge(existing = [], incoming) {
            return [...existing, ...incoming];
          }
        }
      }
    }
  }
});

const value = concat(authMiddleware, httpLink)
console.log(value)
const client = new ApolloClient({
    cache:cache,
    link: value,
    
  });
  
  ReactDOM.render(
    <ApolloProvider client={client}>
      <ComponentTest />
    </ApolloProvider>,
    document.getElementById('root'),
  );