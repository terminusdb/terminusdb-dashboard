import React, {useEffect} from "react"
import {DocumentClassesSummary,useTDBDocuments} from "@terminusdb/terminusdb-documents-ui-template"
import {ClientObj} from '../dashboard-context'
import {useNavigate} from "react-router-dom"
import { Alert, ProgressBar } from "react-bootstrap"

export const Documents = () => {   
    const {tdbClient} = ClientObj()
    const navigate = useNavigate() 
    const {perDocumentCount,
            totalDocumentCount, 
            getDocumentNumbers,
            setError,
            loading,
            error}=useTDBDocuments(tdbClient)


    useEffect(() => {
       if(tdbClient)getDocumentNumbers()
    }, [tdbClient])

    function handleCardClick (doc) {
        navigate(doc) 
    }

    if(loading) return  <ProgressBar message={`Fetching documents ...`}/>

    const errorMessage = typeof error === "object" ? JSON.stringify(error,null,4) : error

    return <div className="w-100">
            {error && <Alert variant="danger" className="m-5" onClose={() => setError(false)} dismissible>
                Server Error: {errorMessage} </Alert>}
           <DocumentClassesSummary 
                totalDocumentCount={totalDocumentCount}
                perDocumentCount={perDocumentCount} 
                onDocumentClick={handleCardClick}/>
        </div>
}