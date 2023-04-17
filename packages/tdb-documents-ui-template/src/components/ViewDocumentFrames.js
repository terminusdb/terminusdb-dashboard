import React from "react"
import {JsonFrameViewer} from "./JsonFrameViewer"
import {FaTimes} from "react-icons/fa"
import {Button,Card} from "react-bootstrap"
import {CopyButton} from "./CopyButton" 
//import { CloseInfoButton } from "./infoCloseButton"

export const ViewDocumentFrames = ({type,documentFrame, setShowInfo, showInfo}) => {
   // if(!showInfo.frames) return <div/>
    return <Card className="tdb__frame__display" style={{width: "50%"}}>
        <Card.Header>
            {`Frames of `}
            <span className="fw-bold">{type}</span>
            <CopyButton text={JSON.stringify(documentFrame, null, 2)} 
                label={"Copy Frames"} 
                css={`float-right bg-light mr-2 btn-sm text-dark`}
                title={`Copy ${type} frames`}/>
        </Card.Header>
        <Card.Body>
            <JsonFrameViewer jsonData={documentFrame} mode="View"/>
        </Card.Body>
    </Card>
}


