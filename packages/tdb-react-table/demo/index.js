import React, {useState, useEffect} from "react"
import ReactDOM from "react-dom";
import { ApolloClient,ApolloLink, concat, InMemoryCache, ApolloProvider, gql, HttpLink, Query } from '@apollo/client';
import {ComponentTest} from "./TableqlTest"

//const httpLink = new HttpLink({ uri: "http://localhost:6363/api/graphql/terminuscms/lego" });

const httpLink = new HttpLink({ uri: "http://127.0.0.1:4242/team01/api/graphql/team01/test01" });

const authMiddleware = new ApolloLink((operation, forward) => {
  // add the authorization to the headers
  operation.setContext(({ headers = {} }) => ({
    headers: {
      ...headers,
      authorization: "Bearer eyJhbGciOiJSUzI1NiIsInR5cCI6IkpXVCIsImtpZCI6IkpXUjBIOXYyeTFORUdaZXlodUM0aCJ9.eyJodHRwOi8vdGVybWludXNkYi5jb20vc2NoZW1hL3N5c3RlbSN0ZWFtIjoiY29sbGFyX3RlYW0iLCJodHRwOi8vdGVybWludXNkYi5jb20vc2NoZW1hL3N5c3RlbSNlbWFpbCI6ImNvbGxhYm9yYXRvckBnbWFpbC5jb20iLCJodHRwOi8vdGVybWludXNkYi5jb20vc2NoZW1hL3N5c3RlbSNhZ2VudF9uYW1lIjoiYXV0aDB8NjE1NDYyZjhhYjMzZjQwMDZhNmJlZTBjIiwiaXNzIjoiaHR0cHM6Ly9zaWdudXAtZGV2LnRlcm1pbnVzZGIuY29tLyIsInN1YiI6ImF1dGgwfDYxNTQ2MmY4YWIzM2Y0MDA2YTZiZWUwYyIsImF1ZCI6WyJodHRwczovL3Rlcm1pbnVzY2xvdWQvdXNlcnMiLCJodHRwczovL3Rlcm1pbnVzLWNsb3VkLWRldi5ldS5hdXRoMC5jb20vdXNlcmluZm8iXSwiaWF0IjoxNjczNDMzNDQ4LCJleHAiOjE2NzM1MTk4NDgsImF6cCI6InM2aVlGSnpvU2VkVUhHVVVhUllDR0dXWFdFUEhrZDAyIiwic2NvcGUiOiJvcGVuaWQgcHJvZmlsZSBlbWFpbCJ9.KzfMweh5Dyy9BWsR68vRics_KpcRP2UIhOn48TvL0ynCu5pb27-Zyvn8rkhMkmlH4eR0bbIC6UxPM9c9W997K-Et10cHN7Y5XM7-gj6EZsL9usHkTUVf4iVo0yVAlqvyE4QDSdBHO_K_8cI0jOI3SQR2TVd90LOVy7N6evC8-dKjZBXHHnh2377d_j4uOJupM1EB1A90i2E8kT0koMtBjyQLVJ-pqpU1btk6FmJGQDr6TZOLOq856-Dl2xub4UfZcyjeOI_tlVhWnFcsish1r5bJoDSFlcnJBjx-np9MlJ7zyWqA8PpArvaPueelb_u4uP5vhNfwPt7nnwgIGrdqPg"
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