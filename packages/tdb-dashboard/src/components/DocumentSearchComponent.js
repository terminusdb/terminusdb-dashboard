import React, {useEffect} from "react"
import {DocumentsGraphqlTable} from "@terminusdb/terminusdb-documents-ui-template"
import {useTDBDocuments} from "@terminusdb/terminusdb-documents-ui-template"
import {WOQLClientObj} from '../init-woql-client'
import { Loading } from "./Loading"
import {getGqlQuery} from "../pages/utils"
/**
 * 
 * @param {*} setSelected function to get selected document link by user 
 * @param {*} doctype document type selected
 * @returns 
 */
export const DocumentSearchComponent = ({setSelected, doctype}) => {
    const {apolloClient,woqlClient} = WOQLClientObj()
    if(!apolloClient) return <div/>
    const {documentTablesConfig,getGraphqlTablesConfig} = useTDBDocuments(woqlClient)


    useEffect(() => {
        if(doctype){       
            getGraphqlTablesConfig()         
        }
     },[doctype]);
    const querystr  = documentTablesConfig && documentTablesConfig.objQuery ? documentTablesConfig.objQuery[doctype].query : null
    const gqlQuery = querystr ? getGqlQuery(querystr) : null
    const tableConfig =  documentTablesConfig && documentTablesConfig.tablesColumnsConfig ? documentTablesConfig.tablesColumnsConfig[doctype] : []
    const advancedSearchConfig = documentTablesConfig && documentTablesConfig.advancedSearchObj ? documentTablesConfig.advancedSearchObj[doctype] : null
  
    if(!gqlQuery)  return <Loading message={`Loading the .... ${doctype} documents`} type={'PROGRESS_BAR_COMPONENT'}/>

    return  <DocumentsGraphqlTable tableConfig={tableConfig} 
                advancedSearchConfig = {advancedSearchConfig }
                type={doctype} 
                gqlQuery={gqlQuery}
                apolloClient={apolloClient}
                onRowClick={setSelected} 
                showGraphqlTab={false} />

}