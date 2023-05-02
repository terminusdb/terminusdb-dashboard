import React,{useState,useEffect} from "react";
import { DocumentsGraphqlList } from "./DocumentsGraphqlList";
import { DocumentWoqlTable } from "../components/DocumentsWoqlTable";
import {WOQLClientObj} from '../init-woql-client'
import { useParams } from "react-router-dom"
import {useTDBDocuments} from "@terminusdb/terminusdb-documents-ui-template"
import {Loading} from "../components/Loading"

export const DocumentsPageList = () => {
    const {type} = useParams()
    
    const {woqlClient, currentChangeRequest } = WOQLClientObj()
    const {documentTablesConfig, getGraphqlTablesConfig,loading} = useTDBDocuments(woqlClient)
    if(!woqlClient) return ""

    const viewGraphql = documentTablesConfig &&  documentTablesConfig.objQuery[type] && documentTablesConfig.objQuery[type].query

    useEffect(() => {
        getGraphqlTablesConfig()
    },[])

    if(loading || documentTablesConfig===null) return <Loading message={`Loading Documents list ...`}/>
    if(viewGraphql) return <DocumentsGraphqlList documentTablesConfig={documentTablesConfig}/>
    if(documentTablesConfig === false) return <DocumentWoqlTable/>
    return ""
}