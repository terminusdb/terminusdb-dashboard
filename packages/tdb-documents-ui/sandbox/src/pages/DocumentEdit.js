import React, {useEffect}  from "react";
import {EditDocumentComponent} from "@terminusdb/terminusdb-documents-ui-template"
import {useNavigate, useParams } from "react-router-dom";
import {Alert,ProgressBar} from "react-bootstrap";
import {decodeUrl} from "./utils"
import {useTDBDocuments} from "@terminusdb/terminusdb-documents-ui"
import {DocumentSearchComponent} from "../components/DocumentSearchComponent"
import {ClientObj} from '../dashboard-context'

export const DocumentEdit = () => { 
    const {client} = ClientObj() 
    const {type, docid} = useParams()
    const navigate = useNavigate()
    
    const {
        updateDocument,
        getDocument,
        selectedDocument,
        getDocumentFrames,
        frames,
        error,
        setError
    } = useTDBDocuments(client)

    let documentID=decodeUrl(docid)

     const  updateDocumentHandler = async (jsonDoc) =>{
        const docUp = await updateDocument(jsonDoc)
        if(docUp){
            getDocument(documentID)
            navigate(-1)
        }
   }
    // implement the chage method
    useEffect(() => {
        getDocumentFrames()
        getDocument(documentID)
	},[])

    const closeButtonClick = () =>{
        navigate(-1)
    }
  
    if(!selectedDocument || !frames) return  <ProgressBar message={`Fetching ${documentID} ...`}/>
    const errorMessage = typeof error === "object" ? JSON.stringify(error,null,4) : error
    return <React.Fragment>
         {error && <Alert variant="danger" className="m-5" onClose={() => setError(false)} dismissible>
                Server Error: {errorMessage} </Alert>}
            <EditDocumentComponent
                SearchComponent={DocumentSearchComponent}
                documentID={documentID} 
                updateDocument={updateDocumentHandler}
                type={type}
                frames={frames}
                closeButtonClick={closeButtonClick}
                selectedDocument={selectedDocument}
            />
        </React.Fragment>
}
