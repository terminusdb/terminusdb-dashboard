import React, {useEffect, useState}  from "react";
import {WOQLClientObj} from '../init-woql-client'
import {EditDocumentComponent, useTDBDocuments} from "@terminusdb/terminusdb-documents-ui-template"
import {useNavigate, useParams } from "react-router-dom";
import {ErrorMessageReport} from "../components/ErrorMessageReport"
import {Loading} from "../components/Loading"
import {CreateChangeRequestModal} from "../components/CreateChangeRequestModal"
import {decodeUrl} from "../components/utils"
import {DocumentSearchComponent} from "../components/DocumentSearchComponent"
import '@terminusdb/terminusdb-documents-ui/dist/css/terminusdb__darkly.css'

export const DocumentEdit = () => { 
    const {setChangeRequestBranch, branch,woqlClient,currentChangeRequest,useChangeRequest} = WOQLClientObj()
    if(!woqlClient) return ''
    const [showModal, setShowModal] = useState(false) 
    const {type, docid} = useParams()
    const navigate = useNavigate()
     
    const {
        updateDocument,
        getSelectedDocument,
        selectedDocument,
        getDocumentFrames,
        frames,
        error,
        setError
    } = useTDBDocuments(woqlClient)

    let documentID=decodeUrl(docid)

     const  updateDocumentHandler = async (jsonDoc) =>{
        const docUp = await updateDocument(jsonDoc)
        if(docUp){
            getSelectedDocument(documentID)
            navigate(-1)
        }
   }
    // implement the chage method
    useEffect(() => {
        if(!currentChangeRequest){
            setShowModal(true)
        }
        getDocumentFrames()
        getSelectedDocument(documentID)
	},[branch])

    const closeButtonClick = () =>{
        navigate(-1)
    }
  
    if(!selectedDocument || !frames) return  <Loading message={`Fetching ${documentID} ...`}/>

    return <React.Fragment>
        {error && <ErrorMessageReport error={error} setError={setError}/>}
        {showModal && <CreateChangeRequestModal showModal={showModal} type={type}  setShowModal={setShowModal}  updateViewMode={setChangeRequestBranch}/>}
        {!useChangeRequest || currentChangeRequest && 
            <EditDocumentComponent
                SearchComponent={DocumentSearchComponent}
                documentID={documentID} 
                updateDocument={updateDocumentHandler}
                type={type}
                frames={frames}
                closeButtonClick={closeButtonClick}
                documentJson={selectedDocument}
            />
        }
        </React.Fragment>
}
