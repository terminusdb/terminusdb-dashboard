import React from "react";
import { createGraphiQLFetcher } from "@graphiql/toolkit";
import { GraphiQL } from "graphiql";
//import {Container} from "react-bootstrap"
import { Layout } from "./Layout";
import {WOQLClientObj} from '../init-woql-client'
//import "./style.css"

export function GraphIqlEditor() {
  const {woqlClient} = WOQLClientObj() 
  if(!woqlClient) return 
  const client = woqlClient.copy()
  const url = client.connectionConfig.branchBase("graphql")

  // TO BE REVIEW!!!!
  const fetcher = createGraphiQLFetcher({
          url:url,
          headers: {
            authorization: 'Bearer '+ woqlClient.localAuth().key
        }
  });

  return (
    <Layout mainClassName="container-fluid mainGraphIql" showLeftSideBar={false}>
     
        <GraphiQL 
          editorTheme="shadowfox"
          fetcher={fetcher}
        />
     
    </Layout>
  );
}
