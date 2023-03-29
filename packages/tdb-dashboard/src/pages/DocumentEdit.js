import React, {useEffect, useState}  from "react";
import {WOQLClientObj} from '../init-woql-client'
import {EditDocumentComponent} from "@terminusdb/terminusdb-documents-ui-template"
import {useNavigate, useParams } from "react-router-dom";
import {ErrorMessageReport} from "../components/DocumentComponents"
import {Loading} from "../components/Loading"
import {CreateChangeRequestModal} from "../components/CreateChangeRequestModal"
import {decodeUrl} from "../components/utils"
import {DocumentSearchComponent} from "../components/DocumentSearchComponent"
import {DocumentsUIHook} from "@terminusdb/terminusdb-documents-ui"

export const DocumentEdit = () => { 
    const {setChangeRequestBranch, branch,woqlClient} = WOQLClientObj()
    if(!woqlClient) return ''
    const [showModal, setShowModal] = useState(false) 
    const {type, docid} = useParams()
    const navigate = useNavigate()
    
    const {
        updateDocument,
        getDocument,
        selectedDocument,
        getUpdatedFrames,
        frames,
        error,
        setError
    } = DocumentsUIHook(woqlClient)

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
        if(branch === "main"){
            setShowModal(true)
        }
        getUpdatedFrames()
        getDocument(documentID)
	},[branch])

    const closeButtonClick = () =>{
        navigate(-1)
    }
  
    if(!selectedDocument || !frames) return  <Loading message={`Fetching ${documentID} ...`}/>

    return <React.Fragment>
        {error && <ErrorMessageReport error={error} setError={setError}/>}
        {showModal && <CreateChangeRequestModal showModal={showModal} type={type}  setShowModal={setShowModal}  updateViewMode={setChangeRequestBranch}/>}
        {branch !== "main" && 
            <EditDocumentComponent
                SearchComponent={DocumentSearchComponent}
                documentID={documentID} 
                updateDocument={updateDocumentHandler}
                type={type}
                frames={frames}
                closeButtonClick={closeButtonClick}
                selectedDocument={selectedDocument}
            />
        }
        </React.Fragment>
}
