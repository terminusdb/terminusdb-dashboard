import React, {useEffect} from "react"
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
    const {documentTablesConfig,getGraphqlTableConfig} = DocumentsUIHook(woqlClient)

    getGraphqlTableConfig
    
    useEffect(() => {
        if(doctype){       
            getGraphqlTableConfig()         
        }
     },[doctype]);
    const querystr  = documentTablesConfig && documentTablesConfig.objQuery ? documentTablesConfig.objQuery[doctype].query : null
    const gqlQuery = querystr ? gql`${querystr}` : null
    if(!gqlQuery) return <div/>

    return  <DocumentsGraphqlTable tableConfig={documentTablesConfig} 
                type={doctype} 
                gqlQuery={gqlQuery}
                apolloClient={apolloClient}
                onRowClick={setSelected} 
                showGraphqlTab={false} />

}