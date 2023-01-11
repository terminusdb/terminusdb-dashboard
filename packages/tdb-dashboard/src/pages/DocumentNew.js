import React, {useState,useEffect}  from "react";
import {WOQLClientObj} from '../init-woql-client'
import Card from "react-bootstrap/Card"
import {FrameViewer} from "@terminusdb/terminusdb-documents-ui"
import * as CONST from "../components/constants"
import { useNavigate, useParams } from "react-router-dom";
import TerminusClient from '@terminusdb/terminusdb-client'
import {Header} from "../components/DocumentComponents"
import {JsonFrameViewer} from "../components/JsonFrameViewer"
import {CreateDocumentHook} from "../hooks/DocumentHook"
import Alert from 'react-bootstrap/Alert'
import {DocumentControlObj} from "../hooks/DocumentControlContext"
import {Loading} from "../components/Loading"
import {CreateChangeRequestModal} from "../components/CreateChangeRequestModal"

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

    const {type} = useParams()
    
    // constants for extracted data 
    const [extracted, setExtracted]=useState({})
 
    // hook to create a new document  
    const createResult = CreateDocumentHook(woqlClient, extracted, setLoading, setErrorMsg) 

    // function which extracts data from document form 
    function handleSubmit(data) {
        setExtracted(data)
    } 

    // function which detects a change 
    function handleChange(data) {
        setJsonContent(data)
    }

    if(!frames) return  <Loading message={`Fetching frames for document type ${type} ...`}/>

    // JSON View
    if(view === CONST.JSON_VIEW) { 
        return <JsonFrameViewer jsonData={jsonContent} mode={CONST.CREATE_DOCUMENT} setExtracted={setExtracted}/>
    }

    // Form View
    return <FrameViewer frame={frames}
        type={type}
        mode={CONST.CREATE_DOCUMENT}
        onSubmit={handleSubmit}
        onChange={handleChange}
        onSelect={onSelect}   
        formData={jsonContent}
        //formData={extracted}
        hideSubmit={false}
    />
}

export const DocumentNew = () => {   
    const { 
        setChangeRequestBranch, branch
    } = WOQLClientObj()

    const [showModal, setShowModal] = useState(false)
    const {type} = useParams()
    
    const [loading, setLoading]=useState(false)
    const [errorMsg, setErrorMsg]=useState(false)

    useEffect(() => {
        if(branch === "main"){
            setShowModal(true)
        }/*else {
            setShowModal(false)
        }*/
	},[branch])

    const updateViewMode =(newBranchName, changeRequestId)=>{
        setChangeRequestBranch(newBranchName, changeRequestId)
       // setCurrentMode(currentMode)
    }

    // create a change request before editing document
    const startCRMode = (mode) => {
        // logic to start CR mode
    }

    // remove this after DEV is ready for CR Management
    /*return <main className="content w-100 document__interface__main">
        {errorMsg && <Alert variant={"danger"} className="mr-3">
            {errorMsg}
        </Alert>}
            <Card className="mr-3 bg-dark">
                <Card.Header className="justify-content-between d-flex w-100 text-break">
                    <Header mode={CONST.CREATE_DOCUMENT} type={type}/>
                </Card.Header>
                <Card.Body className="text-break">
                    <DisplayDocumentBody setLoading={setLoading} setErrorMsg={setErrorMsg}/>
                </Card.Body>
            </Card>
    </main>*/

    // comment this for now - uncomment after DEV is ready for CR Management
    return <main className="content w-100 document__interface__main">
        {errorMsg && <Alert variant={"danger"} className="mr-3">
            {errorMsg}
        </Alert>}
        {showModal && <CreateChangeRequestModal showModal={showModal}
                type={type} 
                setShowModal={setShowModal} 
                updateViewMode={updateViewMode}/>}
        {branch !== "main" &&    
            <Card className="mr-3 bg-dark">
                <Card.Header className="justify-content-between d-flex w-100 text-break">
                    <Header mode={CONST.CREATE_DOCUMENT} type={type}/>
                </Card.Header>
                <Card.Body className="text-break">
                    <DisplayDocumentBody setLoading={setLoading} setErrorMsg={setErrorMsg}/>
                </Card.Body>
            </Card>}
    </main>
}