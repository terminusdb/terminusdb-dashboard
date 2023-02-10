import React, {useEffect, useState}  from "react";
import {WOQLClientObj} from '../init-woql-client'
import Card from "react-bootstrap/Card"
import {FrameViewer} from "@terminusdb/terminusdb-documents-ui"
import * as CONST from "../components/constants"
import { useNavigate, useParams } from "react-router-dom";
import TerminusClient from '@terminusdb/terminusdb-client'
import {Header, SearchComponent} from "../components/DocumentComponents"
import {JsonFrameViewer} from "../components/JsonFrameViewer"
import {EditDocumentHook, GetDocumentHook} from "../hooks/DocumentHook"
import Alert from 'react-bootstrap/Alert'
import {Loading} from "../components/Loading"
import {DocumentControlObj} from "../hooks/DocumentControlContext"
import {CreateChangeRequestModal} from "../components/CreateChangeRequestModal"
import {UTILS} from "@terminusdb/terminusdb-client"

const checkIfPrefix =(id)=>{
    if(id.indexOf(":")>-1){
        return id
    }
    return "@schema:"+id
}

const onSelect = async (inp, type) => {
    const { 
        woqlClient
    } = WOQLClientObj()

    let WOQL =  TerminusClient.WOQL
    var docType=checkIfPrefix(type)
    let q = WOQL.isa("v:Documents", docType)
    const results = await q.execute(woqlClient)
        .then((response) => {
            let options = []
            if(inp){
                response.bindings.map(thing => {
                    if(thing["Documents"].toUpperCase().includes(inp.toUpperCase())){
                        options.push({value: thing["Documents"], label: thing["Documents"]})
                    }
                })
            }
            else {
                response.bindings.map(thing => {
                    options.push({value: thing["Documents"], label: thing["Documents"]})
                })
            }
            return options
        })
        .catch((error) => {
            console.log("query run error", error)
        })
    return results
}

const DisplayDocumentBody = ({setLoading, setErrorMsg}) => {
    const { 
        woqlClient, 
        frames
    } = WOQLClientObj()

    const {
        view,
        jsonContent,
        setJsonContent
    } = DocumentControlObj()

    const {type, id} = useParams()
    let documentID=atob(id)
    
    // constants for extracted data 
    const [extracted, setExtracted]=useState(false)
    // constants to store document data 
    const [data, setData]=useState(false)

    // hook to edit a document 
    const viewResult = GetDocumentHook(woqlClient, documentID, setData, setLoading, setErrorMsg) || null
    const editResult = EditDocumentHook(woqlClient, extracted, setLoading, setErrorMsg)  
    
    useEffect(() => {
        if(jsonContent) setData(jsonContent)
    }, [jsonContent])

    // function which extracts data from document form 
    function handleSubmit(data) {
        setExtracted(data)
    }
    
    // function which detects a change 
    function handleChange(data) {
        setData(data)
    }

    if(!data || !frames) return  <Loading message={`Fetching ${documentID} ...`}/>

    // JSON View
    if(view === CONST.JSON_VIEW) {
        return <JsonFrameViewer jsonData={data} setExtracted={setExtracted} mode={CONST.EDIT_DOCUMENT}/>
    }

    // Form View
    return <FrameViewer frame={frames}
        type={type}
        mode={CONST.EDIT_DOCUMENT}
        onSubmit={handleSubmit}
        //onChange={handleChange}
        onSelect={<SearchComponent/>}   
        formData={!data ? {} : data}
        hideSubmit={false}
        //onTraverse={onTraverse}
    />
}

export const DocumentEdit = () => {   
    const { 
        setChangeRequestBranch, branch
    } = WOQLClientObj()

    const {type, id} = useParams()
    let documentID=atob(id)
    // constants to display document body in Form or JSON View
    const [view, setView]=useState(CONST.FORM_VIEW) 
    const [loading, setLoading]=useState(false)
    const [errorMsg, setErrorMsg]=useState(false)
    const [showModal, setShowModal] = useState(false)

    useEffect(() => {
        if(branch === "main"){
            setShowModal(true)
        }/*else {
            setShowModal(false)
        }*/
	},[branch])
    // create a change request before editing document
    const startCRMode = (mode) => {
        // logic to start CR mode
    }

    const updateViewMode =(newBranchName, changeRequestId)=>{
        setChangeRequestBranch(newBranchName, changeRequestId)
       // setCurrentMode(currentMode)
    }
 
    return <main className="content w-100 document__interface__main">
        
        {errorMsg && <Alert variant={"danger"} className="mr-3">
            {errorMsg}
        </Alert>}
        {showModal && <CreateChangeRequestModal showModal={showModal}
                type={type} 
                setShowModal={setShowModal} 
                updateViewMode={updateViewMode}/>}
        {branch !== "main" && <Card className="mr-3 bg-dark">
            <Card.Header className="justify-content-between d-flex w-100 text-break">
                <Header mode={CONST.EDIT_DOCUMENT} id={documentID} type={type}/>
            </Card.Header>
            <Card.Body className="text-break">
                <DisplayDocumentBody setLoading={setLoading} setErrorMsg={setErrorMsg}/>
            </Card.Body>
        </Card>}
    </main>
}
