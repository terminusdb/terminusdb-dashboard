import React, {useState,useEffect}  from "react";
import {WOQLClientObj} from '../init-woql-client'
import Card from "react-bootstrap/Card"
import {FrameViewer} from "@terminusdb/terminusdb-documents-ui"
import * as CONST from "../components/constants"
import { useNavigate, useParams } from "react-router-dom";
import {CreateHeader, SearchComponent,ErrorMessageReport} from "../components/DocumentComponents"
import {JsonFrameViewer} from "../components/JsonFrameViewer"
import Alert from 'react-bootstrap/Alert'
import {DocumentControlObj} from "../hooks/DocumentControlContext"
import {Loading} from "../components/Loading"
import {CreateChangeRequestModal} from "../components/CreateChangeRequestModal"

//__KITTY__
/*const checkIfPrefix =(id)=>{
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
}*/

// if you listen something your interface will be render when the status changes
// for this I remove the loading listener form display document I only check frames
const DisplayDocumentBody = () => {
    const {organization,dataProduct,type} = useParams()
    const navigate = useNavigate()
    const {
        view,
        jsonContent,
       // setJsonContent,
        frames,
        getUpdatedFrames,
        createDocument
    } = DocumentControlObj()

    
    useEffect(() => {
        if(frames===null) {
            getUpdatedFrames()
        }
    },[])

    const callCreateDocument = async (jsonDocument) =>{
        const created = await createDocument(jsonDocument)
        if(created){
            navigate(`/${organization}/${dataProduct}/documents/${type}`)
        }
    }

    if(!frames) return  <Loading message={`Fetching frames for document type ${type} ...`}/>

    // JSON View
    if(view === CONST.JSON_VIEW) { 
        return <JsonFrameViewer jsonData={jsonContent} mode={CONST.CREATE_DOCUMENT} setExtracted={callCreateDocument}/>
    }
    //__KITTY__
    return <FrameViewer frame={frames}
        type={type}
        mode={CONST.CREATE_DOCUMENT}
        onSubmit={callCreateDocument} 
        //onChange={handleChange}
        onSelect={<SearchComponent/>}   
        formData={!jsonContent ? {} : jsonContent}
        //formData={extracted}
        hideSubmit={false}
    />
}


export const DocumentNew = () => {  
    const {type} = useParams() 
    const { 
        setChangeRequestBranch, branch
    } = WOQLClientObj()

    const [showModal, setShowModal] = useState(false)

    // we have to check the branch no the change request
    // in this moment we create change_request only if you 
    //try to change/add documents in main branch
    useEffect(() => {
        if(branch === "main"){
            setShowModal(true)
        }
	},[branch])

    const updateViewMode =(newBranchName, changeRequestId)=>{
        setChangeRequestBranch(newBranchName, changeRequestId)
    }

    return <main className="content w-100 document__interface__main">      
            {showModal && <CreateChangeRequestModal showModal={showModal} type={type}  setShowModal={setShowModal}  updateViewMode={updateViewMode}/>}
            <ErrorMessageReport/>
            {branch!== "main" &&             
                <Card className="mr-3 bg-dark">
                    <Card.Header className="justify-content-between d-flex w-100 text-break">
                        <CreateHeader mode={CONST.CREATE_DOCUMENT} type={type}/>
                    </Card.Header>
                    <Card.Body className="text-break">
                        <DisplayDocumentBody/>
                    </Card.Body>
                </Card>}
            </main>
}