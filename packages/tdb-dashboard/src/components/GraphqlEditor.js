import React, {useEffect, useState}  from 'react';
import Card from 'react-bootstrap/Card'
import Stack  from "react-bootstrap/Stack";
import Button  from "react-bootstrap/Button";
import {ImMagicWand} from "react-icons/im"
import {
  GraphiQLProvider,
  QueryEditor,
  useEditorContext,
  useCopyQuery,
  usePrettifyEditors,
} from '@graphiql/react';
import { createGraphiQLFetcher } from '@graphiql/toolkit';
import {WOQLClientObj} from '../init-woql-client'
import {CopyButton} from "./utils"
require('codemirror/lib/codemirror.css');
require('codemirror/theme/shadowfox.css');

export function GraphqlEditor(props) {
  const {woqlClient,currentChangeRequest} = WOQLClientObj() 

  if(!woqlClient) return 
  const client = woqlClient.copy()
  const url = client.connectionConfig.branchBase("graphql")

  const fetcher = createGraphiQLFetcher({
    url:url,
    headers: {
    authorization: 'Bearer '+ woqlClient.localAuth().key
}});
  
/*
...passed and the value is a GraphQL schema, it will be validated and then used for GraphiQL if it is valid.
...passed and the value is the result of an introspection query, a GraphQL schema will be built from this introspection data, it will be validated, and then used for GraphiQL if it is valid.
...set to null, no introspection request will be triggered and GraphiQL will run without a schema.
...set to undefined or not set at all, an introspection request will be triggered. 
...If this request succeeds, a GraphQL schema will be built from the returned introspection data, it will be validated, and then used for GraphiQL if it is valid. If this request fails, GraphiQL will run without a schema.
*/
  return (//schema={schema}
    <GraphiQLProvider schema={props.schema} fetcher={fetcher} defaultQuery='query(){}'>
      <EditorInterface  query={props.query} setValue={props.setValue}/>
    </GraphiQLProvider>
  );
}

function EditorInterface (props){
  const executionContext = useEditorContext({ nonNull: true });
  const copy = useCopyQuery({ onCopyQuery: props.onCopyQuery });
  //const merge = useMergeQuery();
  const prettify =  usePrettifyEditors(); 

  useEffect(()=>{
    if(executionContext.queryEditor){
      executionContext.queryEditor.on('blur', onBlurHandler);  
    }
  },[executionContext.queryEditor])
  
  
  function prettifyCall(){
    try{
      prettify();
    }catch(err){
      console.log("pretty error")
    }
  }
  
  // return the last query
  const onBlurHandler =(cm)=>{
    if(props.setValue){
      props.setValue(cm.doc.getValue())
    }
  }

  React.useEffect(()=>{
    if(executionContext.queryEditor){
        executionContext.queryEditor.setValue(props.query)
        prettifyCall()
    }
  },[props.query, executionContext.queryEditor])
  
  return <Card className="h-100">
        <Card.Header>
          <Stack direction="horizontal" gap={1}>
              Graphql query
              <Button variant="transparent" 
                className={`text-light btn btn-md bg-light text-dark float-right ml-auto`}
                title="Prettify"
                onClick={prettifyCall}>
                <ImMagicWand className='mb-1'/>
            </Button>
              <CopyButton onClick = {copy} title="Copy grapfgl query" css={"btn btn-md bg-light text-dark float-right"}/>
          </Stack>
        </Card.Header>
        <Card.Body>
          <QueryEditor editorTheme="shadowfox">
          </QueryEditor>
        </Card.Body>
      </Card>     
}