
import React, {useState, useEffect} from "react"
import {FrameViewer} from "../FrameViewer"
import {
    VIEW, 
    ORIGINAL_VALUE, 
    CHANGED_VALUE,
    ORIGINAL_UI_FRAME, 
    CHANGED_UI_FRAME
} from "../constants"
import {Card, Row, Col} from "react-bootstrap"
import {generateDiffUIFrames} from "./diffViewer.utils"

/**
 * 
 * @param {json} [oldValue] - Old value 
 * @param {json} [newValue] - New value 
 * @param {boolean} [frame] - frames
 * @param {boolean} [type] - document type
 * @returns - a react diff component 
 */ 
export const DiffViewer = ({frame, type, oldValue, newValue, diffPatch}) => {

    if(!frame) return <div>{"Include frames to view Diffs"}</div>
    if(!type) return <div>{"Include document type to view Diffs"}</div>
    if(!diffPatch) return <div>{"Include diff patch JSON Object to view diffs"}</div>
    if(!frame.hasOwnProperty(type)) return <div>{`Frame of type ${type} not found`}</div>

    let subFrame=frame[type]    
    let diffUIFrames=generateDiffUIFrames(frame, subFrame, type, oldValue, newValue, diffPatch)

    return <Row>
        <Col md={6}>
            <Card>  
                <Card.Header>
                    {ORIGINAL_VALUE}
                    <Card.Subtitle className="mt-1 text-muted">
                        <small>Old Values are highlighted in 
                                <small className="text-danger fw-bold m-1">red</small>
                        </small>
                    </Card.Subtitle>
                </Card.Header>
                <Card.Body>
                    <FrameViewer
                        frame={frame}
                        uiFrame={diffUIFrames[ORIGINAL_UI_FRAME]}
                        type={type}
                        formData={oldValue}
                        mode={VIEW}
                        hideSubmit={true}
                    />
                </Card.Body>
            </Card>
        </Col>
        <Col md={6}>
            <Card>
                <Card.Header>
                    {CHANGED_VALUE}
                    <Card.Subtitle className="mt-1 text-muted">
                        <small>Changes are highlighted in 
                            <small className="text-success fw-bold m-1">green</small>
                        </small>
                    </Card.Subtitle>
                </Card.Header>
                <Card.Body>
                    <FrameViewer
                        frame={frame}
                        uiFrame={diffUIFrames[CHANGED_UI_FRAME]}
                        type={type}
                        formData={newValue}
                        mode={VIEW}
                        hideSubmit={true}
                    />
                </Card.Body>
            </Card>
        </Col>
   </Row>
}