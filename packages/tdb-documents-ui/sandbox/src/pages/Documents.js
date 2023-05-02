import React, {useEffect,useState} from "react"
import {DocumentSummary} from "@terminusdb/terminusdb-documents-ui-template"
import {useTDBDocuments} from "@terminusdb/terminusdb-documents-ui"
import {ClientObj} from '../dashboard-context'
import {useNavigate} from "react-router-dom"
import { Alert, ProgressBar } from "react-bootstrap"

export const Documents = () => {   
    const {client} = ClientObj()
    const navigate = useNavigate() 
    const {perDocumentCount,
        totalDocumentCount, 
        documentClasses,
        getDocumentNumbers,
        setError,
        loading,
        error}=useTDBDocuments(client)


    useEffect(() => {
       if(client)getDocumentNumbers()
    }, [client])

    function handleCardClick (doc) {
        navigate(doc) 
    }

    if(loading) return  <ProgressBar message={`Fetching documents ...`}/>

    const errorMessage = typeof error === "object" ? JSON.stringify(error,null,4) : error

    return <div className="w-100">
            {error && <Alert variant="danger" className="m-5" onClose={() => setError(false)} dismissible>
                Server Error: {errorMessage} </Alert>}
           <DocumentSummary totalDocumentCount={totalDocumentCount}
            perDocumentCount={perDocumentCount} 
            documentClasses={documentClasses} onClick={handleCardClick}></DocumentSummary>
        </div>
}