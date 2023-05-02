import React, {useState}  from "react";
import {Stack,Card} from "react-bootstrap"
import {FrameViewer} from "@terminusdb/terminusdb-documents-ui"
import * as CONST from "./components/constants"
import {ViewFramesButton} from "./components/ViewFramesButton"
import {CloseButton} from "./components/CloseButton"
import {JsonFrameViewer} from "./components/JsonFrameViewer"
import {ToggleJsonAndFormControl} from "./components/ToggleJsonAndFormControl"
import {CopyButton} from "./components/CopyButton"
import {ViewDocumentFrames} from "./components/ViewDocumentFrames"
import { LanguageSelectComponent } from "./components/SelectLanguageComponent"
import { trimID } from "./utils"

export const EditDocumentComponent = ({type,updateDocument,documentJson,frames,closeButtonClick,documentID,SearchComponent}) => {
    const [view, setView] = useState(CONST.FORM_VIEW)
    const [showFrames, setShowFrames] = useState(false)
    const [selectedLanguage, setSelectedLanguage] = useState(false) 
    const onSelect = SearchComponent ? {onSelect:<SearchComponent/>} :{}
    const [showInfo, setShowInfo]=useState( { frames: false, history: false } )

    return  <div className="w-100 d-flex">      
            <Card className="bg-dark flex-grow-1">
            <Card.Header className="justify-content-between d-flex w-100 text-break">
            <Stack direction="horizontal" gap={3} className="w-100">
                <div className="col-md-7"> 
                    <strong className="text-success">
                        <span className="mr-1 h6 fst-italic">{CONST.EDIT_DOCUMENT}: </span> 
                        <span className="fw-bolder h6">{trimID(documentID)}</span>
                    </strong>
                    <CopyButton text={documentID} title={`Copy Document ID`}/>
                </div> 
                <ViewFramesButton setShowInfo={setShowInfo}/>
                <LanguageSelectComponent frame={frames} setSelectedLanguage={setSelectedLanguage}/>
                <ToggleJsonAndFormControl onClick={setView}/>
                <CloseButton type={type} onClick={closeButtonClick}/>
            </Stack>
            </Card.Header>
            <Card.Body className="text-break">
            {view === CONST.JSON_VIEW && 
                 <JsonFrameViewer jsonData={documentJson} setExtracted={updateDocument} mode={CONST.EDIT_DOCUMENT}/>
            }
            {view === CONST.FORM_VIEW && 
            <FrameViewer frame={frames}
                type={type}
                mode={CONST.EDIT_DOCUMENT}
                onSubmit={updateDocument}
                //onChange={handleChange}
                language={selectedLanguage}
                {...onSelect}  
                formData={documentJson}
                hideSubmit={false}
            />
            }
            </Card.Body>
        </Card>
        <ViewDocumentFrames
            type={type}
            documentFrame={frames[type] || {}}
            showInfo={showInfo} 
            setShowInfo={setShowInfo}
       />
    </div>
      
}