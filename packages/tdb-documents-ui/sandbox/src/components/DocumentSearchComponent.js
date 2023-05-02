import React,{useEffect} from "react"
import {DocumentsGraphqlTable} from "@terminusdb/terminusdb-documents-ui-template"
import {gql} from "@apollo/client"
import {useTDBDocuments} from "@terminusdb/terminusdb-documents-ui"
import {ClientObj} from '../dashboard-context'
/**
 * 
 * @param {*} setSelected function to get selected document link by user 
 * @param {*} doctype document type selected
 * @returns 
 */
export const DocumentSearchComponent = ({setSelected, doctype}) => {
    const {apolloClient,client} = ClientObj()
    if(!apolloClient) return <div/>
    const {documentTablesConfig,getGraphqlTablesConfig} = useTDBDocuments(client)

    useEffect(() => {
        if(doctype){       
            getGraphqlTablesConfig()         
        }
     },[doctype]);

    const querystr  = documentTablesConfig.objQuery[doctype].query
    const gqlQuery = gql`${querystr}`
    if(!gqlQuery) return <div/>

    return  <DocumentsGraphqlTable tableConfig={documentTablesConfig} 
                type={doctype} 
                gqlQuery={gqlQuery}
                apolloClient={apolloClient}
                onRowClick={setSelected} 
                showGraphqlTab={false} />

}