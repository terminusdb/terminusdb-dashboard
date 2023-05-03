import React, {useState}  from "react";
import {Stack,Card,Button} from "react-bootstrap"
import {FrameViewer} from "@terminusdb/terminusdb-documents-ui"
//import "terminusdb__darkly.css"
import * as CONST from "./components/constants"
import {ViewFramesButton} from "./components/ViewFramesButton"
import {CloseButton} from "./components/CloseButton"
import {JsonFrameViewer} from "./components/JsonFrameViewer"
import {ToggleJsonAndFormControl} from "./components/ToggleJsonAndFormControl"
import {ViewDocumentFrames} from "./components/ViewDocumentFrames"
import {CopyButton} from "./components/CopyButton"
import {RiDeleteBin7Line} from "react-icons/ri"
import {TraverseDocumentLinks, onTraverse} from "./components/TraverseDocumentLinks"
import { LanguageSelectComponent } from "./components/SelectLanguageComponent"
import { trimID } from "./utils"
import { AiFillEdit } from "react-icons/ai"

// we have to fix traversedocklinek
export const ViewDocumentComponent = ({type,getDocumentById,documentJson,frames,closeButtonClick,documentID,deleteDocument,editDocument}) => {
    const [view, setView] = useState(CONST.FORM_VIEW)
    const [clicked, setClicked]=useState(false)
    const [selectedLanguage, setSelectedLanguage] = useState(false) 
    const [showInfo, setShowInfo]=useState( { frames: false, history: false } )

    function handleTraverse (documentID) {
        onTraverse(documentID, setClicked)
    }

    return  <div className="w-100 d-flex">     
            {clicked && <TraverseDocumentLinks 
                    getDocumentById={getDocumentById} 
                    clicked={clicked} 
                    frames={frames}
                    show={clicked!==false} 
                    onHide={() => setClicked(false)}/>} 
            <Card className="bg-dark flex-grow-1">
            <Card.Header className="justify-content-between d-flex w-100 text-break">
            <Stack direction="horizontal" gap={2} className="w-100">
            <div className="col-md-6"> 
                <strong className="text-success">
                    <span className="mr-1 h6 fst-italic">{CONST.VIEW_DOCUMENT}:</span> 
                    <span className="fw-bolder h6"> {trimID(documentID)} </span>
                </strong>
                <CopyButton text={`${documentID}`} title={`Copy Document ID`}/> 
             </div> 
                <ViewFramesButton setShowInfo={setShowInfo}/>
                <LanguageSelectComponent frame={frames} setSelectedLanguage={setSelectedLanguage}/>
                <ToggleJsonAndFormControl onClick={setView}/>
                <div className="d-flex">
                    <Button variant="light" type="button"  title="Edit Document"  onClick={editDocument} className="btn-sm btn d-flex text-dark mr-2">
                        {/*<AiFillEdit/>*/}{"Edit"}
                    </Button>
                    <Button variant="danger" style={CONST.TOOLBAR_BUTTON_STYLES} type="button" title="Delete Document" onClick={deleteDocument}className="btn-sm btn text-gray">
                        <RiDeleteBin7Line className=" mb-1"/>
                    </Button>
                </div>
                <CloseButton type={type} onClick={closeButtonClick}/>
            </Stack>
            </Card.Header>
            <Card.Body className="text-break">
            {view === CONST.JSON_VIEW && 
                 <JsonFrameViewer jsonData={documentJson} mode={CONST.VIEW_DOCUMENT}/>
            }
            {view === CONST.FORM_VIEW && 
            <FrameViewer frame={frames}
                    type={type}
                    mode={CONST.VIEW_DOCUMENT}
                    formData={documentJson}
                    language={selectedLanguage}
                    hideSubmit={true}
                    onTraverse={handleTraverse}
            />
            }
            </Card.Body>
        </Card>
        <ViewDocumentFrames
            type={type}
            documentFrame={frames[type] || {}}
            showInfo={showInfo} 
            setShowInfo={setShowInfo}/>
    </div>
      
}