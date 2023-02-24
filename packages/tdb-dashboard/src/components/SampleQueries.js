import React from "react"
import {GET_CLASSES_LINK, GET_PROPERTIES_LINK, GET_DOCUMENT_METADATA_LINK} from "./constants"
import {QueryPaneObj} from "../hooks/QueryPaneContext" 
import {WOQLClientObj} from '../init-woql-client'
import {MenuItem, SubMenu} from 'react-pro-sidebar'
import 'react-pro-sidebar/dist/css/styles.css'

export const SampleQueries = (props) => {
    const {
        woqlClient, 
        sidebarSampleQueriesState, 
        setSidebarSampleQueriesState
    } = WOQLClientObj()

    if(!woqlClient) return ""
    const dataProduct = woqlClient.db()

    const {addQueryPane} = QueryPaneObj()

    function handleQuery(query) {
        var q
        if(query == GET_CLASSES_LINK.label) {
           // q=getClassesLib(dataProduct, woqlClient)
        }
        else if (query == GET_PROPERTIES_LINK.label){
            q=getPropertiesLib(dataProduct, woqlClient)
        }
        else if (query == GET_DOCUMENT_METADATA_LINK.label){
            q=getDocumentMetadataLib(dataProduct, woqlClient)
        }
        addQueryPane(q)
    }

    return <SubMenu title="Example Queries"
        className="menu-title"
        defaultOpen={sidebarSampleQueriesState}
        onOpenChange={(e) => setSidebarSampleQueriesState(e)}>
        <SubMenu title="Schema Queries">
            <MenuItem title={GET_CLASSES_LINK.title}
                className="sub-menu-title"
                onClick={(e) => handleQuery(GET_CLASSES_LINK.label)}>{GET_CLASSES_LINK.label}</MenuItem>
            <MenuItem title={GET_PROPERTIES_LINK.title}
                className="sub-menu-title"
                onClick={(e) => handleQuery(GET_PROPERTIES_LINK.label)}>{GET_PROPERTIES_LINK.label}</MenuItem>
        </SubMenu>
        <SubMenu title="Document Queries">
            <MenuItem title={GET_DOCUMENT_METADATA_LINK.title}
                className="sub-menu-title"
                onClick={(e) => handleQuery(GET_DOCUMENT_METADATA_LINK.label)}>{GET_DOCUMENT_METADATA_LINK.label}</MenuItem>
        </SubMenu>
        <SubMenu title="Import Queries">
        </SubMenu>
    </SubMenu>
    
}
