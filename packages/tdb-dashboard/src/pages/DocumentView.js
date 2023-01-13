import React, {useState}  from "react";
import {WOQLClientObj} from '../init-woql-client'
import Card from "react-bootstrap/Card"
import {FrameViewer} from "@terminusdb/terminusdb-documents-ui"
import * as CONST from "../components/constants"
import { useNavigate, useParams } from "react-router-dom";
import TerminusClient from '@terminusdb/terminusdb-client'
import {Header} from "../components/DocumentComponents"
import {JsonFrameViewer} from "../components/JsonFrameViewer"
import {GetDocumentHook, DeleteDocumentHook} from "../hooks/DocumentHook"
import Alert from 'react-bootstrap/Alert'
import {Loading} from "../components/Loading"
import {DocumentControlObj} from "../hooks/DocumentControlContext"


const DisplayDocumentBody = ({setLoading, setErrorMsg}) => {
    const { 
        woqlClient, 
        frames
    } = WOQLClientObj()

    const {
        view
    } = DocumentControlObj()

    const {type, id} = useParams()

    function onTraverse(clicked) {
        console.log("clicked", clicked)
    }
    
    // constants to store document data 
    const [data, setData]=useState(false)

    // hook to create a new document 
    let documentID=`${type}/${id}`
    const viewResult = GetDocumentHook(woqlClient, documentID, setData, setLoading, setErrorMsg) || null

    if(!data || !frames) return  <Loading message={`Fetching ${documentID} ...`}/>

    // JSON View
    if(view === CONST.JSON_VIEW) {
        return <JsonFrameViewer jsonData={data} mode={CONST.VIEW_DOCUMENT}/>
    }

    // Form View
    return <FrameViewer frame={frames}
        type={type}
        mode={CONST.VIEW_DOCUMENT}
        formData={data}
        hideSubmit={true}
        onTraverse={onTraverse}
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

    let documentID=`${type}/${id}`
    const deleteResult=DeleteDocumentHook(woqlClient, documentID, type, clickedDelete, setLoading, setErrorMsg) 

    // create a change request before editing document
    const startCRMode = (mode) => {
        // logic to start CR mode
    }

    return <main className="content w-100 document__interface__main">
        {errorMsg && <Alert variant={"danger"} className="mr-3">
            {errorMsg}
        </Alert>}
        <Card className="mr-3 bg-dark">
            <Card.Header className="justify-content-between d-flex w-100 text-break">
                <Header mode={CONST.VIEW_DOCUMENT} 
                    type={type} 
                    id={id} 
                    setClickedDelete={setClickedDelete}
                    startCRMode={startCRMode}/>
            </Card.Header>
            <Card.Body className="text-break">
                <DisplayDocumentBody setLoading={setLoading} setErrorMsg={setErrorMsg}/>
            </Card.Body>
        </Card>
    </main>
}