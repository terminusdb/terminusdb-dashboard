import React, {useState,useEffect}  from "react";
import {WOQLClientObj} from '../init-woql-client'
import {NewDocumentComponent, useTDBDocuments} from "@terminusdb/terminusdb-documents-ui-template"
import { useNavigate, useParams } from "react-router-dom";
import {ErrorMessageReport} from "../components/ErrorMessageReport"
import {Loading} from "../components/Loading"
import {CreateChangeRequestModal} from "../components/CreateChangeRequestModal"
import {DocumentSearchComponent} from "../components/DocumentSearchComponent"
//import '@terminusdb/terminusdb-documents-ui/dist/css/terminusdb__darkly.css'

export const DocumentNew = () => {   
    const {organization,dataProduct,type} = useParams()
    const {setChangeRequestBranch, branch,woqlClient,currentChangeRequest,useChangeRequest} = WOQLClientObj()
    const [showModal, setShowModal] = useState(false)

    const {
        frames,
        error,
        setError,
        getDocumentFrames,
        createDocument, 
        formData
    } = useTDBDocuments(woqlClient)
    const navigate = useNavigate()
  

    // we have to check the branch no the change request
    // in this moment we create change_request only if you 
    //try to change/add documents in main branch
    // I'm moving this logic in change request
    useEffect(() => {
        if(!currentChangeRequest && useChangeRequest){
            setShowModal(true)
        }
        getDocumentFrames()
	},[branch])

    const callCreateDocument = async (jsonDocument) =>{
        const created = await createDocument(jsonDocument)
        if(created){
            navigate(`/${organization}/${dataProduct}/documents/${type}`)
        }
    }

    const closeButtonClick = () =>{
        navigate(-1)
    }

    if(!frames) return  <Loading message={`Fetching frames for document type ${type} ...`}/>
    return  <React.Fragment>
            {showModal && <CreateChangeRequestModal showModal={showModal} type={type}  setShowModal={setShowModal}  updateViewMode={setChangeRequestBranch}/>}
            {error && <ErrorMessageReport error={error} setError={setError}/>}
            {(!useChangeRequest || currentChangeRequest) &&  frames &&  
                <NewDocumentComponent 
                    SearchComponent={DocumentSearchComponent}
                    frames={frames}
                    documentJson={formData}
                    createDocument={callCreateDocument}
                    type={type}
                    closeButtonClick={closeButtonClick}
                />     
            }
            </React.Fragment>
}