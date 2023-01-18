import React,{useState,useEffect} from "react";
import {Card, Button} from "react-bootstrap"
import {useParams, useNavigate, useSearchParams} from "react-router-dom";
import Stack from 'react-bootstrap/Stack'
import {HiPlusSm} from "react-icons/hi"
import {NEW_DOC} from "../routing/constants"
import {gql} from "@apollo/client";
import { DocumentsGraphqlTable } from "../components/DocumentsGraphqlTable";
//import { ApolloProvider} from '@apollo/client';
//import {createApolloClient} from '../routing/ApolloClientConfig'
import {WOQLClientObj} from '../init-woql-client'
import { extractedResults, ControlledGraphqlQuery } from '@terminusdb/terminusdb-react-table'

export const DocumentsGraphqlList = () => {   
    const {type} = useParams()
    const {documentTablesConfig,woqlClient} = WOQLClientObj()
    const [searchParams]  = useSearchParams()
    const navigate = useNavigate()

   //if(!woqlClient) return ""
    //const client = createApolloClient(woqlClient)
    if(!documentTablesConfig) return 
   
    let startFilters = {}
    if(searchParams.get('filters')){
        startFilters ={"name":{"regex":searchParams.get('filters')}}
    }      
    const onRowClick = (row) =>{
        const fullId = row["id"]
        const id = fullId.substring(fullId.lastIndexOf("/")+1)
        navigate(`${id}`)
    }

    function handleCreate(e) {
        navigate(`${NEW_DOC}`)
    }
 
    if(!documentTablesConfig) return 
    return <Card className="content border-secondary w-100 mt-5" variant="light">
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
            <DocumentsGraphqlTable tableConfig={documentTablesConfig} 
                    type={type} 
                    startFilters={startFilters} 
                    onRowClick={onRowClick}/>
            </Card.Body>
        </Card>
       
}

/*
 <DocumentsTable tableConfig={{}} 
                    type={type} 
                    startFilters={startFilters} 
                    onRowClick={onRowClick}/>*/