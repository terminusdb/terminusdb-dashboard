import React, {useState}  from "react";
import {Stack,Card} from "react-bootstrap"
import {FrameViewer} from "@terminusdb/terminusdb-documents-ui"
import * as CONST from "./components/constants"
import {ViewFramesButton} from "./components/ViewFramesButton"
import {CloseButton} from "./components/CloseButton"
import {JsonFrameViewer} from "./components/JsonFrameViewer"
import {ToggleJsonAndFormControl} from "./components/ToggleJsonAndFormControl"
import {ViewDocumentFrames} from "./components/ViewDocumentFrames"
import { LanguageSelectComponent } from "./components/SelectLanguageComponent"
 
//onSelect={<SearchComponent/>} 
export const NewDocumentComponent = ({type,createDocument,frames,closeButtonClick,SearchComponent}) => {
    const [view, setView] = useState(CONST.FORM_VIEW)
    const [showFrames, setShowFrames] = useState(false)
    const [selectedLanguage, setSelectedLanguage] = useState(false) 
    const [showInfo, setShowInfo]=useState( { frames: false, history: false } )

    
    const onSelect = SearchComponent ? {onSelect:<SearchComponent/>} :{}
    
    return  <div className="w-100 d-flex">      
            <Card className="bg-dark flex-grow-1">
            <Card.Header className="justify-content-between d-flex w-100 text-break">
            <Stack direction="horizontal" gap={2} className="w-100">
                <strong className="text-success">
                    <span className="mr-1 h6 fst-italic">{CONST.CREATE_DOCUMENT}: </span>
                    <span className="fw-bolder h6">{type}</span>
                </strong>
                <ViewFramesButton setShowInfo={setShowInfo}/>
                <LanguageSelectComponent frame={frames} setSelectedLanguage={setSelectedLanguage}/>
                <ToggleJsonAndFormControl onClick={setView}/>
                <CloseButton type={type} onClick={closeButtonClick}/>
            </Stack>
            </Card.Header>
            <Card.Body className="text-break">
            {view === CONST.JSON_VIEW && 
                <JsonFrameViewer jsonData={{}} mode={CONST.CREATE_DOCUMENT} setExtracted={createDocument}/>
            }
            {view === CONST.FORM_VIEW && 
            <FrameViewer frame={frames}
                    type={type}
                    mode={CONST.CREATE_DOCUMENT}
                    language={selectedLanguage}
                    onSubmit={createDocument} 
                    {...onSelect}  
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