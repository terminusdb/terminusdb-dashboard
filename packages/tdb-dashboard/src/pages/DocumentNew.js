import React, {useState,useEffect}  from "react";
import {WOQLClientObj} from '../init-woql-client'
import Card from "react-bootstrap/Card"
import {FrameViewer} from "@terminusdb/terminusdb-documents-ui"
import * as CONST from "../components/constants"
import { useNavigate, useParams } from "react-router-dom";
import TerminusClient from '@terminusdb/terminusdb-client'
import {Header, SearchComponent} from "../components/DocumentComponents"
import {JsonFrameViewer} from "../components/JsonFrameViewer"
import {CreateDocumentHook} from "../hooks/DocumentHook"
import Alert from 'react-bootstrap/Alert'
import {DocumentControlObj} from "../hooks/DocumentControlContext"
import {Loading} from "../components/Loading"
import {CreateChangeRequestModal} from "../components/CreateChangeRequestModal"
import { Alerts } from "../components/Alerts"


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
        //onChange={handleChange}
        onSelect={<SearchComponent/>}   
        formData={!jsonContent ? {} : jsonContent}
        //formData={extracted}
        hideSubmit={false}
    />
}


const FAKE_ERROR = {
    "@type":"api:InsertDocumentErrorResponse",
    "api:error": {
      "@type":"api:SchemaCheckFailure",
      "api:witnesses": [
        {
            "@type":"ConstraintFailure",
            "constraint_name":"MidLifeInsurance",
            "message":"Failed to satisfy: 12 > 30\n\n\n    In the Constraint:\n\n( 'Policy/3':'Policy'\n   ∧ 'Policy/3' =[insurance_product]> 'MidLifeInsurance/Mid-Life%20Insurance%20Product'\n   ∧ 'MidLifeInsurance/Mid-Life%20Insurance%20Product':'MidLifeInsurance'\n   ) ⇒\n    'Policy/3' =[customer]> 'Customer/Jill+Curry+2'\n     ∧ 'Customer/Jill+Curry+2' =[age]> 12\n     ∧ « 12 > 30\n     » ∧ 12 < 60\n    \n"
        },
        {
            "@type":"ConstraintFailure",
            "constraint_name":"Policy",
            "message":"Failed to satisfy: 12 > 30\n\n\n    In the Constraint:\n\n( 'Policy/3':'Policy'\n   ∧ 'Policy/3' =[insurance_product]> 'MidLifeInsurance/Mid-Life%20Insurance%20Product'\n   ∧ 'MidLifeInsurance/Mid-Life%20Insurance%20Product':'MidLifeInsurance'\n   ) ⇒\n    'Policy/3' =[customer]> 'Customer/Jill+Curry+2'\n     ∧ 'Customer/Jill+Curry+2' =[age]> 12\n     ∧ « 12 > 30\n     » ∧ 12 < 60\n    \n"
        }
      ]
    },
    "api:message":"Schema check failure",
    "api:status":"api:failure"
}

export const DocumentNew = () => {   
    const { 
        setChangeRequestBranch, branch,woqlClient
    } = WOQLClientObj()

    const {
        formatErrorMessages
    } = DocumentControlObj()
       

    const [showModal, setShowModal] = useState(false)
    const {type} = useParams()
    
    const [loading, setLoading]=useState(false)
    //const [errorMsg, setErrorMsg]=useState(false)
    const [errorMsg, setErrorMsg]=useState(FAKE_ERROR)

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

    return <main className="content w-100 document__interface__main">     
        {errorMsg && <Alerts message={formatErrorMessages(errorMsg)} type={CONST.TERMINUS_DANGER} onCancel={setErrorMsg}/>} 
        {/*errorMsg && <Alert variant={"danger"} className="mr-3">
            {errorMsg}
        </Alert>*/}
        {showModal && <CreateChangeRequestModal showModal={showModal}
                type={type} 
                setShowModal={setShowModal} 
                updateViewMode={updateViewMode}/>}
        {branch !== "main" &&    
            <Card className="bg-dark">
                <Card.Header className="justify-content-between d-flex w-100 text-break">
                    <Header mode={CONST.CREATE_DOCUMENT} type={type}/>
                </Card.Header>
                <Card.Body className="text-break">
                    <DisplayDocumentBody setLoading={setLoading} setErrorMsg={setErrorMsg}/>
                </Card.Body>
            </Card>}
    </main>
}