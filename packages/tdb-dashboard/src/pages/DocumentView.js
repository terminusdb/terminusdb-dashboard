import React, {useEffect, useState}  from "react";
import {WOQLClientObj} from '../init-woql-client'
import Card from "react-bootstrap/Card"
import {FrameViewer} from "@terminusdb/terminusdb-documents-ui"
import * as CONST from "../components/constants"
import { useNavigate, useParams } from "react-router-dom";
import {Header, onTraverse, DeleteMessage} from "../components/DocumentComponents"
import {JsonFrameViewer} from "../components/JsonFrameViewer"
import {GetDocumentHook, DeleteDocumentHook} from "../hooks/DocumentHook"
import Alert from 'react-bootstrap/Alert'
import {Loading} from "../components/Loading"
import {DocumentControlObj} from "../hooks/DocumentControlContext"
import {TarverseDocumentLinks} from "../components/TarverseDocumentLinks"
import {CreateChangeRequestModal} from "../components/CreateChangeRequestModal"
import Modal from 'react-bootstrap/Modal';
import {decodeUrl} from "../components/utils"

const DisplayDocumentBody = ({setLoading, setErrorMsg, setClicked, setModalShow}) => {
    const { 
        woqlClient
    } = WOQLClientObj()

    const {
        view,
        frames
    } = DocumentControlObj()

    const {type, id} = useParams()
    // constants to store document data 
    const [data, setData]=useState(false)

    // hook to view a document 
    let documentID=decodeUrl(id)
    const viewResult = GetDocumentHook(woqlClient, documentID, setData, setLoading, setErrorMsg) || null

    function handleTraverse (documentID) {
        if(setModalShow) setModalShow(Date.now())
        onTraverse(documentID, setClicked)
    }

    if(!data || !frames) return  <Loading message={`Fetching ${documentID} ...`}/>

    // JSON View
    if(view === CONST.JSON_VIEW) {
        return <JsonFrameViewer jsonData={data} mode={CONST.VIEW_DOCUMENT}/>
    }

    // Form View
    return<FrameViewer frame={frames}
        type={type}
        mode={CONST.VIEW_DOCUMENT}
        formData={data}
        hideSubmit={true}
        onTraverse={handleTraverse}
    />
}


  

export const DocumentView = () => {   

    const { 
        woqlClient,
        setChangeRequestBranch,
        branch
    } = WOQLClientObj()

    const {type, id} = useParams()

    // constants to display document body in Form or JSON View
    const [view, setView]=useState(CONST.FORM_VIEW)
    const [loading, setLoading]=useState(false)
    const [errorMsg, setErrorMsg]=useState(false)
    const [clickedDelete, setClickedDelete]=useState(false)
    const [deleteDocument, setDeleteDocument] = useState(false)

    //constants to traverse through documents 
    const [clicked, setClicked]=useState(false)
    const [modalShow, setModalShow] = React.useState(false);
    const [showCRModal, setShowCRModal] = useState(false)
   

    const handleClose = () => setClickedDelete(false);

    let documentID=decodeUrl(id)
    const deleteResult=DeleteDocumentHook(woqlClient, documentID, type, deleteDocument, setLoading, setErrorMsg) 

    const updateViewMode =(newBranchName, changeRequestId)=>{
        setChangeRequestBranch(newBranchName, changeRequestId)
        setClickedDelete(Date.now())
    }

    function handleDelete () {
        setDeleteDocument(Date.now())
    }

    return <main className="content w-100 document__interface__main">
        {errorMsg && <Alert variant={"danger"} className="mr-3">
            {errorMsg}
        </Alert>} 
        { clickedDelete && <Modal show={clickedDelete} onHide={handleClose}>
            {loading && <span className="text-warning text-break p-3">{`Deleting document ${documentID} ...`}</span>}
            {!loading && <DeleteMessage handleDelete={handleDelete}/>}
        </Modal>
        }
        {showCRModal && <CreateChangeRequestModal showModal={showCRModal}
            type={type} 
            setShowModal={setShowCRModal} 
            updateViewMode={updateViewMode}/>}
        <TarverseDocumentLinks
            setClicked={setClicked}
            clicked={clicked}
            show={modalShow}
            onHide={() => setModalShow(false)}/>
        <Card className="mr-3 bg-dark">
            <Card.Header className="justify-content-between d-flex w-100 text-break">
                <Header mode={CONST.VIEW_DOCUMENT} 
                    type={type} 
                    id={documentID} 
                    setClickedDelete={setClickedDelete}
                    setShowCRModal={setShowCRModal}/>
            </Card.Header>
            <Card.Body className="text-break">
                <DisplayDocumentBody setLoading={setLoading} 
                    setModalShow={setModalShow}
                    setClicked={setClicked}
                    setErrorMsg={setErrorMsg}/>
            </Card.Body>
        </Card>
    </main>
}
