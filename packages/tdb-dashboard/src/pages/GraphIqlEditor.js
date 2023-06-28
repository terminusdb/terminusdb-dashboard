import React, {useEffect} from "react";
import { createGraphiQLFetcher } from "@graphiql/toolkit";
import { GraphiQL } from "graphiql";

//import {Container} from "react-bootstrap"
import { Layout } from "./Layout";
import {WOQLClientObj} from '../init-woql-client'
require( "graphiql/graphiql.min.css");
require('codemirror/lib/codemirror.css');
require('codemirror/theme/shadowfox.css');

export function GraphIqlEditor({}) {
  const {woqlClient,currentChangeRequest} = WOQLClientObj() 
  if(!woqlClient) return 
  const client = woqlClient.copy()
  const url = client.connectionConfig.branchBase("graphql")
  const autorization = woqlClient.localAuth() === "jwt" ? 'Bearer '+ woqlClient.localAuth().key : 'Basic '+ btoa(`${woqlClient.localAuth().user}:${woqlClient.localAuth().key}`)
  
  // TO BE REVIEW!!!!
  const fetcher = createGraphiQLFetcher({
          url:url,
          headers: {
            authorization: autorization
        }
  });


 const layoutClass = currentChangeRequest ? "container-fluid mainGraphIqlCR" :  "container-fluid mainGraphIql"
  
  return (
    <Layout mainClassName={layoutClass} showLeftSideBar={false}>
  
  <GraphiQL 
          editorTheme="shadowfox"
          defaultQuery={'query{}'}
          fetcher={fetcher} 
        />
    

    </Layout>
  );
}

