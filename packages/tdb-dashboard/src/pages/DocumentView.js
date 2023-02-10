import React, {useEffect, useState}  from "react";
import {WOQLClientObj} from '../init-woql-client'
import Card from "react-bootstrap/Card"
import {FrameViewer} from "@terminusdb/terminusdb-documents-ui"
import * as CONST from "../components/constants"
import { useNavigate, useParams } from "react-router-dom";
import {Header, onTraverse} from "../components/DocumentComponents"
import {JsonFrameViewer} from "../components/JsonFrameViewer"
import {GetDocumentHook, DeleteDocumentHook} from "../hooks/DocumentHook"
import Alert from 'react-bootstrap/Alert'
import {Loading} from "../components/Loading"
import {DocumentControlObj} from "../hooks/DocumentControlContext"
import {TarverseDocumentLinks} from "../components/TarverseDocumentLinks"

const DisplayDocumentBody = ({setLoading, setErrorMsg, setClicked, setModalShow}) => {
    const { 
        woqlClient, 
        frames
    } = WOQLClientObj()

    const {
        view
    } = DocumentControlObj()

    const {type, id} = useParams()
    // constants to store document data 
    const [data, setData]=useState(false)

    // hook to view a document 
    let documentID= atob(id)
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
        woqlClient 
    } = WOQLClientObj()

    const {type, id} = useParams()

    // constants to display document body in Form or JSON View
    const [view, setView]=useState(CONST.FORM_VIEW)
    const [loading, setLoading]=useState(false)
    const [errorMsg, setErrorMsg]=useState(false)
    const [clickedDelete, setClickedDelete]=useState(false)

    //constants to traverse through documents 
    const [clicked, setClicked]=useState(false)
    const [modalShow, setModalShow] = React.useState(false);

    let documentID=atob(id)
    const deleteResult=DeleteDocumentHook(woqlClient, documentID, type, clickedDelete, setLoading, setErrorMsg) 

    // create a change request before editing document
    const startCRMode = (mode) => {
        // logic to start CR mode
    }

    return <main className="content w-100 document__interface__main">
        {errorMsg && <Alert variant={"danger"} className="mr-3">
            {errorMsg}
        </Alert>}
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
                    startCRMode={startCRMode}/>
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
