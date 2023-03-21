import React, {useState,useEffect}  from "react";
import {WOQLClientObj} from '../init-woql-client'
import {Stack,Card} from "react-bootstrap"
import {FrameViewer} from "@terminusdb/terminusdb-documents-ui"
import * as CONST from "../components/constants"
import { useNavigate, useParams } from "react-router-dom";
import {ViewFramesButton, CloseButton, SearchComponent,ErrorMessageReport} from "../components/DocumentComponents"
import {JsonFrameViewer} from "../components/JsonFrameViewer"
import {DocumentControlObj} from "../hooks/DocumentControlContext"
import {Loading} from "../components/Loading"
import {CreateChangeRequestModal} from "../components/CreateChangeRequestModal"
import {ToggleJsonAndFormControl} from "../components/ToggleJsonAndFormControl"
import {ViewDocumentFrames} from "../components/ViewDocumentFrames"
// if you listen something your interface will be render when the status changes
// for this I remove the loading listener form display document I only check frames
//<CreateHeader mode={CONST.CREATE_DOCUMENT} type={type}/>
const FrameNewMode = ({type,createDocument,jsonContent,frames}) => {
    const [view, setView] = useState(CONST.FORM_VIEW)
    const [showFrames, setShowFrames] = useState(false)

    return  <div className="w-100 d-flex">      
            <Card className="mr-3 bg-dark flex-auto">
            <Card.Header className="justify-content-between d-flex w-100 text-break">
            <Stack direction="horizontal" gap={3} className="w-100">
                <strong className="text-success">
                    <span className="mr-1 h6 fst-italic">{CONST.CREATE_DOCUMENT}: </span>
                    <span className="fw-bolder h6">{type}</span>
                </strong>
                <ViewFramesButton setShowFrames={setShowFrames}/>
                <ToggleJsonAndFormControl onClick={setView}/>
                <CloseButton type={type}/>
            </Stack>
            </Card.Header>
            <Card.Body className="text-break">
            {view === CONST.JSON_VIEW && 
                <JsonFrameViewer jsonData={jsonContent} mode={CONST.CREATE_DOCUMENT} setExtracted={createDocument}/>
            }
            {view === CONST.FORM_VIEW && 
            <FrameViewer frame={frames}
                    type={type}
                    mode={CONST.CREATE_DOCUMENT}
                    onSubmit={createDocument} 
                    //onChange={handleChange}
                    onSelect={<SearchComponent/>}   
                    formData={!jsonContent ? {} : jsonContent}
                    //formData={extracted}
                    hideSubmit={false}
                />
            }
            </Card.Body>
        </Card>
        {showFrames && 
        <ViewDocumentFrames
            type={type}
            documentFrame={frames[type] || {}}
            setShowFrames={setShowFrames}
       />}
    </div>
      
}


export const DocumentNew = () => {  
    const {organization,dataProduct,type} = useParams()
    const {setChangeRequestBranch, branch} = WOQLClientObj()
    const [showModal, setShowModal] = useState(false)

    const {
        jsonContent,
       // setJsonContent,
        frames,
        getUpdatedFrames,
        createDocument,
        getGraphqlTableConfig,
    } = DocumentControlObj()
    const navigate = useNavigate()
  

    // we have to check the branch no the change request
    // in this moment we create change_request only if you 
    //try to change/add documents in main branch
    useEffect(() => {
        if(branch === "main"){
            setShowModal(true)
        }
	},[branch])
    
    useEffect(() => {
        getUpdatedFrames()
        getGraphqlTableConfig()
    },[])

    const callCreateDocument = async (jsonDocument) =>{
        const created = await createDocument(jsonDocument)
        if(created){
            navigate(`/${organization}/${dataProduct}/documents/${type}`)
        }
    }

    if(!frames) return  <Loading message={`Fetching frames for document type ${type} ...`}/>

    const updateViewMode =(newBranchName, changeRequestId)=>{
        setChangeRequestBranch(newBranchName, changeRequestId)
    }

    return  <React.Fragment>
            {showModal && <CreateChangeRequestModal showModal={showModal} type={type}  setShowModal={setShowModal}  updateViewMode={updateViewMode}/>}
            <ErrorMessageReport/>
            {branch!== "main" &&  frames &&  
                <FrameNewMode
                    frames={frames}
                    jsonContent={jsonContent}
                    createDocument={callCreateDocument}
                    type={type}
                />     
            }
            </React.Fragment>
}