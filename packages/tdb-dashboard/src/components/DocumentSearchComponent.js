import React from "react"
import {DocumentsGraphqlTable} from "@terminusdb/terminusdb-documents-ui-template"
import {gql} from "@apollo/client"
import {DocumentsUIHook} from "@terminusdb/terminusdb-documents-ui"
import {WOQLClientObj} from '../init-woql-client'
/**
 * 
 * @param {*} setSelected function to get selected document link by user 
 * @param {*} doctype document type selected
 * @returns 
 */
export const DocumentSearchComponent = ({setSelected, doctype}) => {
    const {apolloClient,woqlClient} = WOQLClientObj()
    if(!apolloClient) return <div/>
    const {documentTablesConfig} = DocumentsUIHook(woqlClient)
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