import React, {useState}  from "react";
import {Stack,Card} from "react-bootstrap"
import {FrameViewer} from "@terminusdb/terminusdb-documents-ui"
import * as CONST from "./components/constants"
import {ViewFramesButton} from "./components/ViewFramesButton"
import {CloseButton} from "./components/CloseButton"
import {JsonFrameViewer} from "./components/JsonFrameViewer"
import {ToggleJsonAndFormControl} from "./components/ToggleJsonAndFormControl"
import {ViewDocumentFrames} from "./components/ViewDocumentFrames"
//onSelect={<SearchComponent/>} 
export const NewDocumentComponent = ({type,createDocument,jsonContent,frames,closeButtonClick,SearchComponent}) => {
    const [view, setView] = useState(CONST.FORM_VIEW)
    const [showFrames, setShowFrames] = useState(false)
    
    const onSelect = SearchComponent ? {onSelect:<SearchComponent/>} :{}
    
    return  <div className="w-100 d-flex">      
            <Card className="mr-3 bg-dark flex-grow-1">
            <Card.Header className="justify-content-between d-flex w-100 text-break">
            <Stack direction="horizontal" gap={3} className="w-100">
                <strong className="text-success">
                    <span className="mr-1 h6 fst-italic">{CONST.CREATE_DOCUMENT}: </span>
                    <span className="fw-bolder h6">{type}</span>
                </strong>
                <ViewFramesButton setShowFrames={setShowFrames}/>
                <ToggleJsonAndFormControl onClick={setView}/>
                <CloseButton type={type} onClick={closeButtonClick}/>
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
                    {...onSelect}  
                    formData={!jsonContent ? {} : jsonContent}
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