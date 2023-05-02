import React, {useEffect}  from "react";
import {ViewDocumentComponent} from "@terminusdb/terminusdb-documents-ui-template"
import {useParams,useNavigate } from "react-router-dom";
import {Alert , ProgressBar} from 'react-bootstrap'
import {decodeUrl} from "./utils"
import {EDIT_DOC} from "./constants"
import {useTDBDocuments} from "@terminusdb/terminusdb-documents-ui"
import {ClientObj} from '../dashboard-context'

export const DocumentView = (props) => {  
    const {client} = ClientObj() 
    const {type, docid} = useParams()
    const navigate = useNavigate()
    
    const {
        frames,
        selectedDocument,
        error,
        deleteDocument,
        getDocument,
        getDocumentFrames,
        setError
    } = useTDBDocuments(client)

    let documentID=decodeUrl(docid)
 
    useEffect(() => {
        getDocumentFrames()
        getDocument(documentID)
	}, [] )

    async function callDeleteDocument(){
        var answer = window.confirm("Are you sure you want to delete this document");
        if (answer) {
            const delCall = await deleteDocument(documentID)
            if(delCall){
                navigate(-1)
            }
        } 
    }

    if(!selectedDocument || !frames) return  <ProgressBar message={`Fetching ${documentID} ...`}/>
    
    const getDocumentById=(docId)=>{
        return client.getDocument({id:docId})
    }
    const errorMessage = typeof error === "object" ? JSON.stringify(error,null,4) : error
    
    return <React.Fragment>
       {error && <Alert variant="danger" className="m-5" onClose={() => setError(false)} dismissible>
                Server Error: {errorMessage} </Alert>}
        <ViewDocumentComponent 
          type={type}
          getDocumentById={getDocumentById}
          selectedDocument={selectedDocument}
          frames={frames}
          closeButtonClick={()=>navigate(-1)}
          documentID={documentID}
          deleteDocument={callDeleteDocument}
          editDocument = {()=>navigate(`${EDIT_DOC}`)}
        />
    </React.Fragment>
}
