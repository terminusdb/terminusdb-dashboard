import React,{useState,useEffect} from "react";
import {Card, Button} from "react-bootstrap"
import {useParams, useNavigate, useSearchParams} from "react-router-dom";
import Stack from 'react-bootstrap/Stack'
import {HiPlusSm} from "react-icons/hi"
import {CREATE_PATH} from "./constants"
import {gql} from "@apollo/client";
import { DocumentsTable } from "../components/DocumentsTable";
import { ApolloProvider} from '@apollo/client';
import {createApolloClient} from '../routing/ApolloClientConfig'
import {WOQLClientObj} from '../init-woql-client'
import { extractedResults, ControlledGraphqlQuery } from '@terminusdb/terminusdb-react-table'

export const DocumentList = () => {   
    const {type} = useParams()
    const {documentTablesConfig,woqlClient} = WOQLClientObj()
    const [searchParams]  = useSearchParams()
    const navigate = useNavigate()

    if(!woqlClient) return ""
    const client = createApolloClient(woqlClient)
    if(!documentTablesConfig) return 
   
    let startFilters = {}
    if(searchParams.get('filters')){
        startFilters ={"name":{"regex":searchParams.get('filters')}}
    }   

   // const client = createApolloClient(woqlClient)
    
    const onRowClick = (row) =>{
        const fullId = row["id"]
        const id = fullId.substring(fullId.indexOf(type))
        navigate(`${id}`)
    }

    function handleCreate(e) {
        navigate(`${CREATE_PATH}`)
    }
 
    if(!documentTablesConfig) return 
    return <ApolloProvider client ={client}>
            <Card className="content border-secondary w-100 mt-5" variant="light">
            <Card.Header>
                <Stack direction="horizontal" gap={3}>
                    <h6>Documents of type - <strong className="text-success">{type}</strong></h6>
                        <div className="ms-auto">
                            <Button className="bg-light text-dark" onClick={handleCreate}>
                                <HiPlusSm className="mr-1 mb-1"/>
                                <small>{`Add new ${type}`}</small>
                            </Button>
                        </div>
                </Stack>   
            </Card.Header>
            <Card.Body className="text-break">
            <DocumentsTable tableConfig={documentTablesConfig} 
                    type={type} 
                    startFilters={startFilters} 
                    onRowClick={onRowClick}/>
            </Card.Body>
        </Card>
        </ApolloProvider>     
}

/*
 <DocumentsTable tableConfig={{}} 
                    type={type} 
                    startFilters={startFilters} 
                    onRowClick={onRowClick}/>*/