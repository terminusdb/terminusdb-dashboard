import React,{useState,useEffect} from "react";
import { DocumentsGraphqlList } from "./DocumentsGraphqlList";
import { DocumentWoqlTable } from "../components/DocumentsWoqlTable";
import {WOQLClientObj} from '../init-woql-client'
import { useParams } from "react-router-dom"

export const DocumentsPageList = () => {
    const {type} = useParams()
    const {documentTablesConfig,woqlClient} = WOQLClientObj()
    if(!woqlClient) return ""
    const viewGraphql = documentTablesConfig && documentTablesConfig.objQuery[type].query

    if(viewGraphql) return <DocumentsGraphqlList/>
    return <DocumentWoqlTable/>
}