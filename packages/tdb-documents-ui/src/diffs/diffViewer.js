
import React from "react"
import {FrameViewer} from "../FrameViewer"
import {
    VIEW, 
    ORIGINAL_VALUE, 
    CHANGED_VALUE,
    ORIGINAL_UI_FRAME, 
    CHANGED_UI_FRAME
} from "../constants"
import {
    OPERATION,
    INSERT
} from "./diff.constants"
import {Card, Row, Col} from "react-bootstrap"
import {generateDiffUIFrames} from "./diffViewer.utils"

/**
 * 
 * @param {*} oldValueHeader Custom React Element to display in Card Header of old branch  
 * @returns A React Element to display in Card Header of old branch
 */
 const OldValueHeader = ({oldValueHeader}) => {
    if(oldValueHeader) return oldValueHeader
    
    return <React.Fragment>
        {ORIGINAL_VALUE}
        <Card.Subtitle className="mt-1 text-muted">
            <small>Old Values are highlighted in 
                <small className="text-danger fw-bold m-1">red</small>
            </small>
        </Card.Subtitle>
    </React.Fragment>
}

/**
 * 
 * @param {*} newValueHeader Custom React Element to display in Card Header of tracking branch  
 * @returns A React Element to display in Card Header of tracking branch
 */
const NewValueHeader = ({newValueHeader}) => {
    if(newValueHeader) return newValueHeader
    
    return <React.Fragment>
        {CHANGED_VALUE}
        <Card.Subtitle className="mt-1 text-muted">
            <small>Changes are highlighted in 
                <small className="text-success fw-bold m-1">green</small>
            </small>
        </Card.Subtitle>
    </React.Fragment>
}


/**
 * 
 * @param {*} frame schema frames of data product
 * @param {*} type document type
 * @param {*} oldValue old json document
 * @param {*} newValue new json document
 * @param {*} diffPatch diffPatch json object
 * @param {*} oldValueHeader Custom React Element to display in Card Header of old branch  
 * @param {*} newValueHeader Custom React Element to display in Card Header of tracking branch  
 * @returns  
 */
 export const DiffViewer = ({frame, type, oldValue, newValue, diffPatch, oldValueHeader, newValueHeader}) => {
    if(!frame) return <div>{"Include frames to view Diffs"}</div>
    if(!type) return <div>{"Include document type to view Diffs"}</div>
    if(!diffPatch) return <div>{"Include diff patch JSON Object to view diffs"}</div>
    if(!frame.hasOwnProperty(type)) return <div>{`Frame of type ${type} not found`}</div>


    if(diffPatch.hasOwnProperty(OPERATION) && diffPatch[OPERATION] === INSERT) {
        let uiJson = {
            classNames: "p-3 text-dark inserted"
        }
        let hideUIJson = {
            classNames: "hide__opacity p-3"
        }
        return <Row> 
            <Col md={6}>
                <Card>  
                    <Card.Header>
                        <OldValueHeader oldValueHeader={oldValueHeader}/>
                    </Card.Header>
                    <Card.Body>
                        <FrameViewer
                            frame={frame}
                            uiFrame={hideUIJson}
                            type={type}
                            formData={newValue}
                            mode={VIEW}
                            hideSubmit={true}
                        />
                    </Card.Body>
                </Card>
            </Col>
            <Col md={6}>
                <Card>
                    <Card.Header>
                        <NewValueHeader newValueHeader={newValueHeader}/>
                    </Card.Header>
                    <Card.Body>
                        <FrameViewer
                            frame={frame}
                            uiFrame={uiJson}
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

    let subFrame=frame[type]    
    let diffUIFrames=generateDiffUIFrames(frame, subFrame, type, oldValue, newValue, diffPatch)
 
    return <Row> 
        <Col md={6}>
            <Card>  
                <Card.Header>
                    <OldValueHeader oldValueHeader={oldValueHeader}/>
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
                    <NewValueHeader newValueHeader={newValueHeader}/>
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