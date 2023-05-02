import React, {useEffect} from "react";
import {useParams, useNavigate} from "react-router-dom";
import {NEW_DOC,EDIT_DOC} from "./constants"
import {gql} from "@apollo/client";
import { ListDocumentsComponent } from "@terminusdb/terminusdb-documents-ui-template";
import {ClientObj} from '../dashboard-context'
import {useTDBDocuments} from "@terminusdb/terminusdb-documents-ui"
import { Alert, ProgressBar } from "react-bootstrap";

// I pass this so I'm sure it exists before loading the component
export const DocumentsGraphqlList = () => {    
    const {type} = useParams()
    const {apolloClient,client} = ClientObj()
    const {deleteDocument,
        loading,
        error,
        getGraphqlTablesConfig,
        documentTablesConfig,
        setError} = useTDBDocuments(client)
    
    const navigate = useNavigate()
    
    useEffect(() => {
        getGraphqlTablesConfig()
    },[client])

    async function callDeleteDocument(row){
        var answer = window.confirm("Are you sure you want to delete this document");
        if (answer) {
            let fullId = row['id']
            const delCall = await deleteDocument(fullId)
            if(delCall){
                navigate(-1)
            }
        } 
    }

    const onViewClick = (row) =>{
        let fullId = row['id']
        let fullIdEncode = btoa(fullId)
        navigate(fullIdEncode)
    }

    const onEditClick = (row) =>{
        let fullId = row['id']
        let fullIdEncode = btoa(fullId)
        navigate(`${fullIdEncode}/${EDIT_DOC}`)
    }

    function handleCreate(e) {
        navigate(`${NEW_DOC}`)
    }

    if(loading) return <ProgressBar message="Loading configuration" />
    
    const querystr  = documentTablesConfig ? documentTablesConfig.objQuery[type].query : null
    const query = querystr ? gql`${querystr}` : false
    const errorMessage = typeof error === "object" ? JSON.stringify(error,null,4) : error

    return  <React.Fragment>
             {error && <Alert variant="danger" className="m-5" onClose={() => setError(false)} dismissible>
                Server Error: {errorMessage} </Alert>}
            {query &&
            <ListDocumentsComponent type={type}
                gqlQuery={query} 
                apolloClient={apolloClient} 
                tablesConfig={documentTablesConfig} 
                onRowClick={onViewClick} 
                onViewButtonClick={onViewClick}
                onEditButtonClick={onEditClick}
                onDeleteButtonClick={callDeleteDocument}
                onCreateButtonClick={handleCreate}/>}
            </React.Fragment> 
}