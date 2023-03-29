import React from "react"
import {JsonFrameViewer} from "./JsonFrameViewer"
import {FaTimes} from "react-icons/fa"
import {Button,Card} from "react-bootstrap"
import {CopyButton} from "./CopyButton"

export const ViewDocumentFrames = ({type,documentFrame,setShowFrames}) => {
    return <Card className="tdb__frame__display" style={{width: "50%"}}>
        <Card.Header>
            {`Frames of `}
            <span className="fw-bold">{type}</span>
            <CloseFrameDisplay setShowFrames={setShowFrames}/>
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


/**
 * 
 * @param {*} type setShowFrames constant to hide display of document frames
 * @returns a close button icon
 */
const CloseFrameDisplay = ({setShowFrames}) => { 
    // on close button display document list table
    return <Button variant="light" 
        className="btn-sm btn text-dark float-right" 
        tilte={`Close`}
        onClick={(e) => setShowFrames(false)}>
        <FaTimes/>
    </Button>
}