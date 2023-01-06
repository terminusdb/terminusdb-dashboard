import React, {useState}  from "react";
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
import {Loading} from "../components/Loading"

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

const DisplayDocumentBody = ({view, setLoading, setErrorMsg}) => {
    const { 
        woqlClient, 
        frames
    } = WOQLClientObj()

    const {type} = useParams()
    
    // constants for extracted data 
    const [extracted, setExtracted]=useState({})

    // hook to create a new document  
    const createResult = CreateDocumentHook(woqlClient, extracted, setLoading, setErrorMsg) 

    // function which extracts data from document form 
    function handleSubmit(data) {
        setExtracted(data)
    }

    if(!frames) return  <Loading message={`Fetching frames for document type ${type} ...`}/>

    // JSON View
    if(view === CONST.JSON_VIEW) {
        return <JsonFrameViewer mode={CONST.CREATE_DOCUMENT} setExtracted={setExtracted}/>
    }

    // Form View
    return <FrameViewer frame={frames}
        type={type}
        mode={CONST.CREATE_DOCUMENT}
        onSubmit={handleSubmit}
        onSelect={onSelect}   
        formData={extracted}
        hideSubmit={false}
        //onTraverse={onTraverse}
    />
}

export const DocumentNew = () => {   

    const {type} = useParams()
    // constants to display document body in Form or JSON View
    const [view, setView]=useState(CONST.FORM_VIEW)
    const [loading, setLoading]=useState(false)
    const [errorMsg, setErrorMsg]=useState(false)

    // create a change request before editing document
    const startCRMode = (mode) => {
        // logic to start CR mode
    }

    return <main className="content mt-5 w-100 document__interface__main">
        {errorMsg && <Alert variant={"danger"} className="ml-5 mr-5">
            {errorMsg}
        </Alert>}
        <Card className="mr-5 bg-dark">
            <Card.Header className="justify-content-between d-flex w-100 text-break">
                <Header mode={CONST.CREATE_DOCUMENT} type={type} setView={setView}/>
            </Card.Header>
            <Card.Body className="text-break">
                <DisplayDocumentBody view={view} setLoading={setLoading} setErrorMsg={setErrorMsg}/>
            </Card.Body>
        </Card>
    </main>
}