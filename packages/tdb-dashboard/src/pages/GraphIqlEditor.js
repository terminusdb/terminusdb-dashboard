import React, {useEffect} from "react";
import { createGraphiQLFetcher } from "@graphiql/toolkit";
import { GraphiQL } from "graphiql";
//import {Container} from "react-bootstrap"
import { Layout } from "./Layout";
import {WOQLClientObj} from '../init-woql-client'
//import "./style.css"

export function GraphIqlEditor({}) {
  const {woqlClient,currentChangeRequest} = WOQLClientObj() 
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

 const layoutClass = currentChangeRequest ? "container-fluid mainGraphIqlCR" :  "container-fluid mainGraphIql"
  
  return (
    <Layout mainClassName={layoutClass} showLeftSideBar={false}>
        <GraphiQL 
          editorTheme="shadowfox"
          defaultQuery={'query()'}
          fetcher={fetcher}
        
        />
    </Layout>
  );
}
