import React from "react"
import Card from "react-bootstrap/Card"
import { useParams } from "react-router-dom"
import {JsonFrameViewer} from "./JsonFrameViewer"
import {DocumentControlObj} from "../hooks/DocumentControlContext"
import {FaTimes} from "react-icons/fa"
import Button from "react-bootstrap/Button"
import {CopyButton} from "./utils"

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

export const ViewDocumentFrames = () => {
    const {
        showFrames,
        setShowFrames,
        frames
    } = DocumentControlObj()

    const {type}=useParams()

    if(!showFrames) return <div/>

    if(!frames.hasOwnProperty(type)) {
        throw new Error (`Something's not right ... Frame is missing document type ${type} ...`)
    }

    return <Card className="tdb__frame__display" style={{width: "50%"}}>
        <Card.Header>
            {`Frames of `}
            <span className="fw-bold">{type}</span>
            <CloseFrameDisplay setShowFrames={setShowFrames}/>
            <CopyButton text={JSON.stringify(frames[type], null, 2)} 
                label={"Copy Frames"} 
                css={`float-right bg-light mr-2 btn-sm text-dark`}
                title={`Copy ${type} frames`}/>
        </Card.Header>
        <Card.Body>
            <JsonFrameViewer jsonData={frames[type]} mode="View"/>
        </Card.Body>
    </Card>
}

